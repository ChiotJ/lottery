'use strict';
angular.module('kuai3')
    .controller('kuai3IndexCtrl', ['$scope', '$log', '$state', 'kuai3Service', function ($scope, $log, $state, kuai3Service) {
        $scope.pageClass = "pageKuai3Index";

        $scope.info = {
            notice: "和值：" + kuai3Service.last.sum,
            craps: kuai3Service.last.craps,
            time: kuai3Service.current.remainingTime
        };

        $scope.menus = [
            {
                "id": "hezhi",
                "name": "和值",
                "hasGif": true,
                "state": "kuai3Buy.hezhi"

            },
            {
                "id": "santonghao",
                "name": "三同号",
                "hasGif": true,
                "state": "kuai3Buy.santonghao"
            },
            {
                "id": "sanlianhao",
                "name": "三连号",
                "hasGif": true,
                "state": "kuai3Buy.sanlianhao"
            },
            {
                "id": "renxuan",
                "name": "任选",
                "hasGif": true,
                "state": "kuai3Buy.renxuan"
            },
            {
                "id": "jixuan",
                "name": "机选",
                "hasGif": true,
                "state": "kuai3Buy.jixuan"
            },
            {
                "id": "fenxibiaoge",
                "name": "分析表格",
                "hasGif": false
            },
            {
                "id": "kaijiangxinxi",
                "name": "开奖信息",
                "hasGif": false
            },
            {
                "id": "wanfashuoming",
                "name": "玩法说明",
                "hasGif": false
            }
        ];

        NProgress.done();
    }])
    .directive('kuai3IndexMenuKeyListener', ['$log', '$timeout', '$state', 'keyListener', function ($log, $timeout, $state, keyListener) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (scope.$parent.$last) {
                    var menus = scope.$parent.menus;
                    keyListener.listKeyListener({
                        element: element.parent(),
                        label: "li",
                        id: "kuai3Index",
                        columnNum: 5,
                        up: {
                            before: function (item) {
                                var index = $(item).index();
                                if (index < 5) {
                                    keyListener.focus('indexMenu');
                                    return false;
                                }   
                            }
                        },
                        focus: function (item) {
                            var hasGif = menus[$(item).index()].hasGif;
                            var img = $(item).find("img"), src = '';
                            if (hasGif) {
                                src = img.attr("src").replace("png", "gif");
                                img.attr("src", src);
                            } else {
                                src = img.attr("src").replace(".png", "2.png");
                                img.attr("src", src);
                            }

                        },
                        blur: function (item) {
                            var hasGif = menus[$(item).index()].hasGif;
                            var img = $(item).find("img"), src = '';
                            if (hasGif) {
                                src = img.attr("src").replace("gif", "png");
                                img.attr("src", src);
                            } else {
                                src = img.attr("src").replace("2.png", ".png");
                                img.attr("src", src);
                            }
                        },
                        enter: function (item) {
                            var mode = menus[$(item).index()];

                            if (mode.state) {
                                $state.go(mode.state, {mode: mode});
                            }

                        }
                    });
                    $timeout(function () {
                        $(element.parent().children().first()).focus();
                    }, 700);
                }
            }

        };
    }])
    .directive('kuai3Timekeeper', ['$log', '$timeout', 'timekeeper', function ($log, $timeout, timekeeper) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                timekeeper.timekeeper("kuai3", element);
            }

        };
    }]);