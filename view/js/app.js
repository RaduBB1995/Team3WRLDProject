const Wrld = require('wrld.js');
const env = require('./env');
const sideview = require('./sideview');
//const sliderFile = require('./slider');
const { getChairPolys } = require('./api-service');
const get_Tstamp = require('./get_timestamp');
const { findTimeStamp } = require('./process-search');
let chairPolys = [];
var sliderTimeStamp = "2018-09-04 09:00:00";
var hour = 0;
var dayAdjusted = 0;
//Seat colour variable that is set later after fetching relevant data
let seatcolour = "";
var availableSeats = 0;
//Array of JS objects we place our desired chairs into
var actualChairInfo =[];

var playClicked = false;

var sliderIncrement = 0;
var testArray = [];
var chairDoughnutData = [];
var dbTimeArray = [];
var dbdbTimeArray = [];

var halfTimeArray = [];
var oneTimeArray = [];
var onehalfTimeArray = [];
var twoTimeArray = [];

var currYesterday = [];
var halfTimeDBArray = [];
var oneTimeDBArray = [];
var onehalfTimeDBArray = [];
var twoTimeDBArray = [];

var currOccupancy = 0;
var halfTimeOcc = 0;
var oneTimeOcc = 0;
var oneHalfTimeOcc = 0;
var twoTimeOcc = 0;

var currYOccupancy = 0;
var halfYTimeOcc = 0;
var oneYTimeOcc = 0;
var oneHalfYTimeOcc = 0;
var twoYTimeOcc = 0;
var uoArray = [];
var yuoArray = [];
var chairOccCount = 0;
var chairYOccCount = 0;
var chairYYOccCount = 0;

var chairYCurrArr = [];
var chairYYCurrArr = [];

var chairYCurrArr = [];
var chairYYCurrArr = [];

var chairArray = [];
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
   console.log("Chair clicked: " + e.layer.options.label);
   populateChairChart(e.layer.options.label);
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
      }else if(currentChair.properties.status === "recentlyOccupied"){
        seatcolour = "#f0e46e";
      }else if(currentChair.properties.status === "notOccupied"){
        seatcolour = "#00f272";
      }else if(currentChair.properties.status === "closed"){
    		seatcolour = "#ffffff";
    	}
      //Add leaflet polygon for each seat, could easily be in an array of JS objects for easier referencing
      var polyChair = L.polygon(currentChair.geometry.coordinates, {label:currentChair.properties.chairID, color : seatcolour,indoorMapId: "westport_house",indoorMapFloorId: 0}).bindPopup("<div class='chairdiv' id=chair" + currentChair.properties.chairID + ">"
																																				//+ Chair #" + currentChair.properties.chairID
																																				+ "<div class='chairtitle' id=" + currentChair.properties.chairID +"title style='background-color: " + getColour(currentChair) + "'>"
																																				+ "<h1 style='text-align:center + ;'>" + titleStatus(currentChair) + "</h1>"
																																				+ "</div>"
																																				+ "<div class='chairlastoccupied' id=" + currentChair.properties.chairID +"lastoccupied>"
																																				+ "Last Occupied: " + lastOccupied(currentChair)
																																				+ "</div>"
																																				+ "<div class='chairdailyoccupants' id=" + currentChair.properties.chairID +"dailyoccupants>"
																																				+ "Occupants Today: " + occupantsToday(currentChair)
																																				+ "</div>"
																																				+ "<div class='chairoccupancygraph' id=" + currentChair.properties.chairID +"occupancygraph>"
																																				+ "Occupancy graph here"
																																				+ "</div>"
																																				+ "<div class='chairoccupancy' id=" + currentChair.properties.chairID +"occupancy>"
																																				+ "Status: " + chairStatus(currentChair)
																																				+ "</div>"
																																				+ "</div>",
																																				{closeOnClick: true,
																																				autoClose:true,
																																				indoorMapId: 'westport_house',
																																				indoorMapFloorId: 0})
																																				.addTo(map);
	  //add created variable to featureGroup
      chairGroup.addLayer(polyChair);
      //add polygon to map
		});
		chairGroup.eachLayer(
			function(layer){
				map.addLayer(layer)}
			)
      //Needed for Chart.js on load
			resetPolyColors();
  });
  time();
  const indoorControl = new WrldIndoorControl('widget-container', map);
  });


