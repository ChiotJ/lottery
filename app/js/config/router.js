/**
 * Created by jian_ on 2016/5/9.
 */
'use strict';
var routerApp = angular.module('routerApp', ['ui.router', 'oc.lazyLoad']);

routerApp.run(['$rootScope', '$state', '$stateParams', '$log',
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

routerApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug: false
    });
}]);

routerApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home/home.html',
            controller: 'homeCtrl',
            controllerAs: 'home',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'views/home/home.js',
                            'views/home/home.css'
                        ]
                    }]);
                }]
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/user/login/login.html',
            controller: 'loginCtrl',
            controllerAs: 'login',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'views/user/login/login.js',
                            'views/user/login/login.css'
                        ]
                    }]);
                }]
            }
        })
        .state('myBetting', {
            url: '/myBetting',
            templateUrl: 'views/user/myBetting/myBetting.html',
            controller: 'myBettingCtrl',
            controllerAs: 'myBetting',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'views/user/myBetting/myBetting.js',
                            'views/user/myBetting/myBetting.css'
                        ]
                    }]);
                }]
            }
        })
        .state('myAccount', {
            url: '/myAccount',
            templateUrl: 'views/user/myAccount/myAccount.html',
            controller: 'myAccountCtrl',
            controllerAs: 'myAccount',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'views/user/myAccount/myAccount.js',
                            'views/user/myAccount/myAccount.css'
                        ]
                    }]);
                }]
            }
        })
        .state('fuCai', {
            url: '/fuCai',
            templateUrl: 'views/fucai/index/index.html',
            controller: 'fuCaiIndexCtrl',
            controllerAs: 'fuCaiIndex',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'views/fucai/index/index.js',
                            'views/fucai/index/index.css'
                        ]
                    }]);
                }]
            }
        })
        .state('kuai3', {
            url: '/kuai3',
            templateUrl: 'views/kuai3/index/index.html',
            controller: 'kuai3IndexCtrl',
            controllerAs: 'kuai3Index',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'views/kuai3/index/index.js',
                            'views/kuai3/index/index.css'
                        ]
                    }]);
                }]
            }
        })
        .state('kuai3Buy', {
            url: '/kuai3/buy',
            params: {
                mode: {
                    id: "hezhi",
                    name: "和值"
                }
            },
            templateUrl: 'views/kuai3/buy/buy.html',
            controller: 'kuai3BuyCtrl',
            controllerAs: 'kuai3Buy',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'views/kuai3/buy/buy.js',
                            'views/kuai3/buy/buy.css'
                        ]
                    }]);
                }]
            },
            onEnter: ['$rootScope', function ($rootScope) {
                $rootScope.$broadcast('isShowIndexMenu', false);
            }],
            onExit: ['$rootScope', function ($rootScope) {
                $rootScope.$broadcast('isShowIndexMenu', true);
            }]
        })
        .state('kuai3Buy.hezhi', {
            url: '/kuai3/buy/hezhi',
            templateUrl: 'views/kuai3/buy/hezhi/hezhi.html',
            controller: 'kuai3BuyHeZhiCtrl',
            controllerAs: 'kuai3BuyHeZhi',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'views/kuai3/buy/hezhi/hezhi.js',
                            'views/kuai3/buy/hezhi/hezhi.css'
                        ]
                    }]);
                }]
            }
        })
        .state('kuai3Buy.santonghao', {
            url: '/kuai3/buy/santonghao',
            templateUrl: 'views/kuai3/buy/santonghao/santonghao.html',
            controller: 'kuai3BuySanTongHaoCtrl',
            controllerAs: 'kuai3BuySanTongHao',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'views/kuai3/buy/santonghao/santonghao.js',
                            'views/kuai3/buy/santonghao/santonghao.css'
                        ]
                    }]);
                }]
            }
        })
        .state('kuai3Buy.sanlianhao', {
            url: '/kuai3/buy/sanlianhao',
            templateUrl: 'views/kuai3/buy/sanlianhao/sanlianhao.html',
            controller: 'kuai3BuySanLianHaoCtrl',
            controllerAs: 'kuai3BuySanLianHao',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'views/kuai3/buy/sanlianhao/sanlianhao.js',
                            'views/kuai3/buy/sanlianhao/sanlianhao.css'
                        ]
                    }]);
                }]
            }
        })
        .state('kuai3Buy.renxuan', {
            url: '/kuai3/buy/renxuan',
            templateUrl: 'views/kuai3/buy/renxuan/renxuan.html',
            controller: 'kuai3BuyRenXuanCtrl',
            controllerAs: 'kuai3BuyRenXuan',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'views/kuai3/buy/renxuan/renxuan.js',
                            'views/kuai3/buy/renxuan/renxuan.css'
                        ]
                    }]);
                }]
            }
        })
        .state('kuai3Buy.jixuan', {
            url: '/kuai3/buy/jixuan',
            templateUrl: 'views/kuai3/buy/jixuan/jixuan.html',
            controller: 'kuai3BuyJiXuanCtrl',
            controllerAs: 'kuai3BuyJiXuan',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'views/kuai3/buy/jixuan/jixuan.js',
                            'views/kuai3/buy/jixuan/jixuan.css'
                        ]
                    }]);
                }]
            }
        })
        .state('order_confirm', {
            url: '/order/confirm',
            params: {
                method: 1,
                betType: 1,
                craps: [123, 234, 345, 456]
            },
            templateUrl: 'views/kuai3/order_confirm/order_confirm.html',
            controller: 'kuai3OrderConfirmCtrl',
            controllerAs: 'kuai3OrderConfirm',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        files: [
                            'views/kuai3/order_confirm/order_confirm.js',
                            'views/kuai3/order_confirm/order_confirm.css'
                        ]
                    }]);
                }]
            },
            onEnter: ['$rootScope', function ($rootScope) {
                $rootScope.$broadcast('isShowIndexMenu', false);
            }],
            onExit: ['$rootScope', function ($rootScope) {
                $rootScope.$broadcast('isShowIndexMenu', true);
            }]
        })

}]);
