'use strict'
exports.LoggerHandler = function(isDebugMode,logLocationFolder){
  var fs = require('fs');

  var gererateDateTime=function(appendTime){
        var currentdate = new Date();
        return currentdate.getDate() + "."
                    + (currentdate.getMonth() + 1) + "."
                    + currentdate.getFullYear() +
                    (appendTime ? "." + currentdate.getHours() + "-"
                    + currentdate.getMinutes() + "-"
                    + currentdate.getSeconds() : '')
    }

var logFileName =  (logLocationFolder + gererateDateTime() + '.log').trim(); 


var _checkFile = function(){
    if (!fs.exists(logLocationFolder)){
        fs.makeDirectory(logLocationFolder);
    }

    if (!fs.exists(logFileName)){
        fs.write(logFileName, 'Created Log At:' + gererateDateTime() + '\r\n', { flag: 'wx' });
    }
    return true;
}

function _logMessage(type,message){
    if(_checkFile())
        fs.write(logFileName, gererateDateTime() + ' ' + type + ':' + message + '\r\n', 'a');
}


 return {
      logError:function(errorMessage){
            _logMessage('ERROR',errorMessage);
      },

      logInfo:function(infoMessage){
            if(isDebugMode)
                _logMessage('INFO',infoMessage);
      }
  }


}