window.onload = function() {
	console.log("Building popup is open?: " + buildingPoly.isPopupOpen());
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


//var exteriorMarker = L.marker([56.459913, -2.977985], { elevation : 10 , title: "Westport Hotel Restaurant"}).addTo(map);

buildingPoly.bindPopup("<div id='restauranttitle'><h2>Westport Hotel Restaurant</h2></div>\
<div id='restaurantinfo'>\
	<div id='restaurantinfo1'>\
	<div id='mydiv2' style='margin-left:10px;'><canvas style='clear:both; position: relative;' id='myChart2'></canvas></div>\
	<div id='restaurantinfo2'><p>Seats available here</p></div>\
	<div id='restaurantopen' style='display:block'><p><span style='color:green'>OPEN</span>. Closes at 11:00pm</p></div>\
	<div id='restaurantclosed' style='display:none'><p><span style='color:red'>CLOSED</span>. Opens at 5:00pm</p></div>\
	<div id='westportinfo'><p><a href='http://www.westportservicedapartments.com/' target='_blank'>View the Westport House website</a></p></div>\
</div>", {className: 'infopopupexterior', closeOnClick: true, autoClose: false, offset:[0,-50], closeButton: false}).openPopup();

function convertSlider2Timestamp(sliderHour, sliderValue){
		sliderTimeStamp  = get_Tstamp.calculate_Tstamp(sliderHour,sliderValue);
	time();
}

function populateRestaurantChart(){
  //For retreveing information from days prior (for chart.js)
  //Counts for current day
  currOccupancy = 0;
  halfTimeOcc = 0;
  oneTimeOcc = 0;
  oneHalfTimeOcc = 0;
  twoTimeOcc = 0;

  //Counts for previous day
  currYOccupancy = 0;
  halfYTimeOcc = 0;
  oneYTimeOcc = 0;
  oneHalfYTimeOcc = 0;
  twoYTimeOcc = 0;

  //Arrays of chair objects from current day timestamps
  halfTimeArray = findTimeStamp(get_Tstamp.calculate_Tstamp(hour - 0.5,(dayAdjusted)),chairPolys);
  oneTimeArray = findTimeStamp(get_Tstamp.calculate_Tstamp(hour - 1,(dayAdjusted)),chairPolys);
  onehalfTimeArray = findTimeStamp(get_Tstamp.calculate_Tstamp(hour - 1.5,(dayAdjusted)),chairPolys);
  twoTimeArray = findTimeStamp(get_Tstamp.calculate_Tstamp(hour - 2,(dayAdjusted)),chairPolys);

  //Arrays of chair objects from previous day timestamp
  currYesterday = findTimeStamp(get_Tstamp.calculate_Tstamp(hour,(dayAdjusted - 24)),chairPolys);
  halfTimeDBArray = findTimeStamp(get_Tstamp.calculate_Tstamp(hour - 0.5,(dayAdjusted - 24)),chairPolys);
  oneTimeDBArray = findTimeStamp(get_Tstamp.calculate_Tstamp(hour - 1,(dayAdjusted - 24)),chairPolys);
  onehalfTimeDBArray = findTimeStamp(get_Tstamp.calculate_Tstamp(hour - 1.5,(dayAdjusted - 24)),chairPolys);
  twoTimeDBArray = findTimeStamp(get_Tstamp.calculate_Tstamp(hour - 2,(dayAdjusted - 24)),chairPolys);

  //Get total occupancy at current time going  backwards 4 incremnts
 actualChairInfo.forEach((currInstance) =>{
   if(currInstance.properties.status === "occupied"){
     currOccupancy += 1;
   }
 });
 halfTimeArray.forEach((halfInstance) =>{
   if(halfInstance.properties.status === "occupied"){
     halfTimeOcc += 1;
   }
 });
 oneTimeArray.forEach((oneInstance) =>{
     if(oneInstance.properties.status === "occupied"){
       oneTimeOcc += 1;
     }
 });
 onehalfTimeArray.forEach((onehalfInstance) =>{
     if(onehalfInstance.properties.status === "occupied"){
       oneHalfTimeOcc += 1;
     }
 });
 twoTimeArray.forEach((twoInstance) =>{
     if(twoInstance.properties.status === "occupied"){
       twoTimeOcc += 1;
     }
 });

 //Same totals from previous day
 currYesterday.forEach((currYInstance) =>{
   if(currYInstance.properties.status === "occupied"){
     currYOccupancy += 1;
   }
 });
 halfTimeDBArray.forEach((halfYInstance) =>{
     if(halfYInstance.properties.status === "occupied"){
       halfYTimeOcc += 1;
     }
 });
 oneTimeDBArray.forEach((oneYInstance) =>{
     if(oneYInstance.properties.status === "occupied"){
       oneYTimeOcc += 1;
     }
 });
 onehalfTimeDBArray.forEach((onehalfYInstance) =>{
     if(onehalfYInstance.properties.status === "occupied"){
       oneHalfYTimeOcc += 1;
     }
 });
 twoTimeDBArray.forEach((twoYInstance) =>{
     if(twoYInstance.properties.status === "occupied"){
       twoYTimeOcc += 1;
     }
 });
}

function populateChairChart(chairID){
  chairOccCount = 0;
  chairYOccCount = 0;
  chairYYOccCount = 0;

  chairYCurrArr = findTimeStamp(get_Tstamp.calculate_Tstamp(hour ,(dayAdjusted - 24)),chairPolys);
  chairYYCurrArr = findTimeStamp(get_Tstamp.calculate_Tstamp(hour,(dayAdjusted - 48)), chairPolys);

  actualChairInfo.forEach((currChairInfo) =>{
    if(currChairInfo.properties.chairID === chairID){
      chairOccCount = currChairInfo.properties.UniqueOccupants;
    }
  });

  chairYCurrArr.forEach((currYChairInfo)=>{
    if(currYChairInfo.properties.chairID === chairID){
      chairYOccCount = currYChairInfo.properties.UniqueOccupants;
    }
  });

  chairYYCurrArr.forEach((currYYChairInfo)=>{
    if(currYYChairInfo.properties.chairID === chairID){
      chairYYOccCount = currYYChairInfo.properties.UniqueOccupants;
    }
  });

  console.log(chairOccCount);
  console.log(chairYOccCount);
  console.log(chairYYOccCount);
}



function sliderToHour() {
	//assuming the slider goes from day 1 midnight at -48 to day 2 midnight at 0
	var slide = document.getElementById('timeSlider').value;
	hour = 24 - Math.abs(slide % 24); //remainder is equivalent to relative simulated time
	console.log("Slider is at: " + slide);
	if(daySelected === 0){
		dayAdjusted = -Math.abs(hour + 72);
	} else if (daySelected === 1){
		dayAdjusted = -Math.abs(hour + 48);
	} else if (daySelected === 2){
		dayAdjusted = -Math.abs(hour + 24);
	} else if (daySelected === 3){
		dayAdjusted = -Math.abs(hour);
	}
	console.log("Relative time is: " + hour);
	//passing hour value to be used to calculate which timestamp to use
	convertSlider2Timestamp(hour,dayAdjusted);

		actualChairInfo = findTimeStamp(sliderTimeStamp, chairPolys);
    populateRestaurantChart();
		resetPolyColors();


		availableSeats = doughnutNC + doughnutNO;
		//hide element saying restaurant is closed, show element saying restaurant


		if(hour >= 9 && hour <=18){
			console.log("Restaurant open");
			document.getElementById('sidebarOpen').style.display = 'block';
			document.getElementById('sidebarOCB').style.background= '#00A000';
			document.getElementById('sidebarClosed').style.display = 'none';
			document.getElementById('restaurantopen').style.display = 'block';
			document.getElementById('restaurantclosed').style.display = 'none';
		}else{
			console.log("Restaurant closed");
			document.getElementById('sidebarOpen').style.display = 'none';
			document.getElementById('sidebarOCB').style.background= '#fe022f';
			document.getElementById('sidebarClosed').style.display = 'block';
			document.getElementById('restaurantopen').style.display = 'none';
			document.getElementById('restaurantclosed').style.display = 'block';
		}

		//console.log("Open element: " + document.getElementById('restaurantopen').style.display);
		//document.getElementById("bar").setAttribute('width',  availableSeats*3);
	   document.getElementById('restaurantinfo2').innerHTML = availableSeats + " seats available";
		//console.log("Closed element: " + document.getElementById('restaurantclosed').style.display);
		buildingPoly.getPopup().setContent();
			//fetchTimestamp(sliderTimeStamp);

}

function updateChart(myDoughnutChart, chairDoughnutData)
{
	myDoughnutChart.data.datasets.forEach((dataset) =>{
		dataset.data.push(chairDoughnutData);
		console.log("push occuried");
	});
	myDoughnutChart.update();
}
function updateBarChart(myChart, uoArray)
{
	myChart.data.datasets.forEach((dataset) =>{
		dataset.data.push(uoArray);
		console.log("push occuried");
	});
	myChart.update();
}
var doughnutO = 0;
var doughnutNO = 0;
var doughnutNC = 0;
var doughnutC = 0;


function createDoughnutDataArray(){
	chairDoughnutData[0] = doughnutO;
	chairDoughnutData[1] = doughnutNO;
	chairDoughnutData[2] = doughnutNC;
	chairDoughnutData[3] = doughnutC;
}

function getColour(chair){
	if(chair.properties.status === "occupied"){
		return "#fe022f";
	}else if(chair.properties.status === "recentlyOccupied"){
		return "#f0e46e";
	}else if(chair.properties.status === "notOccupied"){
		return "#00f272";
	}else if(chair.properties.status === "closed"){
		return "#000000";
	}
}

function createBarDataArray(){
	uoArray[4] = currOccupancy;
	uoArray[3] = halfTimeOcc;
	uoArray[2] = oneTimeOcc;
	uoArray[1] = oneHalfTimeOcc;
	uoArray[0] = twoTimeOcc;
	yuoArray[4] = currYOccupancy;
	yuoArray[3] = halfYTimeOcc;
	yuoArray[2] = oneYTimeOcc;
	yuoArray[1] = oneHalfYTimeOcc;
	yuoArray[0] = twoYTimeOcc;
}
function titleStatus(chair){
	if(chair.properties.status === "occupied"){
		return "Seat Unavailable";
	}else if(chair.properties.status === "recentlyOccupied"){
		return "Waiting to be Cleared";
	}else if(chair.properties.status === "notOccupied"){
		return "Seat Available";
	}else if(chair.properties.status === "closed"){
		return "Closed";
	}
}

function chairStatus(chair){
	if(chair.properties.status === "occupied"){
		return "Taken";
	}else if(chair.properties.status === "recentlyOccupied"){
		return "Being Cleared";
	}else if(chair.properties.status === "notOccupied"){
		return "Free";
	}else if(chair.properties.status === "closed"){
		return "Closed";
	}
}

function lastOccupied(chair){
  return chair.properties.lastOccupiedTime.substring(10,16);

}

function occupantsToday(chair){
	return chair.properties.UniqueOccupants;

}

function resetPolyColors(){
  console.log(2);
	doughnutO = 0;
	doughnutNO = 0;
	doughnutNC = 0;
	doughnutC = 0;
	chairGroup.eachLayer(
		function(layer){
		 map.removeLayer(layer)
		chairGroup.removeLayer(layer)}
		)
	actualChairInfo.forEach((currentChair) => {
		if(currentChair.properties.status === "occupied"){
			seatcolour = "#fe022f";
			doughnutO += 1;
		}else if(currentChair.properties.status === "recentlyOccupied"){
			seatcolour = "#f0e46e";
			doughnutNO += 1;
		}else if(currentChair.properties.status === "notOccupied"){
			seatcolour = "#00f272";
			doughnutNC += 1;
		}else if(currentChair.properties.status === "closed"){
  			seatcolour = "#ffffff";
     	 doughnutC +=1;
      console.log("Test");
  	}
	 //Add leaflet polygon for each seat, could easily be in an array of JS objects for easier referencing
	 var polyChair = L.polygon(currentChair.geometry.coordinates, {label:currentChair.properties.chairID, color : seatcolour,indoorMapId: "westport_house",indoorMapFloorId: 0}).bindPopup("<div class='chairdiv' id=chair" + currentChair.properties.chairID + ">"
																																				//+ Chair #" + currentChair.properties.chairID
																																				+ "<div class='chairtitle' id=" + currentChair.properties.chairID +"title style='background-color: " + getColour(currentChair) + "'>"
																																				+ "<h1 class='chairtitletext' style='text-align:center + ;'>" + titleStatus(currentChair) + "</h1>"
																																				+ "</div>"
																																				+ "<div class='chairlastoccupied' id=" + currentChair.properties.chairID +"lastoccupied>"
																																				+ "Last Occupied: " + lastOccupied(currentChair)
																																				+ "</div>"
																																				+ "<div class='chairdailyoccupants' id=" + currentChair.properties.chairID +"dailyoccupants>"
																																				+ "Occupants Today: " + occupantsToday(currentChair)
																																				+ "</div>"
																																				+ "<div class='chairoccupancygraph' id=" + currentChair.properties.chairID +"occupancygraph>"
																																				+ "Occupancy graph here"
																																				+ "</div>"
																																				+ "<div class='chairoccupancy' id=" + currentChair.properties.chairID +"occupancy>"
																																				+ "Status: " + chairStatus(currentChair)
																																				+ "</div>"
																																				+ "</div>",
																																				{closeOnClick: true,
																																				autoClose:true,
																																				indoorMapId: 'westport_house',
																																				indoorMapFloorId: 0})
//add created variable to featureGroup
chairGroup.addLayer(polyChair);
//add polygon to map
	})
	chairGroup.eachLayer(
		function(layer){
			map.addLayer(layer)}
		)


		createDoughnutDataArray();
		createBarDataArray();
		updateBarChart(myChart, uoArray);
		updateChart(myDoughnutChart, chairDoughnutData);
		DrawChart();

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
	$("#sidebarButton").css("display","inline-block");
	$(".sideView").css("display","block");
	setTimeout(function(){
		$("#sidebarButton").trigger("click");
	}, 2000);
}
function onExit(event) {
    console.log("Exited indoor map");
	//document.getElementById("hidingslider").style.display = "none";
	$("#sidebarButton").css("display","none");
	$(".sideView").css("display","none");
}


$.fn.redraw = function(){
  $(this).each(function(){
    var redraw = this.offsetHeight;
  });
};
map.indoors.on("indoormapenter", onEnter);
map.indoors.on("indoormapexit", onExit);
buildingPoly.on("mouseover", mouseOverBuilding);
buildingPoly.on("mouseout", mouseOutBuilding);
buildingPoly.on("click", clickBuilding);
buildingPoly.on("popupopen", checkValue);
$("#timeSlider").on("change", sliderToHour);

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

var ctx = document.getElementById('myDoughnutChart').getContext('2d');

var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
		datasets: [{
			data: chairDoughnutData,
			backgroundColor: [
				'#ff0a1e',
				'#f3e658',
				'#1df460',
				'#d3d3d3'
			]
		}],
		labels: [
			'Occupied',
			'Available',
			'Now Available',
			'Unavailable'
		]
	},
	options: {
        legend: {
            display: false,
        },
    },
});
//increment slider when play button is clicked
function incrementSlider(){
	console.log("Beginning increment function");
	sliderIncrement = setInterval(function(){
		$("#loadingBar").toggleClass('widen');
		$("#loadingBar").css('transition','width 0');
		$("#loadingBar").css('-webkit-transition','width 0');
		$("#loadingBar").css('-moz-transition','width 0');
		$("#loadingBar").css('width','0');
		$("#loadingBar").css('width','');
		$("#loadingBar").css('transition','');
		$("#loadingBar").css('-webkit-transition','');
		$("#loadingBar").css('-moz-transition','');
		$("#loadingBar").toggleClass('widen');
			if($('#timeSlider').val() != 0){
			console.log("Incrementing slider by 0.5");
			var newSlide = -Math.abs($('#timeSlider').val()) + 0.5;
			console.log("New value: " + newSlide);
			$('#timeSlider').val(newSlide);
			console.log($('#timeSlider').val());
			$('#timeSlider').trigger('change');
		}else{
			console.log("End of slider reached, going to next day...");
			if(daySelected === 0){
				console.log("On day 1, going to day 2..");
				$("#link2Clicked").trigger('click');
				$('#timeSlider').val(-Math.abs(24));
				$('#timeSlider').trigger('change');
			}
			if(daySelected === 1){
				console.log("On day 2, going to day 3..");
				$("#link3Clicked").trigger('click');
				$('#timeSlider').val(-Math.abs(24));
				$('#timeSlider').trigger('change');
			}
			if(daySelected === 2){
				console.log("On day 3, going to day 4..");
				$("#link4Clicked").trigger('click');
				$('#timeSlider').val(-Math.abs(24));
				$('#timeSlider').trigger('change');
			}
			if(daySelected === 3){
				console.log("On day 4, ending increment");
				$(".playButton").trigger('click');
			}
		}
	}, 5000);
}



