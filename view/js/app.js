<<<<<<< HEAD
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
=======
const Wrld = require("wrld.js")

const map = Wrld.map("map", "65367fd6a1254b28843e482cbfade28d", {

	center: [56.459900, -2.977970],
	
	zoom: 18,
	
	indoorsEnabled: true,


})
var indoorControl = new WrldIndoorControl('widget-container', map);	

map.openPopup("<div id=\"restauranttitle\"><h2>Westport Hotel Restaurant</h2></div>\
<div id=\"restaurantinfo\">\
	<div id=\"restaurantinfo1\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut nulla vitae felis feugiat scelerisque eget eu sapien.</div>\
	<div id=\"restaurantinfo2\"><p>Suspendisse faucibus arcu sapien, non cursus enim venenatis vel. In purus ex, viverra at ex et, luctus pharetra ex. Curabitur a lectus sed ante luctus vestibulum. </p></div>\
</div>", 
[56.460237, -2.977746], {indoorMapId: 'westport_house', indoorMapFloorId: 0, closeOnClick: false, keepInView: true, closeButton: false, className: 'infopopup', autoClose: false});

var exteriorMarker = L.marker([56.459913, -2.977985], { elevation : 10 , title: "Westport Hotel Restaurant"}).addTo(map);

exteriorMarker.bindPopup("<div id=\"restauranttitle\"><h2>Westport Hotel Restaurant</h2></div>\
<div id=\"restaurantinfo\">\
	<div id=\"restaurantinfo1\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut nulla vitae felis feugiat scelerisque eget eu sapien.</div>\
	<div id=\"restaurantinfo2\"><p>Suspendisse faucibus arcu sapien, non cursus enim venenatis vel. In purus ex, viverra at ex et, luctus pharetra ex. Curabitur a lectus sed ante luctus vestibulum. </p></div>\
</div>", {className: 'infopopupexterior', closeOnClick: false, autoClose: false}).openPopup();
	
function onEnter(event) {
    console.log("Entered indoor map: " + event.indoorMap.getIndoorMapName());
	document.getElementById("hidingslider").style.display = "block";
	setTimeout(function() {
			map.setView([56.460196, -2.978106], 19.75, {
			headingDegrees: 169,
			tiltDegrees: 20,
			animate: true,
			durationSeconds:2
			});
	}, 0);
}
function onExit(event) {
    console.log("Exited indoor map");
	document.getElementById("hidingslider").style.display = "none";
}
map.indoors.on("indoormapenter", onEnter);
map.indoors.on("indoormapexit", onExit);
>>>>>>> dev
