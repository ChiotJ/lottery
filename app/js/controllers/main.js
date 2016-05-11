var animateApp = angular.module('animateApp', ['ngAnimate']);


// CONTROLLERS ============================================
// home page controller
animateApp.controller('mainController', function ($scope) {
    $scope.pageClass = 'page-home';
});

// about page controller
animateApp.controller('aboutController', ['$scope', '$state', '$log', 'activities', function ($scope, $state, $log, activities) {
    $scope.pageClass = 'page-about';

    $log.debug(activities);
    $log.debug($state.current);
}]);

// contact page controller
animateApp.controller('contactController', function ($scope) {
    $scope.pageClass = 'page-contact';
});
