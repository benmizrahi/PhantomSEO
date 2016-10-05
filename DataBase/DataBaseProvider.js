 exports.DataBaseProvider = function(loggerHandler,dbPath){
    var fs = require('fs');
    var dbFile = 'db.json';

    if (!fs.exists(dbPath)){
         fs.makeDirectory(dbPath);
    }

    return {
        GetSnapsootObject:function(url){

        },
        SaveSnapshootObject:function(url){

        },
        DeleteSnapshootObject:function(guid){

        }
    }
 }