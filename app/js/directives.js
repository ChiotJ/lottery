/**
 * Created by jian_ on 2016/5/16.
 */
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
                    label: "li",
                    columnNum: 3,
                    focus: function (item) {
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

/*home*/
app.directive('homeMenuKeyListener', ['$log', '$timeout', 'keyListener', function ($log, $timeout, keyListener) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            if (scope.$parent.$last) {
                var menus = scope.$parent.menus;
                keyListener.listKeyListener({
                    element: element.parent(),
                    label: "li",
                    columnNum: 3,
                    focus: function (item) {
                        var hasGif = menus[$(item).index()].hasGif;
                        if (hasGif) {
                            var img = $(item).find("img");
                            var src = img.attr("src").replace("png", "gif");
                            img.attr("src", src);
                        }

                    },
                    blur: function (item) {
                        var hasGif = menus[$(item).index()].hasGif;
                        if (hasGif) {
                            var img = $(item).find("img");
                            var src = img.attr("src").replace("gif", "png");
                            img.attr("src", src);
                        }
                    },
                    enter: function (item) {
                        menus[$(item).index()].enter();
                    }
                });
                $timeout(function () {
                    $(element.parent().children().first()).focus();
                }, 700);
            }
        }

    };
}]);

/*fuCaiIndex*/
app.directive('fuCaiIndexListKeyListener', ['$log', '$timeout', '$interval', '$state', 'keyListener', 'timekeeper', function ($log, $timeout, $interval, $state, keyListener, timekeeper) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            if (scope.$parent.$last) {
                keyListener.listKeyListener({
                    element: element.parent(),
                    label: "li",
                    columnNum: 2,
                    focus: function (item) {

                    },
                    blur: function (item) {
                    },
                    enter: function (item) {
                        $state.go("fuCaiKuai3");
                    }
                });
                $timeout(function () {
                    $(element.parent().children().first()).focus();
                }, 700);


                timekeeper.timekeeper("fuCaiIndexList", element.parent().children(), function (s, m, h, ele) {
                    if (h < 1 && m < 1) {
                        ele.find(".num").css("background-color", "#E6262F");
                    } else {
                        ele.find(".num").removeAttr("style");
                    }
                });
            }

        }

    };
}]);


/*fuCaiKuai3*/
app.directive('fuCaiKuai3MenuKeyListener', ['$log', '$timeout', 'keyListener', function ($log, $timeout, keyListener) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            if (scope.$parent.$last) {
                var menus = scope.$parent.menus;
                keyListener.listKeyListener({
                    element: element.parent(),
                    label: "li",
                    columnNum: 5,
                    enter: function (item) {
                        //menus[$(item).index()].enter();
                    }
                });
                $timeout(function () {
                    $(element.parent().children().first()).focus();
                }, 700);
            }
        }

    };
}]);

app.directive('fuCaiKuai3Timekeeper', ['$log', '$timeout', 'timekeeper', function ($log, $timeout, timekeeper) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            timekeeper.timekeeper("fuCaiKuai3", element);
        }

    };
}]);