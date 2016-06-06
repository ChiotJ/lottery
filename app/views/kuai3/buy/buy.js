'use strict';
angular.module('kuai3')
    .controller('kuai3BuyCtrl', ['$scope', '$log', '$state', '$stateParams', 'kuai3Service', function ($scope, $log, $state, $stateParams, kuai3Service) {
        $scope.pageClass = "pageKuai3Buy";

        $scope.mode = $stateParams.mode;

        $scope.info = {
            notice: "和值：" + kuai3Service.last.sum,
            craps: kuai3Service.last.craps,
            time: kuai3Service.current.remainingTime
        };

        $log.debug(kuai3Service.last);


        $scope.$emit('isShowIndexMenu', false);

        NProgress.done();
    }])
    .directive('kuai3Timekeeper', ['$log', '$timeout', 'timekeeper', function ($log, $timeout, timekeeper) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                timekeeper.timekeeper("kuai3", element);
            }

        };
    }]);