function stopIncrement(){
	console.log("Stopping increment");
	clearInterval(sliderIncrement);
}

//from slider.js
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
$("#sliderDropdownButton").click(function () {
    document.getElementById("myDropdown").classList.add("show");
        $(".dropbtn").css('border-top-left-radius', '0');
        $(".dropbtn").css('border-top-right-radius', '0');

    document.getElementById("usa").classList.add("fa-angle-down");
    document.getElementById("usa").classList.remove("fa-angle-up");
});


window.onclick = function(event) {
    if (!event.target.matches('#sliderDropdownButton') ) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            $(".dropbtn").css('border-top-left-radius', '12px');
            $(".dropbtn").css('border-top-right-radius', '12px');
            document.getElementById("usa").classList.remove("fa-angle-down");
            document.getElementById("usa").classList.add("fa-angle-up");
        }
        }
    } else {
        $(".dropbtn").css('border-top-left-radius', '0');
        $(".dropbtn").css('border-top-right-radius', '0');
    }
}

var daySelected = 2;

$("#link1Clicked").click(function () {

    daySelected = 0;
    $("#currentDay").html("01/09/2018");
});

$("#link2Clicked").click(function () {
    daySelected = 1;
    $("#currentDay").html("02/09/2018");
});

$("#link3Clicked").click(function () {
    daySelected = 2;
    $("#currentDay").html("03/09/2018");
});

