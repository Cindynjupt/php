<?php
class Register extends CI_Controller{

	public function __construct() {
    parent :: __construct();
    $this->load->helper('form');
    $this->load->model('model');
    $this->load->library('session');
    date_default_timezone_set('PRC');

  }
  function  index(){

   //$this->load->view('register_step1');
  $this->load->view('register6');


 }
 function index2(){

//$this->load->view('register_step2');
$this->load->view('register7');


 }
 function index3(){
  $this->load->view('home');

  }

 function check_edumail(){

  $edumail = $this->input->get_post('edumail', true);
  $unique = $this->model->check_edumail_unique($edumail);
  $reply = array ();
  if ($unique){
    $reply['result'] = 'ok';
  }else{
    $reply['result'] = 'err';
  }
  echo json_encode($reply);

}

function check_nick(){

  $username= $this->input->get_post('username',true);
  $unique = $this->model->check_username_unique($username);
  $reply = array ();
  if ($unique){
    $reply['result'] = 'ok';

  }else{
    $reply['result'] = 'err';
  }
  echo json_encode($reply);


}
function check_telephone(){
 $telephone = $this->input->get_post('telephone',true);
 $unique = $this->model->check_phone_unique($telephone);
 $reply = array ();
 if ($unique){
  $reply['result'] = 'ok';
  //$userid=$this->model->get_userid($telephone);
  //$this->session->set_userdata('userid', $userid);
  //$reply['userid'] = $userid;
}else{
  $reply['result'] = 'err';
}
echo json_encode($reply);

}

public function phone_getVerifyCode(){
 $telephone=$this->input->get_post('telephone',true);
 $randnum=0;
 if (isset($_POST['verifycode']) || !empty($_POST['verifycode'])){
  $randnum = $this->input->get_post('verifycode', true);
}else{
  $randnum = rand(1000, 9999);
}
$reply=array();
$nowtime=time();
    //给手机发送验证码
$this->load->library('smsworks');
$content = '请输入以下验证码：' . $randnum . '【tataUFO】';
$gbcontent = iconv("utf-8", "gb2312", $content);
$tosend = urlencode($gbcontent);
$this->smsworks->SendSms($telephone, $tosend);
$reply['result'] = 'ok';
$reply['verifymobile'] = $telephone;
$reply['verifycode'] = $randnum;
$reply['verifyaddtime'] = time ();
echo json_encode($reply);

}  
function  commit_reg1(){
$telephone = $this->input->get_post('telephone',true);
$md5pwd = $this->input->get_post('md5pwd',true);
$university= $this->input->get_post('university',true);
$open=$this->model->check_univ_isopen($university);
$reply=array();
  if($open==0){
    $unique=$this->model->pre_telephone_unique($telephone);
    if($unique){
      $this->model->pre_get_userid($telephone,$university);
    }
     $reply['result']="err";
     $reply['info']="大学未开通";
     echo json_encode($reply);

   }
 if($open==1){
    
   $userid=$this->model->get_userid($telephone,$md5pwd,$university);
   $this->session->set_userdata('userid', $userid);
   $this->session->set_userdata('open',$open);
    $reply['result']="ok";
    $reply['info']="请完善信息";
    echo json_encode($reply);
 }

}

  function  commit_regist(){

   $realname = $this->input->get_post('realname',true);
   $username = $this->input->get_post('username',true);
   $gender = $this->input->get_post('sex',true);
   if($gender=='男'){
     $sex=1;
   }
   if($gender=='女'){
    $sex=0;

  }       
  //$university = $this->input->get_post('university',true);
       //$colleage = $this->input->get_post('colleage',true);
  //$edumail = $this->input->get_post('edumail',true);
  //$telephone = $this->input->get_post('telephone',true);
  $unique1 = $this->model->check_username_unique($username);
  //$unique2 = $this->model->check_edumail_unique($edumail);
  //$unique3 = $this->model->check_phone_unique($telephone);
  $birthday=$this->input->get_post('birthday',true);
  //$md5pwd=$this->input->get_post('md5pwd',true);
  $colleage=$this->input->get_post('colleage',true);
  $admyear=$this->input->get_post('admyear',true);
  $category=$this->input->get_post('category',true);
  $graduate=$this->input->get_post('graduate',true);
  $reply=array();

  if(!$unique1){
    $reply['result']="err";
    $reply['type']=1;
    $reply['info']="该用户名已注册";
    return ;

  }
  // if(!$unique2){
  //   $reply['result']="err";
  //   $reply['type']=2;
  //   $reply['info']="该邮箱已注册";
  //   return ;

  // }
  // if(!$unique1){
  //   $reply['result']="err";
  //   $reply['type']=1;
  //   $reply['info']="该手机号已注册";
  //   return ;

  // }
  
 
$userid  = $this->session->userdata('userid');
$open  = $this->session->userdata('open');
$this->model->reg_insert_info($userid,$realname,$username,$sex,$birthday,$graduate,$colleage,$admyear,$category);
 //$this->model->reg_insert_info($userid,$realname,$username,$sex,$birthday,$university,$graduate,$colleage,$admyear,$category);
      //$userid=$this->model->reg_insert_info($realname,$username,$sex,$birthday,$university,$edumail,$telephone,$md5pwd);
  $reply['result']="ok";
  $reply['info']="注册成功";
  echo json_encode($reply);

}


}



?>