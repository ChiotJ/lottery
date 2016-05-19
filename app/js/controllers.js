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

/*home*/
app.controller('homeCtrl', ['$scope', '$log', '$state', function ($scope, $log, $state) {
    $scope.pageClass = "pageHome";
    $scope.menus = [
        {
            "id": "1",
            "enter": function () {
                $log.debug("福利彩票");
                //$log.debug($state)
                $state.go("welfareList", {});
            },
            "hasGif": true
        },
        {
            "id": "3",
            "enter": function () {
                $log.debug("开奖信息");
            },
            "hasGif": false
        },
        {
            "id": "4",
            "enter": function () {
                $log.debug("活动专区");
            },
            "hasGif": true
        },
        {
            "id": "5",
            "enter": function () {
                $log.debug("彩票讲堂");
            },
            "hasGif": true
        },
        {
            "id": "6",
            "enter": function () {
                $log.debug("我的账户");
            },
            "hasGif": true
        },
        {
            "id": "2",
            "enter": function () {
                $log.debug("体育彩票");
            },
            "hasGif": false
        }
    ];

    NProgress.done();
}]);

/*welfareList*/
app.controller('welfareListCtrl', ['$scope', '$log', '$state', function ($scope, $log, $state) {
    $scope.pageClass = "pageWelfareList";
    $scope.lotteryList = [
        {
            "id": "PK10",
            "series": "100001",
            "notice": "每五分钟开一次奖最高奖金",
            "money": "100万",
            "h": "10",
            "m": "00",
            "s": "03"
        },
        {
            "id": "Kuai3",
            "series": "100001",
            "notice": "每五分钟开一次奖最高奖金",
            "money": "100万",
            "h": "01",
            "m": "00",
            "s": "03"
        },
        {
            "id": "PK10",
            "series": "100001",
            "notice": "每五分钟开一次奖最高奖金",
            "money": "100万",
            "h": "00",
            "m": "00",
            "s": "03"
        },
        {
            "id": "PK10",
            "series": "100001",
            "notice": "每五分钟开一次奖最高奖金",
            "money": "100万",
            "h": "10",
            "m": "00",
            "s": "03"
        },
        {
            "id": "Kuai3",
            "series": "100001",
            "notice": "每五分钟开一次奖最高奖金",
            "money": "100万",
            "h": "01",
            "m": "00",
            "s": "03"
        },
        {
            "id": "PK10",
            "series": "100001",
            "notice": "每五分钟开一次奖最高奖金",
            "money": "100万",
            "h": "00",
            "m": "00",
            "s": "03"
        },
        {
            "id": "Kuai3",
            "series": "100001",
            "notice": "每五分钟开一次奖最高奖金",
            "money": "100万",
            "h": "01",
            "m": "00",
            "s": "03"
        },
        {
            "id": "PK10",
            "series": "100001",
            "notice": "每五分钟开一次奖最高奖金",
            "money": "100万",
            "h": "00",
            "m": "00",
            "s": "03"
        }
    ];


    NProgress.done();
}]);
