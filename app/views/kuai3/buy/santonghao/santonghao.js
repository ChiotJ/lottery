'use strict';
angular.module('kuai3')
    .controller('kuai3BuySanTongHaoCtrl', ['$scope', '$state', '$log', function ($scope, $state, $log) {
        $scope.santonghao = [
            {
                "craps": [1, 1, 1],
                "money": "奖金240元"
            },
            {
                "craps": [2, 2, 2],
                "money": "奖金240元"
            },
            {
                "craps": [3, 3, 3],
                "money": "奖金240元"
            },
            {
                "craps": [4, 4, 4],
                "money": "奖金240元"
            },
            {
                "craps": [5, 5, 5],
                "money": "奖金240元"
            },
            {
                "craps": [6, 6, 6],
                "money": "奖金240元"
            }
        ];

        $scope.betting = function (idx) {
            var craps, betType, method = 1;

            if (parseInt(idx) == 0) {
                betType = 6;
                craps = [0, 0, 0];
            } else {
                idx--;
                betType = 5;
                craps = $scope.santonghao[idx].craps;
            }

            $state.go("order_confirm", {
                method: method,
                betType: betType,
                craps: craps
            });
        };
    }])
    .directive('kuai3SanTongHaoChoiceKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', 'kuai3Service', function ($log, $timeout, $state, keyListener, userService, kuai3Service) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    keyListener.listKeyListener({
                        element: element.parent(),
                        id: "kuai3SanTongHao",
                        label: "li",
                        columnNum: 7,
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
                                        keyListener.focus("kuai3SanTongHao");
                                    },
                                    enter: function () {
                                        keyListener.focus("kuai3SanTongHao");
                                    }
                                });
                            }
                        },
                        back: function (item) {
                            scope.$emit('isShowIndexMenu', true);
                        }
                    });
                    $timeout(function () {
                        $(element.parent().children()[1]).focus();
                    }, 700);
                }
            }
        };
    }]);