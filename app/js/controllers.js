/**
 * Created by jian_ on 2016/5/9.
 */
'use strict';
var app = angular.module("app");
/*index*/
app.controller("ApplicationController", ['$scope', '$timeout', '$state', '$log', 'userService', function ($scope, $timeout, $state, $log, userService) {
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
        timeOut: null,
        showNotice: function (config) {
            //$log.debug("showNotice", config);
            $scope.isBlackBlindsShow = true;

            var self = this;
            this.isAppNoticsShow = true;
            this.title = config.title;
            this.content = config.content;
            this.bottom = config.bottom;
            this.middleClass = config.middleClass || 'notice';
            this.bottomClass = config.bottomClass || 'time';

            if (config.time) {
                this.timeOut = $timeout(function () {
                    $scope.isBlackBlindsShow = false;
                    self.isAppNoticsShow = false;
                    if (config.callback) {
                        config.callback();
                    }
                }, config.time);
            }
            this.enter = function () {

                if (typeof config.enter === 'function') {
                    $scope.isBlackBlindsShow = false;
                    self.isAppNoticsShow = false;
                    if (self.timeOut)
                        $timeout.cancel(self.timeOut);

                    return config.enter();
                } else {
                    return false;
                }

            };

            this.back = function () {
                if (typeof config.back === 'function') {
                    $scope.isBlackBlindsShow = false;
                    self.isAppNoticsShow = false;
                    if (self.timeOut)
                        $timeout.cancel(self.timeOut);

                    return config.back();
                } else {
                    return false;
                }

            };

            $timeout(function () {
                $("#app-notice").focus();
            })
        },
        hideNotice: function (callback) {
            $scope.isBlackBlindsShow = false;
            this.isAppNoticsShow = false;
            if (this.timeOut)
                $timeout.cancel(this.timeOut);

            if (typeof callback === "function") {
                callback();
            }
        }
    };


    $scope.$on('showNotice', function (event, config) {
        $scope.appNotice.showNotice(config);
    });

    $scope.$on('hideNotice', function (event, callback) {
        $scope.appNotice.hideNotice(callback);
    });


    $scope.isShowIndexMenu = true;

    $scope.$on('isShowIndexMenu', function (event, flag) {
        $scope.isShowIndexMenu = flag;
    });

    $scope.$on('notLogin', function (event, back) {
        var config = {
            title: "提示",
            content: "您还未登录哦",
            bottom: "去登陆",
            bottomClass: "button",
            enter: function () {
                $state.go("login");
            },
            back: back
        };
        $scope.appNotice.showNotice(config);
    });

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
                if ($(".pageLogin").length < 1)
                    $state.go("login");
            }
        }
    ];


}]);

