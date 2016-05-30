/**
 * Created by jian_ on 2016/5/26.
 */
var app = angular.module("app");

app.constant("apiUrl", {
    "api_family": "http://family.digital-media.com.cn/family/",
    "api_lottery": "http://localhost/tvLottery/"
});

app.constant("cardId", GHSMLib.cardId);