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

            if (typeof options.left !== "function") {
                if (typeof options.left !== "object") {
                    options.left = function (item) {
                        var idx = $(item).index();
                        $(children[--idx]).attr('tabindex', -1).focus();
                    }
                } else {
                    if (typeof options.left.center !== "function") {
                        options.left.center = function (item) {
                            var idx = $(item).index();
                            $(children[--idx]).attr('tabindex', -1).focus();
                        }
                    }
                }
            }

            if (typeof options.up !== "function") {
                if (typeof options.up !== "object") {
                    options.up = function (item) {
                        var idx = $(item).index();
                        if (idx > options.columnNum - 1) {
                            idx -= options.columnNum;
                            $(children[idx]).attr('tabindex', -1).focus();
                        }
                    }
                } else {
                    if (typeof options.up.center !== "function") {
                        options.up.center = function (item) {
                            var idx = $(item).index();
                            if (idx > options.columnNum - 1) {
                                idx -= options.columnNum;
                                $(children[idx]).attr('tabindex', -1).focus();
                            }
                        }
                    }
                }
            }


            if (typeof options.right !== "function") {
                if (typeof options.right !== "object") {
                    options.right = function (item) {
                        var idx = $(item).index();
                        if (idx < length - 1) {
                            $(children[++idx]).attr('tabindex', -1).focus();
                        }
                    }
                } else {
                    if (typeof options.right.center !== "function") {
                        options.right.center = function (item) {
                            var idx = $(item).index();
                            if (idx < length - 1) {
                                $(children[++idx]).attr('tabindex', -1).focus();
                            }
                        }
                    }
                }
            }


            if (typeof options.down !== "function") {
                if (typeof options.down !== "object") {
                    options.down = function (item) {
                        var idx = $(item).index();
                        if (idx < length - options.columnNum) {
                            idx += options.columnNum;
                            $(children[idx]).attr('tabindex', -1).focus();
                        }
                    }
                } else {
                    if (typeof options.down.center !== "function") {
                        options.down.center = function (item) {
                            var idx = $(item).index();
                            if (idx < length - options.columnNum) {
                                idx += options.columnNum;
                                $(children[idx]).attr('tabindex', -1).focus();
                            }
                        }
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