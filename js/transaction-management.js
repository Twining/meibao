$(".content .content-item-text").each(function() {
			$(this).mouseover(function() {
				$(this).addClass("red-text1");
				$(this).parent().parent().siblings().find(".content-item-text").removeClass("red-text1");
			})
		})
		if(getcookie("token") != "") {
			var transaction_management = angular.module('transaction_management', []);
			transaction_management.controller('getOrderNum', function($http, $scope) {
				$http.get(server + "api/order/getOrderNum?accessToken=" + getcookie("token") + must_send).success(function(data) {
					if(data.code == 0) {
						if(data.data.newOrdersNum != 0) {
							$scope.new_order = data.data.newOrdersNum;
						}
						if(data.data.cancleOrdersNum != 0) {
							$scope.sale_order = data.data.cancleOrdersNum;
						}
					} else {
						meibao_alert(data.message);
					}
				});
			});
		}