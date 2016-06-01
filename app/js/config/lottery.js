'use strict';
var lotteryApp = angular.module('lotteryApp', ['fuCaiService']);


angular.module('fucai', ['kuai3']);
angular.module('kuai3', []);

lotteryApp.run(['kuai3Service', function (kuai3Service) {
    kuai3Service.init();
}])