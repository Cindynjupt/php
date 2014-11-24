/*
 * Logic js for Dashboard pages.
 *
 * By Tim.Liu 2012.8 TaTaUFO.com
 */
var dashboardRouter = null;
var rating;
var payflag=false;
$(function(){
	// actions for popWindowss
	$("#popCont").on("click", ".popClose", function(e){
		$('#testchat').remove();
		hideWindow();
	});
	// actions for page setup
	$("#backtotop").click(function(){
		$('body,html').animate({scrollTop: 0}, 400);
	});
	$("#earth").click(function(){
		popWindow({page: "invitefriends"});
	});

	// actions for store
	$("#contentPanel").on("click", "#get_candy", function(){
		popWindow({page: "candy"});
	});
	$("#contentPanel").on("click", ".buy_ticket", function(){
		popWindow({page: "buyticket", buyid: $(this).attr("buyid")});
	});

	$("#contentPanel").on("click", ".buy_candy", function(){
			popWindow({page: "candypay"});
	});
        $("#contentPanel").on("click", "#edit_matchcity", function(){
	   popWindow({page: "matchcity"});
	});

	// The routing logic setup.
    var currentPage = null;

    // for history and client-side routing.
    var DashboardRouter = Backbone.Router.extend({
        routes: {
            "page/:name": "page",
            "": "defaultoverview"
        },
        page: function(name){
            $.ajax({
                url: 'page/'+name,
                statusCode: {
                    500: function(){
                    }
                },
                data: {
                    _dc: (new Date).getTime() // crack the timestamp
                }
            }).done(function(content){
              $('#contentPanel').html(content);
                if(currentPage !== null)
                    $('.navigationleft .naviitem[page="'+currentPage+'"]').removeClass('active');
                currentPage = name;
                $('.navigationleft .naviitem[page="'+currentPage+'"]').addClass('active');
            });
        },

        defaultoverview: function(){
            this.page('overview');
        }

    });

    dashboardRouter = new DashboardRouter;
    Backbone.history.start();

    // add navigator click actions: [this is separated from routing]
    $('.navigationleft').on('click', '.naviitem', function(){

        if($(this).hasClass('disabled')){
            return;
        }
        if($(this).attr('page') == 'history'){
        	dashboardRouter.page('history');
        }
        if($(this).attr('page')=='lax'){
		window.open('http://tataufo.com/blog', {
				trigger:true
	        });
         }else if($(this).attr('page')=='vanillalogo'){
		window.open('http://town.tataufo.com', {
                    trigger:true
	        });
         }else{
	        dashboardRouter.navigate('page/'+$(this).attr('page'), {
	            trigger:true
	        });
        }

    });
   
  // home btn
    $('#contentPanel').on('click', '.home', function(){
    	dashboardRouter.navigate('page/overview', {
            trigger:true
        });
    });
	// lasc btn
    $('#contentPanel').on('click', '.lasc', function(){
    	window.open('http://tataufo.com/blog', {
			trigger:true
        });
    });

    // hold
    $('#contentPanel').on('click', '#holdmatch', function(){
        $.ajax({
            url: 'hold',
            data:{
            	lock:1
            },
            type: 'POST'
        }).done(function(result){
        	if(result === 'true'){
        		dashboardRouter.page('hold');
            }
        });

    });

  	// recover
    $('#contentPanel').on('click', '#recovermatch', function(){
        $.ajax({
            url: 'hold',
            data:{
            	lock:0
            },
            type: 'POST'
        }).done(function(result){
        	if(result === 'true'){
        		dashboardRouter.page('hold');
            }
        });

    });

    // buy
    $('#popWindow').on('click', '#buygoods', function(){
        $.ajax({
            url: 'buy',
            data:{
            	goodid:$(this).attr("goodid")
            },
            type: 'POST'
        }).done(function(result){
        	hideWindow();
        	if(result === 'true'){
        		alert('购买成功');
        		dashboardRouter.page('treasure');
            }else if(result === 'candy'){
            	alert('星星糖数量不够');
            }else if(result === 'enough'){
            	alert('该商品还有，请用完再买');
            }else{
            	alert('购买失败');
            }
        });

    });
$('#popWindow').on('click', '.buy_candy', function(){
        $.ajax({
            url: 'buy',
            data:{
            	goodid:$(this).attr("goodid")
            },
            type: 'POST'
        }).done(function(result){
        	hideWindow();
        	if(result === 'true'){
        		alert('购买成功');
        		dashboardRouter.page('treasure');
            }else if(result === 'candy'){
            	alert('星星糖数量不够');
            }else if(result === 'enough'){
            	alert('该商品还有，请用完再买');
            }else{
            	alert('购买失败');
            }
        });

    });

    // gotoshop
    $('#popWindow').on('click', '.gotoshop', function(){
    	hideWindow();
    	dashboardRouter.navigate('page/treasure', {
            trigger:true
        });
    });

   $('.privacy_deny_close').live('click',function(){
         $.ajax({
                url: 'page/message',
                data: {
                    _dc: (new Date).getTime() // crack the timestamp
                }
            }).done(function(content){
                $('#contentPanel').html(content);
            });
     });


     $('#contentPanel').on('click', '.message', function(){
   	dashboardRouter.navigate('page/message', {
            trigger:true
          });
    });

    // sendok
    $('#popWindow').on('click', '.sendok', function(){
    var content=$('.sendokcontent').val();
	   if(content.length>=5){
	    	$.ajax({
	            url: 'sendok',
	            data:{
	            	goodid:$(this).attr("goodid"),
	            	content:$(".sendokcontent").val()
	            },
	            type: 'POST'
	        }).done(function(result){
	        	hideWindow();
	        	if($.trim(result) == 'true'){
	        		alert('发送成功');
	        		dashboardRouter.page('today');
	            }else{
	            	alert(result);
	            }
	        });
	      }else{
	          alert('您输入的内容长度不能小于5！！！');
	      }

    });

    // match slots click listener
    $('#contentPanel').on('click', '.mymatch', function(){
        $.ajax({
            url: 'viewmatchprofile',
            type: 'POST',
            data: {
                slot: $(this).attr('slot')
            }
        }).done(function(content){
            dashboardRouter.navigate('page/today', {
                trigger:true
            });
         	   dashboardRouter.page('today');
            });
    });

    // history match slots click listener
    $('#contentPanel').on('click', '.historymatch', function(){
        $.ajax({
            url: 'viewhistoryprofile',
            type: 'POST',
            data: {
                slot: $(this).attr('slot')
            }
        }).done(function(content){
        	$.ajax({
                url: 'page/historydetail',
                statusCode: {
                    500: function(){
                    }
                },
                data: {
                    _dc: (new Date).getTime() // crack the timestamp
                }

            }).done(function(content){
                $('#contentPanel').html(content);
            });
            });
    });

    $('#contentPanel').on('click', '.chatfriendavate', function(){
       $.ajax({
          url:'viewfriendetail',
          data: {
               fid: $(this).attr('fid')
           }
       }).done(function(content){
           dashboardRouter.navigate('page/friendetail', {
              trigger:true
          });
       });
   });

    // pass
    $('#contentPanel').on('click', '.pass', function(){
        $.ajax({
            url: 'checkrating',
            type: 'POST'
        }).done(function(result){
        	if(result === 'true'){
        		dashboardRouter.navigate('page/overview', {
                    trigger:true
                });
            }else{
            	alert('需要评分之后才能pass哦~~');
            }
        });

    });

    // agree
    $('#contentPanel').on('click', '.agree', function(){
         $("#progressModal").css("display","block");
      $.ajax({
            url: 'replyok',
            type: 'POST'
        }).done(function(result){
            $("#progressModal").css("display","none");
        	if(result == 'true'){
        		alert('连线成功');
        		dashboardRouter.page('today');
            }else{
            	alert(result);
            }
            hideShadow();
        });
    });

    // like
    $('#contentPanel').on('click', '.like', function(){
    	popWindow({page: "send"});

    });

    // reclaim
    $('#contentPanel').on('click', '.reclaim', function(){
    	popWindow({page: "reclaim"});
    });
    // surereclaim
    $('#popWindow').on('click', '.surereclaim', function(){
    	$.ajax({
            url: 'reclaim',
            data:{
            	goodid:$(this).attr("goodid")
            },
            type: 'POST'
        }).done(function(result){
        	hideWindow();
        	if(result === 'true'){
        		$('#claim').attr('style','display:block;margin-left:250px;');
        		$('.reclaim').attr('style','display:none;margin-left:250px;');
        		alert('重拾爱情成功');
            }else{
            	alert(result);
            }
        });
    });

    // match history
    $('#contentPanel').on('click', '.history', function(){
    	var slot = $(this).attr('slot');
    	$('.historydetail').each(function(){
            if($(this).attr('slot')==slot)
                $(this).show();
            else
            	$(this).hide();
        });
    });

    // match usr pic gallery thumb
    $('#contentPanel').on('click', '.photo', function(){
        showBigPic($(this).attr("path"), $(this).attr("slot"));
    });
    $('#picWindow .popBlock').mousemove(function(e){
		positionX=e.originalEvent.x-$(this).offset().left;

		if(positionX<400){
			$(this).css("cursor","url('../../resources/images/bg11.cur'),auto");
		}else{
			$(this).css("cursor","url('../../resources/images/bg12.cur'),auto");
		}
	});
    $('#picWindow .popBlock').click(function(e){
		positionX=e.originalEvent.x-$(this).offset().left;
		var num = $(".photo").size();
		var index = +$('img',$(this)).attr('picindex');
		if(positionX<400){
			index = index-1<1?num:index-1;
		}else{
			index = (index+1)>num?1:index+1;
		}
		$('img',$(this)).attr('src', $('.photo[slot="'+index+'"]').attr('path'));
        $('img',$(this)).attr('picindex', index);
	});
    // the rating star setup

    $('#contentPanel').on('hover', '#rating_cont .rating_star', function(){
        $('#rating_cont .rating_star').removeClass('active');
		$(this).prevAll().addClass('active');
		$(this).addClass('active');
    });

    $('#contentPanel').on('mouseleave', '#rating_cont .rating_star', function(){
        $('#rating_cont .rating_star').removeClass('active');
        setfixedstar(rating);
    });

    $('#contentPanel').on('click', '#rating_cont .rating_star', function(){
        rating = 1+$(this).prevAll().length;
        setfixedstar(rating);
        // ajax the rating to server:
        $.ajax({
            type:'POST',
            url: 'rating',
            data: {
                rating: rating
            }
        }).done(function(result){
            if(result === 'true'){
                // replace the
                alert('评分成功');
            }
        });
    });

    $('#popWindow').on('click','#chatmore',function(){
     	 $cflag = parseInt($(this).attr('flag'));
     	 $fid =$(this).attr('fid');
     	 $.ajax({ url:'chatmore',  data:{
     	       flag:$cflag,fid:$fid
     	 },
     	 dataType:'json'
     	 }).done(function(result){
            $.each(result.message,function(i,val){
            	var msg = val['body'];
         		if(checkStr(msg)){
             		msg =splitX(msg);
             	}
				if(val['user'] == $fid+'@vps.tataufo.com'){
					var obj ="<div class='chat'><div class='chat_image pull-left'><div class='chat_pic'>"
				         +"<div class='chatfriendavate' style='background-image:url(../../"+result['fimg']+");'></div></div></div>"
			             +"<div class='store_chat_info pull-left' ><div class='chatleftimg'></div><div class='chatfriendinfo'>"
					     +"<div class='firstchatinfo'>"+msg+"</div></div>"
					     +"<div class='time'>"+val['utc']+"</div></div></div>";
                          $('.chatmore').after(obj);
				}else{
                    var obj ="<div class='chatingright'><div class='store_chat_info_right' >"
	   		                      +"<div class='friendinfo_right pull-left'>"+msg+"</div>"
			                      +"<div class='time'>"+val['utc']+"</div><div class='chatleftimg_right'></div></div>"
								  +"<div class='chat_image_right pull-left'><div class='chat_pic_right'>"
		                          +"<div class='chatfriendavate' style='background-image:url(../../"+result['myimg']+")'>"
		                          +"</div></div></div></div>";
		                   $('.chatmore').after(obj);
				}
            });
     	 });
    	  $(this).attr('flag',$cflag+1);
     });

    
    

	//查看
    $("#contentPanel").on("click", ".friendinfo", function(){
		$('#popCont #testchat').remove();
		$('#popWindow').before('<div id="testchat" chat="chating"></div>');
	    popWindow({page:"chating",fid:$(this).attr("fid")});
	    $total = $('#messagecount').text();
		$count1 =$(this).children('#count');
		$total=$total-$count1.text();
		if($total>0){
			$('#messagecount').text($total);
		}else{
		   $('#messagecount').css('display','none');
		}
		 $count1.text(0);
		$(this).children('#count').css('display','none');
	});

        $('#contentPanel').on('click','.privacy_deny_friend',function(){
            popWindow({page:'privacyList'});
        });
        
	$("#contentPanel").on("click", ".replysuccess", function(){
		 dashboardRouter.navigate('page/message', {
            trigger:true
          });
	});
    // set score using stars 0.0~
    function setfixedstar(score) {
        var counter = 1;
        $('#rating_cont .rating_star').each(function(){
            if(counter<=score)
                $(this).addClass('active');
            counter++;
        });
    }
     $('#popWindow').on('click','#surebuycandy',function(){
		     $(this).text('正在提交');
		     $(this).attr('disabled',"true");
	   		 $.ajax({
	           url: 'paycandy',
	           type: 'POST',
	           data:{
					candyprice:$('#paychecked #candyprice b').text()
	           }
	        }).done(function(result){
	        	   $('#popsumbit').html(result);
	        });
     });
 	$("#contentPanel").on('click','.zhubao',function(){
 		popWindow({page:"reportview",userid:$(this).attr('flag')});
 	});
 	
        
 	 $('#popWindow').on('click', '#reportadvice', function(){
 		 var fid= $(this).attr('flag');
 		 var message= $('textarea').val();
 		 if(message){
	 		 $.ajax({
	 			 url:'report_advice',
	 			 data:{
	 				 fid:fid,
	 				 message:message
	 			 }
	 		 }).done(function(data){
	 			 alert(data);
	 		   	hideWindow();
	 		 });
 		 }else{
 			 alert("举报内容不能为空");
 		 }
	  });
          $('#popWindow').on('click','.match_city_sure',function(){
              var city =$('.match_city_select').val();
              $.ajax({
                  url:'update_match_city',
                  data:{
                      matchcity:city
                  },
                  dataType:'JSON'
              }).done(function(data){
                  if(data.result=1){
                     $('.matchcity_cont').text(city);
                      alert( '更新成功');
                  }else{
                      alert('更新失败');
                  }
                 hideWindow();
              });
          });
          
          $('#popWindow').on('click','.send_privacy',function(){
            console.log(12);
            if (confirm("确认要加入黑名单？")) {
                  var fid = $(this).attr('ftype');
                  if(fid !='16458'){
                      connection.add_privacy(fid);
                      $('.chat').find('.friendinfo').each(function(index){
                          if($(this).attr('fid')==fid){
                             $(this).parent().parent().remove();
                          }
                      });
                        $("#popCont .popClose").trigger("click");
                   }else{
                        alert('亲，不能拉黑小嗒嗒客服哟');
                   }
                   window.event.returnValue = false;
              }
        });
});

