const Wrld = require('wrld.js');
const env = require('./env');
const { getChairPolys } = require('./api-service');
const get_Tstamp = require('./get_timestamp');
const { findTimeStamp } = require('./process-search');
let chairPolys = [];
var sliderTimeStamp = "2018-09-04 09:00:00";
//Seat colour variable that is set later after fetching relevant data
let seatcolour = "";
var totalNOcp = 0;
var totalROcp = 0;
var totalCOcp = 0;
//Array of JS objects we place our desired chairs into
let actualChairInfo =[];
var Chart = require('chart.js');
var data = [];
var label =["Recently Occupied", "Un-Occupied", "Occupied"];
//get WRLD api key


const keys = {
  wrld: env.WRLD_KEY,
};

const map = Wrld.map("map", "65367fd6a1254b28843e482cbfade28d", {

	center: [56.459900, -2.977970],
	maxZoom: 30,
	zoom: 18,
	
	indoorsEnabled: true,
})
//Declare new feature group for all chair polygons
let chairGroup = new L.featureGroup();

//Add on clickevent for all layers in featureGroup
chairGroup.on('click', function(e)
 {
   console.log("Chair clicked");
   //e.layer.bindPopup("Chair #" + chairGroup.getLayerId(e.layer), {closeOnClick: false, autoClose:true, indoorMapId: 'westport_house', indoorMapFloorId: 0}).openPopup();
   //console.log("clicked on chair " + chairGroup.getLayerId(e.layer))
   //console.log("at: " + e.layer.getPopup().getLatLng());
   map.setView(e.layer.getPopup().getLatLng(), 21.35, {animate:true});
}
);
//Events for page onLoad
window.addEventListener('load', async () => {
  console.log("onload");
  const indoorMapId = 'westport_house';
  map.on('initialstreamingcomplete', async () => {
    //Run external script to connect to JSON server
	console.log("initial stream complete");
  chairPolys = await getChairPolys();
	console.log("get chair polygons");
    //Returns all the Data from the JSON file

	actualChairInfo = findTimeStamp(sliderTimeStamp, chairPolys);

    //Apply a popup containing a div with the chair's id to each polygon
	/* function onEachFeature(feature, layer) {
		console.log("Binding popups");
		layer.bindPopup("<div id=" + feature.properties.chairID + ">Chair #" + feature.properties.chairID + "</div>");
	} */
	//console.log(actualChairInfo);
	//Go through each chair that we wanted, apply colours depending on the state of the seat	
	/* L.geoJSON(actualChairInfo, {
		//onEachFeature: onEachFeature,
		style: function(feature) {
			switch (feature.properties.status) {
				case 'occupied': return {color: "#fe022f"};
				case 'unoccupied' : return {color: "#f0e46e"};
				case 'recentlyOccupied': return {color: "#00f272"};
			}
		}
	}).bindPopup(function (layer) {
		return "<div id='" + layer.feature.properties.chairID + "'></div>";
	}).addTo(map); */
    actualChairInfo.forEach((currentChair) => {
      if(currentChair.properties.status === "occupied"){
        seatcolour = "#fe022f";
		//n = n - 1;
      }else if(currentChair.properties.status === "recentlyOccupied"){
        seatcolour = "#f0e46e";
			//n = n + 3;
		//console.log(n);
      }else if(currentChair.properties.status === "notOccupied"){
        seatcolour = "#00f272";
		//n = n + 3;
		//console.log(n);
		//n = ;
      }
      //Add leaflet polygon for each seat, could easily be in an array of JS objects for easier referencing
      var polyChair = L.polygon(currentChair.geometry.coordinates, {color : seatcolour,indoorMapId: "westport_house",indoorMapFloorId: 0}).bindPopup("<div id=chair" + currentChair.properties.chairID 
																																				+ ">Chair #" + currentChair.properties.chairID 
																																				+ "<div id=" + currentChair.properties.chairID +"occupancy>" 
																																				+ currentChair.properties.status 
																																				+ "</div>" 
																																				+ "</div>", 
																																				{closeOnClick: false, 
																																				autoClose:true, 
																																				indoorMapId: 'westport_house', 
																																				indoorMapFloorId: 0});
	  //add created variable to featureGroup
      chairGroup.addLayer(polyChair);
      //add polygon to map
		});
		chairGroup.eachLayer(
			function(layer){
				map.addLayer(layer)}
			)
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
   var marker = L.marker([56.460237, -2.977746], {        
        title: "This is indoors!",
        indoorMapId: "westport_house",
        indoorMapFloorId: 0
      }).addTo(map); 
	  
	  let title = document.getElementById("mydiv");

marker.unbindPopup().bindPopup(title, { 
  className: 'infopopupexterior',
  autoPan:true,
  maxWidth: "auto"
}).openPopup();

/* map.openPopup("<div id=\"restauranttitle\"><h2>Westport Hotel Restaurant</h2></div>\
<div id=\"restaurantinfo\">\
</div>", 
[56.460237, -2.977746], {indoorMapId: 'westport_house', indoorMapFloorId: 0, closeOnClick: false, keepInView: true, closeButton: false, className: 'infopopup', autoClose: false}); */

//var exteriorMarker = L.marker([56.459913, -2.977985], { elevation : 10 , title: "Westport Hotel Restaurant"}).addTo(map);

buildingPoly.bindPopup("<div id='restauranttitle'><h2>Westport Hotel Restaurant</h2></div>\
<div id='restaurantinfo'>\
	<div id='restaurantinfo1'><svg height='100' width='500' >\
						<rect  x='30' y='75' width= '198' height='10' stroke='black' stroke-width='4' fill='red'  />\
						<rect id = 't' x='30' y='77' width= '0' height='6' stroke='black' stroke-width='0' fill='green' />\
					</svg>\</div>\
	<div id='restaurantinfo2'><p>Seats available here:</p></div>\
	<div id='restaurantopen' style='display:block'><p><span style='color:green'>OPEN</span>. Closes at 11:00pm</p></div>\
	<div id='restaurantclosed' style='display:none'><p><span style='color:red'>CLOSED</span>. Opens at 5:00pm</p></div>\
	<div id='westportinfo'><p><a href='http://www.westportservicedapartments.com/' target='_blank'>View the Westport House website</a></p></div>\
	<div id='restaurantphoto'><img src='https://zeno.computing.dundee.ac.uk/2017-ac32006/team3/assets/images/westport.jpg'></img></div>\
</div>", {className: 'infopopupexterior', closeOnClick: false, autoClose: false, offset:[0,-50]}).openPopup();
	
function convertSlider2Timestamp(sliderHour, sliderValue){
		sliderTimeStamp  = get_Tstamp.calculate_Tstamp(sliderHour,sliderValue);
		
}
	


function sliderToHour() {	
		totalNOcp = 0;
		totalROcp = 0;
		totalCOcp = 0;
	//assuming the slider goes from day 1 midnight at -48 to day 2 midnight at 0
	var slide = document.getElementById('timeSlider').value;
	console.log("Slider is at: " + slide);
	var hour = Math.abs(slide % 24); //remainder is equivalent to relative simulated time
	console.log("Relative time is: " + hour);
	//var totalUOcp = (totalNOcp + totalROcp)/3;
	//passing hour value to be used to calculate which timestamp to use
	convertSlider2Timestamp(hour,slide);
	if (hour >= 17 && hour < 23) {
		findTimeStamp(sliderTimeStamp, chairPolys);
		resetPolyColors();
		console.log("Restaurant open");
		document.getElementById("t").setAttribute('width', totalNOcp + totalROcp);
				//console.log("total: "+ totalUOcp);
		//hide element saying restaurant is closed, show element saying restaurant is open
		document.getElementById('restaurantopen').style.display = 'block';
		//console.log("Open element: " + document.getElementById('restaurantopen').style.display);
		document.getElementById('restaurantclosed').style.display = 'none';
		//console.log("Closed element: " + document.getElementById('restaurantclosed').style.display);
		
		buildingPoly.getPopup().setContent();
		
			//fetchTimestamp(sliderTimeStamp);
	}else{
		actualChairInfo = findTimeStamp(sliderTimeStamp, chairPolys);
		resetPolyColors();
		console.log("Restaurant closed");
		//let totalNOcp = 66*3;
		document.getElementById("t").setAttribute('width',  totalNOcp);
		//console.log("total: "+ totalUOcp);
		//console.log(buildingPoly.getPopup().getContent());
		//hide element saying restaurant is open, show element saying restaurant is closed
		document.getElementById('restaurantopen').style.display = 'none';
		//console.log("Open element: " + document.getElementById('restaurantopen').style.display);
		document.getElementById('restaurantclosed').style.display = 'block';
		//console.log("Closed element: " + document.getElementById('restaurantclosed').style.display);
		
		buildingPoly.getPopup().setContent(); //this... shouldn't work. it should empty the popup's contents. and yet it works as a better updater than their own update() method.
		//console.log(buildingPoly.getPopup().getContent());
			//fetchTimestamp(sliderTimeStamp);
	}
	createDataArray();
	removeData(myChart);
	updateChart(myChart, label, data);
	marker.getPopup().setContent();
}
function updateChart(myChart, label, data)
{
	myChart.data.datasets.forEach((datasets)=>{
			datasets.data.push(data);
	});
	myChart.update();
}
function removeData(myChart) {
    //myChart.data.labels.pop();
    myChart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    myChart.update();
}
function createDataArray(){
	data[0] = totalROcp;
	data[1]	=  totalNOcp;
	data[2] = totalCOcp;
}
function resetPolyColors(){
	totalNOcp = 0;
	totalROcp = 0;
	totalCOcp = 0;
	chairGroup.eachLayer(
		function(layer){
		 map.removeLayer(layer)
		chairGroup.removeLayer(layer)}
		)
	console.log("Destiny2");
	console.log(chairGroup);
	actualChairInfo.forEach((currentChair) => {
		if(currentChair.properties.status === "occupied"){
			seatcolour = "#fe022f";
			if(totalCOcp < 199){
			totalCOcp = totalCOcp + 3;
			};
		}else if(currentChair.properties.status === "recentlyOccupied"){
			seatcolour = "#f0e46e";
			if (totalROcp < 199){
			totalROcp = totalROcp + 3;
			};
		}else if(currentChair.properties.status === "notOccupied"){ 
			seatcolour = "#00f272";
			if (totalNOcp <199){
				totalNOcp = totalNOcp + 3;
			};
			//console.log(n);
		}
	 //Add leaflet polygon for each seat, could easily be in an array of JS objects for easier referencing
	 var polyChair = L.polygon(currentChair.geometry.coordinates, {color : seatcolour,indoorMapId: "westport_house",indoorMapFloorId: 0}).bindPopup("<div id=chair" + currentChair.properties.chairID 
	 + ">Chair #" + currentChair.properties.chairID 
	 + "<div id=" + currentChair.properties.chairID +"occupancy>" 
	 + currentChair.properties.status 
	 + "</div>" 
	 + "</div>", 
	 {closeOnClick: false, 
	 autoClose:true, 
	 indoorMapId: 'westport_house', 
	 indoorMapFloorId: 0});
//add created variable to featureGroup
chairGroup.addLayer(polyChair);
//add polygon to map
	})	
	chairGroup.eachLayer(
		function(layer){
			map.addLayer(layer)}
		)
		createDataArray();
} 

function checkValue(event) {
	console.log("Popup opened");
	sliderToHour();
}
	
function clickBuilding(event) {
	//document.getElementById("t").setAttribute('width', n);
	this.getPopup().setLatLng(this.getCenter());
	//this.getPopup().setContent();
	
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
	//resetPolyColors();
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

//function drawChart(){
 let ctx = document.getElementById("myChart");
  let myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Recently Occupied', 'Un-Occupied', 'Occupied'],
      datasets: [{
        label: 'Grafik',
        data: data,
        backgroundColor: [
		'rgba(255,255,0,0.4)',
		'rgba(0,255,0,0.4)',
		'rgba(255,0,0,0.4)'
		]
      }]
    },
    options: {
      responsive: true,
	  Legend: {
	  display: true,
	  hidden: false
	  }
    }
  });
//}
// function fetchTimestamp(str)
// {
// if (str==="closed")
//   {
//   return;
//   }
// if (window.XMLHttpRequest)
//   {// code for IE7+, Firefox, Chrome, Opera, Safari
//   xmlhttp=new XMLHttpRequest();
//   }
// else
//   {// code for IE6, IE5
//   xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//   }
// xmlhttp.onreadystatechange=function()
//   {
//   if (this.readyState==4 && this.status==200)
//     {
// 			sliderTimeStamp=this.responseText;
//     }
//   }
// xmlhttp.open("GET","getcustomer.asp?q="+str,true);
// xmlhttp.send();
// }