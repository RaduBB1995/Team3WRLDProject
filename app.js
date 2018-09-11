const Wrld = require("wrld.js")

const map = Wrld.map("map", "65367fd6a1254b28843e482cbfade28d", {

	center: [56.4620, -3],
	
	zoom: 16,
	
	indoorsEnabled: true,


})
var indoorControl = new WrldIndoorControl('widget-container', map);	
