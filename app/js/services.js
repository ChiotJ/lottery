/**
 * Created by jian_ on 2016/5/18.
 */
'use strict';
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
        element: {},
        focus: function (id, index) {
            if (typeof id === "string" && this.element[id]) {
                var element = this.element[id];
                if (element.length > 1) {
                    if (typeof index === "number") {
                        $(element[index]).focus();
                    } else {
                        $(element[this.index[id]]).focus();
                    }
                } else {

                    $(element).focus();
                }

            }
        },
        /*普通按键监听*/
        keyListener: function (options, children) {
            var element = options.element;
            if (!element || element.length < 1)
                return false;
            // $log.debug(element);
            var id = options.id;
            if (id && !children) {
                this.element[id] = element;
            }

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
            var self = this, element = options.element, id = options.id, label = options.label, columnNum = options.columnNum,
                children = label ? element.find(label) : element.children(),
                length = children.length;
            if (id) {
                this.index[id] = 0;
                this.size[id] = length;
                this.element[id] = children;
            }


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
                if (idx > columnNum - 1) {
                    idx -= columnNum;
                } else {
                    if (idx > ((length - 1) % columnNum)) {
                        idx = length - 1;
                    } else {
                        if (length % columnNum == 0) {
                            idx = length - (columnNum - idx);
                        } else {
                            idx = parseInt(length / columnNum) * columnNum + idx;
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
                if (idx < length - columnNum) {
                    idx += columnNum;
                } else {
                    if (parseInt((length - 1) / columnNum) > parseInt(idx / columnNum)) {
                        idx = length - 1;
                    } else {
                        idx = idx % columnNum;
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
    this.$get = ['$log', '$interval', function ($log, $interval) {
        return {
            items: items,
            deleteItem: function (id) {
                $log.debug("移除定时器：", id);
                $interval.cancel(items[id].interval);
                delete items[id];
            },
            timekeeper: function (id, element, callback) {
                $log.debug("加入定时器：", id);
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

app.factory("dataRequest", ['$log', '$http', 'apiUrl', 'cardId', function ($log, $http, apiUrl, cardId) {
    return {
        login: function (parameter) {
            return $http.post(apiUrl.api_lottery + "login", null, {
                params: parameter
            });
        },
        getAccountInfo: function (token) {
            return $http.get(apiUrl.api_lottery + "getAccountInfo", {
                headers: {
                    'x-auth-token': token
                }
            });
        },
        modifyBettingPassword: function (parameter, config) {

            var parameter = JSON.stringify({
                "oldBettingPassword": "16082420",
                "bettingPassword": "888888",
                "repeatBettingPassword": "888888"
            });


            $http.post(apiUrl.api_lottery + "modifyBettingPassword", parameter, {}).success(function () {
                $log.debug("123");
            }).error(function (data) {
                $log.debug("failure message:" + JSON.stringify({data: data}));
            });
        }
    }
}]);


app.factory("userService", ['$q', '$log', 'cardId', 'dataRequest', function ($q, $log, cardId, dataRequest) {
    return {
        cardId: cardId,
        userId: "",
        name: "",
        balance: function () {
            return this.rechargeBalance + this.rechargeBalance + "元";
        },
        rechargeBalance: 0,
        winnerPaid: 0,
        token: "",
        login: function (credentials) {
            //$log.debug(credentials);

            var deferred = $q.defer();
            var promise = deferred.promise;


            var self = this;
            dataRequest.login({
                username: credentials.username,
                password: credentials.password
            }).success(function (data, status, headers) {
                //$log.debug("login-success", data, status, headers("x-auth-token"))

                self.userId = data.id;
                self.name = data.name;
                self.token = headers("x-auth-token");

                dataRequest.getAccountInfo(self.token).success(function (data) {
                    //$log.debug("getAccountInfo-success", data)
                    if (data && data.success) {
                        self.rechargeBalance = data.result.rechargeBalance;
                        self.winnerPaid = data.result.winnerPaid;
                    }

                    deferred.resolve();
                }).error(function (error) {
                    //$log.error('getAccountInfo-error', error)
                    deferred.reject(error);
                });

            }).error(function (error) {
                //$log.error('login-error', error)
                deferred.reject(error);
            });

            return promise;
        }
    }
}]);

app.factory('kuai3Service', ['dataRequest', function (dataRequest) {
    return {
        getKuai3Info: function () {

        }
    }
}]);
