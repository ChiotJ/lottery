/**
 * Created by jian_ on 2016/5/16.
 */
var app = angular.module("app");
app.directive('userinfoFunc', ['$log', function ($log) {
    return {
        restrict: 'AE',
        scope: {
            enter: "="
        },
        link: function (scope, element, attrs) {
            $log.debug(scope.enter);
            element.bind("keydown", function ($event) {
                console.log($event);
                console.log(scope.enter);
            });
        }
    };
}]);