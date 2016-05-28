var app = angular.module('app');

app.filter('winInfos', function () {
    return function (winInfos) {
        return winInfos ? winInfos.length * 423 + 'px' : 0;
    }
});