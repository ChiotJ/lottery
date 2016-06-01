'use strict';
var fuCaiService = angular.module("fuCaiService", []);


fuCaiService.factory('kuai3Service', ['$log', '$http', 'dataRequest', 'apiUrl', 'userService', function ($log, $http, dataRequest, apiUrl, userService) {
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
            }
        },
        last: {
            period: '',
            craps: [],
            sum: 0
        },
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
                                h: time[0],
                                m: time[1],
                                s: time[2]
                            }
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
        betting: function () {
            return $http.post(apiUrl.api_lottery + 'betting', {
                "name": "Qck3",
                "amount": 4,
                "tickets": [{
                    "method": 1,
                    "multiple": 2,
                    "betType": 4,
                    "nos": [1, 5, 6],
                    "amount": 4
                }]
            }, {
                headers: {
                    'x-auth-token': userService.token
                }
            });
        }
    }
}]);


