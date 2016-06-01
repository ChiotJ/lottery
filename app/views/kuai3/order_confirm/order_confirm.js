angular.module('app').controller('kuai3OrderConfirmCtrl', ['$scope', '$stateParams', '$log', 'kuai3Service', function ($scope, $stateParams, $log, kuai3Service) {
    $scope.pageClass = "pageKuai3OrderConfirm";
    $scope.info = {
        notice: "和值：" + kuai3Service.last.sum,
        craps: kuai3Service.last.craps,
        time: kuai3Service.current.remainingTime
    };

    $scope.bettingWay = $stateParams.bettingWay;
    $scope.craps = $stateParams.craps;

    $scope.multiple = 1;

    $scope.addMultiple = function () {
        if ($scope.multiple == 99) {
            return;
        }
        $scope.multiple++;
    };

    $scope.reduceMultiple = function () {
        if ($scope.multiple == 1) {
            return;
        }

        $scope.multiple--;
    };

    NProgress.done();
}]);

