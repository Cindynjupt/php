<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Mobile  extends CI_Controller {
  public function __construct() {
       parent::__construct ();
	    $this->load->model('model');

        date_default_timezone_set('PRC');
  }
     /**
         * 获取验证码
         */

 public function phone_getVerifyCode()
        {
    $mobile = $this->input->get_post('mobile', true);
    $randnum = 0;
    if (isset($_POST['verifycode']) || !empty($_POST['verifycode'])){
      $randnum = $this->input->get_post('verifycode', true);
    }else{
      $randnum = rand(1000, 9999);
    }
    $reply = array ();
    $nowtime = time ();
   // 手机发送验证码
    $this->load->library('smsworks');
    $content = '请输入以下验证码：' . $randnum . '【tataUFO】';
    $gbcontent = iconv("utf-8", "gb2312", $content);
    $tosend = urlencode($gbcontent);
    $this->smsworks->SendSms($mobile, $tosend);
    $reply['result'] = 'ok';
    $reply['verifymobile'] = $mobile;
    $reply['verifycode'] = $randnum;
    $reply['verifyaddtime'] = time ();
    echo json_encode($reply);
  
  }
   function check_mobile(){
         $telephone = $this->input->get_post('mobile',true);
         $unique = $this->model->check_phone_unique($telephone);
	 $reply = array ();
	 if ($unique){
	    $reply['result'] = 'ok';
	}else{
	    $reply['result'] = 'err';
	}
	    echo json_encode($reply);

  } 
/**   function check_edu(){ $edu=$this->input->get_post('edu',true);
     $reply = array ();
            $reply['result']="ok";
*/
   function commit_reg1(){
    $telephone = $this->input->get_post('mobile', true);
    $md5pwd = $this->input->get_post('password', true);
    $unique = $this->model->check_phone_unique($telephone);
    $reply = array();
    if (!$unique){
      $reply['result'] = 'err';
      $reply['errtype'] = -1;
      $reply['errinfo'] = '手机号已注册';
      echo json_encode($reply);
      return;
    }
    if (! $md5pwd || strlen($md5pwd) != 32){
      $reply['result'] = 'err';
      $reply['errtype'] = -1;
      $reply['errinfo'] = '密码格式不正确';
      echo json_encode($reply);
      return;
    }
    $platform = 'web';
    $userid = $this->model->reg_step_login_param($md5pwd,  $telephone);
    $this->model->insert_loginlist($userid, $platform);
    $reply['result'] = "ok";
    $reply['userid'] = $userid;
    echo json_encode($reply);

  }
function reg1(){
       $this->load->view("register/mobile_step1");
}
/**function reg2(){

	 $this->load->view("register/edu_step2");

}*/
}





