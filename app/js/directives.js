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
                        $(item).click();
                    },
                    click: function (item) {
                        return false;
                    }
                });
                $timeout(function () {
                    $(element.parent().children().first()).focus();
                }, 700);
            }
        }

    };
}]);

/*welfareList*/
app.directive('welfareListKeyListener', ['$log', '$timeout', '$interval', 'keyListener', function ($log, $timeout, $interval, keyListener) {
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
                        $(item).click();
                    },
                    click: function (item) {
                        return false;
                    }
                });
                $timeout(function () {
                    $(element.parent().children().first()).focus();
                }, 700);
            }

            var isThan1Min = true;
            $interval(function () {
                var h = parseInt(element.find(".h").html()), m = parseInt(element.find(".m").html()), s = parseInt(element.find(".s").html());
                if (--s < 0) {
                    if (m > 0 || h > 0) {
                        s = 59;
                        if (--m < 0) {
                            m = 59;
                            if (h > 0) {
                                h--;
                            }
                        }
                    } else {
                        s = 0;
                    }
                }

                if (h < 1 && m < 1) {
                    if (isThan1Min) {
                        isThan1Min = false;
                        element.find(".num").css("background-color", "#E6262F");
                    }
                } else {
                    if (!isThan1Min) {
                        isThan1Min = false;
                        element.find(".num").removeAttr("style");
                    }
                }

                if (h < 10) {
                    h = "0" + h;
                }
                if (m < 10) {
                    m = "0" + m;
                }
                if (s < 10) {
                    s = "0" + s;
                }

                element.find(".h").html(h);
                element.find(".m").html(m);
                element.find(".s").html(s);

            }, 1000);
        }

    };
}]);