/*$(document).ready(function() {
	var dpr, rem, scale;
	dpr = window.devicePixelRatio || 1;
	rem = document.documentElement.clientWidth * dpr / 10;

	var docEl = document.documentElement;
	var fontEl = document.createElement('style');
	var metaEl = document.querySelector('meta[name="viewport"]');
	if (docEl.clientWidth < 375 && dpr > 2) {
		dpr = 2;
	}
	if (docEl.clientWidth < 375 && dpr < 2) {
		dpr = 2;
	}
	if (docEl.clientWidth > 375 && dpr < 2) {
		dpr = 2;
	}
	if (docEl.clientWidth > 375 && dpr > 2) {
		dpr = 2;
	}
	// 5s 4s
	
	scale = 2 / dpr;
	var clientWidth = dpr * docEl.clientWidth;
	// alert(scale+","+dpr+","+docEl.clientWidth);
	// dpr = win.devicePixelRatio || 1;
	// rem = docEl.clientWidth * dpr / 10;
	// 设置viewport，进行缩放，达到高清效果
	// <meta content="width=device-width, initial-scale=1.0,
	// maximum-scale=1.0, user-scalable=0" name="viewport" />
	metaEl.setAttribute('content', 'width=' + clientWidth / 2
			+ ',initial-scale = ' + scale + ', maximum-scale = '
			+ scale + ',minimum-scale = ' + scale
			+ ', user-scalable = 0');

	// metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth
	// + ',initial-scale = ' + scale + ', maximum-scale = ' + scale +
	// ',minimum-scale = ' + scale + ', user-scalable = no ');
	// 设置data-dpr属性，留作的css hack之用
	docEl.setAttribute('data-dpr', dpr);
	// 动态写入样式
	docEl.firstElementChild.appendChild(fontEl);
	// fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';
	// 给js调用的，某一dpr下rem和px之间的转换函数
	window.dpr = dpr;
	window.rem = rem;
	// alert("scale:" + scale + ",dpr:" + dpr);
}); */

// 自定义的弹出框提示 message 提示文字
function meibao_alert(message) {
	var oDiv = document.createElement('div');
	oDiv.id = "alert";
	var html = "<div class=\"mask\"></div><div class=\"pop-up\"><div class=\"message\"><div>"
			+ message
			+ "</div></div><div class=\"confirm\" onclick=\"hide()\">知道了</div></div>";
	oDiv.innerHTML = html;
	document.body.appendChild(oDiv);
	$("#alert .mask").show();
	$("#alert .pop-up").show();
}

function hide() {
	$("#alert").remove();
}
$(".mask").click(function() {
	$("#alert").remove();
});

// 创建cookie
function addcookie(name, value) {
	// 设置名称为name,值为value的Cookie
	var expdate = new Date(); // 初始化时间
	expdate.setTime(expdate.getTime() + 365 * 60 * 60 * 1000 * 24); // 时间
	document.cookie = name + "=" + value + ";expires=" + expdate.toGMTString()
			+ ";path=/";
	// 即document.cookie= name+"="+value+";path=/";
	// 时间可以不要，但路径(path)必须要填写，因为JS的默认路径是当前页，如果不填，此cookie只在当前页面生效！~
}
// 获取cookie
function getcookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(",", c_start)
			if (c_end == -1)
				c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}
// 获取URL链接中后面连接的参数
function getUrlParam(url, name) {
	var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
	var matcher = pattern.exec(url);
	var items = "";
	if (matcher != null) {
		try {
			items = decodeURIComponent(decodeURIComponent(matcher[1]));
		} catch (e) {
			try {
				items = decodeURIComponent(matcher[1]);
			} catch (e) {
				items = matcher[1];
			}
		}
	}
	return items;
}

// 接口服务器地址
var server = "http://192.168.50.198:8081/jiebao-merchant/";
// var server = "http://192.168.50.189:8080/";
// 必传字段 "&appName=merchantH5&appVersion=1.0&deviceNumber=123456"
var must_send = getcookie("must_send");
// H5与Native交互协议
var nativelogin = "jiebao://init";