/**
 * Created by jian_ on 2016/5/9.
 */
'use strict';
var app = angular.module('app', [
    'animateApp',
    'routerApp'
]);


app.controller("BodyController", ['$scope', '$log', function ($scope, $log) {
    $scope.keydown = function (event) {
        $log.debug(event.keyCode)
    }
}]);