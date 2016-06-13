/**
 * Created by jian_ on 2016/5/16.
 */
'use strict';
var app = angular.module("app");
/*index*/
app.directive('indexMenuKeyListener', ['$log', 'keyListener', function ($log, keyListener) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            if (scope.$parent.$last) {
                var menus = scope.$parent.menus;
                keyListener.listKeyListener({
                    element: element.parent(),
                    id: 'indexMenu',
                    label: "li",
                    columnNum: 3,
                    down: function () {
                        if ($(".pageHome").length > 0) {
                            keyListener.focus('homeMenu');
                        } else if ($(".pageLogin").length > 0) {
                            $($(".pageLogin").find('.keyListener')[0]).focus();
                        } else if ($(".pageFuCaiIndex").length > 0) {
                            keyListener.focus('fuCaiIndex');
                        } else if ($(".pageKuai3Index").length > 0) {
                            keyListener.focus('kuai3Index');
                        } else if ($(".pageMyBetting").length > 0) {
                            keyListener.focus('myBetting');
                        } else if ($(".pageMyAccount").length > 0) {
                            keyListener.focus('myAccountMenu');
                        }

                        return false;
                    },
                    enter: function (item) {
                        menus[$(item).index()].enter();
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

app.directive('appNotice', ['$log', 'keyListener', function ($log, keyListener) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            keyListener.keyListener({
                element: element,
                id: 'appNotice',
                enter: function (item) {
                    return scope.appNotice.enter();
                },
                back: function (item) {
                    return scope.appNotice.back();
                }
            });
        }
    };
}]);