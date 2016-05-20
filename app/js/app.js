/**
 * Created by jian_ on 2016/5/9.
 */
'use strict';
var app = angular.module('app', [
    'ngAnimate',
    'ui.router'
]);

app.config(function ($logProvider) {
    $logProvider.debugEnabled(true);
});