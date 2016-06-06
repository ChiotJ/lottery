'use strict';
angular.module('kuai3')
    .controller('kuai3OrderConfirmCtrl', ['$scope', '$stateParams', '$log', 'kuai3Service', function ($scope, $stateParams, $log, kuai3Service) {
        $scope.pageClass = "pageKuai3OrderConfirm";
        $scope.info = {
            notice: "和值：" + kuai3Service.last.sum,
            craps: kuai3Service.last.craps,
            time: kuai3Service.current.remainingTime
        };

        $scope.betting = {
            multiple: 1,
            betType: $stateParams.betType,
            method: $stateParams.method,
            craps: $stateParams.craps
        };

        var bettingStr = "";
        if ($scope.betting.method == 1) {
            bettingStr = "自选 ";
        } else {
            bettingStr = "机选 ";
        }

        $log.debug($scope.betting);
        switch ($scope.betting.betType) {
            case 8:
                bettingStr += "和值";
                break;
        }

        $scope.bettingStr = bettingStr;
        $scope.crapsStr = $scope.betting.craps.join(",");


        $scope.addMultiple = function () {
            if ($scope.betting.multiple == 99) {
                return;
            }
            $scope.betting.multiple++;
        };

        $scope.reduceMultiple = function () {
            if ($scope.betting.multiple == 1) {
                return;
            }

            $scope.betting.multiple--;
        };

        NProgress.done();
    }])
    .directive('kuai3OrderConfirmKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'kuai3Service', function ($log, $timeout, $state, keyListener, kuai3Service) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                keyListener.keyListener({
                    element: element,
                    up: function (item) {
                        scope.addMultiple();
                    },
                    down: function (item) {
                        scope.reduceMultiple();
                    },
                    enter: function (item) {
                        kuai3Service.betting(scope.betting)
                            .success(function (data) {
                                $log.debug(data);
                                scope.currentUser.updateCurrentUser();
                            })
                            .error(function (err) {

                            });
                    }
                });
                $timeout(function () {
                    element.focus();
                }, 700);
            }
        };
    }]);

