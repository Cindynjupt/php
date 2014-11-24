$(function() {
	$('<audio id="chatAudio"><source src="../../resources/audio/mailalert.ogg" type="audio/ogg"><source src="../../resource/audio/mailalert.mp3" type="audio/mpeg"><source src="../../resources/audio/mailalert.wav" type="audio/wav"></audio>').appendTo('body');
});
var Chatroom = function(other, chatroom, connection) {
	var self = this;
	var chatlog = chatroom.find('.chatlog');

	this.other = {
		jabber_id : other.jabber_id,
		idx : other.idx,
		photo : other.photo,
		name : other.name
	};

	this.scroll_down = function() {
		chatlog.scrollTop(chatlog[0].scrollHeight);
	};
	
	this.add_my_message = function(msg, time, log_mode) {
		if (checkStr(msg)) {
			msg = splitX(msg);
		}
		var row = $('#chat').tmpl({
			user : connection.me,
			contents : msg,
			time : time
		});
		row.addClass("me");
		if (!log_mode) {
			row.appendTo(chatlog);
			self.scroll_down();
		}
		return row;
	};
	// jquery .tmpl 动态请求数据来更新页面是现在非常常用的方法
	this.add_other_message = function(msg, time, log_mode) {
		if (checkStr(msg)) {
			msg = splitX(msg);
		}
		var row = $('#otherchat').tmpl({
			user : self.other,
			contents : msg,
			time : time
		});
		row.addClass("other");
		if (!log_mode) {
			row.appendTo(chatlog);
			this.scroll_down();
		}
		return row;
	};

	// 重新输入
	this.reset_input = function() {
		var input = chatroom.find('textarea');
		var text = input.val();
		input.val('');
		return text;
	};
	// 输入框enter键
	chatroom.find("textarea").keydown(function(ev) {
		if (ev.keyCode == 13) {
			var text = self.reset_input();
			if (clearBr(text).length > 0) {
				connection.send_message(other, text, self.add_my_message);
				ev.preventDefault();
				// return true;
			}
		}
	});
	// 发信
	chatroom.find("button").on('click', function(ev) {
		var text = self.reset_input();
		if (clearBr(text).length > 0) {
			connection.send_message(other, text, self.add_my_message);
			ev.preventDefault();
			// chatroom.find('textarea').focus();
		}
	});
     
};

