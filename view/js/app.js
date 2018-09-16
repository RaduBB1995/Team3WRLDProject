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