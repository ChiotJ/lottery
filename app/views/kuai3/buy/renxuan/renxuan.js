'use strict';
angular.module('kuai3')
    .controller('kuai3BuyRenXuanCtrl', ['$scope', '$state', '$log', function ($scope, $state, $log) {

        $scope.craps = new Array(3);

        $scope.random = function () {
            $scope.method = 2;
            var num = parseInt(Math.random() * 2) + 2, i = 0;
            $scope.craps = [];
            $('#renxuan').find('.choose').removeClass('choose');
            while (i < num) {
                var crap = parseInt(Math.random() * 6);
                $scope.craps[i] = crap + 1;
                $($('#renxuan_' + i).find("li")[crap]).find('div').addClass('choose');
                i++;
            }

            $log.debug($scope.craps);
            $scope.craps.sort();
        };

        $scope.method = 1;


        $scope.changeMethod = function (method) {
            $scope.method = method;
        }
        $scope.betting = function (element) {
            $log.debug($scope.method);
            var craps = [], betType;
            var i = 0;
            while (i < 3) {
                if ($scope.craps[i]) {
                    craps.push($scope.craps[i]);
                }
                i++;
            }


            craps.sort();
            if (craps.length < 2) {
                $scope.$emit('showNotice', {
                    title: "提示",
                    content: "您尚未选择足够的号码",
                    bottom: "3秒后自动消失,或按“确定”消失",
                    time: 3000,
                    callback: function () {
                        element.focus();
                    },
                    enter: function () {
                        element.focus();
                    }
                });
                return;
            }

            if (craps.length == 2) {
                if (craps[0] == craps[1]) {
                    betType = 3;
                } else {
                    betType = 1;
                }
            } else if (craps.length == 3) {
                if (craps[0] == craps[1] && craps[0] == craps[2]) {
                    betType = 5;
                } else if (craps[0] == craps[1] || craps[0] == craps[2] || craps[1] == craps[2]) {
                    betType = 2;
                } else {
                    betType = 4;
                }
            }

            $state.go("order_confirm", {
                method: $scope.method,
                betType: betType,
                craps: craps
            });
        };
    }])
    .directive('kuai3RenXuanRandomKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', function ($log, $timeout, $state, keyListener, userService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                keyListener.keyListener({
                    element: element,
                    id: "kuai3RenXuanRandom",
                    right: function (item) {
                        keyListener.focus('kuai3RenXuanOneChoice', 0);
                    },
                    down: function (item) {
                        keyListener.focus('kuai3RenXuanEnter', 0);
                    },
                    enter: function (item) {
                        scope.random();
                    },
                    back: function (item) {
                        scope.$emit('isShowIndexMenu', true);
                    }
                });
                $timeout(function () {
                    element.focus();
                }, 700);
            }
        };
    }])
    .directive('kuai3RenXuanOneChoiceKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', function ($log, $timeout, $state, keyListener, userService) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    keyListener.listKeyListener({
                        element: element.parent(),
                        id: "kuai3RenXuanOneChoice",
                        label: "li",
                        columnNum: 3,
                        left: {
                            before: function (item) {
                                var index = $(item).index();
                                if (index % 3 == 0) {
                                    keyListener.focus('kuai3RenXuanRandom', 0);
                                    return false;
                                }
                            }
                        },
                        down: {
                            before: function (item) {
                                var index = $(item).index();
                                if (index < 6 && index > 2) {
                                    keyListener.focus('kuai3RenXuanEnter', 0);
                                    return false;
                                }

                            }
                        },
                        right: {
                            before: function (item) {
                                var index = $(item).index();
                                if (index == 2) {
                                    keyListener.focus('kuai3RenXuanTwoChoice', 0);
                                    return false;
                                } else if (index == 5) {
                                    keyListener.focus('kuai3RenXuanTwoChoice', 3);
                                    return false;
                                }
                            }
                        },
                        enter: function (item) {
                            scope.$parent.changeMethod(1);
                            if ($(item).find('.choose').length > 0) {
                                scope.$parent.craps[0] = null;
                                element.parent().find('.choose').removeClass('choose');
                            } else {
                                scope.$parent.craps[0] = $(item).index() + 1;
                                element.parent().find('.choose').removeClass('choose');
                                $(item).find('div').addClass('choose');
                            }
                        },
                        back: function (item) {
                            scope.$emit('isShowIndexMenu', true);
                        }
                    });
                }
            }
        };
    }])
    .directive('kuai3RenXuanTwoChoiceKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', function ($log, $timeout, $state, keyListener, userService) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    keyListener.listKeyListener({
                        element: element.parent(),
                        id: "kuai3RenXuanTwoChoice",
                        label: "li",
                        columnNum: 3,
                        left: {
                            before: function (item) {
                                var index = $(item).index();
                                if (index == 0) {
                                    keyListener.focus('kuai3RenXuanOneChoice', 2);
                                    return false;
                                } else if (index == 3) {
                                    keyListener.focus('kuai3RenXuanOneChoice', 5);
                                    return false;
                                }

                            }
                        },
                        right: {
                            before: function (item) {
                                var index = $(item).index();
                                if (index == 2) {
                                    keyListener.focus('kuai3RenXuanThreeChoice', 0);
                                    return false;
                                } else if (index == 5) {
                                    keyListener.focus('kuai3RenXuanThreeChoice', 3);
                                    return false;
                                }

                            }
                        },
                        down: {
                            before: function (item) {
                                var index = $(item).index();
                                if (index < 6 && index > 2) {
                                    keyListener.focus('kuai3RenXuanEnter', 0);
                                    return false;
                                }

                            }
                        },
                        enter: function (item) {
                            scope.$parent.changeMethod(1);
                            if ($(item).find('.choose').length > 0) {
                                scope.$parent.craps[1] = null;
                                element.parent().find('.choose').removeClass('choose');
                            } else {
                                scope.$parent.craps[1] = $(item).index() + 1;
                                element.parent().find('.choose').removeClass('choose');
                                $(item).find('div').addClass('choose');
                            }
                        },
                        back: function (item) {
                            scope.$emit('isShowIndexMenu', true);
                        }
                    });
                }
            }
        };
    }])
    .directive('kuai3RenXuanThreeChoiceKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', function ($log, $timeout, $state, keyListener, userService) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    keyListener.listKeyListener({
                        element: element.parent(),
                        id: "kuai3RenXuanThreeChoice",
                        label: "li",
                        columnNum: 3,
                        left: {
                            before: function (item) {
                                var index = $(item).index();
                                if (index == 0) {
                                    keyListener.focus('kuai3RenXuanTwoChoice', 2);
                                    return false;
                                } else if (index == 3) {
                                    keyListener.focus('kuai3RenXuanTwoChoice', 5);
                                    return false;
                                }
                            }
                        },
                        right: {
                            before: function (item) {
                                var index = $(item).index();
                                if (index == 2 || index == 5) {
                                    return false;
                                }
                            }
                        },
                        down: {
                            before: function (item) {
                                var index = $(item).index();
                                if (index < 6 && index > 2) {
                                    keyListener.focus('kuai3RenXuanEnter', 0);
                                    return false;
                                }

                            }
                        },
                        enter: function (item) {
                            scope.$parent.changeMethod(1);
                            if ($(item).find('.choose').length > 0) {
                                scope.$parent.craps[2] = null;
                                element.parent().find('.choose').removeClass('choose');
                            } else {
                                scope.$parent.craps[2] = $(item).index() + 1;
                                element.parent().find('.choose').removeClass('choose');
                                $(item).find('div').addClass('choose');
                            }
                        },
                        back: function (item) {
                            scope.$emit('isShowIndexMenu', true);
                        }
                    });
                }
            }
        };
    }])
    .directive('kuai3RenXuanEnterKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', 'kuai3Service', function ($log, $timeout, $state, keyListener, userService, kuai3Service) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                keyListener.keyListener({
                    element: element,
                    id: "kuai3RenXuanEnter",
                    up: function (item) {
                        keyListener.focus('kuai3RenXuanRandom', 0);
                    },
                    enter: function (item) {
                        if (kuai3Service.current.canBetting) {
                            if (userService.userId) {
                                scope.$parent.betting(element);
                            } else {
                                scope.$emit('notLogin');
                            }
                        } else {
                            scope.$emit('showNotice', {
                                title: "提示",
                                content: "本期投注已截止",
                                bottom: "3秒后自动消失,或按“确定”消失",
                                time: 3000,
                                callback: function () {
                                    keyListener.focus("kuai3RenXuanEnter");
                                },
                                enter: function () {
                                    keyListener.focus("kuai3RenXuanEnter");
                                }
                            });
                        }

                    },
                    back: function (item) {
                        scope.$emit('isShowIndexMenu', true);
                    }
                });
            }
        };
    }]);