// 去除换行符
function clearBr(key) {
	key = key.replace(/<\/?.+?>/g, "");
	key = key.replace(/[\r\n]/g, "");
	return key;
}
// 得到当前时间
function get_current_time() {
	var now = new Date();
	var m = now.getMonth() + 1;
	var d = now.getDate();
	var h = now.getHours();
	var i = now.getMinutes();
	var s = now.getSeconds();
	return m + '月 ' + d + ' 日 ' + h + ':' + i + ':' + s;
}
// 连接ejabberd服务器
function Connection(host, me, id, pw) {
	var conn = null;
	var self = this;
	this.me = me;
	this.chatroom = Object();
	conn = new Strophe.Connection(host);
	roster = conn.roster;
	privacy = conn.privacy;
	
	// 接收信息
	function recv_message(msg) {
		var msg = $(msg);
		if (msg.attr('type') == 'chat') {
			var from = msg.attr('from');
			var from_id = from.split('/')[0];
			if ($('#testchat').attr('chat') != 'chating') {
				$.ajax({
					url : 'insertchatinfo',
					data : {
						funame : from.split('@')[0],
						username : msg.attr('to').split('@')[0]
					}
				}).done(function(result) {
					var count = $('.message #messagecount');
					if (count.text() == 0) {
						count.css("display", 'block');
					}
					$chatflag = $('.friendinfo');
					$('#chatAudio')[0].play();
					count.text(+count.text() + 1);
					$chatflag.each(function() {
						$fcount = $(this).children('#count');
						if (from.split('@')[0] == $(this).attr('fid')) {
							var msgt = $(msg).find('body').text();
							var s = msgt;
							if (msgt != '' || msgt != 'null') {
								if (msgt.length > 20) {
									s = msgt.substring(0, 20) + "...";
								}
								$fcount.text(+$fcount.text() + 1);
								$fcount.css('display', 'block');
								if (checkStr(s)) {
									s = splitX(s);
								}
								$(this).children('.firstchatinfo').html(s);
								return;
							}
						}
					});
					return;
				});
			}
			if (self.chatroom[from_id]) {
				var text = $(msg).find('body').text();
				var time = get_current_time();
				self.chatroom[from_id].add_other_message(text, time);
			}
			return true;
		} else {
			return false;
		}
	}
        
        //拉黑
        this.add_privacy = function(other_id){
            var name=self.me.jabber_id.split('@')[0]+'-block-'+other_id;
            var list = privacy.newList(name); 
            var jid = other_id+"@vps.tataufo.com";
	    list.items = [ privacy.newItem("jid",jid, "deny", 12, [ "message", 'iq', 'presence-in', 'presence-out'])];
            privacy.saveList(list.getName(),privacy.setActive(list.getName()));
             $.ajax({
                 url:'update_userstatus',
                 data:{
                     flag:2,
                     fid:other_id
                 }
             }).done(function(data){
             });
        }
        
        //setactive
        this.set_active = function(other_id){
            var name=self.me.jabber_id.split('@')[0]+'-block-'+other_id;
            var list = privacy.newList(name); 
            privacy.setActive(list.getName());
        }
        
        
        //解除黑名单
        this.recover_privacy_iq = function (other_id){
            var name=self.me.jabber_id.split('@')[0]+'-block-'+other_id;
             var list = privacy.newList(name); 
             privacy.saveList(list.getName());
             $.ajax({
                 url:'update_userstatus',
                 data:{
                     flag:1,
                     fid:other_id
                 }
             }).done(function(data){
             });
        };
	// 发送信息
	this.send_message = function(other, text, func) {
	    var body = $build('body');
	    body.t(text);
	    var msg = $msg({ to:   other.jabber_id,
	                     from: self.me.jabber_id,
	                     type: 'chat' }).cnode(body.tree());
	     conn.send(msg.tree());
	    var time = get_current_time();
	    func(text,time);
	    $flag =roster.isOnline(other.jabber_id);
	    $fid =other.jabber_id.split('@')[0];
	    if(!$flag){
                $.ajax({
                  url:'webpush',
                  data:{
                     fid:$fid,
                     content:text
                  }
                }).done(function(result){
                });
	    }
	};

	// 启动strophe连接ejabberd服务器
	this.start = function() {
		conn.connect(self.me.jabber_id, self.me.jabber_pw, this._cb_connect);
		return this;
	};
	this.disconnect = function() {
		if (null !== conn) {
			conn.send($pres({
				type : 'unavailable'
			}));
			conn.flush();
			conn.disconnect('page unload', true);
		}
	};
	this._cb_connect = function(status) {
		if (status == Strophe.Status.CONNECTING) {
		} else if (status == Strophe.Status.CONNFAIL) {
			this.start();
		} else if (status == Strophe.Status.ERROR) {
			alert('error occurred');
		} else if (status == Strophe.Status.AUTHFAIL) {
		} else if (status == Strophe.Status.DISCONNECTED) {
			// 
		} else if (status == Strophe.Status.CONNECTED) {
			conn.addHandler(recv_message, null, 'message', null, null, null);
			conn.send($pres().tree());
		}
	};
	this.sendIQ = function(iq) {
		conn.sendIQ(iq, roster.presenceChanged);
	};
}

function splitX(s) {
	var ret = new Array();
	if (s == null || s == "") {
		return ret;
	}
	var idx1 = 0, idx2 = 0, i = 0;
	while ((idx1 = s.indexOf("[")) > -1 && idx1 != s.length - 1) {

		if (!checkStr(s.substring(1, idx1))) {
			ret = ret + s.substring(1, idx1);
		}
		idx2 = s.indexOf("]");
		if (idx2 > idx1) {
			ret = ret + '<img src="../../resources/faces/'
					+ emoji2img(faces, s.substring(idx1, idx2 + 1))
					+ '" class="emojiface">';
			i++;
			if (!checkStr(s.substring(idx2 + 1))) {
				ret = ret + s.substring(idx2 + 1);
			}
			s = s.substring(idx2);

		} else {
			s = s.substring(idx1);
		}
	}

	return ret;
}

