var exports = module.exports = {};
var chairObjectsPerTimestamp;
var actualChairInfo = [];

exports.findTimeStamp = function(timestamp, chairPolys){
    actualChairInfo = [];
    chairPolys.forEach((chairPoly) => {
		//console.log("looping through polygons");
		//console.log(chairPoly);
        //Only return chair information for the timestamp we want, in this case 11AM on the first day
        if(chairPoly.properties.timestamp === timestamp){
			//console.log("pushing polys with right timestamp");
          actualChairInfo.push(chairPoly);
        } 
    });

    return actualChairInfo;
}
