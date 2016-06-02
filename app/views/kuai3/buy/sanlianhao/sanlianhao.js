'use strict';
angular.module('kuai3')
    .controller('kuai3BuySanLianHaoCtrl', ['$scope', '$log', function ($scope, $log) {

    }])
    .directive('kuai3SanLianHaoChoiceKeyListener', ['$log', '$timeout', '$state', 'keyListener', function ($log, $timeout, $state, keyListener) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                keyListener.keyListener({
                    element: element.parent(),
                    enter: function (item) {
                        $state.go('order_confirm')
                    }
                });
                $timeout(function () {
                    element.focus();
                }, 700);
            }
        };
    }]);