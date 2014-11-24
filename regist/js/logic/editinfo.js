// JavaScript Document

$(function() {
	var photoNum = 0;
	$('.change_photo').click(function() {
		photoNum = $(this).attr("data-num");
		$('.photo_upload', $(this)).fileupload({
			url : 'photoUpload',
			limitMultiFileUploads : 1,
			dataType : 'json',
			formData : {
				num : photoNum
			}
		}).bind('fileuploaddone', function(e, data) {
			var filePath = "http://img.tataufo.com/" + data.result.filepath;
			var bigPath = "http://img.tataufo.com/" + data.result.bigpath;
			$('#photo' + photoNum).attr('src', filePath);
			$('#photo' + photoNum).attr('path', bigPath);
			$("#progress").hide();
		}).bind('fileuploadstart', function(e) {
			$("#progress").show();
		});
		trigger("click");
	});
	// functions for avatar change
	$("#contentPanel").on('click', '#edit_avatar', function() {
		$("#avatar_upload").trigger("click");
	});

	$("#avatar_upload").bind('fileuploadstart', function(e) {
		$("#progress").show();
	});

	$("#avatar_upload").fileupload({
		url : 'avatarUpload',
		limitMultiFileUploads : 1,
		dataType : 'json'
	});
	$("#avatar_upload").bind('fileuploaddone', function(e, data) {
		var imgSrc = "http://img.tataufo.com/" + data.result.filepath;
		$('#avatar').attr('src', imgSrc);
		$('#myavatar').attr('src', imgSrc);
		$("#progress").hide();
		popWindow({
			page : 'avatarupdate'
		});
	});
	$("#avatar_upload").bind('fileuploadstart', function(e) {
		$("#progress").show();
	});

	$('.avatar_cance').click(function() {
		hideavatar();
	});

	$('.avatar_sure').click(function() {
		$.ajax({
			url : '../dashboard/avatarUpdate',
			data : {
				x : $('#x').val(),
				y : $('#y').val(),
				w : $('#w').val(),
				h : $('#h').val()
			},
			dataType : 'json'
		}).done(function(data) {
			hideavatar();
			var filePath = "http://img.tataufo.com/" + data.filepath;
			$('#topMargin').attr('style','height:200px;')
			$('#avatar').attr('src', filePath);
			$('#myavatar').attr('src', filePath);
			$('#popWindow').text('');
		});
	});
	// delete photos
	$(".delete_photo")
			.click(
					function() {
						var num = $(this).attr("data-num");
						$
								.ajax({
									url : 'deletePhoto',
									type : 'post',
									data : {
										num : num
									}
								})
								.done(
										function(data) {
											if (data == 'true') {
												$("#photo" + num)
														.attr("src",
																"../../resources/images/default_photo.png");
											} else {
												alert(data);
											}
										});
					});

	// editpassword
	$("#popWindow").on("click", "#changePassword", function() {
		var passed = true;
		var newPassword = $("#newPassword").val();
		if (newPassword == "") {
			showFieldError("newPassword", "新密码不能为空");
			passed = false;
		} else if (newPassword.length < 6 || newPassword.length > 20) {
			showFieldError("newPassword", "新密码为6-20个字符长度");
			passed = false;
		} else
			hideFieldError("newPassword");
		var oldPassword = $("#oldPassword").val();
		if (oldPassword == "") {
			showFieldError("oldPassword", "旧密码不能为空");
			passed = false;
		} else if (oldPassword.length < 6 || newPassword.length > 20) {
			showFieldError("oldPassword", "旧密码为6-20个字符长度");
			passed = false;
		} else
			hideFieldError("oldPassword");
		var newPassword2 = $("#newPassword2").val();
		if (newPassword2 != newPassword) {
			showFieldError("newPassword2", "两次密码不一致");
			passed = false;
		} else
			hideFieldError("newPassword2");
		if (passed) {
			$.ajax({
				url : 'changePassword',
				type : 'post',
				data : {
					oldPassword : $.md5(oldPassword),
					newPassword : $.md5(newPassword)
				}
			}).done(function(data) {
				if (data == 'true') {
					alert('修改密码成功~~');
					hideWindow();
				} else {
					alert(data);
				}
			});
		}
	});
	$("#edit_password").click(function() {
		popWindow({
			page : "changePassword"
		});
	});
	$("#edit_phone").click(function() {
		popWindow({
			page : "changePhone"
		});
	});
	$("#edit_basic").click(function() {
		popWindow({
			page : "editBasic"
		});
	});
	$("#edit_des").click(function() {
		popWindow({
			page : "editDes"
		});
	});
	$("#edit_words").click(function() {
		popWindow({
			page : "editWords"
		});
	});

	// other functions
	function showFieldError(fieldName, fieldError) {
		var $context = $("#" + fieldName).parent().parent();
		$(".field_info", $context).hide();
		$(".field_error", $context).html(fieldError).show();
	}
	;
	function hideFieldError(fieldName) {
		var $context = $("#" + fieldName).parent().parent();
		$(".field_info", $context).show();
		$(".field_error", $context).hide();
	}

	function hideavatar() {
		$('#popWindow').hide();
		$("#shadowLayer").css("display", "none");
	}
});
