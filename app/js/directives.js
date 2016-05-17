/**
 * Created by jian_ on 2016/5/16.
 */
var app = angular.module("app");
app.directive('userInfoFunc', ['$log', function ($log) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            element.bind("keydown", function ($event) {
                var keyCode = $event.keyCode;
                $log.debug(keyCode);
                if (keyCode == 13) {
                    element.click();
                } else {
                    $log.debug("der");
                }
            });
        }
    };
}]);