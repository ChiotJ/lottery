'use strict';
var lotteryApp = angular.module('lotteryApp', ['fuCaiService']);


lotteryApp.run(['kuai3Service', function (kuai3Service) {
    kuai3Service.init();
}])