angular.module('app')
    .filter('winInfos', function () {
        return function (winInfos) {
            return winInfos ? winInfos.length * 423 + 'px' : 0;
        }
    });