angular.module('app')
    .controller('loginCtrl', ['$scope', '$log', '$state', 'cardId', function ($scope, $log, $state, cardId) {
        $scope.pageClass = "pageLogin";

        $scope.qrCode = 'http://172.16.188.13/api/common/Image/qrCode.png?text=http://t.cn/RG8jxjR?cardId=' + cardId + '&size=140';

        $scope.credentials = {
            username: "",
            password: ""
        };

        $scope.inputFocus = function ($event) {
            $($event.target).parent().css("border", "1px solid #E72432");
        };

        $scope.inputBlur = function ($event) {
            $($event.target).parent().removeAttr("style");
        };

        NProgress.done();
    }])
    .directive('loginKeyListener', ['$log', '$timeout', '$state', '$location', 'keyListener', 'userService', function ($log, $timeout, $state, $location, keyListener, userService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                keyListener.keyListener({
                    element: element,
                    id: 'login',
                    up: function (item) {
                        var index = parseInt($(item).attr('idx')) - 1;
                        if (index >= 0) {
                            $(element.find('.keyListener')[index]).focus();
                        } else {
                            keyListener.focus('indexMenu');
                        }
                        return false;
                    },
                    down: function (item) {
                        var index = parseInt($(item).attr('idx')) + 1;
                        if (index < 3) {
                            $(element.find('.keyListener')[index]).focus();
                        }
                        return false;
                    },
                    click: function () {
                        return false;
                    },
                    enter: function (item) {
                        var index = parseInt($(item).attr('idx'));
                        if (index == 2) {
                            //$log.debug(scope.credentials);
                            scope.credentials = {
                                username: "18810607299",
                                password: "123456"
                            };
                            scope.$emit('showNotice', {
                                title: "提示",
                                content: "登录中",
                                bottom: "如长时间未响应，请稍后再试"
                            });
                            userService.login(scope.credentials).then(function success() {
                                scope.$emit('showNotice', {
                                    title: "提示",
                                    content: "登录成功",
                                    bottom: "3秒后自动跳转,或按“确定”跳转",
                                    time: 3000,
                                    callback: function () {
                                        history.back();
                                    },
                                    enter: function () {
                                        history.back();
                                    }
                                });

                            }, function error(error) {
                                $log.error('login-error', error)
                                if (error.status == 401) {
                                    scope.$emit('showNotice', {
                                        title: "提示",
                                        content: "用户名或密码错误",
                                        bottom: "3秒后自动消失,或按“确定”重新输入",
                                        time: 3000,
                                        callback: function () {
                                            $(element.find(".keyListener")[0]).focus();
                                        },
                                        enter: function () {
                                            $(element.find(".keyListener")[0]).focus();
                                        }
                                    });
                                } else if (error.status == 403) {
                                    scope.$emit('showNotice', {
                                        title: "提示",
                                        content: "账户授权错误",
                                        bottom: "3秒后自动消失,或按“确定”重新输入",
                                        time: 3000,
                                        callback: function () {
                                            $(element.find(".keyListener")[0]).focus();
                                        },
                                        enter: function () {
                                            $(element.find(".keyListener")[0]).focus();
                                        }
                                    });
                                } else {
                                    scope.$emit('showNotice', {
                                        title: "提示",
                                        content: "系统错误",
                                        bottom: "3秒后自动消失,或按“确定”重新输入",
                                        time: 3000,
                                        callback: function () {
                                            $(element.find(".keyListener")[0]).focus();
                                        },
                                        enter: function () {
                                            $(element.find(".keyListener")[0]).focus();
                                        }
                                    });
                                }
                            })
                        }
                        return false;
                    },
                    back: function (item) {
                        var index = parseInt($(item).attr('idx'));
                        if ((index == 1 || index == 0) && $(item).val().length == 0) {
                            history.back();
                            return false;
                        }
                    }
                });
                $timeout(function () {
                    $(element.find(".keyListener")[0]).focus();
                }, 700);
            }
        };
    }]);