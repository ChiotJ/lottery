'use strict';
angular.module('kuai3')
    .controller('kuai3BuyCtrl', ['$scope', '$timeout', '$log', '$state', '$stateParams', 'kuai3Service', function ($scope, $timeout, $log, $state, $stateParams, kuai3Service) {
        $scope.pageClass = "pageKuai3Buy";

        $scope.mode = $stateParams.mode;

        $scope.info = {
            last: kuai3Service.last,
            current: kuai3Service.current
        };


        NProgress.done();
    }]);