$("#link4Clicked").click(function () {
    daySelected = 3;
    $("#currentDay").html("04/09/2018");
});

$(".rewindButton").click(function(){
	if($('#timeSlider').val() != -24){
		var newSlide = -Math.abs($('#timeSlider').val()) - 0.5;
		$('#timeSlider').val(newSlide);
		$('#timeSlider').trigger('change');
	}
});

$(".forwardButton").click(function(){
	if($('#timeSlider').val() != 0){
		var newSlide = -Math.abs($('#timeSlider').val()) + 0.5;
		$('#timeSlider').val(newSlide);
		$('#timeSlider').trigger('change');
	}
});

$(".playButton").click(function() {

	if(playClicked === false){
		$("#loadingBar").toggleClass('resetWidth');
		$("#loadingBar").toggleClass('widen');

		incrementSlider();


		document.getElementById("playPause").classList.remove("fa-play");
		document.getElementById("playPause").classList.add("fa-pause");

		playClicked = true;
	}
	else {
		$("#loadingBar").toggleClass('widen');
		$("#loadingBar").toggleClass('resetWidth');

		stopIncrement();
		//clearInterval(progress);
		playClicked = false;
		document.getElementById("playPause").classList.add("fa-play");
		document.getElementById("playPause").classList.remove("fa-pause");
		playClicked = false;
	}
});

