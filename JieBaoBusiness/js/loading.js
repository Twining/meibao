//获取浏览器页面可见高度和宽度
var dpr = window.devicePixelRatio;
//如三星S4手机
if(document.documentElement.clientWidth < 375 && dpr > 2) {
	dpr = 2;
}
//如NOKIA Lumia 520手机（虽然很少见）
if(document.documentElement.clientWidth < 375 && dpr < 2) {
	dpr = 2;
}
//如LG L70手机
if(document.documentElement.clientWidth > 375 && dpr < 2) {
	dpr = 2;
}
if(document.documentElement.clientWidth > 375 && dpr > 2) {
	dpr = 2;
}
var _PageHeight = document.documentElement.clientHeight * dpr,
	_PageWidth = document.documentElement.clientWidth * dpr;
//计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）
var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0,
	_LoadingLeft = _PageWidth > 105 ? (_PageWidth - 105) / 2 : 0;
//在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml = '<div id="loadingDiv" style="position:absolute;left:0;width:100%;height:' + _PageHeight + 'px;top:0;background:#ffffff;opacity:1;filter:alpha(opacity=80);z-index:10000;"><div style="position: absolute;cursor: wait;left: 0;right: 0;top: 0;bottom:0;margin:auto;width: ' + 150 * dpr + 'px;height: ' + 30 * dpr + 'px;line-height: ' + 30 * dpr + 'px;font-size:' + 15 * dpr + 'px;padding-left: ' + 25 * dpr + 'px;padding-right: 5px;background: #fff url(images/loading.gif) no-repeat scroll 0px 5px;background-size: ' + 25 * dpr + 'px ' + 25 * dpr + 'px;color: #696969;font-family: \'Microsoft YaHei\';">页面加载中，请等待...</div></div>';
//呈现loading效果
document.write(_LoadingHtml);
//监听加载状态改变
document.onreadystatechange = completeLoading;
//加载状态为complete时移除loading效果
function completeLoading() {
	if(document.readyState == "complete") {
		var loadingMask = document.getElementById('loadingDiv');
		loadingMask.parentNode.removeChild(loadingMask);
	}
}