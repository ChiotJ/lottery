/**
 * Created by jian_ on 2016/5/9.
 */
'use strict';
var app = angular.module("app");
app.controller("BodyController", ['$scope', '$log', function ($scope, $log) {
    $scope.keydown = function (event) {
        $log.debug(event.keyCode)
    }
}]);


app.controller('mainController', ['$scope', function ($scope) {
    NProgress.done();
}]);

app.controller('aboutController', ['$scope', '$state', '$log', function ($scope, $state, $log) {
    NProgress.done();
}]);

app.controller('contactController', ['$scope', function ($scope) {
    NProgress.done();
}]);
