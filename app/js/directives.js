/**
 * Created by jian_ on 2016/5/16.
 */
var app = angular.module("app");
/*index*/
app.directive('indexFuncKeyListener', ['$log', 'keyListener', function ($log, keyListener) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            if (scope.$parent.$last) {
                keyListener.listKeyListener({
                    element: element.parent(),
                    label: "li",
                    columnNum: 3,
                    focus: function (item) {
                    },
                    enter: function (item) {
                        $(item).click();
                    },
                    click: function (item) {
                        return false;
                    }
                });
            }
        }

    };
}]);


app.directive('indexWinInfos', ['$log', '$interval', function ($log, $interval) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            if (scope.$parent.$last) {
                var parent = element.parent(), size = parent.children().length;
                if (size > 0) {
                    $interval(function () {
                        var left = parent.position().left - 423;
                        var total = size * element.parent().parent().width();

                        if (left <= -total) {
                            left = 0;
                        }
                        parent.css("left", left);
                    }, 5000)
                }
            }
        }
    };
}]);

/*home*/
app.directive('homeMenuKeyListener', ['$log', '$timeout', 'keyListener', function ($log, $timeout, keyListener) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            if (scope.$parent.$last) {
                keyListener.listKeyListener({
                    element: element.parent(),
                    label: "li",
                    columnNum: 3,
                    focus: function (item) {
                        var img = $(item).find("img");
                        var src = img.attr("src").replace("png", "gif");
                        img.attr("src", src);
                    },
                    blur: function (item) {
                        var img = $(item).find("img");
                        var src = img.attr("src").replace("gif", "png");
                        img.attr("src", src);
                    },
                    enter: function (item) {
                        $(item).click();
                    },
                    click: function (item) {
                        return false;
                    }
                });
                $timeout(function () {
                    $(element.parent().children().first()).focus();
                });
            }
        }

    };
}]);