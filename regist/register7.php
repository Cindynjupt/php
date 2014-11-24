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
  <script type="text/javascript" src="/js/jquery.fileupload.js"></script>
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
                    .attr('style','display:inline')
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

   function upload(){
 $("#fileupload_input").fileupload({
    url:"http://my.tataufo.com/market/upload_image",//文件上传地址，当然也可以直接写在input的data-url属性内
    formData:{'userid':"3"},//如果需要额外添加参数可以在这里添加
    done:function(e,result){
        //done方法就是上传完毕的回调函数，其他回调函数可以自行查看api
        //注意result要和jquery的ajax的data参数区分，这个对象包含了整个请求信息
        //返回的数据在result.result中，假设我们服务器返回了一个json对象
        console.log(JSON.stringify(result.result));
        var data = result.result;
        var  success = data['success'];
        var msg = data['msg'];
        if(success){
          var url = data['url'];
          var pk = data['pk'];
          var img = $('#pic');
          // { "background-color": 'brown'}
          img.css({"display":'block'});
          var url = 'http://img.tataufo.com' + url;
          img.attr("src",url);
          alert('上传成功');
          imageID = pk;
        }else{
          imageID = 0;
          alert(msg);
        }
    }
}); 

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
        
        <div class="formsection1">
            <form action="http://my.tataufo.com/market/upload_image" method="post" enctype="multipart/form-data">
              <div class="upload_img">
              <!--  <input type="file" name="userfile"  class="upload" size="28" onchange="readURL(this)"/>
               <input type="submit" class="btn" value="上传头像"/>
               <img class="photo" id="blah" src="#" style="display:none"/> -->
                <input type="file" name="userfile"  class="upload" size="28" id="fileupload_input" onchange="upload()"/>
               <input type="submit" class="btn" value="上传头像"/>
                 <img class="photo" id="pic" src="#" style="display:none"/>
              </div>
            </form>
               
        </div>
        <div class="formsection2">
              <div class="line">
                <div class="user_la"><lable for="user_name">真实姓名</lable></div>
                <div class="user_in"><input type="text" id="realname" name="realname" size="30" maxlength="30" />&nbsp;&nbsp;&nbsp;
                  <span id="realnameInfo"></span>
                </div>
              </div>
              <div class="line">
                <div class="nick_la"><lable for="nick_name">昵称</lable></div>
                <div class="nick_in"><input type="text" id="username" name="username" size="30" maxlength="30" onblur="checknick()"/>&nbsp;&nbsp;&nbsp;
                  <span id="nickInfo"></span></div>
              </div>
              <div class="line">
                  <div class="gender_la"><lable for="check_gender">性别</lable></div>
                  <div class="gender_in">
                       <div class="buttongroup">
                          <input type="radio" id="check_male" name="check_gender" value="男"/>
                          <lable for="check_male">男</lable>
                          <input type="radio" id="check_female" name="check_gender" value="女" />
                          <lable for="check_female">女</lable>
                          <span id="sexInfo" class="genderInfo"></span>
                      </div>
                 </div>

              </div>
              <div class="line">
                  <div class="date_la"><lable for="date">日期</lable></div>
                  <div class="date_in">
                       <div class="sel_group">
                         <div class="select_style_date year"><select class="sel_year"id="sel_year" name="date"></select></div>
                         <span>年</span>
                         <div class="select_style_date"><select id="sel_month" name="month"></select></div><span>月</span>
                         <div class="select_style_date"><select id="sel_day" name="day"></select></div><span>日</span>

                       </div>
                       
                  </div>
                  <span id="dateInfo" class="dateInfo"></span> 
              </div>
        </div>

   <div class="formsection3">
        <div class="line">
          
          <div class="profess_la"><lable for="major">专业</lable></div>
          <div class="profess_in">
            <input type="text" class="" id="colleage" name="colleage"/>
          </div>
          <div id="colleageInfo" class="colleageInfo"></div>
          <div class="maj_la"><lable for="major">学科</lable></div>
                  <div class="maj_in">
                      <div class="select_style_date major">
                            <select class="sel_maj" id="category" name="category">
                                <optgroup label="">
                                    <option value="0">--</option>
                                      <option value="文科">文科</option>
                                      <option value="理科">理科</option>
                                      <option value="工科">工科</option>
                                </optgroup>

                                
                            </select>
                      </div>
                      <div id="categoryInfo"></div>
                  </div>
        </div> 

        <div class="line">
                  <div class="enroll"><lable for="date">入学时间</lable></div>
                  <div class="date_in">
                       <div class="sel_group">
                         <div class="select_style_date year">
                             <select class="sel_year" id="admyear" name="date">
                              <optgroup label="">
                              <option value="0">--</option>
                              <option value="2014">2014</option>
                              <option value="2013">2013</option>
                              <option value="2012">2012</option>
                              <option value="2011">2011</option>
                              <option value="2010">2010</option>
                              <option value="2009">2009</option>
                              <option value="2008">2008</option>
                              <option value="2007">2007</option>
                            </optgroup>
                         </select>
                        </div>
                         <span>年</span>
                       </div>
                       <div id="admyearInfo" class="admyearInfo"></div>
                  </div> 
                  <div class="diploma_la"><lable for="school">学历</lable></div>
                  <div class="diploma_in">
                    <div class="select_style_date major">
                        <select class="sel_sch"id="graduate" name="graduate" >
                            <optgroup label="">
                              <option value="0">--</option>
                              <option value="本科">本科</option>
                              <option value="硕士">硕士</option>
                              <option value="博士">博士</option>
                            </optgroup>
                        </select>
                    </div>
                    <div id="graduateInfo"></div>
                  </div>
                  
        </div>
        
   </div>
        <div class="formsection4" style="border:0px;">  
                    <form action="/upload/up" method="post" enctype="multipart/form-data">
                      <div class="id_up">
                         <input class="stu_id" type="file" id="stu_id" name="stu_id"/>
                         <input class="id_btn" type="submit" value="上传学生证照片"/>
                       </div>
                    </form>
        </div>
          
    

        
  </div>
        <div class="next">
         <button type="button" onclick="checkall()">提&nbsp;&nbsp;&nbsp;&nbsp;交</button>
         <span id="resultInfo"></span>
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
