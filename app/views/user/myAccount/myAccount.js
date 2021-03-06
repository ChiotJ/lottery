angular.module('app')
    .controller('myAccountCtrl', ['$scope', '$log', '$state', 'userService', function ($scope, $log, $state, userService) {
        $scope.pageClass = "pageMyAccount";


        var encrypt = function (val, before, after) {
            if (!before)
                before = 0;
            if (!after)
                after = 0;
            var length = val.length, i = before + after, result = val;
            if (length > i) {
                result = val.substr(0, before);
                while (i < length) {
                    result += "*";
                    i++;
                }
                if (after)
                    result += val.substr(-after);
            }
            return result;
        };

        $scope.userInfo = [
            {
                'title': "用户名",
                'value': userService.userInfo.nickName
            },
            {
                'title': "账户余额",
                'value': userService.userInfo.balance
            },
            {
                'title': "真实姓名",
                'value': encrypt(userService.userInfo.realName, 1)
            },
            {
                'title': "充值余额",
                'value': userService.userInfo.rechargeBalance + "元"
            },
            {
                'title': "身份证号码",
                'value': encrypt(userService.userInfo.certificateNum, 1, 1)
            },
            {
                'title': "奖金余额",
                'value': userService.userInfo.winnerPaid + "元"
            },
            {
                'title': "手机号码",
                'value': encrypt(userService.userInfo.phone, 3, 4)
            },
            {
                'title': "可提现金额",
                'value': userService.userInfo.winnerPaid + "元"
            },
            {
                'title': "开户银行",
                'value': userService.userInfo.bankType
            },
            {
                'title': "级别",
                'value': userService.userInfo.userLever
            },
            {
                'title': "银行卡号",
                'value': encrypt(userService.userInfo.bankCardNo, 0, 4)
            },
            {
                'title': "积分",
                'value': userService.userInfo.bounds
            },
            {
                'title': "投注账号",
                'value': userService.userInfo.wagerCard
            }
        ];


        $scope.menus = [
            {
                "title": "充值记录",
                "enter": function () {
                    $log.debug("充值记录");
                    $state.go('myRechargeRecord');
                }
            },
            {
                "title": "修改账户信息",
                "enter": function () {
                    $log.debug("修改账户信息");
                }
            },
            {
                "title": "提现",
                "enter": function () {
                    $log.debug("提现");
                }
            },
            {
                "title": "提现记录",
                "enter": function () {
                    $log.debug("提现记录");
                    $state.go('myWithdrawMoneyRecord');
                }
            },
            {
                "title": "修改投注密码",
                "enter": function () {
                    $log.debug("修改投注密码");
                }
            },
            {
                "title": "中奖记录",
                "enter": function () {
                    $log.debug("中奖记录");
                    $state.go('myWinRecord');
                }
            },
            {
                "title": "兑奖须知",
                "enter": function () {
                    $log.debug("兑奖须知");
                }
            },
            {
                "title": "积分级别说明",
                "enter": function () {
                    $log.debug("积分级别说明");
                }
            }
        ];

        NProgress.done();
    }])
    .directive('myAccountMenusKeyListener', ['$log', '$timeout', 'keyListener', function ($log, $timeout, keyListener) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    var menus = scope.$parent.menus;
                    keyListener.listKeyListener({
                        element: element.parent(),
                        id: 'myAccountMenu',
                        label: "li",
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
                            menus[$(item).index()].enter();
                        }
                    });
                    $timeout(function () {
                        $(element.parent().children().first()).focus();
                    }, 700);
                }
            }

        };
    }]);