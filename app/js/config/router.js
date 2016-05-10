/**
 * Created by jian_ on 2016/5/9.
 */
'use strict';
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
]);


routerApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'tpls/home.html',
            controller: 'mainController'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'tpls/about.html',
            controller: 'aboutController'
        })
        .state('contact', {
            url: '/contact',
            views: {
                '': {
                    templateUrl: 'tpls/contact.html',
                    controller: 'contactController'
                }
            }

        });



});
