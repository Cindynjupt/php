<?php

/*if (!defined('BASEPATH'))
 exit ('No direct script access allowed');*/
include_once dirname(__FILE__) . '/renren/config.inc.php';
require_once dirname(__FILE__) . '/renren/RenrenOAuthApiService.class.php';
require_once dirname(__FILE__) . '/renren/RenrenRestApiService.class.php';

class Renren {

	var $oauthApi;
	var $restApi;
	var $token_url = 'http://graph.renren.com/oauth/token';
	var $access_token;
	var $expires_in;
	var $refresh_token;
	var $userid;
	private $config;

	public function __construct() {
		global $config;
		$config = new configure;
		$this->config = $config;
	}

	public function get_token($code) {
		$post_params = array (
			'client_id' => $this->config->APPID,
			'client_secret' => $this->config->SecretKey,
			'redirect_uri' => 'http://127.0.0.1/tataufo/tataUFO/index.php/register/renren',
			'grant_type' => 'authorization_code',
			'code' => $code
		);
		$oauthApi = new RenrenOAuthApiService;
		$access_info = $oauthApi->rr_post_curl($this->token_url, $post_params); //使用code换取token
		//$access_info=$this->oauthApi->rr_post_fopen($this->token_url,$post_params);//如果你的环境无法支持curl函数，可以用基于fopen函数的该函数发送请求
		$this->access_token = $access_info["access_token"];
		$this->expires_in = $access_info["expires_in"];
		$this->refresh_token = $access_info["refresh_token"];
		 ;
		return $access_info;

	}

	public function get_userid($access_token) {
		$restApi = new RenrenRestApiService;
		$params = array (
			'fields' => 'uid',
			'access_token' => $access_token
		);
		$res = $restApi->rr_post_curl('users.getInfo', $params); //curl函数发送请求
		//$res = $restApi->rr_post_fopen('users.getInfo', $params); //如果你的环境无法支持curl函数，可以用基于fopen函数的该函数发送请求
		//echo json_encode($res);
		$this->userid = $res[0]["uid"];
		$_SESSION["userid"] = $this->userid;
		return $res;
	}

	public function get_photos($uid,$token) {

		$restApi = new RenrenRestApiService;
		$params = array (
			'access_token' => $token,
			'uid' => $uid
		);
		$res = $restApi->rr_post_fopen("photos.getAlbums", $params);
		//echo json_encode($res);
		$userPhotos = array ();
		foreach ($res as $val) {
			$params = array (
				'access_token' => $token,
				'uid' => $uid,
				'aid' => $val['aid'],
				'count' => 20
			);
			$photos = $restApi->rr_post_fopen("photos.get", $params);
			//echo json_encode($photos);
			$photos['name'] = $val['name'];
			$photos['size'] =$val['size'];
			$userPhotos[] = $photos;
		}
		//echo json_encode($userPhotos);
		return $userPhotos;
	}

}
// END Renren Class

/* End of file Renren.php */
/* Location: ./application/libraries/Renren.php */