'use strict';
angular.module('kuai3')
    .controller('kuai3BuySanTongHaoCtrl', ['$scope', '$log', function ($scope, $log) {
        $scope.santonghao = [
            {
                "craps": [1, 1, 1],
                "money": "奖金240元"
            },
            {
                "craps": [2, 2, 2],
                "money": "奖金240元"
            },
            {
                "craps": [3, 3, 3],
                "money": "奖金240元"
            },
            {
                "craps": [4, 4, 4],
                "money": "奖金240元"
            },
            {
                "craps": [5, 5, 5],
                "money": "奖金240元"
            },
            {
                "craps": [6, 6, 6],
                "money": "奖金240元"
            }
        ]
    }])
    .directive('kuai3SanTongHaoChoiceKeyListener', ['$log', '$timeout', '$state', 'keyListener', function ($log, $timeout, $state, keyListener) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    keyListener.listKeyListener({
                        element: element.parent(),
                        id: "kuai3SanTongHao",
                        label: "li",
                        columnNum: 7,
                        enter: function (item) {
                        }
                    });
                    $timeout(function () {
                        $(element.parent().children()[1]).focus();
                    }, 700);
                }
            }
        };
    }]);