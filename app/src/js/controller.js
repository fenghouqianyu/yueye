angular.module("myapp")
	.controller("index",index)
	.controller("login",login)
	.controller("zhuche",zhuche)
	.controller("shujia",shujia);
function index ($scope,$http) {
	$http.jsonp("http://127.0.0.1:3030/getindexdata?callback='JSON_CALLBACK'").success(function (a) {
		$scope.data = a
	})
	setTimeout(function (argument) {
		new IScroll("#main",{
			click:true
		})
	},100)
}
function shujia ($scope,$rootScope) {
	$scope.data = document.URL.split("#/")[1]
	var div = document.getElementsByTagName("div")
	var dien = 0
	for (var i = 0; i < div.length; i++) {
		if(div[i].className == "dle"){
			dien++
		}
	};
	$scope.div = []
	for (var i = 0; i < dien; i++) {
		$scope.div.push(false)
	};
	$scope.click2 = function (argument) {
	}
	$scope.show = false
	var text = ["管理","书架"]
	$scope.a = text[0]
	$scope.b = text[1]
	$scope.click = function (argument) {
		$scope.show = !$scope.show
		if($scope.show){
			$scope.click2 = function (a) {
				$scope.div[a] = !$scope.div[a]
			}
			$scope.a = text[1]
			$scope.b = text[0]
		}else{
			for (var i = 0; i < $scope.div.length; i++) {
				$scope.div[i] = false
			};
			$scope.click2 = function (argument) {
			}
			$scope.a = text[0]
			$scope.b = text[1]
		}
	}
}
function login ($scope) {
	$scope.name = ""
	$scope.password = ""
	$scope.sub = function (argument) {
		var str = "?name="+$scope.name+"&password="+$scope.password+"&"
		$.ajax({
			url:"http://127.0.0.1:3030/login"+str+"callback=?",
			dataType:"jsonp",
			success:function (res) {
				console.log(res)
				if(res.code){
					console.log(res.name)
					location.href = "#/admain"
				}else{
					if(res.name){
						alert("帐号错误")
					}
					if(res.password){
						alert("密码错误")
					}
				}
			}
		})
	}
}
function zhuche ($scope) {
	$scope.t = 0;
	$scope.test = function () {
		if(!(/^1[34578]\d{9}$/.test($scope.tel))){
			alert("请填写有效的电话好吗")
		}else{
			var str = "?name="+$scope.tel+"&"
			$.ajax({
				url:"http://127.0.0.1:3030/zheche"+str+"callback=?",
				dataType:"jsonp",
				success:function (res) {
					if(res.code == 1){
						alert("号码已经注册")
					}else{
						alert("您的验证码是"+res.test)
						$scope.t = 1;
					}
				}
			})
		}
	}
	$scope.zhuche = function () {
		if($scope.t){
			if(!$scope.text){
				alert("请输入验证码")
			}else{
				var str = "?name="+$scope.tel+"&text="+$scope.text+"&"
				$.ajax({
					url:"http://127.0.0.1:3030/zheche2"+str+"callback=?",
					dataType:"jsonp",
					success:function (res) {
						if(res.code == 0){
							alert("请确定要注册的帐号正确")
						}else if(res.code == 2){
							alert("请输入正确的验证码")
						}else{
							alert("注册成功，您的密码是:"+res.password)
						}
					}
				})
			}
		}else{
			alert("请先获取你的验证码")
		}
	}
}