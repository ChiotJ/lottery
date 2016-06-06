'use strict';
angular.module('kuai3')
    .controller('kuai3BuySanLianHaoCtrl', ['$scope', '$state', '$log', function ($scope, $state, $log) {
        $scope.betting = function () {
            var craps, betType, method = 1;

            betType = 7;
            craps = [0, 0, 0];

            $state.go("order_confirm", {
                method: method,
                betType: betType,
                craps: craps
            });
        };
    }])
    .directive('kuai3SanLianHaoChoiceKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', function ($log, $timeout, $state, keyListener, userService) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                keyListener.keyListener({
                    element: element.parent(),
                    enter: function (item) {
                        if (userService.userId) {
                            scope.$parent.betting();
                        } else {
                            scope.$emit('notLogin');
                        }
                    },
                    back: function (item) {
                        scope.$emit('isShowIndexMenu', true);
                    }
                });
                $timeout(function () {
                    element.focus();
                }, 700);
            }
        };
    }]);