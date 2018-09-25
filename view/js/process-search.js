var exports = module.exports = {};
var chairObjectsPerTimestamp;
var searchInfo = [];

exports.findTimeStamp = function(timestamp, chairPolys){
  console.log(timestamp);
    searchInfo = [];
    chairPolys.forEach((chairPoly) => {
		//console.log("looping through polygons");
		//console.log(chairPoly);
        //Only return chair information for the timestamp we want, in this case 11AM on the first day
        if(chairPoly.properties.timestamp === timestamp){
			//console.log("pushing polys with right timestamp");
          searchInfo.push(chairPoly);
        }
    });
    console.log(searchInfo);
    return searchInfo;
}