function emoji2img(str, text) {
	for ( var key in str) {
		if (text == key) {
			return str[key];
		}
	}
}
function checkStr(s) {
	var str = /[*\[*\]*]/;
	if (!str.exec(s)) {
		return false;
	} else {
		return true;
	}
}
var faces = {
	'[嘻嘻]' : 'emoji_1.png',
	'[哈哈]' : 'emoji_2.png',
	'[喜欢]' : 'emoji_3.png',
	'[晕]' : 'emoji_4.png',
	'[泪]' : 'emoji_5.png',
	'[馋嘴]' : 'emoji_6.png',
	'[抓狂]' : 'emoji_7.png',
	'[哼]' : 'emoji_8.png',
	'[可爱]' : 'emoji_9.png',
	'[怒]' : 'emoji_10.png',
	'[汗]' : 'emoji_11.png',
	'[微笑]' : 'emoji_12.png',
	'[睡觉]' : 'emoji_13.png',
	'[钱]' : 'emoji_14.png',
	'[偷笑]' : 'emoji_15.png',
	'[酷]' : 'emoji_16.png',
	'[衰]' : 'emoji_17.png',
	'[吃惊]' : 'emoji_18.png',
	'[怒骂]' : 'emoji_19.png',
	'[鄙视]' : 'emoji_20.png',
	'[挖鼻屎]' : 'emoji_21.png',
	'[色]' : 'emoji_22.png',
	'[鼓掌]' : 'emoji_23.png',
	'[悲伤]' : 'emoji_24.png',
	'[思考]' : 'emoji_25.png',
	'[生病]' : 'emoji_26.png',
	'[亲亲]' : 'emoji_27.png',
	'[抱抱]' : 'emoji_28.png',
	'[白眼]' : 'emoji_29.png',
	'[右哼哼]' : 'emoji_30.png',
	'[左哼哼]' : 'emoji_31.png',
	'[嘘]' : 'emoji_32.png',
	'[委屈]' : 'emoji_33.png',
	'[哈欠]' : 'emoji_34.png',
	'[敲打]' : 'emoji_35.png',
	'[疑问]' : 'emoji_36.png',
	'[挤眼]' : 'emoji_37.png',
	'[害羞]' : 'emoji_38.png',
	'[快哭了]' : 'emoji_39.png',
	'[拜拜]' : 'emoji_40.png',
	'[黑线]' : 'emoji_41.png',
	'[强]' : 'emoji_42.png',
	'[弱]' : 'emoji_43.png',
	'[给力]' : 'emoji_44.png',
	'[浮云]' : 'emoji_45.png',
	'[围观]' : 'emoji_46.png',
	'[威武]' : 'emoji_47.png',
	'[相机]' : 'emoji_48.png',
	'[汽车]' : 'emoji_49.png',
	'[飞机]' : 'emoji_50.png',
	'[爱心]' : 'emoji_51.png',
	'[奥特曼]' : 'emoji_52.png',
	'[兔子]' : 'emoji_53.png',
	'[熊猫]' : 'emoji_54.png',
	'[不要]' : 'emoji_55.png',
	'[ok]' : 'emoji_56.png',
	'[赞]' : 'emoji_57.png',
	'[勾引]' : 'emoji_58.png',
	'[耶]' : 'emoji_59.png',
	'[爱你]' : 'emoji_60.png',
	'[拳头]' : 'emoji_61.png',
	'[差劲]' : 'emoji_62.png',
	'[握手]' : 'emoji_63.png',
	'[玫瑰]' : 'emoji_64.png',
	'[心]' : 'emoji_65.png',
	'[伤心]' : 'emoji_66.png',
	'[猪头]' : 'emoji_67.png',
	'[咖啡]' : 'emoji_68.png',
	'[麦克风]' : 'emoji_69.png',
	'[月亮]' : 'emoji_70.png',
	'[太阳]' : 'emoji_71.png',
	'[啤酒]' : 'emoji_72.png',
	'[萌]' : 'emoji_73.png',
	'[礼物]' : 'emoji_74.png',
	'[互粉]' : 'emoji_75.png',
	'[钟]' : 'emoji_76.png',
	'[自行车]' : 'emoji_77.png',
	'[蛋糕]' : 'emoji_78.png',
	'[围巾]' : 'emoji_79.png',
	'[手套]' : 'emoji_80.png',
	'[雪花]' : 'emoji_81.png',
	'[雪人]' : 'emoji_82.png',
	'[帽子]' : 'emoji_83.png',
	'[树叶]' : 'emoji_84.png',
	'[足球]' : 'emoji_85.png'
};

// message 中
$(function() {
	$('.friendinfo .firstchatinfo').each(function() {
		var msg = $(this).text();
		if (checkStr(msg)) {
			msg = splitX(msg);
		} else {
			if (msg.length > 20) {
				msg = msg.substring(0, 20) + "...";
			}
		}
		$(this).html(msg);

	});
});