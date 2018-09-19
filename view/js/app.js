const Wrld = require('wrld.js');
const env = require('./env');
const { getChairPolys } = require('./api-service');

//Seat colour variable that is set later after fetching relevant data
let seatcolour = "";

//Array of JS objects we place our desired chairs into
const actualChairInfo =[];

//get WRLD api key
const keys = {
  wrld: env.WRLD_KEY,
};

//Events for page onLoad
window.addEventListener('load', async () => {
  const map = await Wrld.map('map', keys.wrld, {
    center: [56.460060, -2.978277],
    zoom: 17,
    indoorsEnabled: true,
  });
  const indoorMapId = 'westport_house';
  map.on('initialstreamingcomplete', async () => {
    //Run external script to connect to JSON server
    const chairPolys = await getChairPolys();
    //Returns all the Data from the JSON file
    chairPolys.forEach((chairPoly) => {
        //Only return chair information for the timestamp we want, in this case 11AM on the first day
        if(chairPoly.TimeStamp === "2018-09-01 12:00:00"){
          actualChairInfo.push(chairPoly);
        }
    });
    //Go through each chair that we wanted, apply colours depending on the state of the seat
    actualChairInfo.forEach((currentChair) => {
      if(currentChair.Occupied === true){
        seatcolour = "#fe022f";
      }else if(currentChair.Occupied === false && currentChair.RecentlyOccupied === true){
        seatcolour = "#f0e46e";
      }else if(currentChair.Occupied === false && currentChair.RecentlyOccupied === false){
        seatcolour = "#00f272"
      }
      //Add leaflet polygon for each seat, could easily be in an array of JS objects for easier referencing
      L.polygon(currentChair.Coordinates, {color : seatcolour,indoorMapId: "westport_house",indoorMapFloorId: 0}).addTo(map);
    });
  });
  const indoorControl = new WrldIndoorControl('widget-container', map);
  });
