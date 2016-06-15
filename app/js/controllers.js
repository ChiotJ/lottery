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
        userInfo: userService.userInfo
    };

    $scope.isBlackBlindsShow = false;

    var isBlackBlindsShowFun = function (flag) {
        $scope.isBlackBlindsShow = flag;
    };

    $scope.$on('isBlackBlindsShow', function (event, flag) {
        isBlackBlindsShowFun(flag)
    });

    $scope.appNotice = {
        isAppNoticsShow: false,
        title: "提示",
        content: "",
        bottom: "",
        middleClass: "notice",
        bottomClass: "button",
        enter: null,
        timeOut: null,
        showAndHide: function (flag) {
            if (flag) {
                isBlackBlindsShowFun(true);
                this.isAppNoticsShow = true;
            } else {
                isBlackBlindsShowFun(false);
                this.isAppNoticsShow = false;
            }
        },
        showNotice: function (config) {
            //$log.debug("showNotice", config);

            this.showAndHide(true);
            var self = this;
            this.title = config.title;
            this.content = config.content;
            this.bottom = config.bottom;
            this.middleClass = config.middleClass || 'notice';
            this.bottomClass = config.bottomClass || 'time';

            if (config.time) {
                this.timeOut = $timeout(function () {
                    self.showAndHide(false);

                    if (config.callback) {
                        config.callback();
                    }
                }, config.time);
            }
            this.enter = function () {

                if (typeof config.enter === 'function') {
                    self.showAndHide(false);
                    if (self.timeOut)
                        $timeout.cancel(self.timeOut);

                    return config.enter();
                } else {
                    return false;
                }

            };

            this.back = function () {
                if (typeof config.back === 'function') {
                    self.showAndHide(false);
                    if (self.timeOut)
                        $timeout.cancel(self.timeOut);

                    return config.back();
                } else {
                    return false;
                }

            };

            $timeout(function () {
                $("#app-notice").focus();
            }, 100);
        },
        hideNotice: function (callback) {
            this.showAndHide(false);
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
                if ($(".pageLogin").length < 1) {
                    $state.go("login");
                } else {
                    $($('#loginInfo').find(".keyListener")[0]).focus();
                }

            },
            back: back
        };
        $scope.appNotice.showNotice(config);
    });

}]);

app.controller('userCtrl', ["$scope", '$state', '$log', 'userService', function ($scope, $state, $log, userService) {
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
                if (userService.userInfo.userId) {
                    if ($(".pageMyBetting").length < 1)
                        $state.go("myBetting");
                } else {
                    $scope.$emit('notLogin');
                }
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

