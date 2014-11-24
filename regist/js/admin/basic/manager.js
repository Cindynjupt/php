// /*
//  * manger
//  *by date :2013/11/23
//  * Thomashtao
//  */
// var dashboardRouter = null;
// $(function() {
// 	var DashboardRouter = Backbone.Router.extend( {
// 		routes : {
// 			"page/:name" : "page",
// 			"" : "defaultOverview"
// 		},
// 		page : function(name) {
// 			$.ajax( {
// 				url : 'page/' + name,
// 				statusCode : {
// 					500 : function() {
// 					}
// 				},
// 				data : {
// 					_dc : (new Date).getTime()
// 				}
// 			}).done(function(content) {
// 				$('.contentPanel').html(content);
// 			});
// 		},
// 		defaultOverview : function() {
// 			this.page('overview');
// 		}

// 	});

// 	dashboardRouter = new DashboardRouter;
// 	Backbone.history.start();
	
// 	// 添加星星糖
// 	$('.contentPanel').on('click', '#addcandy', function() {
// 		var reason = $('textarea').val();
// 		var candy = $('input[name=candy]').val();
// 		var userid = $('input[name=userid]').val();
// 		if (!candy) {
// 		} else {
// 			managerWindow({
// 				page : 'sysAddCandy',
// 				reason : reason,
// 				candy : candy,
// 				userid : userid
// 			});
// 		}
// 	});

// 	$('.searchInfo').click(function() {
// 		$.ajax( {
// 			url : 'managerWindow',
// 			data : {
// 				page : 'searchInfo',
// 				flag : $('#search_info').val(),
// 				keyword : $('.searchKeyword').val()
// 			}
// 		}).done(function(result) {
// 			$('.contentPanel').html(result);
// 		});
// 	});

// 	$('input[name=searchkeyword]').keydown(function(e) {
// 		if (e.keyCode === 13) {
// 			$.ajax( {
// 				url : 'managerWindow',
// 				data : {
// 					page : 'searchInfo',
// 					flag : $('#search_info').val(),
// 					keyword : $('.searchKeyword').val()
// 				}
// 			}).done(function(result) {
// 				$('.contentPanel').html(result);
// 			});
// 		}
// 	});
// 	$('.contentPanel').on('click', '#edit_basic', function() {
// 		popWindow( {
// 			page : "editBasic",
// 			userid : $('.block_header').attr('type')
// 		});
// 	});
// 	$('.contentPanel').on('click', '#edit_tag', function() {
// 		popWindow( {
// 			page : "editTag",
// 			userid : $('.block_header').attr('type')
// 		});
// 	});
// 	$('.contentPanel').on('click', '#timecommit', function() {
// 		$.ajax( {
// 			url : 'managerWindow',
// 			data : {
// 				page : 'logincount',
// 				flag : $('option:selected', $('#search_time')).val()
// 			}
// 		}).done(function(result) {
// 			$('#loginPanel').html(result);
// 		});
// 	});

// 	$('.contentPanel').on('click', '#commitnotice', function() {
// 		$('textarea').each(function() {
// 			var notice = $(this);
// 			$.ajax( {
// 				url : 'managerWindow',
// 				data : {
// 					page : 'sysaddnotice',
// 					cont : $(this).val(),
// 					noticeid : $(this).attr('ftype'),
// 					flag : 1
// 				},
// 				dataType : 'json'
// 			}).done(function(result) {
// 				notice.attr('ftype', result['id']);
// 			});
// 		});
// 		alert('发布成功');
// 	});
// 	$('.contentPanel').on('change', '#select_provinces', function() {
// 		$.ajax( {
// 			url : 'managerWindow',
// 			data : {
// 				page : 'prereg',
// 				province : $('option:selected', $(this)).val()
// 			}
// 		}).done(function(data) {
// 			$('.prereg').html(data);
// 		});
// 	});
// 	$('.contentPanel').on('click', '.addversion', function() {
// 		managerWindow( {
// 			page : 'addversion',
// 			num : $('input[name=num]').val(),
// 			name : $('input[name=name]').val(),
// 			level : $('option:selected', $('#level')).val(),
// 			cont : $('.cont').val()
// 		});
// 	});

// 	$('.contentPanel').on('click', '#selecinfo', function() {
// 		var provin = $("option:selected", $('#select_provinces')).val();

