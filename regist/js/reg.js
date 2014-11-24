/**
*
*
*
校验用户名的格式&&是否注册
*
*
*/
function checknick(){
     var username=$('#username').val();
     if(username==''){
     	$('#nickInfo').html('请输入昵称');

     }else{

          check_nick_valid(username);
          check_nick_unique(username)
     }

  }
 function check_nick_valid(username){  
 
     var reg=/^[\u4E00-\u9FA5A-Za-z0-9_]+$/;//只有字母、数字和下划线且不能以下划线开头和结尾
     if(reg.test(username)){
           $('#nickInfo').html('');         
     }else{

           $('#nickInfo').html('用户名只能包含字母、数字和汉字');

     }
  
 }
 function check_nick_unique(username){
     
         $.ajax({
           url: "../check_nick",
           type: "post",
           data: {'username':username},
           cache: 'false',
           dataType: "json",
           async: 'true',
           success: function(data) {
                console.info(data); 
                var  result = data['result'];
                if (result  == 'ok'){
                    $('#nickInfo').html('');
                }else{
                   $('#nickInfo').html('该用户名已注册，请重新输入');
                }
           },
           error:function(data) {
               console.log(data);
           },
        });
 }

/**
*检验邮箱格式&&是否注册
*
*
*/
function checkedu(){
    var email=$('#edumail').val();
    if(check_email_valid(email)&&check_mail_edu(email)){
        //  $('#edumailInfo').html('');
         check_email_reg(email);
}else{
        $('#edumailInfo').html('输入有误，请重新输入');

}

}
/**检查邮箱是否注册*/
function check_email_reg(edumail){
   $.ajax({

       url:'../check_edumail',
       type: 'post',
       data:{'edumail':edumail},
       cache: 'false',
       dataType:'json',
       async: 'true',
      success: function(data) {
                console.info(data);
                var  result = data['result'];
                if (result  == 'ok'){
                  $('#edumail').html('');
                }else{
                  $('#edumail').html('该邮箱已经注册');
                }
           },
           error:function(data) {
               console.info(data);
           },
   });

   
}

/**校验邮箱是否以edu.com或者edu.cn结尾*/
  function check_mail_edu(email){
   
     var reg1="edu.com";
     var reg2="edu.cn" ;
     var len1=reg1.length;
     var len2=reg2.length;
      if(email==''){
        return false;
       // alert('空邮箱');

      }else{
      var len3=email.length;
       if(len3<len1||len3<len2){
         return false;
         //alert('太短');
       }else if(email.substring(len3-len1)==reg1||email.substring(len3-len2)==reg2){
           return true;
           //alert('正确');

       }
      return false;
      // alert('不是正确的结尾');
        

    }
    

  }
  
/**校验邮箱格式*/
  function check_email_valid(email)
  {
        var reg =  /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
              if(reg.test(email)){
                   return true;

           }else{
                  return false;
              }
  }

  /**
 校验手机格式&&是否注册&&发送验证码
  */
 var InterValObj; //timer变量，控制时间
      var count = 60; //间隔函数，1秒执行
      var curCount;//当前剩余秒数
      var verifyCode = 0; //验证码
  function checkmobile(){
        var  telephone = $('#telephone').val();
  if(telephone==''){
         $('#mobileInfo').html('请填写手机号');
        }else{
            if(check_telephone_valid(telephone)){
              
                  $('#mobileInfo').html('');
      }else{
                  $('#mobileInfo').html('手机格式不对，请重新填写');
            }

        }
  }

  function getVerifyCode(){

     var  telephone = $('#telephone').val();
     curCount = count;
     //设置button效果，开始计时
      $("#btnCode").attr("disabled", "true");
      $("#btnCode").val("请在" + curCount + "秒内输入验证码");
      InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
      $.ajax({
       url:'../phone_getVerifyCode',
       type: 'post',
       data:{'telephone':telephone},
       cache: 'false',
       dataType:'json',
       async: 'true',
      success: function(data) {
                console.info(data);
                var  result = data['result'];
                if (result  == 'ok'){
                   verifyCode = data['verifycode'];
                   alert(verifyCode);
                }else{
                   alert('get  verify  code  error');
                }
           },
           error:function(data) {
               console.info(data);
           },

    });

   
  }
   /**提交手机号和密码*/
 function commitReg1(){
   var telephone = $('#telephone').val();
   var pwd=$('#md5pwd').val();
   var md5pwd=$.md5(pwd);
    $.ajax({
           url: "../commit_reg1",
           type: "post",
           data: {'telephone':telephone,'md5pwd':md5pwd},
           cache: 'false',
           dataType: "json",
           async: 'true',
           success: function(data) {
                console.info(data);
                var  result = data['result'];
                if (result  == 'ok'){
                     $('#note1').html('进入下一步');
                        //window.location.href = "./reg2";
                }else{
                    var errinfo=data['errinfo'];
                    $('#note1').html(errinfo);
                }
           },
         
           error:function(data) {
               console.info(data);
           },

        });
 }
 
/**
 检查密码强度
 */
function checkpwd(){

  var pwd=$('#md5pwd').val();
  if(pwd.length<6){
   $('#pwdInfo').html('请输入6位以上的密码');
  }else{

   $('#pwdInfo').html('');


  }


}



/**
 timer处理函数
 */
 function SetRemainTime(){
    
    if (curCount == 0) {
        window.clearInterval(InterValObj);//停止计时器
        $("#btnCode").removeAttr("disabled");//启用按钮
        $("#btnCode").val("重新发送验证码");
        verifyCode=0;//清除验证码。如果不清除，过时间后，输入收到的验证码依然有效

    } else{

        curCount--;
        $("#btnCode").val("请在" + curCount + "秒内输入验证码");
    }

 }

 /**
检查手机号的有效性
 */

   function check_telephone_valid(telephone)
        {
                var  reg=/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;
                if (reg.test(telephone))
                {
                        return true;
                }
                return false;
        }

/**
判断验证码的输入是否有误
*/
function verify(){
        var code=$('#verifyCode').val();
        if(code!=verifyCode){
     $('#codeInfo').html('验证码不正确');
        }else{
    $('#codeInfo').html('');
        }

}  
/**判断两次输入的密码是否一致*/
function confirmpwd(){
  var md5pwd1=$('#md5pwd1').val();
  var md5pwd2=$('#md5pwd2').val();
  if(md5pwd1==md5pwd2){
    return true;

  }else{

    return false;

  }
}
/**提交表单*/
function commit(){
   var realname=$('#realname').val();
   var username=$('#username').val();
   //var sex;
   //var birthday
    //var university=
  //var colleage
   var edumail=$('#edumail').val();
   var telephone=('#telephone').val();
   var pwd=$('#md5pwd2').val();
   var md5pwd=$.md5(pwd);
   $.ajax({
           url: "../commit_reg",
           type: "post",
           data: {'realname':realname,'username':username,'sex':sex,'birthday':birthday,'university':university,'colleage':colleage,'edumail':edumail,'telephone':telephone,'md5pwd':md5pwd},
           cache: 'false',
           dataType: "json",
           async: 'true',
           success: function(data) {
                console.info(data);
                var  result = data['result'];
                if (result  == 'ok'){
                     $('#note1').html('注册成功');
                        //window.location.href = "./reg2";
                }else{
                    var errinfo=data['errinfo'];
                    $('#note1').html(errinfo);
                }
           },
         
           error:function(data) {
               console.info(data);
           },

        });




}

