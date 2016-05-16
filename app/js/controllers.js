/**
 * Created by jian_ on 2016/5/9.
 */
'use strict';
var app = angular.module("app");
app.controller("bodyCtrl", ['$scope', '$log', function ($scope, $log) {
    $scope.keydown = function ($event) {
        var key = $event.keyCode;

        if (key == 27) {
            $log.debug("bodyCtrl");
        } else if (key == 8) {
        }

    }
}]);

app.controller('userCtrl', ["$scope", '$log', function ($scope, $log) {
    $scope.userInfo = {
        userName: "翦英硕",
        balance: 50
    };

    $scope.winInfos = [
        {
            "text": "恭喜用户222222中2014055期双色球6000元奖金"
        },
        {
            "text": "恭喜用户222222中2014055期双色球6000元奖金"
        }
    ];

    $scope.funcs = [
        {
            "text": "我的投注",
            "clickFun": function () {
                $log.debug("我的投注")
            }
        }
    ];


    $scope.funcKeydown = function ($event) {
        $log.debug($event);
        var key = $event.keyCode;
        if (key == 13) {
            $(event.target).click();
        } else if (key == 27) {
            $log.debug("userCtrl");
            $event.stopPropagation();
            return false;
        }
    }

}]);


app.controller('homeCtrl', ['$scope', '$state', '$window', function ($scope, $state, $window) {
    this.back = function () {
        $window.history.back();
    };
    this.backStr = "返回";
    NProgress.done();
}]);

app.controller('aboutController', ['$scope', '$state', '$log', function ($scope, $state, $log) {
    NProgress.done();
}]);

app.controller('contactController', ['$scope', '$http', function ($scope, $http) {
    NProgress.done();
}]);