function time(){
    var dateAndTime = sliderTimeStamp;
    var timeFromTimeStamp;
    timeFromTimeStamp = dateAndTime.substr(11);
	timeFromTimeStamp = timeFromTimeStamp.slice(0, -3);
    console.log("TIME IS:" + timeFromTimeStamp);
	$("#clock").html(timeFromTimeStamp);
}

var ctx2 = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx2, {
    type: 'bar',
  data: {
		datasets: [{
			label: 'Yesterday',
          data: yuoArray,
		backgroundColor: [
			'rgba(32, 252, 241, 0.5)',
				'rgba(32, 252, 241, 0.5)',
				'rgba(32, 252, 241, 0.5)',
				'rgba(32, 252, 241, 0.5)',
				'rgba(32, 252, 241, 0.5)'


			],
			 xAxesID: "bar-x-axis1"
		},
		{
          label: 'Today',
			data: uoArray,
			backgroundColor: [
			'rgba(0, 110, 244, 0.50)',
				'rgba(0, 110, 244, 0.50)',
				'rgba(0, 110, 244, 0.50)',
				'rgba(0, 110, 244, 0.50)',
				'rgba(244, 0, 0, 0.50)'
			],

          type: 'bar',
		  xAxesID: 'bar-x-axis2'
        }],

		// These labels appear in the legend and in the tooltips when hovering different arcs
		labels: [
			'2hrs',
			'1.5hrs',
			'1hr',
			'.5hrs',
			'Current'

		]
	},
	options: {
  scales: {
    xAxes: [{
      stacked: false,
      id: "bar-x-axis1",
      barThickness: 15,
	  gridLines: {
        offsetGridLines: true,
		drawOnChartArea: false
      }
    }, {

      display: false,
      stacked: false,
      id: "bar-x-axis2",
      barThickness: 70,
      // these are needed because the bar controller defaults set only the first x axis properties
      type: 'category',
      categoryPercentage: 0.5,
      barPercentage: 0.9,
      gridLines: {
        offsetGridLines: true,
		drawOnChartArea: false
      }
    }],
    yAxes: [{
      stacked: false,
      ticks: {
        beginAtZero: true
      },
	   gridLines: {
        offsetGridLines: true,
		drawOnChartArea: false
      }
    }]

  }
}
})

function DrawChart(){
	var ctx3 = document.getElementById("myChart2").getContext('2d');
	var myChart2 = new Chart(ctx3, {
		type: 'horizontalBar',
		data: {
			 labels: ['Avialability'],
			datasets: [{
				//label: '# of Votes',
				data: [doughnutO],
				backgroundColor: [
				  'rgba(255, 40, 40, 0.49)'
				],
				label: ["Unavailable"]
			},
			{
				 data: [doughnutNO],
				 data: [doughnutNC],
				backgroundColor: [
					'rgba(19, 218, 5, 0.5)'
				],
				label: ["To be Cleared"]
			},
			{
				data: [doughnutNC],
				backgroundColor: [
					'rgba(218, 204, 5, 0.5)'
				],
				label: ["Available"]
			}
			]
		},
		options: {
			scales: {
				xAxes: [{
					stacked: true
				}],
				yAxes: [{
					stacked: true
				}]
			}
		}
	})
	}
	buildingPoly.on("click", (event, MouseEvent) => {
	DrawChart();
})