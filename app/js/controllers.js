/**
 * Created by jian_ on 2016/5/9.
 */
'use strict';
var app = angular.module("app");
/*index*/
app.controller("ApplicationController", ['$scope', '$timeout', '$log', 'userService', function ($scope, $timeout, $log, userService) {
    $scope.keydown = function ($event) {
        var key = $event.keyCode;
        if (key == 27) {
            //$log.debug("bodyCtrl");
        } else if (key == 8) {
        }

    };

    $scope.currentUser = {
        username: null,
        balance: 0,
        isShowUserInfo: false,
        setCurrentUser: function () {
            userService.name != null && (this.username = userService.name, this.isShowUserInfo = true);
            this.balance = userService.balance() || 0;
        },
        updateCurrentUser: function () {
            var self = this;
            userService.updateUser().then(function () {
                self.setCurrentUser();
            })
        }
    };

    $scope.isBlackBlindsShow = false;

    $scope.appNotice = {
        isAppNoticsShow: false,
        title: "提示",
        content: "",
        bottom: "",
        middleClass: "notice",
        bottomClass: "button",
        enter: null,
        showNotice: function (config) {
            $log.debug("showNotice", config);
            $scope.isBlackBlindsShow = true;

            var self = this;
            this.isAppNoticsShow = true;
            this.title = config.title;
            this.content = config.content;
            this.bottom = config.bottom;
            this.middleClass = config.middleClass || 'notice';
            this.bottomClass = config.bottomClass || 'time';

            this.enter = config.enter;
            if (config.time) {
                $timeout(function () {
                    $scope.isBlackBlindsShow = false;
                    self.isAppNoticsShow = false;
                    if (config.callback) {
                        config.callback();
                    }
                }, config.time);
            }
            this.enter = function () {
                $scope.isBlackBlindsShow = false;
                self.isAppNoticsShow = false;

                if (config.enter) {
                    config.enter();
                }
            }


        }
    }

}]);

app.controller('userCtrl', ["$scope", '$state', '$log', function ($scope, $state, $log) {
    $scope.winInfos = [
        {
            "text": "恭喜用户222222中2014055期双色球6000元奖金"
        },
        {
            "text": "恭喜用户222222中2014055期双色球6000元奖金"
        }
    ];

    $scope.menus = [
        {
            "text": "我的投注",
            "enter": function () {
                $log.debug("我的投注");
            }
        },
        {
            "text": "充值",
            "enter": function () {
                $log.debug("充值");
            }
        },
        {
            "text": "登录",
            "enter": function () {
                $log.debug("登录");
                $state.go("login");
            }
        }
    ];


}]);

/*home*/
app.controller('homeCtrl', ['$scope', '$log', '$state', function ($scope, $log, $state) {
    $scope.pageClass = "pageHome";
    $scope.menus = [
        {
            "id": "1",
            "enter": function () {
                $log.debug("福利彩票");
                //$log.debug($state)
                $state.go("fuCai", {});
            },
            "hasGif": true
        },
        {
            "id": "3",
            "enter": function () {
                $log.debug("开奖信息");
            },
            "hasGif": false
        },
        {
            "id": "4",
            "enter": function () {
                $log.debug("活动专区");
            },
            "hasGif": true
        },
        {
            "id": "5",
            "enter": function () {
                $log.debug("彩票讲堂");
            },
            "hasGif": true
        },
        {
            "id": "6",
            "enter": function () {
                $log.debug("我的账户");
            },
            "hasGif": true
        },
        {
            "id": "2",
            "enter": function () {
                $log.debug("体育彩票");
            },
            "hasGif": false
        }
    ];

    NProgress.done();
}]);


/*login*/
app.controller('loginCtrl', ['$scope', '$log', '$state', function ($scope, $log, $state) {
    $scope.pageClass = "pageLogin";

    $scope.credentials = {
        username: "",
        password: ""
    };

    $scope.inputFocus = function ($event) {
        $($event.target).parent().css("border", "1px solid #E72432");
    };

    $scope.inputBlur = function ($event) {
        $($event.target).parent().removeAttr("style");
    };

    NProgress.done();
}]);

/*fuCaiIndex*/
app.controller('fuCaiIndexCtrl', ['$scope', '$log', '$state', 'kuai3Service', function ($scope, $log, $state, kuai3Service) {
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
}]);

/*kuai3Index*/
app.controller('kuai3IndexCtrl', ['$scope', '$log', '$state', 'kuai3Service', function ($scope, $log, $state, kuai3Service) {
    $scope.pageClass = "pageKuai3Index";

    $scope.info = {
        notice: "和值：" + kuai3Service.last.sum,
        craps: kuai3Service.last.craps,
        time: kuai3Service.current.remainingTime
    };

    $scope.menus = [
        {
            "id": "hezhi",
            "name": "和值",
            "hasGif": true,
            "state": "kuai3Buy.hezhi"

        },
        {
            "id": "santonghao",
            "name": "三同号",
            "hasGif": true,
            "state": "kuai3Buy.santonghao"
        },
        {
            "id": "sanlianhao",
            "name": "三连号",
            "hasGif": true,
            "state": "kuai3Buy.sanlianhao"
        },
        {
            "id": "renxuan",
            "name": "任选",
            "hasGif": true,
            "state": "kuai3Buy.renxuan"
        },
        {
            "id": "jixuan",
            "name": "机选",
            "hasGif": true,
            "state": "kuai3Buy.jixuan"
        },
        {
            "id": "fenxibiaoge",
            "name": "分析表格",
            "hasGif": false
        },
        {
            "id": "kaijiangxinxi",
            "name": "开奖信息",
            "hasGif": false
        },
        {
            "id": "wanfashuoming",
            "name": "玩法说明",
            "hasGif": false
        }
    ];

    NProgress.done();
}]);

/*kuai3Buy*/
app.controller('kuai3BuyCtrl', ['$scope', '$log', '$state', '$stateParams', 'kuai3Service', function ($scope, $log, $state, $stateParams, kuai3Service) {
    $scope.pageClass = "pageKuai3Buy";

    $scope.mode = $stateParams.mode;

    $scope.info = {
        notice: "和值：" + kuai3Service.last.sum,
        craps: kuai3Service.last.craps,
        time: kuai3Service.current.remainingTime
    };

    NProgress.done();
}]);

/*kuai3Buy.hezhi*/
app.controller('kuai3BuyHeZhiCtrl', ['$scope', '$log', function ($scope, $log) {
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
    ]
}]);

/*kuai3Buy.santonghao*/
app.controller('kuai3BuySanTongHaoCtrl', ['$scope', '$log', function ($scope, $log) {
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
    ]
}]);

/*kuai3Buy.sanlianhao*/
app.controller('kuai3BuySanLianHaoCtrl', ['$scope', '$log', function ($scope, $log) {

}]);

/*kuai3Buy.renxuan*/
app.controller('kuai3BuyRenXuanCtrl', ['$scope', '$log', function ($scope, $log) {

}]);

/*kuai3Buy.jixuan*/
app.controller('kuai3BuyJiXuanCtrl', ['$scope', '$log', function ($scope, $log) {

}]);