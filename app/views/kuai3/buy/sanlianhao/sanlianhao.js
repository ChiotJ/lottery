'use strict';
angular.module('kuai3')
    .controller('kuai3BuySanLianHaoCtrl', ['$scope', '$state', '$log', function ($scope, $state, $log) {
        $scope.betting = function () {
            var craps, betType, method = 1;

            betType = 7;
            craps = [0, 0, 0];

            $state.go("kuai3OrderConfirm", {
                method: method,
                betType: betType,
                craps: craps
            });
        };
    }])
    .directive('kuai3SanLianHaoChoiceKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', 'kuai3Service', function ($log, $timeout, $state, keyListener, userService, kuai3Service) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                keyListener.keyListener({
                    element: element.parent(),
                    enter: function (item) {
                        if (kuai3Service.current.canBetting) {
                            if (userService.userInfo.userId) {
                                scope.$parent.betting();
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
                                    element.focus();
                                },
                                enter: function () {
                                    element.focus();
                                }
                            });
                        }
                    }
                });
                $timeout(function () {
                    element.focus();
                }, 700);
            }
        };
    }]);