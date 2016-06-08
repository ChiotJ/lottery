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
    }])
    .directive('myBettingKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', function ($log, $timeout, $state, keyListener, userService) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    keyListener.listKeyListener({
                        element: element.parent(),
                        id: "myBetting",
                        label: "li",
                        columnNum: element.parent().length,
                        focus: function (item) {
                            element.find(".choose").removeClass(".choose");
                            $(item).addClass(".choose");
                        },
                        up: function () {
                            keyListener.focus('indexMenu');
                            return false;
                        },
                        down: function () {
                            keyListener.focus('myBettingList');
                            return false;
                        }
                    });
                    $timeout(function () {
                        $(element.parent().children().first()).focus();
                    }, 700);
                }
            }
        };
    }])
    .directive('myBettingListKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', function ($log, $timeout, $state, keyListener, userService) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    keyListener.listKeyListener({
                        element: element.parent().parent(),
                        id: "myBettingList",
                        label: ".detail",
                        columnNum: 1,
                        focus: function (item) {
                        }
                    });
                }
            }
        };
    }]);
    
