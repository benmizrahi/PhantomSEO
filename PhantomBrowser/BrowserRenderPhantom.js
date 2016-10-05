'use strict'
exports.PhantomBrowser = function(isDebugMode,loggerHandler){
    var _webPage = require('webpage')


    var _HTMLRender = function(url,callback){
        var page = _webPage.create();
        page.settings.loadImages = false;
        page.settings.localToRemoteUrlAccessEnabled = true;
        page.settings.encoding = "utf8";

        var settings = {
                headers: {
                "Content-Type": "text/html;charset=utf-8"
            },
            encoding: "utf8"
        };
        page.onCallback = function() {
            callback(page.content);
            page.close();
        };

         page.onInitialized = function() {
             page.evaluate(function() {
                 setTimeout(function() {
                     window.callPhantom();
                 }, 5000);
            });
         };

        page.open(url, settings);
     }

    return{
        renderHtml : function(url, callback) {
            _HTMLRender(url,callback);
        }
    }
};