// 		var sex = $("option:selected", $('#select_sex')).val();
// 		var verify = $("option:selected", $('#select_verify')).val();
// 		var school = $("option:selected", $('#select_school')).val();
// 		var locked = $("option:selected", $('#select_locked')).val();

// 		$.ajax( {
// 			url : 'managerWindow',
// 			data : {
// 				page : 'suserinfo',
// 				province : provin,
// 				sex : sex,
// 				verify : verify,
// 				university : school,
// 				locked : locked
// 			}
// 		}).done(function(data) {
// 			$('#check_userinfo').html(data);
// 		});
// 	});

// 	// 审核个人介绍
// 	$('.contentPanel').on('click', '.js-validate-person-detail', function(e) {
// 		e.preventDefault();
// 		managerWindow( {
// 			'page': 'updateDetail',
// 			'flag': $(this).data('flag'),
// 			'type': $(this).data('type')
// 		});
// 		$(this).parents('tr').remove();
// 	});

// 	$('.contentPanel').on('click', '#searchintegrallog', function() {
// 		var userid = $('input[name=candyuserid]').val();
// 		$.ajax( {
// 			url : 'managerWindow',
// 			data : {
// 				page : 'candyrecordsbyuserid',
// 				userid : userid
// 			}
// 		}).done(function(data) {
// 			$('#candycontent').html(data);
// 		});
// 	});

// 	$('input[name=candyuserid]').live('keydown', function(e) {
// 		if (e.keyCode === 13) {
// 			var userid = $('input[name=candyuserid]').val();
// 			$.ajax( {
// 				url : 'managerWindow',
// 				data : {
// 					page : 'candyrecordsbyuserid',
// 					userid : userid
// 				}
// 			}).done(function(data) {
// 				$('#candycontent').html(data);
// 			});
// 		}

// 	});
// 	$('.contentPanel').on('change', '.tab_likecount', function() {
// 		var type = $('option:selected', $('#select_mailstatus')).val();
// 		var ssex = $('option:selected', $('#select_ssex')).val();
// 		var rsex = $('option:selected', $('#select_rsex')).val();
// 		$.ajax( {
// 			url : 'page/likecount',
// 			data : {
// 				ssex : ssex,
// 				rsex : rsex,
// 				type : type
// 			}
// 		}).done(function(data) {
// 			$('#likecount').html(data);
// 		});
// 	});

// 	// 账户不通过审核
// 	$('.contentPanel').on('click', '.js-reject-account a', function(e) {
// 		e.preventDefault();
// 		if (!window.confirm('确定拒绝该用户?')) { return; }
// 		var userid = $(this).parents('ul').data('uid'),
// 		    flag = $(this).data('flag'),
// 		    self = this;

// 		$.ajax( {
// 			url : 'checkfail',
// 			data : {
// 				flag : flag,
// 				userid : userid
// 			},
// 			dataType : 'JSON'
// 		}).done(function(result) {
// 			alert('操作成功');
// 			$('.js-account-status').html('<span class="label label-danger">' + self.text() + '</span>');
// 		});
// 	});

// 	// 账户通过审核
// 	$('.contentPanel').on('click', '.js-approve-account', function() {
// 		var userid = $(this).data('uid');
// 		if (!window.confirm('确定通过审核?')) { return; }
// 		$.ajax( {
// 			url : 'checksuccess',
// 			data : {
// 				userid : userid
// 			},
// 			dataType : 'JSON'
// 		}).done(function(result) {
// 			alert('操作成功');
// 			$('.js-account-status').html('<span class="label label-success">已通过</span>');
// 		});
// 	});

// 	// 删除edu邮箱
// 	$('.contentPanel').on('click', '.js-delete-edu', function(e) {
// 		e.preventDefault();
// 		if (!window.confirm('确定删除?')) { return; }
// 		var userid = $(this).data('uid'),
// 				self = this;
// 		$.ajax( {
// 			url : 'delEdumail',
// 			data : {
// 				userid : userid
// 			}
// 		}).done(function(result) {
// 			$(self).parent().html('无');
// 		});
// 	});

// 	// 删除图片
// 	$('.contentPanel').on('click', '.js-delete-photo', function(e) {
// 		e.preventDefault();
// 		var pic = $(this).parent();

