angular.module('app')
    .controller('myWinRecordCtrl', ['$scope', '$log', '$state', '$timeout', 'userService', 'keyListener', function ($scope, $log, $state, $timeout, userService, keyListener) {
        $scope.pageClass = "pageMyWinRecord";

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

        $scope.pageInfo = {
            current: 0,
            total: 0,
            size: 5,
            prev: function (isSwitch) {
                if (this.current < 2) {
                    return;
                }
                if (isSwitch) {
                    keyListener.focus('myWinRecord');
                }

                getMyWinRecord((this.current - 2), this.size);
            },
            next: function (isSwitch) {
                if (this.current > (this.total - 1)) {
                    return;
                }
                if (isSwitch) {
                    keyListener.focus('myWinRecord');
                }
                getMyWinRecord((this.current), this.size);
            },
            calTotal: function (current, total) {
                this.current = current + 1;
                if (total % this.size == 0) {
                    this.total = total / this.size;
                } else {
                    this.total = parseInt(total / this.size) + 1;
                }
            }
        };

        $scope.detailList = [];

        var detailListIscroll = null;

        function getMyWinRecord(current, size) {
            userService.getMyWinRecord('Qck3', current, size)
                .success(function (data) {
                    $log.debug(data);
                    if (data.success) {
                        $scope.detailList = data.result.winnings;
                        $scope.pageInfo.calTotal(current, data.result.totals);
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

        getMyWinRecord(0, 5);

        $scope.$on('prevPage', function (e) {
            detailListIscroll.prev();
        });


        $scope.$on('nextPage', function (e) {
            detailListIscroll.next();
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
            $scope.$apply();
        };

        $scope.hideDetailTable = function () {
            $scope.detailTable.isShow = false;
            $scope.$emit('isBlackBlindsShow', false);
            $scope.$apply();
        };


        NProgress.done();
    }])
    .directive('myWinRecordKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', function ($log, $timeout, $state, keyListener, userService) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    keyListener.listKeyListener({
                        element: element.parent(),
                        id: "myWinRecord",
                        label: "li",
                        columnNum: element.parent().length,
                        focus: function (item) {
                            $(".choose").removeClass("choose");
                            $(item).addClass("choose");
                        },
                        pageUp: function () {
                            scope.$parent.pageInfo.prev();
                        },
                        pageDown: function () {
                            scope.$parent.pageInfo.next();
                        },
                        up: function () {
                            keyListener.focus('indexMenu');
                            return false;
                        },
                        down: function () {
                            keyListener.focus('myWinRecordList', 0);
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
    .directive('myWinRecordListKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', function ($log, $timeout, $state, keyListener, userService) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    $timeout(function () {
                        keyListener.listKeyListener({
                            element: element.parent().parent().parent(),
                            id: "myWinRecordList",
                            label: ".detail",
                            columnNum: 1,
                            up: {
                                before: function (item) {
                                    var idx = keyListener.index['myWinRecordList'];
                                    if (idx == 0) {
                                        keyListener.focus('myWinRecord');
                                        return false;
                                    } else {
                                        if (idx % 5 == 0) {
                                            scope.$emit('prevPage');
                                        }
                                    }
                                }
                            },
                            pageUp: function () {
                                scope.$parent.pageInfo.prev(true);
                            },
                            pageDown: function () {
                                scope.$parent.pageInfo.next(true);
                            },
                            down: {
                                before: function (item) {
                                    var idx = keyListener.index['myWinRecordList'];
                                    if ((idx + 1) == keyListener.size['myWinRecordList']) {
                                        keyListener.focus('pageCtrl');
                                        return false;
                                    } else {
                                        if ((idx + 1) % 5 == 0) {
                                            scope.$emit('nextPage');
                                        }
                                    }

                                }
                            },
                            enter: function (item) {
                                var idx = keyListener.index['myWinRecordList'];
                                scope.$parent.showDetailTable(idx);
                                $timeout(function () {
                                    keyListener.focus('detailTable');
                                }, 100);

                            }
                        });
                    });

                }
            }
        };
    }])
    .directive('pageCtrlKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', function ($log, $timeout, $state, keyListener, userService) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                keyListener.listKeyListener({
                    element: element.parent(),
                    id: "pageCtrl",
                    label: "img",
                    columnNum: 2,
                    up: function () {
                        keyListener.focus('myWinRecordList');
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
                        keyListener.focus('myWinRecordList');
                        return false;
                    },
                    back: function (item) {
                        scope.hideDetailTable();
                        keyListener.focus('myWinRecordList');
                        return false;
                    }
                });
            }
        };
    }])
    .filter('myWinRecordMethod', function () {
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
    .filter('myWinRecordTime', function () {
        return function (bettingTime) {
            return bettingTime.substring(5, 16);
        }
    })
    .filter('myWinRecordAmount', ['$sce', function ($sce) {
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
    .filter('myWinRecordNos', ['$sce', function ($sce) {
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
    
