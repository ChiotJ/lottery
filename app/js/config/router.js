/**
 * Created by jian_ on 2016/5/9.
 */
'use strict';
var routerApp = angular.module('routerApp', ['ui.router']);
routerApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider.state('index', {
        url:'/index',
        views:{
            '':{
                templateUrl:'tpls/index.html'
            }
        }
    }) ;

});
