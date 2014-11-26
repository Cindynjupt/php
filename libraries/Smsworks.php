<?php

class Smsworks {
	private $debug;

	private $username = 'SDK-BBX-010-19663';
	private $password = '5-aDfD-4';

	private $header = '';
	private $params = '';
	private $fp = null;

	/***********
	 * construct
	 * debug用于调试，可以忽略
	 *
	 * 设计思路：
	 * 为了适应前一个版本的SendSms()方法，所以接口没有改变
	 * 根据POST方法，加入新的私有方法
	 * 如果考虑大的变动，应该实现SendSms()中数据与方法的分离
	 *
	 * 如果需要限制，
	 * 比如每天最多给同一号码发3次短信，
	 * 则需要数据库支持。（或许有更好的方法）
	 *
	 * */

	public function __construct($debug = False) {
		$this->debug = $debug;
		// 这是Readme中的要求
		// $md5pwd = strtoupper(md5($this->username . $this->password));
	}
	/***********
	 * public 接口
	 * 
	 * 发送短信
	 * SendSms($mobile, $content)
	 * 	$mobile		string	可以是多个电话，以英文逗号隔开
	 * 	$content	string
	 *
	 * 查询余额
	 * Query()
	 *
	 * */
	public function SendSms($mobiles, $content) {
		$this->setHeader('mt');
		$this->setPassword('md5');
		$mobiles = $this->check_mobile($mobiles);
		$this->params .= '&mobile=';
		$this->params .= urlencode($mobiles);
		// 一定要读readme啊！
		$this->params .= '&content=';
//		$content = iconv( "UTF-8", "gb2312//IGNORE", $content);
		$this->params .= $content;//urlencode($content); //函数外重复编码
		
		$this->glueHeader();
		$this->sendSocket();
		
		if ($this->debug) var_dump($this->header);
		$this->emptyHeader();
		
		return $this->getResult();
	}

	public function Query() {
		$this->setHeader('GetBalance');
		$this->setPassword();
		$this->glueHeader();
		$this->sendSocket();
		
		if ($this->debug) var_dump($this->header);
		$this->emptyHeader();
		
		return $this->getResult();
	}
	/***********
	 * private 接口
	 * 
	 * check_mobile($mobiles)
	 * 	$mobile		string		检查电话号码是否匹配，消除空格
	 * 	return 正确的电话号码
	 *
	 * setHeader($action)
	 * 	$action
	 * 		'mt'（发送短信）
	 * 		'GetBalance'（查询余额）
	 * 	return null
	 *
	 * setPassword($method = false)
	 * 	$method
	 * 		'md5'（发送短信）
	 * 		忽略（查询余额）
	 * 	return null
	 *
	 * glueHeader()
	 * 	写header的结尾
	 * 	return null
	 *
	 * emptyHeader()
	 * 	清除header，考虑到如果要反复发送，查询
	 * 	暂不考虑计算效率，而节约内存
	 * 	return null
	 *
	 * sendSocket()
	 * 	发送短信动作
	 * 	return null
	 *
	 * getResult()
	 * 	为public方法提供结果查询
	 * 	return true false 在web下
	 * 	return human-readable
	 *
	 * */
	private function check_mobile($mobiles) {
		$mobiles = @split(',', $mobiles); // split is deprecated as of 5.3.0
		$result = null;
		foreach ($mobiles as $mobile) {
			$mobile = trim($mobile);
			if (preg_match("/(1[3458]{1}[0-9]{9})/i", $mobile)) {
				if ($result === null) $result .= "{$mobile}";
				else $result .= ",{$mobile}";
			}
			else continue;
		}
		return $result;
	}
	private function setPassword($method = False) {
		switch($method){
		case 'sha1':
			$this->params .= '&pwd=';
			$this->params .= urlencode(strtoupper(sha1($this->username . $this->password)));
			break;
		case 'md5':
			$this->params .= '&pwd=';
			$this->params .= urlencode(strtoupper(md5($this->username . $this->password)));
			break;
		default:
			$this->params .= '&pwd=';
			$this->params .= urlencode($this->password);
		}
	}

	private function setHeader($action) {
		$this->header .= "POST /webservice.asmx/{$action} HTTP/1.1\r\n";
		$this->header .= "Host:sdk2.entinfo.cn\r\n";
		$this->header .= "Content-Type: application/x-www-form-urlencoded\r\n";
		
		$this->params .= 'sn=';
		$this->params .= urlencode($this->username);
//		$this->params .= '&pwd=';
//		$this->params .= urlencode($this->password);
		$this->params .= '&ext=';
		$this->params .= urlencode('');
		$this->params .= '&stime=';
		$this->params .= urlencode('');
		$this->params .= '&rrid=';
		$this->params .= urlencode('');

	}

	private function glueHeader() {
		$length = strlen($this->params);
		$this->header .= "Content-Length: " . $length."\r\n";
		$this->header .= "Connection: Close\r\n\r\n";
		$this->header .= $this->params . "\r\n";
	}

	private function emptyHeader() {
		$this->header = '';
		$this->params = '';
	}

	private function sendSocket() {
		$this->fp = fsockopen('sdk2.entinfo.cn', 8060, $errno, $errstr, 10) or exit("ERRNO: {$errno} == {$errstr}");
		fputs($this->fp, $this->header);
	}

	private function getResult() {
		$inheader = 1;
		if (!$this->fp) return false;
		while (!feof($this->fp)) {
			$line = fgets($this->fp, 1024);
			if ($inheader && $line == '\n' or $line == '\r\n')
				$inheader = 0;
			if ($inheader == 0) ;// echo $line;
		}
		$line = str_replace('<string xmlns="http://tempuri.org/">', "", $line);
		$line = str_replace('</string>', "", $line);
		$result = explode('-', $line);
		if ('cli' !== trim(php_sapi_name())) {
			if (count($result) > 1) return false;
			else return true;
		} else {
			if (count($result) > 1) echo '发送失败返回值为:' . $line . '。请查看webservice返回值对照表' . "\r\n";
			else echo '发送成功 返回值为:' . $line . "\r\n";
		}
	}
}

//13401158378 郝哲
//15120033502 世浩
//15600564330 效江
/*
$content = '既有中文，ye you ying wen.';

$SI = new Smsworks($debug = true);
$SI->SendSms('15120033502, 15600564330', $content);
$SI->Query();

echo "\r\n"
 */
?>
