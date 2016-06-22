angular.module('app')
    .controller('rechargePayCtrl', ['$scope', '$stateParams', '$log', 'userService', function ($scope, $stateParams, $log, userService) {
        $scope.pageClass = "pageRechargePay";
        var rechargeWay = $stateParams.way;
        $scope.rechargeWayName = $stateParams.name;


        $scope.qrCode = {
            isQrShow: false,
            show: function (money) {
                userService.recharge(money).success(function (data) {
                    $log.debug(data);
                    var blob = new Blob([data], {
                        type: 'image/png'
                    });
                    $log.debug(blob);
                    var objectURL = URL.createObjectURL(blob);
                    $("#qrCode").attr("src", objectURL);
                }).error(function (err) {
                    $log.debug(err);
                });

                this.isShow = true;
                $scope.$emit('isBlackBlindsShow', true);
                $scope.$apply();
            },
            hide: function () {
                this.isShow = false;
                $scope.$emit('isBlackBlindsShow', false);
                $scope.$apply();
            }
        }
        NProgress.done();
    }])
    .directive('rechargePayListKeyListener', ['$log', '$timeout', 'keyListener', function ($log, $timeout, keyListener) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    var rechargeWay = scope.$parent.rechargeWay;
                    keyListener.listKeyListener({
                        element: element.parent(),
                        id: "rechargePayList",
                        label: "li",
                        columnNum: 3,
                        up: function () {
                            keyListener.focus('indexMenu');
                        },
                        down: function () {
                            keyListener.focus('rechargePayCustom');
                        },
                        enter: function (item) {
                        }
                    });

                    $timeout(function () {
                        $(element.parent().children().first()).focus();
                    }, 700);
                }
            }
        };
    }])
    .directive('rechargePayCustomKeyListener', ['$log', '$timeout', 'keyListener', function ($log, $timeout, keyListener) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                keyListener.keyListener({
                    element: element,
                    id: "rechargePayCustom",
                    up: function () {
                        keyListener.focus('rechargePayList');
                    },
                    down: function () {
                        //keyListener.focus('rechargePayButton');
                    },
                    back: function () {
                        if (!element.val()) {
                            history.back();
                        }
                    },
                    enter: function () {
                        if (element.val()) {
                            scope.$parent.qrCode.show(element.val());
                            $timeout(function () {
                                keyListener.focus("rechargeQrCode");
                            }, 300);
                        }
                    }
                });

            }
        };
    }])
    .directive('rechargePayButtonKeyListener', ['$log', '$timeout', 'keyListener', function ($log, $timeout, keyListener) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                keyListener.keyListener({
                    element: element,
                    id: "rechargePayButton",
                    up: function () {
                        keyListener.focus('rechargePayCustom');
                    },
                    enter: function (item) {
                    }
                });

            }
        };
    }])
    .directive('rechargeQrCodeKeyListener', ['$log', '$timeout', 'keyListener', function ($log, $timeout, keyListener) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                keyListener.keyListener({
                    element: element,
                    id: "rechargeQrCode",
                    enter: function (item) {
                        scope.$parent.qrCode.hide();
                        $timeout(function () {
                            keyListener.focus("rechargePayButton");
                        }, 300);
                        return false;
                    },
                    back: function () {
                        scope.$parent.qrCode.hide();
                        $timeout(function () {
                            keyListener.focus("rechargePayButton");
                        }, 300);
                        return false;
                    }
                });

            }
        };
    }]);