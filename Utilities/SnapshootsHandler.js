'use strict'
 exports.SnapshootsHandler = function (location) {
    var fs = require('fs');
    
    var _checkFile = function(){
       if (!fs.exists(location)){
            fs.makeDirectory(location);
       }
       return true;
    };

    //Private Members
    var _saveSanpshootForUrl = function(url,html) {
        var fileName = location + encodeURIComponent(url) + '.html';
        if( _checkFile())
            fs.write(fileName, html, { flag: 'wx' });
        return true;
    }

    var _getSanpshootForUrl = function(url) {
        var fileName = location + encodeURIComponent(url) + '.html';
         if (fs.exists(fileName)){
            return fs.read(fileName);
         }
         return null;
    }

    //return API
    return {
        getSnapsootHtmlOrNull:function(url){
            if(url &&  location)
                return _getSanpshootForUrl(url);
            return null;
        },
        saveSanpshootToUrl:function(url,html){
            if(url && html && location)
                return _saveSanpshootForUrl(url,html);
            return false;
        }
    }
}