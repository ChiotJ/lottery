angular.module('app')
    .controller('myBettingCtrl', ['$scope', '$log', '$state', 'getMyBetting', function ($scope, $log, $state, getMyBetting) {
        $scope.pageClass = "pageMyBetting";

        $scope.lotteryList = [
            {
                id: 'Qck3',
                name: '全部'
            },
            {
                id: 'Qck3',
                name: '快3'
            }
        ];

        $scope.detailList = [];

        if (getMyBetting.status == 200) {
            var data = getMyBetting.data;
            if (data.success) {
                $scope.detailList = data.result.orderResults;
            }
        }

        NProgress.done();
    }]);
    
