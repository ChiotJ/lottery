/**
 * Created by jian_ on 2016/5/9.
 */
'use strict';
var app = angular.module('app');

app.run(['$rootScope', '$state', '$stateParams', '$log',
    function ($rootScope, $state, $stateParams, $log) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        NProgress.configure({parent: '#loadProgress'});

        $rootScope.$on('$locationChangeStart', function () {
            //$log.debug("$locationChangeStart");
        });

        /*
         * NProgress.start();
         * 不能写在$locationChangeStart的监听里面，
         * 通过ui-sref会先进入路由再修改hash所以会造成在NProgress结束后start
         * */
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            NProgress.start();
            // $log.debug('start changed states');
            // $log.debug('event', event);
            // $log.debug('toState', toState);
            // $log.debug('toParams', toParams);
            // $log.debug('fromState', fromState);
            // $log.debug('fromParams', fromParams);

        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            // $log.debug('successfully changed states');
            // $log.debug('event', event);
            // $log.debug('toState', toState);
            // $log.debug('toParams', toParams);
            // $log.debug('fromState', fromState);
            // $log.debug('fromParams', fromParams);
        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            // $log.error('The request state was not found: ' + unfoundState);
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            // $log.error('An error occurred while changing states: ' + error);
            // $log.debug('event', event);
            // $log.debug('toState', toState);
            // $log.debug('toParams', toParams);
            // $log.debug('fromState', fromState);
            // $log.debug('fromParams', fromParams);
        });


    }
]);


app.config(['$stateProvider', '$urlRouterProvider', 'timekeeperProvider', function ($stateProvider, $urlRouterProvider, timekeeperProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'tpls/home.html',
            controller: 'homeCtrl',
            controllerAs: 'home'
        })
        .state('fuCai', {
            url: '/fuCai',
            templateUrl: 'tpls/fuCai/index.html',
            controller: 'fuCaiIndexCtrl',
            controllerAs: 'fuCaiIndex',
            onEnter: function () {
            },
            onExit: ['timekeeper', function (timekeeper) {
                timekeeper.deleteItem("fuCaiIndexList");
            }]
        })
        .state('kuai3', {
            url: '/kuai3',
            templateUrl: 'tpls/kuai3/index.html',
            controller: 'kuai3IndexCtrl',
            controllerAs: 'kuai3Index',
            onEnter: function () {
            },
            onExit: ['timekeeper', function (timekeeper) {
                timekeeper.deleteItem("kuai3");
            }]
        })
        .state('kuai3Buy', {
            url: '/kuai3/buy',
            params: {
                mode: {
                    id: "hezhi",
                    name: "和值"
                }
            },
            templateUrl: 'tpls/kuai3/buy.html',
            controller: 'kuai3BuyCtrl',
            controllerAs: 'kuai3Buy',
            onExit: ['timekeeper', function (timekeeper) {
                timekeeper.deleteItem("kuai3");
            }]
        })
        .state('kuai3Buy.hezhi', {
            url: '/kuai3/buy/hezhi',
            templateUrl: 'tpls/kuai3/hezhi.html',
            controller: 'kuai3BuyHeZhiCtrl',
            controllerAs: 'kuai3BuyHeZhi'
        })
        .state('kuai3Buy.santonghao', {
            url: '/kuai3/buy/santonghao',
            templateUrl: 'tpls/kuai3/santonghao.html',
            controller: 'kuai3BuySanTongHaoCtrl',
            controllerAs: 'kuai3BuySanTongHao'
        })
        .state('kuai3Buy.sanlianhao', {
            url: '/kuai3/buy/sanlianhao',
            templateUrl: 'tpls/kuai3/sanlianhao.html',
            controller: 'kuai3BuySanLianHaoCtrl',
            controllerAs: 'kuai3BuySanLianHao'
        })
        .state('kuai3Buy.renxuan', {
            url: '/kuai3/buy/renxuan',
            templateUrl: 'tpls/kuai3/renxuan.html',
            controller: 'kuai3BuyRenXuanCtrl',
            controllerAs: 'kuai3BuyRenXuan'
        })
        .state('kuai3Buy.jixuan', {
            url: '/kuai3/buy/jixuan',
            templateUrl: 'tpls/kuai3/jixuan.html',
            controller: 'kuai3BuyJiXuanCtrl',
            controllerAs: 'kuai3BuyJiXuan'
        })

}]);
