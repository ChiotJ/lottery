'use strict';
angular.module('kuai3')
    .controller('kuai3BuyJiXuanCtrl', ['$scope', '$state', '$log', function ($scope, $state, $log) {
        $scope.isRenXuanResult = true;

        $scope.craps = [];
        $scope.sum = 4;

        $scope.renxuanRandom = function () {
            var num = parseInt(Math.random() * 2) + 2, i = 0;
            $scope.craps = [];
            while (i < num) {
                $scope.craps[i] = parseInt(Math.random() * 6) + 1;
                i++;
            }
            $scope.craps.sort();
        };

        $scope.hezhiRandom = function () {
            $scope.sum = parseInt(Math.random() * 14) + 4;
        };

        $scope.renxuanRandom();

        $scope.betting = function (idx) {
            var craps, betType, method = 2;
            if (idx == 0) {
                craps = $scope.craps;
                if (craps.length == 2) {
                    if (craps[0] == craps[1]) {
                        betType = 3;
                    } else {
                        betType = 1;
                    }
                } else if (craps.length == 3) {
                    if (craps[0] == craps[1] && craps[0] == craps[2]) {
                        betType = 5;
                    } else if (craps[0] == craps[1] || craps[0] == craps[2] || craps[1] == craps[2]) {
                        betType = 2;
                    } else {
                        betType = 4;
                    }
                }
            } else {
                betType = 8;
                craps = [$scope.sum];
            }


            $state.go("order_confirm", {
                method: method,
                betType: betType,
                craps: craps
            });
        };

    }])
    .directive('kuai3JiXuanChoiceKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', 'kuai3Service', function ($log, $timeout, $state, keyListener, userService, kuai3Service) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                var idx = 0;
                keyListener.keyListener({
                    element: element,
                    id: "kuai3JiXuan",
                    left: function () {
                        idx = 0;
                        $(element.children()[0]).focus();
                        scope.$parent.isRenXuanResult = true;
                        scope.$parent.renxuanRandom();
                    },
                    right: function () {
                        idx = 1;
                        $(element.children()[1]).focus();
                        scope.$parent.isRenXuanResult = false;
                        scope.$parent.hezhiRandom();
                    },
                    enter: function (item) {
                        if (kuai3Service.current.canBetting) {
                            var index = $(item).index();
                            if (userService.userId) {
                                scope.$parent.betting(index);
                            } else {
                                scope.$emit('notLogin');
                            }
                        } else {
                            scope.$emit('showNotice', {
                                title: "提示",
                                content: "本期投注已截止",
                                bottom: "3秒后自动消失,或按“确定”消失",
                                time: 3000,
                                callback: function () {
                                    $(element.children()[idx]).focus();
                                },
                                enter: function () {
                                    $(element.children()[idx]).focus();
                                }
                            });
                        }
                    },
                    back: function (item) {
                        scope.$emit('isShowIndexMenu', true);
                    }
                });
                $timeout(function () {
                    $(element.children()[0]).focus();
                }, 700);
            }
        };
    }]);