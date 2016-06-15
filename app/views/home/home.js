angular.module('app')
    .controller('homeCtrl', ['$scope', '$log', '$state', 'userService', function ($scope, $log, $state, userService) {
        $scope.pageClass = "pageHome";
        $scope.menus = [
            {
                "id": "1",
                "enter": function () {
                    $log.debug("福利彩票");
                    //$log.debug($state)
                    $state.go("fuCai", {});
                },
                "hasGif": true
            },
            {
                "id": "3",
                "enter": function () {
                    $log.debug("开奖信息");
                },
                "hasGif": true
            },
            {
                "id": "4",
                "enter": function () {
                    $log.debug("活动专区");
                },
                "hasGif": true
            },
            {
                "id": "5",
                "enter": function () {
                    $log.debug("彩票讲堂");
                },
                "hasGif": true
            },
            {
                "id": "6",
                "enter": function () {
                    $log.debug("我的账户");
                    if (userService.userInfo.userId) {
                        $state.go("myAccount");
                    } else {
                        $scope.$emit('notLogin');
                    }

                },
                "hasGif": true
            },
            {
                "id": "2",
                "enter": function () {
                    $log.debug("体育彩票");
                },
                "hasGif": false
            }
        ];

        NProgress.done();
    }])
    .directive('homeMenuKeyListener', ['$log', '$timeout', 'keyListener', function ($log, $timeout, keyListener) {
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