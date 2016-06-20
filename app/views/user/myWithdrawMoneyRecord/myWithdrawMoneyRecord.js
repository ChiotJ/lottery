angular.module('app')
    .controller('myWithdrawMoneyRecordCtrl', ['$scope', '$log', '$state', '$timeout', 'userService', 'keyListener', function ($scope, $log, $state, $timeout, userService, keyListener) {
        $scope.pageClass = "pageMyWithdrawMoneyRecord";


        $scope.pageInfo = {
            current: 0,
            total: 0,
            size: 6,
            prev: function () {
                if (this.current < 2) {
                    return;
                }
                getMyWithdrawMoneyRecord((this.current - 2), this.size);
            },
            next: function () {
                if (this.current > (this.total - 1)) {
                    return;
                }
                getMyWithdrawMoneyRecord((this.current), this.size);
            },
            calTotal: function (current, total) {
                this.current = current + 1;
                if (total % this.size == 0) {
                    this.total = total / this.size;
                    if (this.total == 0) {
                        this.total = 1;
                    }
                } else {
                    this.total = parseInt(total / this.size) + 1;
                }
            }
        };

        $scope.detailList = [];

        var detailListIscroll = null;

        function getMyWithdrawMoneyRecord(current, size) {
            userService.getMyWithdrawMoneyRecord(current, size)
                .success(function (data) {
                    $log.debug(data);
                    if (data.success) {
                        $scope.detailList = data.result.orderResults;
                        $scope.pageInfo.calTotal(current, data.result.totalElements);
                        $timeout(function () {
                            if (detailListIscroll) {
                                detailListIscroll.refresh();
                            } else {
                                detailListIscroll = new IScroll('#detailList', {
                                    mouseWheel: true,
                                    bounce: false,
                                    scrollbars: true,
                                    snap: true
                                });
                            }

                        }, 100);
                    }
                })
                .error(function (error) {
                    //$log.error(error);
                });
        }

        getMyWithdrawMoneyRecord(0, 6);

        $scope.$on('prevPage', function (e) {
            detailListIscroll.prev();
        });


        $scope.$on('nextPage', function (e) {
            detailListIscroll.next();
        });

        NProgress.done();
    }])
    .directive('myWithdrawMoneyRecordKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', function ($log, $timeout, $state, keyListener, userService) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                keyListener.keyListener({
                    element: element,
                    id: "myWithdrawMoneyRecord",
                    up: function () {
                        keyListener.focus('indexMenu');
                    },
                    left: function () {
                        $(element.find('img')[0]).focus();
                    },
                    right: function () {
                        $(element.find('img')[1]).focus();
                    },
                    pageUp: function () {
                        scope.$parent.pageInfo.prev();
                    },
                    pageDown: function () {
                        scope.$parent.pageInfo.next();
                    },
                    enter: function (item) {
                        var idx = $(item).attr('idx');
                        if (idx == 0) {
                            scope.$parent.pageInfo.prev();
                        } else {
                            scope.$parent.pageInfo.next();
                        }
                    }
                });

                $timeout(function () {
                    $(element.find('img')[0]).focus();
                }, 700);
            }
        };
    }])
    .filter('myWithdrawMoneyRecordMethod', function () {
        return function (bettingMethod) {
            var result = "";
            if (bettingMethod == 1) {
                result = "自选";
            } else if (bettingMethod == 2) {
                result = "机选";
            } else {
                result = "异常";
            }
            return result;
        }
    })
    .filter('myWithdrawMoneyRecordTime', function () {
        return function (bettingTime) {
            return bettingTime.substring(5, 16);
        }
    })
    .filter('myWithdrawMoneyRecordAmount', ['$sce', function ($sce) {
        return function (amount, nos) {
            var html = "";
            if (typeof amount === "number" && amount > 0) {
                html = "<span class='red'>" + amount + "</span>";
            } else {
                if (nos) {
                    html = "0";
                } else {
                    html = "--";
                }

            }
            return $sce.trustAsHtml(html);
        }
    }])
    .filter('myWithdrawMoneyRecordNos', ['$sce', function ($sce) {
        return function (nos) {
            var html = "";
            if (nos) {
                html = "<span class='red'>开奖</span>";
            } else {
                html = "<span class='green'>待开奖</span>";
            }
            return $sce.trustAsHtml(html);
        }
    }]);
    
