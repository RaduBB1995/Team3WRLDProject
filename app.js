const Wrld = require("wrld.js")

const map = Wrld.map("map", "65367fd6a1254b28843e482cbfade28d", {

	center: [56.459900, -2.977970],
	
	zoom: 18,
	
	indoorsEnabled: true,


})
var indoorControl = new WrldIndoorControl('widget-container', map);	

function onEnter(event) {
    console.log("Entered indoor map: " + event.indoorMap.getIndoorMapName());
	document.getElementById("hidingslider").style.display = "block";
	setTimeout(function() {
			map.setView([56.460196, -2.978106], 19.75, {
			headingDegrees: 169,
			animate: true,
			durationSeconds:2
			});
	}, 0);
	setTimeout(function() {
		map.setCameraTiltDegrees(20);
	}, 2000);
}

function onExit(event) {
    console.log("Exited indoor map");
	document.getElementById("hidingslider").style.display = "none";
}
map.indoors.on("indoormapenter", onEnter);
map.indoors.on("indoormapexit", onExit);