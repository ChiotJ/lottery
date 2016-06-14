'use strict';
angular.module('fucai')
    .controller('fuCaiIndexCtrl', ['$scope', '$timeout', '$log', '$state', 'kuai3Service', function ($scope, $timeout, $log, $state, kuai3Service) {
        $scope.pageClass = "pageFuCaiIndex";
        $scope.lotteryList = [
            {
                id: "Kuai3",
                notice: kuai3Service.notice,
                money: kuai3Service.maxMoney,
                current: kuai3Service.current,
                last: kuai3Service.last,
                isRed: false,
                enter: function () {
                    $state.go("kuai3");
                }
            }
        ];

        $scope.$watchCollection(function (scope) {
            var list = scope.lotteryList, i = 0, arr = [];
            for (i in list) {
                var obj = list[i];
                arr.push(obj.current.remainingTime)
            }
            return arr;
        }, function (newList, oldList, scope) {
            var list = scope.lotteryList, i = 0;
            for (i in newList) {
                var obj = list[i];
                var h = obj.current.remainingTime.h, m = obj.current.remainingTime.m, s = obj.current.remainingTime.s;
                scope.lotteryList[i].isRed = (h < 1 && m < 1);
            }
        });

        NProgress.done();
    }])
    .directive('fuCaiIndexListKeyListener', ['$log', '$timeout', '$interval', '$state', 'keyListener', 'timekeeper', function ($log, $timeout, $interval, $state, keyListener, timekeeper) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    keyListener.listKeyListener({
                        element: element.parent(),
                        label: "li",
                        id: "fuCaiIndex",
                        columnNum: 2,
                        up: {
                            before: function (item) {
                                var index = $(item).index();
                                if (index < 2) {
                                    keyListener.focus('indexMenu');
                                    return false;
                                }
                            }
                        },
                        enter: function (item) {
                            var index = $(item).index();
                            var lottery = scope.$parent.lotteryList[index];
                            if (lottery && lottery.current.canBetting) {
                                lottery.enter();
                            } else {
                                scope.$emit('showNotice', {
                                    title: "提示",
                                    content: "本期投注已截止",
                                    bottom: "3秒后自动消失,或按“确定”消失",
                                    time: 3000,
                                    callback: function () {
                                        keyListener.focus("fuCaiIndex");
                                    },
                                    enter: function () {
                                        keyListener.focus("fuCaiIndex");
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