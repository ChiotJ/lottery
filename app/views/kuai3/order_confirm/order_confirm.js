'use strict';
angular.module('kuai3')
    .controller('kuai3OrderConfirmCtrl', ['$scope', '$stateParams', '$timeout', '$log', 'kuai3Service', function ($scope, $stateParams, $timeout, $log, kuai3Service) {
        $scope.pageClass = "pageKuai3OrderConfirm";
        $scope.info = {
            notice: "和值：" + kuai3Service.last.sum,
            craps: kuai3Service.last.craps,
            time: kuai3Service.current.remainingTime
        };

        $scope.betting = {
            multiple: 1,
            betType: $stateParams.betType,
            method: $stateParams.method,
            craps: $stateParams.craps
        };

        var bettingStr = "";
        if ($scope.betting.method == 1) {
            bettingStr = "自选 ";
        } else {
            bettingStr = "机选 ";
        }

        $log.debug($scope.betting);
        switch ($scope.betting.betType) {
            case 1:
                bettingStr += "二不同号";
                $scope.crapsStr = $scope.betting.craps.join("");
                break;
            case 2:
                bettingStr += "二同号单选";
                $scope.crapsStr = $scope.betting.craps.join("");
                break;
            case 3:
                bettingStr += "二同号复选";
                $scope.crapsStr = $scope.betting.craps.join("");
                break;
            case 4:
                bettingStr += "三不同号";
                $scope.crapsStr = $scope.betting.craps.join("");
                break;
            case 5:
                bettingStr += "三同号单选";
                $scope.crapsStr = $scope.betting.craps.join("");
                break;
            case 6:
                bettingStr += "三同号通选";
                $scope.crapsStr = ['111', '222', '333', '444', '555', '666'].join(",");
                break;
            case 7:
                bettingStr += "三连号通选";
                $scope.crapsStr = ['123', '234', '345', '456'].join(",");
                break;
            case 8:
                bettingStr += "和值";
                $scope.crapsStr = $scope.betting.craps.join();
                break;
        }

        $scope.bettingStr = bettingStr;


        $scope.addMultiple = function () {
            if ($scope.betting.multiple == 99) {
                return;
            }
            $scope.betting.multiple++;
        };

        $scope.reduceMultiple = function () {
            if ($scope.betting.multiple == 1) {
                return;
            }

            $scope.betting.multiple--;
        };


        $scope.bettingPassword = {
            isShow: false,
            password: '',
            inputPassword: '',
            canInput: true,
            showBettingPassword: function () {
                $scope.$emit('isBlackBlindsShow', true);
                this.isShow = true;
                $timeout(function () {
                    $('#bettingPassword').focus();
                }, 100);
                $scope.$apply();
            },
            input: function (num) {
                this.password += num;
                this.inputPassword += '•';
                var length = this.password.length;
                if (length == 6) {
                    this.canInput = false;
                    this.confirm();
                }
                $scope.$apply();
            },
            delete: function () {
                var length = this.password.length;
                if (length > 0) {
                    this.password = this.password.substr(0, length - 1);
                    this.inputPassword = this.inputPassword.substr(0, length - 1);
                }
                $scope.$apply();
            },
            confirm: function () {
                /* scope.$emit('showNotice', {
                 title: "提示",
                 content: "投注中，请稍候",
                 bottom: ""
                 });
                 kuai3Service.betting(scope.betting)
                 .success(function (data) {
                 $log.debug(data);
                 scope.$emit('showNotice', {
                 title: "提示",
                 content: "投注成功",
                 bottom: "3秒后自动跳转,或按“确定”跳转",
                 time: 3000,
                 callback: function () {
                 history.back();
                 },
                 enter: function () {
                 history.back();
                 }
                 });
                 scope.currentUser.updateCurrentUser();
                 })
                 .error(function (err) {

                 });*/
            }
        };


        NProgress.done();
    }])
    .directive('kuai3OrderConfirmKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'kuai3Service', function ($log, $timeout, $state, keyListener, kuai3Service) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                keyListener.keyListener({
                    element: element,
                    up: function (item) {
                        scope.addMultiple();
                    },
                    down: function (item) {
                        scope.reduceMultiple();
                    },
                    enter: function (item) {
                        scope.bettingPassword.showBettingPassword();
                    }
                });
                $timeout(function () {
                    element.focus();
                }, 700);
            }
        };
    }])
    .directive('kuai3OrderConfirmBettingPasswordKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'kuai3Service', function ($log, $timeout, $state, keyListener, kuai3Service) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                keyListener.keyListener({
                    element: element,
                    enter: function (item) {
                    },
                    back: function () {
                        if (scope.bettingPassword.canInput) {
                            scope.bettingPassword.delete();
                        }
                        return false;
                    },
                    n0: function () {
                        if (scope.bettingPassword.canInput)
                            scope.bettingPassword.input(0);
                    },
                    n1: function () {
                        if (scope.bettingPassword.canInput)
                            scope.bettingPassword.input(1);
                    },
                    n2: function () {
                        if (scope.bettingPassword.canInput)
                            scope.bettingPassword.input(2);
                    },
                    n3: function () {
                        if (scope.bettingPassword.canInput)
                            scope.bettingPassword.input(3);
                    },
                    n4: function () {
                        if (scope.bettingPassword.canInput)
                            scope.bettingPassword.input(4);
                    },
                    n5: function () {
                        if (scope.bettingPassword.canInput)
                            scope.bettingPassword.input(5);
                    },
                    n6: function () {
                        if (scope.bettingPassword.canInput)
                            scope.bettingPassword.input(6);
                    },
                    n7: function () {
                        if (scope.bettingPassword.canInput)
                            scope.bettingPassword.input(7);
                    },
                    n8: function () {
                        if (scope.bettingPassword.canInput)
                            scope.bettingPassword.input(8);
                    },
                    n9: function () {
                        if (scope.bettingPassword.canInput)
                            scope.bettingPassword.input(9);
                    }
                });
            }
        };
    }]);

