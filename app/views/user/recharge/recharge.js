angular.module('app')
    .controller('rechargeCtrl', ['$scope', '$state', '$log', function ($scope, $state, $log) {
        $scope.pageClass = "pageRecharge";


        $scope.rechargeWay = [
            {
                "id": "zhifubao",
                "name": "支付宝",
                "enter": function () {
                    $log.debug('支付宝');
                    $state.go('rechargePay', {
                        way: this.id,
                        name: this.name
                    })
                }
            },
            {
                "id": "weixin",
                "name": "微信",
                "enter": function () {
                    $log.debug('微信');
                    /*$state.go('rechargePay', {
                     way: this.id,
                     name: this.name
                     })*/
                }
            }
        ];


        NProgress.done();
    }
    ])
    .directive('rechargeWayListKeyListener', ['$log', '$timeout', 'keyListener', function ($log, $timeout, keyListener) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    var rechargeWay = scope.$parent.rechargeWay;
                    keyListener.listKeyListener({
                        element: element.parent(),
                        id: "rechargeWayList",
                        label: "li",
                        columnNum: 1,
                        up: function () {
                            keyListener.focus('indexMenu');
                        },
                        enter: function (item) {
                            rechargeWay[$(item).index()].enter();
                        }
                    });

                    $timeout(function () {
                        $(element.parent().children().first()).focus();
                    }, 700);

                }
            }
        };
    }]);