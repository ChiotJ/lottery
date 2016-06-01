'use strict';
angular.module('kuai3')
    .controller('kuai3OrderConfirmCtrl', ['$scope', '$stateParams', '$log', 'kuai3Service', function ($scope, $stateParams, $log, kuai3Service) {
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
                        kuai3Service.betting()
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

