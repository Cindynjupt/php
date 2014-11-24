<?php
class Model extends CI_Model {

        // 短信接口用户名密码
        private $SMS_USERNAME = "myqbt";
        private $SMS_PASSWORD = "198918";
        private $db = '';
        public function __construct(){
                $this->db = $this->load->database('default', true);
                $this->load->library('session');
                $this->load->helper('file');
                date_default_timezone_set('PRC');
        }
         
          // 插入注册平台
        function insert_loginlist($userid, $platform)
        {
                $data = array (
                        'userid' => $userid,
                        'platform' => $platform,
                        'addtime' => time ()
                        );
                //$this->db->insert('loginlist', $data);
        }
       //检查手机号是否已经注册
        function check_phone_unique($telephone){
                $this->db->select ('userid');
                $this->db->from('userreglist');
                $this->db->where('telephone', $telephone);
                $query = $this->db->get();
                $row_count = $query->num_rows();
                $flag = true;
                if ($row_count > 0) {
                        $flag = false;
                }
                return $flag;
         }

      /**保存用户头像图片
       slot取-1时，代表上传的是学生证照片，为0时，代表上传的是头像照片

      */
	 function save_head_image($userid,$filepath){
	 	$data=array(
	 		  'userid' =>$userid,
	 		  'photourl' => $filepath ,
	 		  'slot'=>0

	 		 );
        $this->db->insert('userphotolist',$data);
     

	 }
	 /**保存用户学生证照片*/
	function save_student_image($userid,$filepath){

         $data=array(
	 		  'userid' =>$userid,
	 		  'photourl' => $filepath ,
	 		  'slot'=>-1

	 		 );
        $this->db->insert('userphotolist',$data);

	}

   /**判断邮箱是否已经注册*/
      function  check_edumail_unique($edumail){
         $this->db->select ('userid');
         $this->db->from('userreglist');
         $this->db->where('edumail', $edumail);
         $query = $this->db->get();
         $row_count = $query->num_rows();
         $flag = true;
         if ($row_count > 0) {
            $flag = false;
        }
         return $flag;

      }
      function  check_univ_isopen($university){
         $this->db->select ('open');
         $this->db->from('universitylist');
         $this->db->where('university', $university);
          $this->db->where('open',1);
         $query = $this->db->get();
         $row_count = $query->num_rows();
         return $row_count;


      }
    // 通过第一步插入手机号，获取userid
    //       function  get_userid($telephone) {
    //             $data = array (
    //                     'telephone' => $telephone
    //                     );
    //                 // 插入初始用户基本信息
    //             $this->db->insert('userreglist', $data);
    //             $userid = $this->db->insert_id();
    //             return  $userid;
    //      }
      //通过第一步插入手机号和密码，获取userid
          function  get_userid($telephone,$md5pwd,$university) {
                $data = array (
                        'telephone' => $telephone,
                        'md5pwd' => $md5pwd,
                         'university' =>$university
                        );
                    // 插入初始用户基本信息
                $this->db->insert('userreglist', $data);
                $userid = $this->db->insert_id();
                return  $userid;
         }
         function pre_get_userid($telephone,$university){
          $data=array (
            'telephone' => $telephone,
             'university' => $university
            );
           $this->db->insert('prereglist', $data);
           $userid = $this->db->insert_id();
           return  $userid;

         }
       /**判断用户名是否已经注册*/
       function check_username_unique($username){
               $this->db->select ('userid');
                $this->db->from('userreglist');
                $this->db->where('username', $username);
                $query = $this->db->get();
                $row_count = $query->num_rows();
                $flag = true;
                if ($row_count > 0) {
                    $flag = false;
                }
                return $flag;

       }
      /**插入用户的提交信息*/
      function reg_insert_info($userid,$realname,$username,$sex,$birthday,$graduate,$colleage,$admyear,$category){
               $data = array (
                        'realname' => $realname,
                        'username' => $username,
                        'sex' => $sex,
                        'birthday' => $birthday,
                        'graduate' => $graduate,
                        'college' => $colleage,
                        'category' => $category,
                        'admyear' => $admyear
                        );
                // $this->db->insert('userreglist', $data);
                // $userid = $this->db->insert_id();
                // return  $userid;
              $this->db->where('userid', $userid);
              $this->db->update('userreglist', $data);

      }
      function pre_reg_info($userid,$sex,$graduate,$colleage,$admyear,$category){

         $data = array (
                        'sex' => $sex,
                        'graduate' => $graduate,
                        'college' => $colleage,
                        'category' => $category,
                        'admyear' => $admyear
                        );

              $this->db->where('userid', $userid);
              $this->db->update('prereglist', $data);

      }
      /**检查用户在登录框中输入的信息是否与提交到数据库中的注册信息一致*/
       function login_phone_match($telephone){
                $this->db->select ('userid');
                $this->db->from('userreglist');
                $this->db->where('telephone', $telephone);
                $query = $this->db->get();
                $userid = $query->result_array();
                $row_count = $query->num_rows();
                if ($row_count > 0) {
                   return $userid;
                }
                return -1;

     
       }
    function  login_md5pwd_match($md5pwd){

                $this->db->select ('userid');
                $this->db->from('userreglist');
                $this->db->where('md5pwd', $md5pwd);
                $query = $this->db->get();
                $userid = $query->result_array();
                $row_count = $query->num_rows();
                if ($row_count > 0) {
                  return $userid;
                }

               return -1;

    }
       
      /**注册插入edu邮箱*/
    function reg_insert_edumail($userid, $edumail){
         	$data = array (
         		'edumail' => $edumail,
         		);
         	$this->db->where('userid', $userid);
         	$this->db->update('userreglist', $data);
         	return true;
       }
    function pre_telephone_unique($telephone){
            $this->db->select ('userid');
            $this->db->from('prereglist');
            $this->db->where('telephone', $telephone);
            $query = $this->db->get();
            $row_count = $query->num_rows();
             $flag = true;
           if ($row_count > 0) {
            $flag = false;
         }
         return $flag;


    }

}
       
?>
