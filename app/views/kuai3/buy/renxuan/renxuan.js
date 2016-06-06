'use strict';
angular.module('kuai3')
    .controller('kuai3BuyRenXuanCtrl', ['$scope', '$log', function ($scope, $log) {


        $scope.betting = function (idx) {
            var craps, method = 1;

            if (parseInt(idx) == 0) {
                idx = parseInt(Math.random() * 14);
                method = 2;
            } else {
                idx--;
                method = 1;
            }
            craps = [parseInt($scope.hezhi[idx].num)];
            $state.go("order_confirm", {
                method: method,
                betType: 8,
                craps: craps
            });
        };
    }])
    .directive('kuai3RenXuanRandomKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', function ($log, $timeout, $state, keyListener, userService) {
        return {
            restrict: 'A',
            scope: {},
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
                            if ($(item).find('.choose').length > 0) {
                                element.parent().find('.choose').removeClass('choose');
                            } else {
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
                            if ($(item).find('.choose').length > 0) {
                                element.parent().find('.choose').removeClass('choose');
                            } else {
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
                            if ($(item).find('.choose').length > 0) {
                                element.parent().find('.choose').removeClass('choose');
                            } else {
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
    .directive('kuai3RenXuanEnterKeyListener', ['$log', '$timeout', '$state', 'keyListener', 'userService', function ($log, $timeout, $state, keyListener, userService) {
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
                    },
                    back: function (item) {
                        scope.$emit('isShowIndexMenu', true);
                    }
                });
            }
        };
    }]);