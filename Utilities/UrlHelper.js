'use strict'
exports.UrlHelper = function(isDebugMode){

var url = require('phantom-url');

  var _removeEscaped_fragment = function(fullUrl) {
      return fullUrl.replace('?escaped_fragment_=', '');
  }

  var _removeUrlQuery = function(fullUrl){
      return fullUrl.replace('/?url=', '');
  }

  var _decodeUrl = function(_cureentUrl,_prevUrl){
     var newDecode =  decodeURI(_cureentUrl);
     if(newDecode == _prevUrl){
        return encodeURI(newDecode);
     }
     else{
       return _decodeUrl(newDecode,_cureentUrl);
     }
  }

  return {
        GetManipulateUrl:function(_url){
           return _decodeUrl(_removeUrlQuery(_removeEscaped_fragment(_url)));
        }
  }
};