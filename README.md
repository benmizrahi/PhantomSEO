##Phantom SEO And Social Sharing

This project is an alternative solution to the SEO problem describe in this tutorial :

[AngularJS SEO Problem](http://www.codeproject.com/Articles/1084523/AngularJS-Social-Sharing-And-SEO)

This version of the code make use of phantomJS as a headless browser and has the following features:
- Server side rendering of JS application.
- Snapshoot creator and serve as an full website HTML pages.
- The project is in production, and has been a fabulous Open-Source solution to SEO and Social-Share problem on fully 	  JS Applications.


###Global Settings
package.json file contins all the information that the service needed to work well:
- wservicename - The service name
- debugMode - "True"/"False"
- logLocationFolder - Where to put the log files of phantom (empty is under logs folder is the working 		
dictionary).
- phantomPort - what port should the service listen too.
- createSnapshoots - "True"/"False".
- sanpshootFolder - where to create the snapshoots files.



###Run the service
```javascript
phantomjs.exe main.js
```

Then when the project is running follow the steps (for iis users) in the tutorial to make the URLRewite to the phantom port.


For any Help:
Ben Mizrahi
benm@item-soft.com





