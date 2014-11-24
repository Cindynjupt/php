Ext.onReady( function() {
		//Ext.Msg.alert('ext','welcome you!');
	var addPanel = function(btn, event) {
		var n;
		n = tabPanel.getComponent(btn.id);
		if(n) {
			tabPanel.setActiveTab(n);
			return;
		}
		n = tabPanel.add( {
			id : btn.id,
			title : btn.text,
			html : '<iframe width=100% height=100% src=' + btn.id +' />',
			autoLoad : '',
                               tabWidth:80,
			closable : 'true'
		});
		tabPanel.setActiveTab(n);
	}
		var item1 = new Ext.Panel( {
			title : 'Category管理',
			//html : '&lt;empty panel&gt;',
			cls : 'empty',
			items : [
				new Ext.Button({
					id : 'Category_list',
					text : 'Category列表',
					width : '100%',
					listeners : {
						click : addPanel
					}

				})

				]
		});
           var menu1=new Ext.menu.Menu({
                   items:[{                //菜单项的集合
                       id:"checklogin",
                       text:"登录用户审核",      //菜单项的文本，
                     listeners : {  click : addPanel  },
                       icon:"../../../resources/admin/images/icon-info.gif"        //菜单项前面的图标
                   },
                   {                //菜单项的集合
                       id:"readregister?province=1",

                       text:"预注册",      //菜单项的文本，

                     listeners : {  click : addPanel  },
                       icon:"../../../resources/admin/images/icon-info.gif"        //菜单项前面的图标

                   },
                   {                //菜单项的集合
                       id:"checkintroduce?type=4",

                       text:"个人介绍审核",      //菜单项的文本，

                     listeners : {  click : addPanel  },
                       icon:"../../../resources/admin/images/icon-info.gif"        //菜单项前面的图标

                   },
                   {                //菜单项的集合
                       id:"getuserinfobykeyword?flag=1",

                       text:"搜索",      //菜单项的文本，

                     listeners : {  click : addPanel  },
                       icon:"../../../resources/admin/images/icon-info.gif"        //菜单项前面的图标

                   }]

               });
       var menu2=new Ext.menu.Menu({
                    items:[
                    {
                         id:"paycount",

                        text:"支付统计",

                      listeners : {  click : addPanel  },

                        icon:"../../../resources/admin/images/icon-info.gif"

                    },
                    {
                         id:"logincount?page=1",

                        text:"登陆统计",

                      listeners : {  click : addPanel  },

                        icon:"../../../resources/admin/images/icon-info.gif"

                    },{
                         id:"collegecount",

                        text:"学校统计",

                      listeners : {  click : addPanel  },

                        icon:"../../../resources/admin/images/icon-info.gif"

                    },{
                         id:"likecount?type=2&&ssex=2&&rsex=2",

                        text:"like统计",

                      listeners : {  click : addPanel  },

                        icon:"../../../resources/admin/images/icon-info.gif"

                    },
                    {
                         id:"loginrecord?flag=0",

                        text:"登陆记录",

                      listeners : {  click : addPanel  },

                        icon:"../../../resources/admin/images/icon-info.gif"

                    }
                    ]});

        var menu3=new Ext.menu.Menu({

                    items:[
                    {
                        id:"useradvice",
                        text:"用户建议",

                      listeners : {  click : addPanel  },

                        icon:"../../../resources/admin/images/icon-info.gif"

                    },
                    {
                        id:"sysadvice?flag=1",
                        text:"公告",

                      listeners : {  click : addPanel  },

                        icon:"../../../resources/admin/images/icon-info.gif"

                    }]

                });

        var menu4=new Ext.menu.Menu({

                    items:[
                    {
                        id:"syscandy?flag=1",
                        text:"添加星星糖",

                      listeners : {  click : addPanel  },

                        icon:"../../../resources/admin/images/icon-info.gif"

                    },
                    {
                        id:"getsysintegral?flag=1",
                        text:"获取用户星星记录",
                      listeners : {  click : addPanel  },
                        icon:"../../../resources/admin/images/icon-info.gif"

                    }]

                });

		var accordion = new Ext.Panel( {
			region : 'north',
			margins : '5 0 0 0',
			split : false,
			height: 33,
			layout : 'accordion',
            tbar:[{text:"审核",icon:"../../../resources/admin/images/table2.gif",menu:menu1},
                  {text:"统计",icon:"../../../resources/admin/images/table2.gif",menu:menu2},
                  {text:"建议反馈",icon:"../../../resources/admin/images/table2.gif",menu:menu3},
                  {text:"星星处理",icon:"../../../resources/admin/images/table2.gif",menu:menu4}
                  ]
		});

		var tabPanel = new Ext.TabPanel( {
			region : 'center',
			enableTabScroll : false,
			deferredRender : false,
			activeTab : 0,
			items : [ {
                html:'<iframe width=100% height=100% src=maininfo/>',
				title : '信息统计'
				//html : 'aaaaaa'
				//autoLoad : 'Category_add.jsp'
			} ]
		});

		var viewport = new Ext.Viewport( {
			layout : 'border',
			items : [ accordion, tabPanel ]
		});

	});
function selectRow(target)
{
var sTable = document.getElementById(target)
for(var i=1;i<sTable.rows.length;i++) //遍历除第一行外的所有行
{
if (sTable.rows[i] != target) //判断是否当前选定行
{
sTable.rows[i].bgColor = "#ffffff"; //设置背景色
sTable.rows[i].onmouseover = resumeRowOver; //增加onmouseover 事件
sTable.rows[i].onmouseout = resumeRowOut;//增加onmouseout 事件
}
else
{
sTable.rows[i].bgColor = "#d3d3d3";
sTable.rows[i].onmouseover = ""; //去除鼠标事件
sTable.rows[i].onmouseout = ""; //去除鼠标事件
}
}
}
//移过时tr的背景色
function rowOver(target)
{
target.bgColor='#e4e4e4';
}
//移出时tr的背景色
function rowOut(target)
{
target.bgColor='#ffffff';
}
//恢复tr的的onmouseover事件配套调用函数
function resumeRowOver()
{
rowOver(this);
}
//恢复tr的的onmouseout事件配套调用函数
function resumeRowOut()
{
rowOut(this);
}

 //点击当前选中行的时候设置当前行的颜色，同时恢复除当前行外的行的颜色及鼠标事件
 function selectRow(target)
 {
 var sTable = document.getElementById("ServiceListTable")
 for(var i=1;i<sTable.rows.length;i++) //遍历除第一行外的所有行
 {
 if (sTable.rows[i] != target) //判断是否当前选定行
 {
 sTable.rows[i].bgColor = "#ffffff"; //设置背景色
 sTable.rows[i].onmouseover = resumeRowOver; //增加onmouseover 事件
 sTable.rows[i].onmouseout = resumeRowOut;//增加onmouseout 事件
 }
 else
 {
 sTable.rows[i].bgColor = "#d3d3d3";
 sTable.rows[i].onmouseover = ""; //去除鼠标事件
 sTable.rows[i].onmouseout = ""; //去除鼠标事件
 }
 }
 }
 //移过时tr的背景色
 function rowOver(target)
 {
 target.bgColor='#e4e4e4';
 }
 //移出时tr的背景色
 function rowOut(target)
 {
 target.bgColor='#ffffff';
 }
 //恢复tr的的onmouseover事件配套调用函数
 function resumeRowOver()
 {
 rowOver(this);
 }
 //恢复tr的的onmouseout事件配套调用函数
 function resumeRowOut()
 {
 rowOut(this);
 }
