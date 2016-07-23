var countdown = 60;
function initCallback(appName, appVersion, platform, deviceNumber) {
	addcookie("must_send", "&appName=" + appName + "&appVersion=" + appVersion
			+ "&deviceNumber" + deviceNumber + "&platform=" + platform);
	window.location.href = "login.html";
}
function loginCallback(clientId) {
	$.post(server + "api/user/login?mobile=" + $("#mobile").val() + "&smsCode="
			+ $("#code").val() + "&clientId=" + clientId + must_send, function(
			data) {
		if (data.code == 0) {
			addcookie("token", data.data.token);
			window.location.href = "transaction-management.html";
		} else {
			meibao_alert(data.message);
		}
	})
}

function settime(obj) {
	if ($("#mobile").val() == "") {
		meibao_alert("手机号码为必填项");
		return;
	}
	if (!(/^1[3|4|5|7|8]\d{9}$/.test($("#mobile").val()))) {
		meibao_alert("手机号码格式不正确");
		return;
	}
	$.post(
			server + "api/user/sendSms?mobile=" + $("#mobile").val()
					+ must_send, function(data) {
				if (data.code == 0) {
					send(obj);
				} else {
					meibao_alert(data.message);
				}
			})
}

function send(obj) {
	if (countdown == 0) {
		obj.removeAttribute("disabled");
		obj.value = "再次发送";
		countdown = 60;
		return;
	} else {
		obj.setAttribute("disabled", true);
		obj.value = "已发送" + countdown + "s";
		countdown--;
	}
	setTimeout(function() {
		send(obj)
	}, 1000)
}

function check() {
	if ($("#mobile").val() == "") {
		meibao_alert("手机号码为必填项");
		return false;
	}
	if (!(/^1[3|4|5|7|8]\d{9}$/.test($("#mobile").val()))) {
		meibao_alert("手机号码格式不正确");
		return false;
	}
	if ($("#code").val() == "") {
		meibao_alert("验证码为必填项");
		return false;
	}
	if ($("#code").val().length != 6) {
		meibao_alert("请输入6位数字的验证码");
		return false;
	}
	return true;
}
$("#login").click(function() {
	if (check()) {
		window.location.href="jiebao://login";
	}
})