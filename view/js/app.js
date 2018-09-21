const Wrld = require('wrld.js');
const env = require('./env');
const { getChairPolys } = require('./api-service');
const get_Tstamp = require('./get_timestamp');

//Seat colour variable that is set later after fetching relevant data
let seatcolour = "";

//Array of JS objects we place our desired chairs into
const actualChairInfo =[];

//get WRLD api key


const keys = {
  wrld: env.WRLD_KEY,
};

const map = Wrld.map("map", "65367fd6a1254b28843e482cbfade28d", {

	center: [56.459900, -2.977970],
	
	zoom: 18,
	
	indoorsEnabled: true,
})

//Events for page onLoad
window.addEventListener('load', async () => {
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


window.onload = function() {
	console.log("Building popup is open?: " + buildingPoly.isPopupOpen());
	setInterval(function() {
		if(document.getElementById('timeSlider').value != 0){
			document.getElementById('timeSlider').value += 0.25;
		}
	},900000);
}
//
  var buildingLatLong = [
    [56.459780, -2.978628],
	[56.460245, -2.978793],
	[56.460350, -2.978019],
	[56.460018, -2.977921],
	[56.460005, -2.978004],
	[56.459906, -2.977976],
    [56.459857, -2.978132]
  ]

  var buildingPoly = L.polygon(buildingLatLong, {color: '#7aebff'}).addTo(map);

map.openPopup("<div id=\"restauranttitle\"><h2>Westport Hotel Restaurant</h2></div>\
<div id=\"restaurantinfo\">\
	<div id=\"restaurantinfo1\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut nulla vitae felis feugiat scelerisque eget eu sapien.</div>\
	<div id=\"restaurantinfo2\"><p>Suspendisse faucibus arcu sapien, non cursus enim venenatis vel. In purus ex, viverra at ex et, luctus pharetra ex. Curabitur a lectus sed ante luctus vestibulum. </p></div>\
</div>", 
[56.460237, -2.977746], {indoorMapId: 'westport_house', indoorMapFloorId: 0, closeOnClick: false, keepInView: true, closeButton: false, className: 'infopopup', autoClose: false});

//var exteriorMarker = L.marker([56.459913, -2.977985], { elevation : 10 , title: "Westport Hotel Restaurant"}).addTo(map);

buildingPoly.bindPopup("<div id='restauranttitle'><h2>Westport Hotel Restaurant</h2></div>\
<div id='restaurantinfo'>\
	<div id='restaurantinfo1'><p>Occupancy graph here</div>\
	<div id='restaurantinfo2'><p>Seats available here</p></div>\
	<div id='restaurantopen' style='display:block'><p><span style='color:green'>OPEN</span>. Closes at 11:00pm</p></div>\
	<div id='restaurantclosed' style='display:none'><p><span style='color:red'>CLOSED</span>. Opens at 5:00pm</p></div>\
	<div id='westportinfo'><p><a href='http://www.westportservicedapartments.com/' target='_blank'>View the Westport House website</a></p></div>\
	<div id='restaurantphoto'><img src='https://zeno.computing.dundee.ac.uk/2017-ac32006/team3/assets/images/westport.jpg'></img></div>\
</div>", {className: 'infopopupexterior', closeOnClick: false, autoClose: false, offset:[0,-50]}).openPopup();
	

function convert_slider_2_timestamp(sliderHour, sliderValue){
		var a = get_Tstamp.calculate_Tstamp(sliderHour,sliderValue);
		console.log("and away we go: " + a);
}

function sliderToHour() {	
	//assuming the slider goes from day 1 midnight at -72 to day 3 midnight at 0
	//none of this actually works right now because the slider only appears when the 
	var slide = document.getElementById('timeSlider').value;
	console.log("Slider is at: " + slide);
	var hour = Math.abs(slide % 24); //remainder is equivalent to relative simulated time
	console.log("Relative time is: " + hour);

	//passing hour value to be used to calculate which timestamp to use
	convert_slider_2_timestamp(hour,slide);
	

	if (hour >= 17 && hour < 23) {
		//console.log("Restaurant open");
		//hide element saying restaurant is closed, show element saying restaurant is open
		document.getElementById('restaurantopen').style.display = 'block';
		//console.log("Open element: " + document.getElementById('restaurantopen').style.display);
		document.getElementById('restaurantclosed').style.display = 'none';
		//console.log("Closed element: " + document.getElementById('restaurantclosed').style.display);
		buildingPoly.getPopup().setContent();
	}else{
		//console.log("Restaurant closed");
		//console.log(buildingPoly.getPopup().getContent());
		//hide element saying restaurant is open, show element saying restaurant is closed
		document.getElementById('restaurantopen').style.display = 'none';
		//console.log("Open element: " + document.getElementById('restaurantopen').style.display);
		document.getElementById('restaurantclosed').style.display = 'block';
		//console.log("Closed element: " + document.getElementById('restaurantclosed').style.display);
		buildingPoly.getPopup().setContent(); //this... shouldn't work. it should empty the popup's contents. and yet it works as a better updater than their own update() method.
		//console.log(buildingPoly.getPopup().getContent());
	}
}

function checkValue(event) {
	console.log("Popup opened");
	sliderToHour();
}
	
function clickBuilding(event) {
	this.getPopup().setLatLng(this.getCenter());
}	

function mouseOverBuilding(event) {
	this.setStyle({color: '#bff5ff'});
}	
	
function mouseOutBuilding(event) {
	this.setStyle({color: '#7aebff'});
}	
	
function onEnter(event) {
    console.log("Entered indoor map: " + event.indoorMap.getIndoorMapName());
	//document.getElementById("hidingslider").style.display = "block";
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
$.fn.redraw = function(){
  $(this).each(function(){
    var redraw = this.offsetHeight;
  });
};
map.indoors.on("indoormapenter", onEnter);
//map.indoors.on("indoormapexit", onExit);
buildingPoly.on("mouseover", mouseOverBuilding);
buildingPoly.on("mouseout", mouseOutBuilding);
buildingPoly.on("click", clickBuilding);
buildingPoly.on("popupopen", checkValue);
$("#timeSlider").on("change", sliderToHour);

