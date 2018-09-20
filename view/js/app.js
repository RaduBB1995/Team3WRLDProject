const Wrld = require("wrld.js");
const env = require('./env');

const keys = {
  wrld: env.WRLD_KEY,
};

const map = Wrld.map("map", "65367fd6a1254b28843e482cbfade28d", {

	center: [56.459900, -2.977970],
	
	zoom: 18,
	
	maxZoom: 40,
	
	indoorsEnabled: true,
})

window.onload = function() {
	console.log("Building popup is open?: " + buildingPoly.isPopupOpen());
	setInterval(function() {
		if(document.getElementById('timeSlider').value != 0){
			document.getElementById('timeSlider').value += 0.25;
		}
	},900000);
}

//
// Table 1
var chair1LatLong = [
    [56.460166, -2.978128],
    [56.460167, -2.978121],
    [56.460162, -2.978119],
    [56.460161, -2.978127],
  ];
  var chair2LatLong = [
    [56.460156, -2.978124],
    [56.460156, -2.978117],
    [56.460152, -2.978115],
    [56.460151, -2.978123],
  ];
  var chair3LatLong = [
    [56.460146, -2.978121],
    [56.460147, -2.978113],
    [56.460143, -2.978112],
    [56.460142, -2.978119],
  ];
  var chair4LatLong = [
    [56.460138, -2.978117],
    [56.460139, -2.978110],
    [56.460134, -2.978108],
    [56.460134, -2.978116],
  ];
  var chair5LatLong = [
    [56.460169, -2.978095],
    [56.460170, -2.978089],
    [56.460167, -2.978087],
    [56.460165, -2.978093],
  ];
  var chair6LatLong = [
    [56.460159, -2.978091],
    [56.460160, -2.978085],
    [56.460156, -2.978083],
    [56.460155, -2.978090],
  ];
  var chair7LatLong = [
    [56.460150, -2.978088],
    [56.460151, -2.978081],
    [56.460147, -2.978080],
    [56.460146, -2.978086],
  ];
  var chair8LatLong = [
    [56.460141, -2.978084],
    [56.460142, -2.978078],
    [56.460138, -2.978076],
    [56.460137, -2.978083],
  ];



  var poly1 = L.polygon(chair1LatLong, {color: '#5cf442', indoorMapId: "westport_house",indoorMapFloorId: 0}).addTo(map);
  var poly2 = L.polygon(chair2LatLong, {color: '#5cf442', indoorMapId: "westport_house",indoorMapFloorId: 0}).addTo(map);
  var poly3 = L.polygon(chair3LatLong, {color: '#5cf442', indoorMapId: "westport_house",indoorMapFloorId: 0}).addTo(map);
  var poly4 = L.polygon(chair4LatLong, {color: '#5cf442', indoorMapId: "westport_house",indoorMapFloorId: 0}).addTo(map);
  var poly5 = L.polygon(chair5LatLong, {color: '#5cf442', indoorMapId: "westport_house",indoorMapFloorId: 0}).addTo(map);
  var poly6 = L.polygon(chair6LatLong, {color: '#5cf442', indoorMapId: "westport_house",indoorMapFloorId: 0}).addTo(map);
  var poly7 = L.polygon(chair7LatLong, {color: '#5cf442', indoorMapId: "westport_house",indoorMapFloorId: 0}).addTo(map);
  var poly8 = L.polygon(chair8LatLong, {color: '#5cf442', indoorMapId: "westport_house",indoorMapFloorId: 0}).addTo(map);

  var chairs = L.featureGroup([poly1, poly2, poly3, poly4, poly5, poly6, poly7, poly8]);

  var chairPopup = L.popup().setContent('<p>Test</p>');

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
  
var indoorControl = new WrldIndoorControl('widget-container', map);	

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
	
function sliderToHour() {	
	//assuming the slider goes from day 1 midnight at -72 to day 3 midnight at 0
	//none of this actually works right now because the slider only appears when the 
	var slide = document.getElementById('timeSlider').value;
	console.log("Slider is at: " + slide);
	var hour = Math.abs(slide % 24); //remainder is equivalent to relative simulated time
	console.log("Relative time is: " + hour);
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

map.indoors.on("indoormapenter", onEnter);
//map.indoors.on("indoormapexit", onExit);
buildingPoly.on("mouseover", mouseOverBuilding);
buildingPoly.on("mouseout", mouseOutBuilding);
buildingPoly.on("click", clickBuilding);
buildingPoly.on("popupopen", checkValue);
$("#timeSlider").on("change", sliderToHour);
chairs.eachLayer(
	function(layer) {
		layer.bindPopup("Chair #" + chairs.getLayerId(layer), {indoorMapId: 'westport_house', indoorMapFloorId: 0, closeOnClick: false, autoClose:true, }).openPopup();
		layer.on("click", function() {
			console.log("clicked on chair " + chairs.getLayerId(layer))
			console.log("at: " + layer.getPopup().getLatLng());
			map.setView(layer.getPopup().getLatLng(), 21.4, {animate:true});
			});
	}
);