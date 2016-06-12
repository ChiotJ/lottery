/**
 * Created by jian_ on 2016/5/9.
 */
'use strict';
var app = angular.module('app', [
    'ngAnimate',
    'ngSanitize',
    'routerApp',
    'lotteryApp',
    'serviceApp'
]);

app.config(['$logProvider', function ($logProvider) {
    $logProvider.debugEnabled(true);
}]);