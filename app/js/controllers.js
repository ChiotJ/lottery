/**
 * Created by jian_ on 2016/5/9.
 */
'use strict';
var app = angular.module("app");
/*index*/
app.controller("bodyCtrl", ['$scope', '$log', function ($scope, $log) {
    $scope.keydown = function ($event) {
        var key = $event.keyCode;
        if (key == 27) {
            //$log.debug("bodyCtrl");
        } else if (key == 8) {
        }

    }
}]);

app.controller('userCtrl', ["$scope", '$log', function ($scope, $log) {
    $scope.userInfo = {
        userName: "翦英硕",
        balance: 50
    };

    $scope.winInfos = [
        {
            "text": "恭喜用户222222中2014055期双色球6000元奖金"
        },
        {
            "text": "恭喜用户222222中2014055期双色球6000元奖金"
        }
    ];

    $scope.funcs = [
        {
            "text": "我的投注",
            "enter": function () {
                $log.debug("我的投注");
            }
        },
        {
            "text": "充值",
            "enter": function () {
                $log.debug("充值");
            }
        },
        {
            "text": "登录",
            "enter": function () {
                $log.debug("登录");
            }
        }
    ];
}]);


app.controller('homeCtrl', ['$scope', '$log', '$state', '$window', function ($scope, $log, $state, $window) {
    $scope.pageClass = "pageHome";
    $scope.menus = [
        {
            "id": "1",
            "enter": function () {
                $log.debug("福利彩票");

            }
        },
        {
            "id": "2",
            "enter": function () {
                $log.debug("体育彩票");
            }
        },
        {
            "id": "3",
            "enter": function () {
                $log.debug("开奖信息");
            }
        },
        {
            "id": "4",
            "enter": function () {
                $log.debug("活动专区");
            }
        },
        {
            "id": "5",
            "enter": function () {
                $log.debug("彩票讲堂");
            }
        },
        {
            "id": "6",
            "enter": function () {
                $log.debug("我的账户");
            }
        }
    ];

    NProgress.done();
}]);

app.controller('aboutController', ['$scope', '$state', '$log', function ($scope, $state, $log) {
    NProgress.done();
}]);

app.controller('contactController', ['$scope', '$http', function ($scope, $http) {
    NProgress.done();
}]);
