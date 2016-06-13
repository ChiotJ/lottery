angular.module('app')
    .controller('myBettingCtrl', ['$scope', '$log', '$state', '$timeout', 'userService', function ($scope, $log, $state, $timeout, userService) {
        $scope.pageClass = "pageMyBetting";

        $scope.lotteryList = [
            {
                id: 'Qck3',
                name: '全部'
            },
            {
                id: 'Qck3',
                name: '快3'
            }
        ];

        $scope.detailList = [];

        var detailListIscroll = null;

        userService.getMyBetting('Qck3', 0, 200)
            .success(function (data) {
                if (data.success) {
                    $scope.detailList = data.result.orderResults;
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


        $scope.$on('prevPage', function (e) {
            detailListIscroll.prev(0);
        });


        $scope.$on('nextPage', function (e) {
            detailListIscroll.next(0);
        });


        $scope.detailTable = {
            isShow: false,
            name: '快3',
            period: '',
            multiple: 1,
            money: 0,
            craps: '',
            time: '',
            nos: '',
            bettingTypeStr: ''
        };

        $scope.showDetailTable = function (idx) {
            var obj = $scope.detailList[idx];
            $scope.detailTable.name = '快3';
            $scope.detailTable.period = obj.period;
            $scope.detailTable.time = obj.bettingTime;
            $scope.detailTable.nos = obj.nos ? obj.nos : "待开奖";

            var bettingStr = "";
            if (obj.details[0].method == 1) {
                bettingStr = "自选 ";
            } else {
                bettingStr = "机选 ";
            }

            switch (obj.details[0].betType) {
                case 1:
                    bettingStr += "二不同号";
                    $scope.detailTable.craps = obj.details[0].nos;
                    break;
                case 2:
                    bettingStr += "二同号单选";
                    $scope.detailTable.craps = obj.details[0].nos;
                    break;
                case 3:
                    bettingStr += "二同号复选";
                    $scope.detailTable.craps = obj.details[0].nos;
                    break;
                case 4:
                    bettingStr += "三不同号";
                    $scope.detailTable.craps = obj.details[0].nos;
                    break;
                case 5:
                    bettingStr += "三同号单选";
                    $scope.detailTable.craps = obj.details[0].nos;
                    break;
                case 6:
                    bettingStr += "三同号通选";
                    $scope.detailTable.craps = ['111', '222', '333', '444', '555', '666'].join(",");
                    break;
                case 7:
                    bettingStr += "三连号通选";
                    $scope.detailTable.craps = ['123', '234', '345', '456'].join(",");
                    break;
                case 8:
                    bettingStr += "和值";
                    $scope.detailTable.craps = obj.details[0].nos;
                    break;
            }

            $scope.detailTable.bettingTypeStr = bettingStr;
            $scope.detailTable.money = obj.details[0].amount;
            $scope.detailTable.multiple = obj.details[0].multiple;

            $scope.detailTable.isShow = true;
            $scope.$emit('isBlackBlindsShow', true);
        };

        $scope.hideDetailTable = function () {
            $scope.$emit('isBlackBlindsShow', false);
            $scope.detailTable.isShow = false;
            $scope.$apply();
        };


        NProgress.done();
    }])
    .directive('myBettingKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', function ($log, $timeout, $state, keyListener, userService) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    keyListener.listKeyListener({
                        element: element.parent(),
                        id: "myBetting",
                        label: "li",
                        columnNum: element.parent().length,
                        focus: function (item) {
                            $(".choose").removeClass("choose");
                            $(item).addClass("choose");
                        },
                        up: function () {
                            keyListener.focus('indexMenu');
                            return false;
                        },
                        down: function () {
                            keyListener.focus('myBettingList', 0);
                            return false;
                        }
                    });
                    $timeout(function () {
                        $(element.parent().children().first()).focus();
                    }, 700);
                }
            }
        };
    }])
    .directive('myBettingListKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', function ($log, $timeout, $state, keyListener, userService) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    keyListener.listKeyListener({
                        element: element.parent().parent().parent(),
                        id: "myBettingList",
                        label: ".detail",
                        columnNum: 1,
                        up: {
                            before: function (item) {
                                var idx = keyListener.index['myBettingList'];
                                if (idx == 0) {
                                    keyListener.focus('myBetting');
                                    return false;
                                } else {
                                    if (idx % 6 == 0) {
                                        scope.$emit('prevPage');
                                    }
                                }
                            }
                        },
                        down: {
                            before: function (item) {
                                var idx = keyListener.index['myBettingList'];
                                if ((idx + 1) == keyListener.size['myBettingList']) {
                                    return false;
                                } else {
                                    if ((idx + 1) % 6 == 0) {
                                        scope.$emit('nextPage');
                                    }
                                }

                            }
                        },
                        enter: function (item) {
                            var idx = keyListener.index['myBettingList'];
                            scope.$parent.showDetailTable(idx);
                            $timeout(function () {
                                keyListener.focus('detailTable');
                            }, 100);

                        }
                    });
                }
            }
        };
    }])
    .directive('detailTable', ['$log', 'keyListener', function ($log, keyListener) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                keyListener.keyListener({
                    element: element,
                    id: 'detailTable',
                    enter: function (item) {
                        scope.hideDetailTable();
                        keyListener.focus('myBettingList');
                        return false;
                    },
                    back: function (item) {
                        scope.hideDetailTable();
                        keyListener.focus('myBettingList');
                        return false;
                    }
                });
            }
        };
    }])
    .filter('myBettingMethod', function () {
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
    .filter('myBettingTime', function () {
        return function (bettingTime) {
            return bettingTime.substring(5, 16);
        }
    })
    .filter('myBettingAmount', ['$sce', function ($sce) {
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
    .filter('myBettingNos', ['$sce', function ($sce) {
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
    