// 		if (!window.confirm('确认删除？')) { return; }
// 		$(this).replaceWith('<img style="margin-top: 10px; width: 20px;" src="../../resources/admin/images/loader.gif" />');

// 		$.ajax( {
// 				url : 'deletePhoto',
// 				type : 'post',
// 				data : {
// 					num : $(this).data('slot'),
// 					userid : $(this).data('uid')
// 				},
// 				dataType : 'json'
// 			}).done(function(data) {
// 				pic.remove();
// 			});
// 	});

// 	$('.contentPanel').on('click', 'input[name="echeck"]', function() {
// 		var userid = $('.block_header').attr('type');
// 		var flag = $(this).attr('flag');
// 		$.ajax( {
// 			url : 'updateStauts',
// 			data : {
// 				flag : flag,
// 				userid : userid
// 			},
// 			dataType : 'json'
// 		}).done(function(result) {
// 			if (flag == 3) {
// 				$('#educheck span').text('通过');
// 			} else {
// 				$('#educheck span').text('未通过');
// 			}
// 			$('#check_info').html(checkinsertinfo(result));
// 			alert('ok');
// 		});
// 	});

// 	// 审核内心独白
// 	$('.contentPanel').on('click', '.js-check-intro', function(e) {
// 		e.preventDefault();
// 		var flag = $(this).data('flag');
// 		var status = $('.js-intro-status');

// 		$.ajax( {
// 			url : 'updateStauts',
// 			data : {
// 				flag : flag,
// 				userid : $(this).data('uid')
// 			},
// 			dataType : 'json'
// 		}).done(function(data) {
// 			alert('操作成功');

// 			if (flag == 1) {
// 				status.html('<span class="label label-success">通过</span>');
// 			} else if (flag == 2) {
// 				status.html('<span class="label label-danger">未通过</span>');
// 			}
// 		});
// 	});

// 	// 修改匹配状态
// 	$('.contentPanel').on('click', '.js-toggle-locked', function(e) {
// 		e.preventDefault();

// 		var link = $(this),
// 				userid = link.data('uid'),
// 		    flag = link.data('flag'),
// 				status = $('.js-lock-status');

// 		flag = flag === 0 ? 6 : 5; // this is very confusing due to API design

// 		if (!window.confirm('确认修改?')) { return; }

// 		$.ajax( {
// 			url : 'updateStauts',
// 			data : {
// 				flag : flag,
// 				userid : userid
// 			},
// 			dataType : 'json'
// 		}).done(function(data) {
// 			if (flag === 5) {
// 				link.data('flag', 0);
// 				status.html('<span class="label label-success">正常</span>');
// 			} else if (flag === 6) {
// 				link.data('flag', 1);
// 				status.html('<span class="label label-danger">暂停匹配</span>');
// 			}
// 		});
// 	});

// 	$('.contentPanel').on('click', '.sub_precent_verify', function() {
// 		var flag = $('option:selected', $('#select_pre')).val();
// 		$.ajax( {
// 			url : 'sys_getVerifyPrecent',
// 			data : {
// 				flag : flag
// 			}
// 		}).done(function(data) {
// 			$('#insert_table_precent').val('');
// 			$('#insert_table_precent').html(data);
// 		})
// 	});
// 	$('.contentPanel')
// 			.on(
// 					'click',
// 					'#notecommit',
// 					function() {
// 						var cont = $('.notecont').val();
// 						var userid = $('.block_header').attr('type');
// 						$
// 								.ajax( {
// 									url : 'addSysNote',
// 									data : {
// 										content : cont,
// 										userid : userid
// 									},
// 									dataType : 'json'
// 								})
// 								.done(
// 										function(data) {
// 											var obj = '';
// 											for ( var val in data) {

// 												obj += "<div id='noteinfo'><div class='des_line' ><div class='sys_des_label'>管理员："
// 														+ data[val]['sname']
// 														+ "</div>"
// 														+ "<div class='des_content'><span> 内容："
// 														+ data[val]['content']
// 														+ "</span><span> 时间："
// 														+ data[val]['addtime']
// 														+ "</span></div></div></div>";
// 											}
// 											$('#note_cont').html(obj);
// 											alert('添加成功');
// 										});
// 					});
// 	function checkinsertinfo(info) {
// 		var dinfo = '';
// 		for ( var key in info) {
// 			dinfo += "<div class='des_line' ><div class='sys_des_label'>管理员："
// 					+ info[key]['username'] + "</div>"
// 					+ "<div class='des_content'><span> 内容："
// 					+ info[key]['content'] + "</span><span>时间："
// 					+ info[key]['addtime'] + "</span>" + "</div></div>";
// 		}
// 		return dinfo;
// 	}

