/**
 * Created by jian_ on 2016/5/9.
 */
'use strict';
var app = angular.module("app");
/*index*/
app.controller("ApplicationController", ['$scope', '$timeout', '$log', 'userService', function ($scope, $timeout, $log, userService) {
    $scope.keydown = function ($event) {
        var key = $event.keyCode;
        if (key == 27) {
            //$log.debug("bodyCtrl");
        } else if (key == 8) {
        }

    };

    $scope.currentUser = {
        username: null,
        balance: 0,
        isShowUserInfo: false,
        setCurrentUser: function () {
            userService.name != null && (this.username = userService.name, this.isShowUserInfo = true);
            this.balance = userService.balance() || 0;
        },
        updateCurrentUser: function () {
            var self = this;
            userService.updateUser().then(function () {
                self.setCurrentUser();
            })
        }
    };

    $scope.isBlackBlindsShow = false;

    $scope.appNotice = {
        isAppNoticsShow: false,
        title: "提示",
        content: "",
        bottom: "",
        middleClass: "notice",
        bottomClass: "button",
        enter: null,
        showNotice: function (config) {
            $log.debug("showNotice", config);
            $scope.isBlackBlindsShow = true;

            var self = this;
            this.isAppNoticsShow = true;
            this.title = config.title;
            this.content = config.content;
            this.bottom = config.bottom;
            this.middleClass = config.middleClass || 'notice';
            this.bottomClass = config.bottomClass || 'time';

            this.enter = config.enter;
            if (config.time) {
                $timeout(function () {
                    $scope.isBlackBlindsShow = false;
                    self.isAppNoticsShow = false;
                    if (config.callback) {
                        config.callback();
                    }
                }, config.time);
            }
            this.enter = function () {
                $scope.isBlackBlindsShow = false;
                self.isAppNoticsShow = false;

                if (config.enter) {
                    config.enter();
                }
            }


        }
    }

}]);

app.controller('userCtrl', ["$scope", '$state', '$log', function ($scope, $state, $log) {
    $scope.winInfos = [
        {
            "text": "恭喜用户222222中2014055期双色球6000元奖金"
        },
        {
            "text": "恭喜用户222222中2014055期双色球6000元奖金"
        }
    ];

    $scope.menus = [
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
                $state.go("login");
            }
        }
    ];


}]);

