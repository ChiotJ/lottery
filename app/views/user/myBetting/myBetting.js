angular.module('app')
    .controller('myBettingCtrl', ['$scope', '$log', '$state', function ($scope, $log, $state) {
        $scope.pageClass = "pageMyBetting";

        NProgress.done();
    }]);