'use strict';
angular.module('kuai3')
    .controller('kuai3IndexCtrl', ['$scope', '$timeout', '$log', '$state', 'kuai3Service', function ($scope, $timeout, $log, $state, kuai3Service) {
        $scope.pageClass = "pageKuai3Index";

        $scope.info = {
            last: kuai3Service.last,
            current: kuai3Service.current
        };


        $scope.menus = [
            {
                "id": "hezhi",
                "name": "和值",
                "hasGif": true,
                "state": "kuai3Buy.hezhi",
                "timeLimit": true

            },
            {
                "id": "santonghao",
                "name": "三同号",
                "hasGif": true,
                "state": "kuai3Buy.santonghao",
                "timeLimit": true
            },
            {
                "id": "sanlianhao",
                "name": "三连号",
                "hasGif": true,
                "state": "kuai3Buy.sanlianhao",
                "timeLimit": true
            },
            {
                "id": "renxuan",
                "name": "任选",
                "hasGif": true,
                "state": "kuai3Buy.renxuan",
                "timeLimit": true
            },
            {
                "id": "jixuan",
                "name": "机选",
                "hasGif": true,
                "state": "kuai3Buy.jixuan",
                "timeLimit": true
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
                    var defaultFocus = 0;
                    if (keyListener.index["kuai3Index"])
                        defaultFocus = keyListener.index["kuai3Index"];
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
                                if (!mode.timeLimit || scope.$parent.info.current.canBetting) {
                                    $state.go(mode.state, {mode: mode});
                                } else {
                                    scope.$emit('showNotice', {
                                        title: "提示",
                                        content: "本期投注已截止",
                                        bottom: "3秒后自动消失,或按“确定”消失",
                                        time: 3000,
                                        callback: function () {
                                            keyListener.focus("kuai3Index");
                                        },
                                        enter: function () {
                                            keyListener.focus("kuai3Index");
                                        }
                                    });
                                }

                            }

                        }
                    });
                    $timeout(function () {
                        keyListener.focus("kuai3Index", defaultFocus);
                    }, 700);
                }
            }

        };
    }]);