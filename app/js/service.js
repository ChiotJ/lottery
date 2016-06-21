'use strict';
angular.module("serviceApp", [])
    .factory("keyListener", ['$log', function ($log) {
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
            options: {},
            focus: function (id, index) {
                if (typeof id === "string" && this.element[id]) {
                    var element = this.element[id];
                    if (element.length > 1) {
                        if (typeof index === "number") {
                            $(element[index]).focus();
                            this.index[id] = index;
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
                    if (this.options[id]) {
                        element.unbind('keydown');
                    }
                    this.index[id] = 0;
                    this.size[id] = length;
                    this.element[id] = children;
                    this.options[id] = options;
                }


                var leftCtrl = function (item) {
                    var idx = $(item).index();
                    if (id) {
                        idx = self.index[id]
                    }
                    if (idx > 0) {
                        idx--;
                    } else {
                        idx = self.size[id] - 1;
                    }
                    self.index[id] = idx;
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
                    if (id) {
                        idx = self.index[id]
                    }
                    if (idx > columnNum - 1) {
                        idx -= columnNum;
                    } else {
                        if (idx > ((self.size[id] - 1) % columnNum)) {
                            idx = self.size[id] - 1;
                        } else {
                            if (self.size[id] % columnNum == 0) {
                                idx = self.size[id] - (columnNum - idx);
                            } else {
                                idx = parseInt(self.size[id] / columnNum) * columnNum + idx;
                            }
                        }
                    }
                    self.index[id] = idx;
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
                    if (id) {
                        idx = self.index[id]
                    }
                    if (idx < self.size[id] - 1) {
                        idx++;
                    } else {
                        idx = 0;
                    }
                    self.index[id] = idx;
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
                    if (id) {
                        idx = self.index[id]
                    }
                    if (idx < self.size[id] - columnNum) {
                        idx += columnNum;
                    } else {
                        if (parseInt((self.size[id] - 1) / columnNum) > parseInt(idx / columnNum)) {
                            idx = self.size[id] - 1;
                        } else {
                            idx = idx % columnNum;
                        }
                    }
                    self.index[id] = idx;
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
                        if (!id) {
                            self.index[id] = $(item).index();
                        }
                        a(item);
                    }
                } else {
                    options.focus = function (item) {
                        if (!id) {
                            self.index[id] = $(item).index();
                        }

                    }
                }


                this.keyListener(options, children);
            }
        };
    }])
    .factory("dataRequest", ['$log', '$http', 'apiUrl', 'cardId', function ($log, $http, apiUrl, cardId) {
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
            getMyBetting: function (token, name, pageNum, pagzSize) {
                return $http.get(apiUrl.api_lottery + "myOrder", {
                    headers: {
                        'x-auth-token': token
                    },
                    params: {
                        'name': name,
                        'pageNumber': pageNum,
                        'pagzSize': pagzSize
                    }
                });
            },
            getMyWinRecord: function (token, name, pageNum, pagzSize) {
                return $http.get(apiUrl.api_lottery + "myWinning", {
                    headers: {
                        'x-auth-token': token
                    },
                    params: {
                        'name': name,
                        'pageNumber': pageNum,
                        'pagzSize': pagzSize
                    }
                });
            },
            getMyBill: function (token, billType, pageNum, pagzSize) {
                return $http.get(apiUrl.api_lottery + "myBill", {
                    headers: {
                        'x-auth-token': token
                    },
                    params: {
                        'billType': billType,
                        'pageNumber': pageNum,
                        'pagzSize': pagzSize
                    }
                });
            },
            getPrePeriodWins: function (name) {
                return $http.get(apiUrl.api_lottery + "getPrePeriodWins", {
                    params: {
                        name: name
                    }
                });
            },
            period: function (name) {
                return $http.get(apiUrl.api_lottery + "period", {
                    params: {
                        name: name
                    }
                });
            },
            validateBettingPassword: function (token, password) {
                return $http.post(apiUrl.api_lottery + "validateBettingPassword", null, {
                    params: {
                        "password": password
                    },
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
    }])
    .factory("userService", ['$q', '$log', 'cardId', 'dataRequest', function ($q, $log, cardId, dataRequest) {
        return {
            cardId: cardId,
            userInfo: {
                userId: "",
                nickName: "",
                realName: "",
                certificateNum: '',
                phone: '',
                bankType: '',
                bankCardNo: '',
                wagerCard: '',
                bounds: 0,
                userLevel: '',
                rechargeBalance: 0,
                winnerPaid: 0,
                balance: 0
            },
            token: "cee27396-77fd-4acc-a81c-e254fa0d4579",
            login: function (credentials) {
                //$log.debug(credentials);

                var deferred = $q.defer();
                var promise = deferred.promise;


                var self = this;
                dataRequest.login({
                    username: credentials.username,
                    password: credentials.password
                }).success(function (data, status, headers) {
                    $log.debug("login-success", data, status, headers("x-auth-token"))
                    self.token = headers("x-auth-token");

                    self.getAccountInfo().then(function success() {
                        deferred.resolve();
                    }, function error(error) {
                        deferred.reject(error);
                    });
                }).error(function (error) {
                    //$log.error('login-error', error)
                    deferred.reject(error);
                });

                return promise;
            },
            getAccountInfo: function () {
                var self = this;
                return dataRequest.getAccountInfo(self.token).success(function (data) {
                    $log.debug("updateAccountInfo-success", data);
                    if (data && data.success) {
                        data = data.result;
                        self.userInfo.userId = data.id;

                        self.userInfo.nickName = data.lotteryPlayer.nickName;
                        self.userInfo.certificateNum = data.lotteryPlayer.certificateNum;
                        self.userInfo.phone = data.lotteryPlayer.phone;
                        self.userInfo.realName = data.realName;
                        self.userInfo.bankType = data.bankType;
                        self.userInfo.bankCardNo = data.bankCardNo;
                        self.userInfo.bounds = data.bonus;
                        self.userInfo.wagerCard = data.wagerCard;
                        self.userInfo.userLever = data.userLever;

                        self.userInfo.rechargeBalance = data.rechargeBalance;
                        self.userInfo.winnerPaid = data.winnerPaid;
                        self.userInfo.balance = (data.rechargeBalance * 100 + data.winnerPaid * 100) / 100;
                    }
                }).error(function (error) {
                    //$log.error('getAccountInfo-error', error)
                });
            },
            getMyBetting: function (name, pageNum, pagzSize) {
                return dataRequest.getMyBetting(this.token, name, pageNum, pagzSize);
            },
            getMyWinRecord: function (name, pageNum, pagzSize) {
                return dataRequest.getMyWinRecord(this.token, name, pageNum, pagzSize);
            },
            getMyRechargeRecord: function (pageNum, pagzSize) {
                return dataRequest.getMyBill(this.token, 1, pageNum, pagzSize);
            },
            getMyWithdrawMoneyRecord: function (pageNum, pagzSize) {
                return dataRequest.getMyBill(this.token, 2, pageNum, pagzSize);
            },
            validateBettingPassword: function (password) {
                return dataRequest.validateBettingPassword(this.token, password)
            }
        }
    }])
    .factory("wsService", ['$timeout', '$interval', '$log', 'cardId', 'apiUrl', 'userService', function ($timeout, $interval, $log, cardId, apiUrl, userService) {
        var commonWS = {
            isOpen: false,
            sock: null,
            client: null,
            connect: function () {
                var sock = new SockJS(apiUrl.api_lottery + "tv/api/ws?tvCard=" + cardId),
                    client = Stomp.over(sock), self = this;

                client.debug = function (msg) {
                    //$log.debug("commonWS", msg);
                };

                client.connect({}, function () {
                    self.isOpen = true;
                    client.subscribe('/user/queue/actions', function (data) {
                        $log.debug(data);
                        data = JSON.parse(data.body);
                        if (angular.equals(data.action, 'logined')) {
                            userService.token = data.props.token;
                            userService.getAccountInfo();
                            history.back();
                        }

                    });

                }, function () {
                    self.isOpen = false;
                });
                this.sock = sock;
                this.client = client;
            },
            disconnect: function () {
                this.client.disconnect(function () {
                });
            }
        };

        var userWS = {
            isOpen: false,
            sock: null,
            client: null,
            token: "",
            connect: function (token) {
                var sock = new SockJS(apiUrl.api_lottery + "tv/api/ws?authToken=" + token),
                    client = Stomp.over(sock), self = this;

                self.token = token;

                client.debug = function (msg) {
                    //$log.debug("userWS", msg);
                };

                client.connect({}, function () {
                    self.isOpen = true;
                    client.subscribe('/user/queue/actions', function (data) {
                        data = JSON.parse(data.body);
                        $log.debug(data);
                        userService.getAccountInfo();
                    });

                }, function (err) {
                    self.isOpen = false;
                    $timeout(function () {
                        self.connect(token);
                    }, 5000);
                    $log.debug("userWSError", err);
                });


                this.sock = sock;
                this.client = client;
            },
            disconnect: function () {
                this.client.disconnect(function () {
                });
            }
        };


        function init() {
            commonWS.connect();
            $interval(function () {
                if (!commonWS.isOpen) {
                    commonWS.connect();
                }
                if (!angular.equals(userWS.token, userService.token)) {
                    if (userWS.isOpen) {
                        userWS.disconnect();
                        $timeout(function () {
                            userWS.connect(userService.token);
                        }, 500);
                    } else {
                        userWS.connect(userService.token);
                    }

                }
            }, 5000);
        }

        return {
            init: init
        }
    }]);

