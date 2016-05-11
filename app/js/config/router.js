/**
 * Created by jian_ on 2016/5/9.
 */
'use strict';
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.run(['$rootScope', '$state', '$stateParams', '$log',
    function ($rootScope, $state, $stateParams, $log) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        NProgress.configure({ parent: '#loadProgress' });


        $rootScope.$on('$locationChangeStart', function () {
            $log.debug("$locationChangeStart");
        });

        /*
         * NProgress.start();
         * 不能写在$locationChangeStart的监听里面，
         * 通过ui-sref会先进入路由再修改hash所以会造成在NProgress结束后start
         * */
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            NProgress.start();
            $log.debug("$stateChangeStart");
            /*$log.debug('start changed states');
             $log.debug(arguments);*/

            //NProgress.start();
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //NProgress.done();
            $log.debug('successfully changed states');
            /* $log.debug(arguments);
             $log.debug('event', event);
             $log.debug('toState', toState);
             $log.debug('toParams', toParams);
             $log.debug('fromState', fromState);
             $log.debug('fromParams', fromParams);*/
        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            //$log.error('The request state was not found: ' + unfoundState);
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            //$log.error('An error occurred while changing states: ' + error);

            /*$log.debug('event', event);
             $log.debug('toState', toState);
             $log.debug('toParams', toParams);
             $log.debug('fromState', fromState);
             $log.debug('fromParams', fromParams);*/
        });


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
            controller: 'aboutController',
            data: {
                a: 1
            },
            foo: {
                b: 1
            },
            a: {
                a: 2
            },
            resolve: {
                activities: function () {
                    return "222";
                }
            }
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
