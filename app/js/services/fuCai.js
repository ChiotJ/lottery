'use strict';
var fuCaiService = angular.module("fuCaiService", []);


fuCaiService.factory('kuai3Service', ['$interval', '$timeout', '$log', '$http', 'dataRequest', 'apiUrl', 'userService', function ($interval, $timeout, $log, $http, dataRequest, apiUrl, userService) {
    return {
        name: 'Qck3',
        notice: '每10分钟开一次奖最高奖金',
        maxMoney: '240元',
        current: {
            period: '',
            remainingTime: {
                h: '00',
                m: '00',
                s: '00'
            },
            canBetting: true
        },
        last: {
            period: '',
            craps: [],
            sum: 0
        },
        waitTime: 20000,
        loadInterval: null,
        init: function () {
            this.loadCurrent();
            this.loadLast();
        },
        loadCurrent: function () {
            var self = this;
            dataRequest.period(this.name)
                .success(function (data) {
                    // $log.debug('period', data)
                    if (data && data.success) {
                        var result = data.result;
                        self.current.period = result.period;
                        var time = result.countdownTime;
                        if (time) {
                            time = time.split(":");
                            self.current.remainingTime = {
                                h: '00',
                                m: '00',
                                s: time[2]
                            };

                            self.loadInterval && $interval.cancel(self.loadInterval);
                            self.loadInterval = $interval(function () {
                                var s = parseInt(self.current.remainingTime.s), m = parseInt(self.current.remainingTime.m), h = parseInt(self.current.remainingTime.h);
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

                                if (h == 0 && m == 0 && s == 0) {
                                    $interval.cancel(self.loadInterval);
                                    self.current.canBetting = false;
                                    $timeout(function () {
                                        self.loadCurrent();
                                        self.loadLast();
                                    }, self.waitTime);
                                } else {
                                    self.current.canBetting = true;
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

                                self.current.remainingTime = {
                                    h: h,
                                    m: m,
                                    s: s
                                };


                            }, 1000);
                        }
                    }
                })
                .error(function () {

                });
        },
        loadLast: function () {
            var self = this;
            dataRequest.getPrePeriodWins(this.name)
                .success(function (data) {
                    // $log.debug('getPrePeriodWins', data)
                    if (data && data.success) {
                        var result = data.result;
                        self.last.period = result.period;
                        var nos = result.nos;
                        var sum = 0;
                        if (nos && nos.length === 3) {
                            for (var i = 0; i < nos.length; i++) {
                                var c = parseInt(nos[i]);
                                self.last.craps[i] = c;
                                sum += c;
                            }
                            self.last.sum = sum;
                        }
                    }
                })
                .error(function () {

                });
        },
        betting: function (betting) {
            return $http.post(apiUrl.api_lottery + 'betting', {
                "name": "Qck3",
                "boards": 1,
                "amount": 2 * betting.multiple,
                "tickets": [{
                    "method": betting.method,
                    "multiple": betting.multiple,
                    "betType": betting.betType,
                    "nos": betting.craps,
                    "amount": 2 * betting.multiple
                }]
            }, {
                headers: {
                    'x-auth-token': userService.token
                }
            });
        }
    }
}]);


