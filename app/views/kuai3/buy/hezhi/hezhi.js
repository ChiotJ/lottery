'use strict';
angular.module('kuai3')
    .controller('kuai3BuyHeZhiCtrl', ['$scope', '$state', '$log', function ($scope, $state, $log) {
        $scope.hezhi = [
            {
                "num": "4",
                "money": "80元"
            },
            {
                "num": "5",
                "money": "40元"
            },
            {
                "num": "6",
                "money": "25元"
            },
            {
                "num": "7",
                "money": "16元"
            },
            {
                "num": "8",
                "money": "12元"
            },
            {
                "num": "9",
                "money": "10元"
            },
            {
                "num": "10",
                "money": "9元"
            },
            {
                "num": "11",
                "money": "9元"
            },
            {
                "num": "12",
                "money": "10元"
            },
            {
                "num": "13",
                "money": "12元"
            },
            {
                "num": "14",
                "money": "25元"
            },
            {
                "num": "15",
                "money": "16元"
            },
            {
                "num": "16",
                "money": "40元"
            },
            {
                "num": "17",
                "money": "80元"
            }
        ];


        $scope.betting = function (idx) {
            var craps, method = 1;

            if (parseInt(idx) == 0) {
                idx = parseInt(Math.random() * 14);
                method = 2;
            } else {
                idx--;
                method = 1;
            }
            craps = [parseInt($scope.hezhi[idx].num)];
            $state.go("kuai3OrderConfirm", {
                method: method,
                betType: 8,
                craps: craps
            });
        };

    }])
    .directive('kuai3HeZhiChoiceKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', 'kuai3Service', function ($log, $timeout, $state, keyListener, userService, kuai3Service) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    keyListener.listKeyListener({
                        element: element.parent(),
                        id: "kuai3HeZhiChoice",
                        label: "li",
                        columnNum: 15,
                        enter: function (item) {
                            if (kuai3Service.current.canBetting) {
                                var index = $(item).index();
                                if (userService.userInfo.userId) {
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
                                        keyListener.focus("kuai3HeZhiChoice");
                                    },
                                    enter: function () {
                                        keyListener.focus("kuai3HeZhiChoice");
                                    }
                                });
                            }


                        }
                    });
                    $timeout(function () {
                        $(element.parent().children().first()).focus();
                    }, 700);
                }
            }
        };
    }]);