function showShadow(){
   $("#shadowLayer").css("display","block");
}

function hideShadow(){
  $("#shadowLayer").css("display","none");
}
function popWindow(data){
    $.ajax({
            url: 'popwindow',
            data: data
    }).done(function(data){
            $pop = $("#popWindow");
            $pop.html(data);
            showShadow();
            $pop.parent().show();
            $pop.show();
            $("#topMargin").height($(document).scrollTop()+($(window).height()-$pop.height())/2);
    });
}
function showBigPic(path, index){
	$img = $("#picWindow img");
	$img.attr("src", path).attr("picindex", index);
	showShadow();
	$('#popCont').show();
	$('#picWindow').show();
	$("#topMargin").height($(document).scrollTop()+($(window).height()-$img.height())/2);
}

function hideWindow(){
	$("#popWindow").hide();
	$("#picWindow").hide();
	$("#popCont").hide();
	hideShadow();
}

function copyToClipBoard(text){
	window.clipboardData.setData("Text",text);
	alert("复制成功！");
}

$('#emoji_image').live('click',function(){
	$flag = $(this).attr('flag');
	if($flag=='on'){
		$(this).attr('src',"../../resources/images/emoji_off.png");
		$('#images_faces').css('display','none');
		$('#faces').hide();
		$('#chat_faces').hide();
		$(this).attr('flag','off');
	}else{
		$(this).attr('src',"../../resources/images/emoji_on.png");
		$.getJSON("../../resources/json/faces.json", function(data){
			var s='';
			  for(var arr in data){
				  for(var key in data[arr]){
						var img = '<img src="../../resources/faces/' + data[arr][key] + '" '+ 'alt="' + key + '" class="emojiface" />';
						s = s+img;
				  }
			  }
			  $('#faces_info').html(s);
		});
		$('#chat_faces').show();
		$('#faces').show();
		$("#facetopMargin").height($(document).scrollTop()+($(window).height()-$('#faces span').height())/2-200);
		$(this).attr('flag','on');
	}
});


$('.emojiface').live('click',function(){
    var s = $('.chat_input_textarea').val();
    s = s+$(this).attr('alt');
    $('.chat_input_textarea').val(s);
});
