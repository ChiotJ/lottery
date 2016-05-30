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
                    var enter = scope.appNotice.enter;
                    if (enter) {
                        return enter();
                    }
                }
            });
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
                    id: 'homeMenu',
                    label: "li",
                    columnNum: 3,
                    up: {
                        before: function (item) {
                            var index = $(item).index();
                            if (index < 3) {
                                keyListener.focus('indexMenu');
                                return false;
                            }
                        }
                    },
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


/*login*/
app.directive('loginKeyListener', ['$log', '$timeout', '$state', '$location', 'keyListener', 'userService', function ($log, $timeout, $state, $location, keyListener, userService) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            keyListener.keyListener({
                element: element,
                id: 'login',
                up: function (item) {
                    var index = parseInt($(item).attr('idx')) - 1;
                    if (index >= 0) {
                        $(element.find('.keyListener')[index]).focus();
                    } else {
                        keyListener.focus('indexMenu');
                    }
                    return false;
                },
                down: function (item) {
                    var index = parseInt($(item).attr('idx')) + 1;
                    if (index < 3) {
                        $(element.find('.keyListener')[index]).focus();
                    }
                    return false;
                },
                enter: function (item) {
                    var index = parseInt($(item).attr('idx'));
                    if (index == 2) {
                        //$log.debug(scope.credentials);
                        var a = userService.login(scope.credentials).then(function success() {
                            scope.currentUser.setCurrentUser({
                                username: userService.name,
                                balance: userService.balance()
                            });
                            scope.appNotice.showNotice({
                                title: "提示",
                                content: "登录成功",
                                bottom: "3秒后自动跳转,或按“确定”跳转",
                                time: 3000,
                                callback: function () {
                                    history.back();
                                },
                                enter: function () {
                                    history.back();
                                }
                            });
                        }, function error(error) {
                            $log.error('login-error', error);
                        })
                    }
                    return false;
                }
            });
            $timeout(function () {
                $(element.find(".keyListener")[0]).focus();
            }, 700);
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
                        $state.go("kuai3");
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


/*kuai3Index*/
app.directive('kuai3IndexMenuKeyListener', ['$log', '$timeout', '$state', 'keyListener', function ($log, $timeout, $state, keyListener) {
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
                        var mode = menus[$(item).index()];

                        if (mode.state) {
                            $state.go(mode.state, {mode: mode});
                        }

                    }
                });
                $timeout(function () {
                    $(element.parent().children().first()).focus();
                }, 700);
            }
        }

    };
}]);

app.directive('kuai3Timekeeper', ['$log', '$timeout', 'timekeeper', function ($log, $timeout, timekeeper) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            timekeeper.timekeeper("kuai3", element);
        }

    };
}]);


/*kuai3hezhi*/
app.directive('kuai3HeZhiChoiceKeyListener', ['$log', '$timeout', '$state', 'keyListener', function ($log, $timeout, $state, keyListener) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            if (scope.$parent.$last) {
                keyListener.listKeyListener({
                    element: element.parent(),
                    id: "kuai3HeZhiChoice",
                    label: "li",
                    columnNum: 15,
                    enter: function (item) {
                    }
                });
                $timeout(function () {
                    $(element.parent().children().first()).focus();
                }, 700);
            }
        }
    };
}]);


/*kuai3santonghao*/
app.directive('kuai3SanTongHaoChoiceKeyListener', ['$log', '$timeout', '$state', 'keyListener', function ($log, $timeout, $state, keyListener) {
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

/*kuai3sanlianhao*/
app.directive('kuai3SanLianHaoChoiceKeyListener', ['$log', '$timeout', '$state', 'keyListener', function ($log, $timeout, $state, keyListener) {
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
