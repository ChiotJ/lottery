'use strict';
angular.module('fucai')
    .controller('fuCaiIndexCtrl', ['$scope', '$log', '$state', 'kuai3Service', function ($scope, $log, $state, kuai3Service) {
        $scope.pageClass = "pageFuCaiIndex";
        $scope.lotteryList = [
            {
                id: "Kuai3",
                notice: kuai3Service.notice,
                money: kuai3Service.maxMoney,
                current: kuai3Service.current,
                last: kuai3Service.last
            },
            {
                id: "Kuai3",
                notice: kuai3Service.notice,
                money: kuai3Service.maxMoney,
                current: {
                    period: '22222',
                    remainingTime: {
                        h: '00',
                        m: '01',
                        s: '02'
                    }
                },
                last: {
                    period: '',
                    craps: [],
                    sum: 0
                }
            }
        ];

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
                            $state.go("kuai3");
                        }
                    });
                    $timeout(function () {
                        $(element.parent().children().first()).focus();
                    }, 700);


                    timekeeper.timekeeper("fuCaiIndexList", element.parent().children(), function (s, m, h, ele) {
                        if (h < 1 && m < 1) {
                            ele.find(".num").css("background-color", "#E6262F");
                        } else {
                            ele.find(".num").removeAttr("style");
                        }
                    });
                }

            }

        };
    }]);