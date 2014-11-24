// JavaScript Document
$(function(){
	showShadow();
	$("#plusinfo .textfield").keyup(function(e){
	     if(e.keyCode==188 || e.keyCode==13){
			e.preventDefault();
			if($(".plusinfo_label", $(this).parent()).size()>=15){
				alert("每项最多只能添加15个标签！");
				$(this).val("");
				return;
			}
			var label = $.trim($(this).val());
			if(label==""){
				alert("标签不能为空");
				$(this).val("");
				return;
			}
			$(this).before('<span class="plusinfo_label radius4"><span class="value">'+deleDot(label)+'</span><span class="plusinfo_label_close">×</span></span>').val("");
		}
	});
	function deleDot(str){
       var newStr = "";
       for(var i=0; i<str.length; i++){
           if(str.charAt(i) != "," && str.charAt(i) != "，"){
              newStr += str.charAt(i);
           }
       }
        return newStr;
    }
	$("#plusinfo").on("click", ".plusinfo_label_close", function(e){
			$(this).parent().remove();
	});
	$("#plusinfo .textfield").blur(function(){
		var label = $.trim($(this).val());
		if(label != ""){
			if($(".plusinfo_label", $(this).parent()).size()>=15){
				alert("每项最多只能添加15个标签！");
				$(this).val("");
				return;
			}
			$(this).before('<span class="plusinfo_label radius4"><span class="value">'+label+'</span><span class="plusinfo_label_close">×</span></span>').val("");
		}
	});
	$("#plusinfo_complete").click(function(){
		var self = "";
		var love = "";
		var hate = "";
		var dream = "";
		var count = 0;
		$("#self_block .plusinfo_label .value").each(function(index, $el) {
            if(count==0)self+=$(this).text();
			else self += '，'+$(this).text();
			count++;
        });
		if(count<2){alert("请注意每项至少添加两个标签");return;};
		count = 0;
		$("#love_block .plusinfo_label .value").each(function(index, $el) {
            if(count==0)love+=$(this).text();
			else love += '，'+$(this).text();
			count++;
        });
		if(count<2){alert("请注意每项至少添加两个标签");return;};
		count = 0;
		$("#hate_block .plusinfo_label .value").each(function(index, $el) {
            if(count==0)hate+=$(this).text();
			else hate += '，'+$(this).text();
			count++;
        });
		if(count<2){alert("请注意每项至少添加两个标签");return;};
		count = 0;
		$("#dream_block .plusinfo_label .value").each(function(index, $el) {
            if(count==0)dream+=$(this).text();
			else dream += '，'+$(this).text();
			count++;
        });
		if(count<2){alert("请注意每项至少添加两个标签");return;};
		$.ajax({
			url: "updatetags",
			type: "post",
			data: {
				self: self,
				love: love,
				hate: hate,
				dream: dream
			}
		}).done(function(result){
			if(result=='true'){
				hideShadow();
				$('#plusinfo_cont').remove();
			}else{
				alert("您提交的数据有误，请检查后再重新提交！");
			}
		});
	});
});