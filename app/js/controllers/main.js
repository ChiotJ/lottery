var animateApp = angular.module('animateApp', ['ngAnimate']);


// CONTROLLERS ============================================
// home page controller
animateApp.controller('mainController', function($scope) {
    $scope.pageClass = 'page-home';
});

// about page controller
animateApp.controller('aboutController', function($scope) {
    NProgress.start();
    function sleep(n)
    {
        var start=new Date().getTime();
        while(true) if(new Date().getTime()-start>n) break;
    }

    sleep(2000);
    $scope.pageClass = 'page-about';
    NProgress.done();
});

// contact page controller
animateApp.controller('contactController', function($scope) {
    $scope.pageClass = 'page-contact';
});
