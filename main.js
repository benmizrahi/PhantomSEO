var pjson = require('./package.json');
var fs = require('fs');
var webServer = require('webserver').create();

/*Parameters For Hosting,Snapshoots And Logger*/
var port = parseInt(pjson.phantomPort);
var isDebugMode = pjson.debugMode == "true";
var createSnapshoots =  pjson.createSnapshoots == "true";
var sanpshootFolder = pjson.sanpshootFolder;
var logLocationFolder = pjson.logLocationFolder || fs.workingDirectory + '\\logs\\';
var dbLocationFolder = pjson.dbLocation || fs.workingDirectory + '\\DataBase\\';
var snapshootsHandler = require('./Utilities/SnapshootsHandler.js').SnapshootsHandler(sanpshootFolder);
var loggerHandler = require('./Utilities/LoggerHandler.js').LoggerHandler(isDebugMode,logLocationFolder);
var UrlHelper = require('./Utilities/UrlHelper.js').UrlHelper(isDebugMode);
var browser = require('./PhantomBrowser/BrowserRenderPhantom.js').PhantomBrowser(isDebugMode,loggerHandler);
var dataBaseProvider = require('./DataBase/DataBaseProvider.js').DataBaseProvider(loggerHandler,dbLocationFolder)


webServer.listen(port, function (req, res) {
    try{       
        loggerHandler.logInfo('New Request Arrive ' + req.url);
            var url = UrlHelper.GetManipulateUrl(req.url);
            if(url) {
                loggerHandler.logInfo('Request Format is OK');
                if(createSnapshoots && snapshootsHandler.getSnapsootHtmlOrNull(url)){
                    loggerHandler.logInfo('Loding response from sanpshoots!');
                    res.setEncoding('utf-8');
                    res.write(snapshootsHandler.getSnapsootHtmlOrNull(url));
                    res.close();
                    loggerHandler.logInfo('Return Sanpshoot HTML !');        
                }
                else {
                    loggerHandler.logInfo('Loading HTML from zombie browser');
                    browser.renderHtml(url, function (html) {
                        loggerHandler.logInfo('Callback recived from Phantom');
                        if(createSnapshoots){
                            loggerHandler.logInfo('Creatring a snapshoot for url:' + url);
                            snapshootsHandler.saveSanpshootToUrl(url,html);
                            loggerHandler.logInfo('Snapshoot created successfully');
                        }
                         res.setEncoding('utf-8');
                         res.write(html);
                         res.close();
                        loggerHandler.logInfo('Return Phantom HTML OK for url :' + url + '!');
                    });
                }
            }
            else{
                loggerHandler.logError('An error occurred processing the request url' + req.url)
                res.write("No Match");
                res.close();
            }
    }
    catch(ex) {
        loggerHandler.logError(ex);
        res.write("An error occurred!");
        loggerHandler.logError('An error occurred processing the request url' + req.url) 
        loggerHandler.logError('ex is :' + JSON.stringify(ex));                
        res.close();
    }
});