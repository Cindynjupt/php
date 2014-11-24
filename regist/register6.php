<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0
  Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Marketing Yourself - tataUFO</title>
  <meta charset="UTF-8">

  <meta name="viewport" content="width=device-width">


  <link href="/css/style.css" rel="stylesheet" type="text/css">
  <script type="text/javascript" src="/js/lib/jquery.min.js"></script>
  <script type="text/javascript" src="/js/jquery.smint.js"></script>
  <script type="text/javascript" src="/js/jquery.js"></script>
  <script type="text/javascript" src="/js/lib/jquery.md5.min.js"></script>
  <script type="text/javascript" src="/js/birthday.js"></script>
  <link rel="stylesheet" type="text/css" href="/css/select2.css">
  <script type="text/javascript" src="/js/lib/select2.js"></script>
  <script type="text/javascript" src="/js/logic/register.js"></script>
  <script type="text/javascript" src="/js/register1.js"></script>
  <script type="text/javascript">
  $(function(){
    //加载日期选择框
    $.ms_DatePicker({
     YearSelector: "#sel_year",
     MonthSelector: "#sel_month",
     DaySelector: "#sel_day"
   });
    $.ms_DatePicker();
   //加载学校选择框
   $("#province").select2();
   $.getJSON("../../resources/json/university.json", function(data){
    var $province = $("#province");
    var provinces = '';
    $.each(data, function(i, Oprovince){
      provinces += '<option value="'+Oprovince.province+'" data="'+i+'">'+Oprovince.province+'</option>';
    });
    $province.html(provinces);
    $("#univ").select2();
    $province.change(function(){
      var i = parseInt($("option:selected", $(this)).attr("data"));
      var univs = '';
      $.each(data[i].university, function(j, univ){
        univs += '<option value="'+univ.name+'">'+univ.name+'</option>';
      });
      $("#univ").html(univs);
    });

    $('#univ').change(function(){
    });    
  });
 });
 function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah')
                    .attr('display','inline')
                    .attr('src', e.target.result);
                    //.width(200)
                    // .height(200);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    function readURL2(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah2')
                    .attr('display','inline')
                    .attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    function check(){

      var r=$('#entertime').val();
      alert(r);

    }
  </script>
</head>
<body>
 
  <div class="header">
    <div class="header_inner">
      <div class="inner_img">
        <img src="/img/register/word_tata.png" alt="" />
      </div>
      <div class="log_in">
        已经是我们的用户？请<a href="http://gt.tataufo.com/login/index">登陆</a>

      </div>
    </div>
  </div>
  <div class="content">
    <form action="" method="">
      <div class="content_inner">
        <div class="formsection0">
                <div class="line line_add">
                       <div class="mobile_la"><lable for="mobile_phone">手机号码</lable></div>
                       <div class="mobile_in">
                          <input type="text" id="telephone" name="telephone" size="20" maxlength="30" onblur="checkmobile()"/>
                       </div> 
                       <span id="mobileInfo" class="prompt"></span>
                       <input class="send_num" type="button" value="发送验证码" id="btnCode" name="send_num" onclick="getVerifyCode()"/>
                </div>
                 <div class="line">
                   <div class="checkcode">  
                       <lable for="chkcode">验证码</lable>
                       <input type="text" id="verifyCode" name="chkcode" size="6" maxlength="6" onblur = 'verify()'/>
                       
                   </div>
                   <span id="codeInfo" class="prompt"></span>
                 </div>
          
                 <div class="line">
                   <div class="pass_la"><lable for="password">密码</lable></div>
                   <div class="pass_in"><input type="password" id="password1" name="password" placeholder="密码不少于6位" size="20" maxlength="30" onblur="checkpwd()"/>
                    
                   </div>
                   <span id="pwdInfo" class="prompt"></span>
                 </div>
                 <div class="line">
                    <div class="confirm">
                      <lable for="password">确认</lable>
                      <input type="password" id="password2" name="password" placeholder="再次确认密码" size="20" maxlength="30" onblur="confirmpwd()"/>
                     
                    </div>
                    <span id="pwdInfo2" class="prompt"></span>
                </div>

            <div class="line">
                <div class="prov_la"><lable for="school">省份</lable></div>
          <div class="prov_in">
            <div class="select_style_date major">
                <select class="sel_sch"id="province" name="province" >
                    <optgroup label="北京">
                      <option value="0"></option>
                      <option value="北京">北京</option>
                    </optgroup>
                </select>
            </div>
          </div>
          <div class="sch_la"><lable for="major">学校</lable></div>
          <div class="sch_in">
              <div class="select_style_date major">
                    <select class="sel_maj" id="univ" name="univ">
                    <optgroup label="北京"></optgroup>
                    </select>
              </div>
             <span id="univInfo"></span>
          </div>
         </div>
      
      </div>
  
  

      
        </div>
        <div class="next">
         <button type="button" onclick="commitReg1()">提&nbsp;&nbsp;&nbsp;&nbsp;交</button><span id="resultInfo"></span>
        </div>

        </form>
   </div>
  <div class="footer">
    <div class="footer_inner">


      <p>&copy;北京嗒嗒之星科技网络有限公司</p>
    </div>
  </div> 

</body>
</html>