// 	$('.contentPanel').on('click', '#beizhu span', function() {
// 		if ($(this).text() == "备注") {
// 			$(this).text('收起');
// 			$('.note').attr('style', "display:block");
// 		} else {
// 			$(this).text('备注');
// 			$('.note').attr('style', "display:none");
// 		}
// 	});
//     $('.contentPanel').on('click','.advice_handle',function(){
//         $.ajax({
//         	url:'updateAdviceStatus'
//         }).done(function(data){
//         	alert(data);
//         });
//     	$(this).parent().parent().remove();
//     });
//       $('.contentPanel').on('click','#url_title',function(){
//           $.ajax({
//              url:'updateMbnotice',
//              data:{
//                  categoryID:$('#categoryID').val() ,
//                  webUrl:$('.webUrl').val(),
//                  noticeID:$('#imageurl').attr('flag'),
//                  flag:$('#mb_acitity').val(),
//                  title:$('.title').val()
//              },
//              dataType:"json"
//          }).done(function(result){
//               alert(result.result);
//               $('.webUrl').val('');
//               $('#imageurl').attr('flag',"");
//               $('#mb_acitity').val('');
//               $('#noticimage').attr('src',"../../resources/images/reg_avatar_bg.png");
//          });
//      });
//       $('.contentPanel').on('click', '#updateFlag', function() {
//           var flag =$(this).attr('flag');
//           var span = $(this).parent().parent();
//           $.ajax({
//                 url:'updateMbflag',
//                 data:{
//                     noticeID: span.children('#noticeID').text(),
//                     flag:flag
//                 },
//                 dataType:"json"
//           }).done(function(data){
//                 alert(data.result);
//                 if(flag==1){
//                     span.children('#updatenoticeflag').html('<span id="updateFlag" flag="0">已激活</span>');
//                 }else{
//                     span.children('#updatenoticeflag').html('<span id="updateFlag" flag="1">未激活</span>');
//                 }
//            });
//     });
    
//      $('.contentPanel').on('click', '#js-add-permission',function(){
//         var roleID=$('#roleID').val();
//         var userID=$('.garden_userid').val();
//        $.ajax({
//            url:'addGardenRoles',
//            data:{
//                RoleID:roleID,
//                UserID:userID
//            },
//            dataType:"json"
//        }).done(function(data){
//           if( data.id != 0){
//              $('.js-permission-table tbody').prepend("<tr>"+
//                 "<input type='hidden' class= 'gardenid' value='"+data.id+"' />"+
//                 "<td>"+roleID+"</td>"+
//                 "<td>"+userID+"</td>"+
//                 "<td><a href='#' class='js-revoke-permission'>取消</a>"+
//                 "</td></tr>");
//         		alert('添加成功');
//           } else {
//               $('.garden_role2').each(function(i){
// 								if($(this).children('.UserID').text() == userID){
// 					      	$(this).children('.RoleID').text(roleID);
// 					      }
// 							});
//               alert('更新成功');
//           }
//        });
     
//    });
// 	$('.contentPanel').on('click','#searchspend',function(){
//     var userid = $('input[name=userid]').val();
// 		$.ajax( {
// 			url : 'managerWindow',
// 			data : {
// 				page : 'candyspendlist',
// 				userid : userid
// 			}
// 		}).done(function(data) {
// 			$('#spendcontent').html(data);
// 		});
//   });
// });

// function popWindow(data) {
// 	$.ajax( {
// 		url : 'popwindow',
// 		data : data
// 	}).done(
// 			function(data) {
// 				$pop = $("#popWindow");
// 				$pop.html(data);
// 				showShadow();
// 				$pop.parent().show();
// 				$pop.show();
// 				$("#topMargin").height(
// 						$(document).scrollTop()
// 								+ ($(window).height() - $pop.height()) / 2);
// 			});
// }

// function managerWindow(data) {
// 	$.ajax( {
// 		url : 'managerWindow',
// 		data : data,
// 		dataType : 'JSON'
// 	}).done(function(result) {
// 		alert(result['info']);
// 	});
// }
