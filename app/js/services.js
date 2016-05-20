/**
 * Created by jian_ on 2016/5/18.
 */
var app = angular.module("app");
app.factory("keyListener", ['$log', function ($log) {
    function executeFun(fun, $event) {
        var item = $event.target;
        var order = ["before", "center", "after"];
        var flag = true;
        if (typeof fun === "function") {
            flag = fun(item);
            if (typeof flag === "undefined")
                flag = true;
        } else if (typeof fun === "object") {
            for (var key in order) {
                if (typeof fun[order[key]] === "function" && flag) {
                    flag = fun[order[key]](item);
                    if (typeof flag === "undefined")
                        flag = true;
                }
            }
        }
        if (!flag) {
            $event.stopPropagation();
        }
        return flag
    }

    return {
        index: {},
        size: {},
        /*普通按键监听*/
        keyListener: function (options, children) {
            var element = options.element;
            if (!element || element.length < 1)
                return false;
            element.bind("keydown", function ($event) {
                switch ($event && $event.keyCode) {
                    case 8: //backspace
                        return executeFun(options.back, $event);
                        break;
                    case 13: //enter 键
                        return executeFun(options.enter, $event);
                        break;
                    case 27: //Esc
                        return executeFun(options.esc, $event);
                        break;
                    case 33: //pageUp
                        return executeFun(options.pageUp, $event);
                        break;
                    case 34: //pageDown
                        return executeFun(options.pageDown, $event);
                        break;
                    case 37: //左键
                        return executeFun(options.left, $event);
                        break;
                    case 38: //上键
                        return executeFun(options.up, $event);
                        break;
                    case 39: //右键
                        return executeFun(options.right, $event);
                        break;
                    case 40: //下键
                        return executeFun(options.down, $event);
                        break;
                    case 48: //0
                        return executeFun(options.n0, $event);
                        break;
                    case 49: //1
                        return executeFun(options.n1, $event);
                        break;
                    case 50: //2
                        return executeFun(options.n2, $event);
                        break;
                    case 51: //3
                        return executeFun(options.n3, $event);
                        break;
                    case 52: //4
                        return executeFun(options.n4, $event);
                        break;
                    case 53: //5
                        return executeFun(options.n5, $event);
                        break;
                    case 54: //6
                        return executeFun(options.n6, $event);
                        break;
                    case 55: //7
                        return executeFun(options.n7, $event);
                        break;
                    case 56: //8
                        return executeFun(options.n8, $event);
                        break;
                    case 57: //9
                        return executeFun(options.n9, $event);
                        break;
                    default:
                        break;
                }
            });

            var $item = element;

            if (children) {
                $item = children;
            }

            $item.focus(function () {
                if (typeof options.focus === "function") {
                    options.focus(this);
                }
            });

            $item.blur(function () {
                if (typeof options.blur === "function") {
                    options.blur(this);
                }
            });

            $item.click(function () {
                var flag = true;
                if (typeof options.click === "function") {
                    flag = options.click(this);
                    if (typeof flag === "undefined")
                        flag = true;
                }
                if (typeof options.enter === "function" && flag) {
                    $(this).attr("tabindex", "-1").focus();
                    options.enter(this);
                }
            });
        },
        /*列表按键监听*/
        listKeyListener: function (options) {
            var element = options.element;
            if (!element || element.length < 1)
                return false;
            element = element[0];
            var self = this, id = element.id, children = options.element.children(), length = children.length;
            this.index[id] = 0;
            this.size[id] = length;

            var leftCtrl = function (item) {
                var idx = $(item).index();
                if (idx > 0) {
                    idx--;
                } else {
                    idx = length - 1;
                }
                $(children[idx]).attr('tabindex', -1).focus();
            };

            if (typeof options.left !== "function") {
                if (typeof options.left !== "object") {
                    options.left = leftCtrl;
                } else {
                    if (typeof options.left.center !== "function") {
                        options.left.center = leftCtrl;
                    }
                }
            }

            var upCtrl = function (item) {
                var idx = $(item).index();
                if (idx > options.columnNum - 1) {
                    idx -= options.columnNum;
                } else {
                    if (idx > ((length - 1) % options.columnNum)) {
                        idx = length - 1;
                    } else {
                        if (length % options.columnNum == 0) {
                            idx = length - (options.columnNum - idx);
                        } else {
                            idx = parseInt(length / options.columnNum) * options.columnNum + idx;
                        }
                    }
                }
                $(children[idx]).attr('tabindex', -1).focus();
            };

            if (typeof options.up !== "function") {
                if (typeof options.up !== "object") {
                    options.up = upCtrl;
                } else {
                    if (typeof options.up.center !== "function") {
                        options.up.center = upCtrl;
                    }
                }
            }

            var rightCtrl = function (item) {
                var idx = $(item).index();
                if (idx < length - 1) {
                    idx++;
                } else {
                    idx = 0;
                }
                $(children[idx]).attr('tabindex', -1).focus();
            };


            if (typeof options.right !== "function") {
                if (typeof options.right !== "object") {
                    options.right = rightCtrl;
                } else {
                    if (typeof options.right.center !== "function") {
                        options.right.center = rightCtrl;
                    }
                }
            }

            var downCtrl = function (item) {
                var idx = $(item).index();
                if (idx < length - options.columnNum) {
                    idx += options.columnNum;
                } else {
                    if (parseInt((length - 1) / options.columnNum) > parseInt(idx / options.columnNum)) {
                        idx = length - 1;
                    } else {
                        idx = idx % options.columnNum;
                    }
                }
                $(children[idx]).attr('tabindex', -1).focus();
            };

            if (typeof options.down !== "function") {
                if (typeof options.down !== "object") {
                    options.down = downCtrl;
                } else {
                    if (typeof options.down.center !== "function") {
                        options.down.center = downCtrl;
                    }
                }
            }

            if (typeof options.focus === "function") {
                var a = options.focus;
                options.focus = function (item) {
                    self.index[id] = $(item).index();
                    a(item);
                }
            } else {
                options.focus = function (item) {
                    self.index[id] = $(item).index();
                }
            }


            this.keyListener(options, children);
        }
    };
}]);

app.provider('timekeeper', function () {
    var timeCal = function (element, callback) {
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

        if (angular.isFunction(callback)) {
            callback(s, m, h, element);
        }

    };

    var items = {};

    this.deleteItem = function (id) {
        delete items[id];
    };
    this.$get = ['$log', '$interval', function ($log, $interval) {
        return {
            items: items,
            timekeeper: function (id, element, callback) {
                if (items[id]) {
                    $interval.cancel(items[id].interval);
                }
                items[id] = {
                    element: element,
                    callback: callback
                };
                var interval = $interval(function () {
                    if (items[id]) {
                        element = items[id].element;
                        var i = 0;
                        while (i < element.length) {
                            timeCal($(element[i]), items[id].callback);
                            i++;
                        }
                    } else {
                        $interval.cancel(interval);
                    }
                }, 1000);
                items[id].interval = interval;

            }
        }
    }];


});