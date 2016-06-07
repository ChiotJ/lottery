angular.module('app')
    .filter('winInfos', function () {
        return function (winInfos) {
            return winInfos ? winInfos.length * 423 + 'px' : 0;
        }
    })
    .filter('bettingMethod', function () {
        return function (bettingMethod) {
            var result = "";
            if (bettingMethod == 1) {
                result = "自选";
            } else if (bettingMethod == 2) {
                result = "机选";
            } else {
                result = "异常";
            }
            return result;
        }
    })
    .filter('bettingTime', function () {
        return function (bettingTime) {
            return bettingTime.substring(5, 16);
        }
    });