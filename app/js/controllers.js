/**
 * Created by jian_ on 2016/5/9.
 */
'use strict';
var app = angular.module("app");
app.controller("BodyController", ['$scope', '$log', function ($scope, $log) {
    $scope.keydown = function (event) {
        $log.debug(event.keyCode)
        var key = event.keyCode;


        var a = $(".btn ");
        if (key == 37) {
            $(a[0]).click();
            return false;
        } else if (key == 39) {
            $(a[1]).click();
            return false;
        }

    }
}]);


app.controller('mainController', ['$scope', '$state', '$window', function ($scope, $state, $window) {
    this.back = function () {
        $window.history.back();
    };
    this.backStr = "返回";
    NProgress.done();
}]);

app.controller('aboutController', ['$scope', '$state', '$log', function ($scope, $state, $log) {
    NProgress.done();
}]);

app.controller('contactController', ['$scope', function ($scope) {
    NProgress.done();
}]);
