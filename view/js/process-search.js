var exports = module.exports = {};
var chairObjectsPerTimestamp;
var searchInfo = [];

exports.findTimeStamp = function(timestamp, chairPolys) {
  console.log(timestamp);
  searchInfo = [];
  chairPolys.forEach((chairPoly) => {
    //Only return chair information for the timestamp we want
    if (chairPoly.properties.timestamp === timestamp) {
      searchInfo.push(chairPoly);
    }
  });
  return searchInfo;
}
