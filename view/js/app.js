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
      }else if(currentChair.properties.status === "recentlyOccupied"){
        seatcolour = "#f0e46e";
      }else if(currentChair.properties.status === "notOccupied"){
        seatcolour = "#00f272";
      }else if(currentChair.properties.status === "closed"){
    		seatcolour = "#ffffff";
    	}
      //Add leaflet polygon for each seat, could easily be in an array of JS objects for easier referencing
      var polyChair = L.polygon(currentChair.geometry.coordinates, {color : seatcolour,indoorMapId: "westport_house",indoorMapFloorId: 0}).bindPopup("<div class='chairdiv' id=chair" + currentChair.properties.chairID + ">"
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
  barChart();
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
	<div id='restaurantinfo1'><p><svg height='100' width='500' >\
						<rect  x='55' y='55' width= '198' height='10' stroke='black' stroke-width='4' fill='red'  />\
						<rect id = 'bar' x='55' y='57' width= '0' height='6' stroke='black' stroke-width='0' fill='green' />\
					</svg>\
					</div>\
					</div>\
	<div id='restaurantinfo2'><p>Seats available here</p></div>\
	<div id='restaurantopen' style='display:block'><p><span style='color:green'>OPEN</span>. Closes at 11:00pm</p></div>\
	<div id='restaurantclosed' style='display:none'><p><span style='color:red'>CLOSED</span>. Opens at 5:00pm</p></div>\
	<div id='westportinfo'><p><a href='http://www.westportservicedapartments.com/' target='_blank'>View the Westport House website</a></p></div>\
	<div id='restaurantphoto'><img src='https://zeno.computing.dundee.ac.uk/2017-ac32006/team3/assets/images/westport.jpg'></img></div>\
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
  barChart();
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
		document.getElementById("bar").setAttribute('width',  availableSeats*3);
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

var doughnutO = 0;
var doughnutNO = 0;
var doughnutNC = 0;


function createDoughnutDataArray(){
	chairDoughnutData[0] = doughnutO;
	chairDoughnutData[1] = doughnutNO;
	chairDoughnutData[2] = doughnutNC;
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
      doughnutO +=1;
      console.log("Test");
  	}
	 //Add leaflet polygon for each seat, could easily be in an array of JS objects for easier referencing
	 var polyChair = L.polygon(currentChair.geometry.coordinates, {color : seatcolour,indoorMapId: "westport_house",indoorMapFloorId: 0}).bindPopup("<div class='chairdiv' id=chair" + currentChair.properties.chairID + ">"
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
//add created variable to featureGroup
chairGroup.addLayer(polyChair);
//add polygon to map
	})
	chairGroup.eachLayer(
		function(layer){
			map.addLayer(layer)}
		)


		createDoughnutDataArray();
		updateChart(myDoughnutChart, chairDoughnutData);
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
				'#1df460'

			]
		}],

		// These labels appear in the legend and in the tooltips when hovering different arcs
		labels: [
			'Unavailable',
			'To Be Cleared',
			'Available'

		]
	}
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


function barChart() {
	'use strict';

	var scores = [],
	    bars = [],
	    graph = document.getElementById('bar-graph'),
	    selectedCategory = 'average',
	    classToClear,
	    vendors = ['webkit', 'moz', 'ms'],
	    NO_TRANSITIONS = 'no-transitions',
	    transitionEndEvent,
	    barTransitionTime = 0.5,
	    barDelayTime = 0.05,
	    barDrawEffect,
	    easingEffect = 'linear',
	    durationInput;

	/* ====================================================================== *\
	   ==                          HELPER METHODS                          ==
	\* ====================================================================== */
	/**
	* Creates a mock datasource for the graph.
	*/
	function createDataSource() {
		// Determine the number of data points to generate, this will be a
		// number between 1 and 30 (inclusive)
		var count = 5;
		scores = [];
    scores.push(twoTimeOcc);
    scores.push(oneHalfTimeOcc);
    scores.push(oneTimeOcc);
    scores.push(halfTimeOcc);
    scores.push(currOccupancy);
    console.log("ASDASDJASJKDAJSDJLASJLDJKLASD");
    console.log(scores);
		}


	/**
	* This method sets a CSS property. It will set the standard property as
	* well as vender prefixed versions of the property.
	*
	* @param {HTMLElement} element  The element whose property to set
	* @param {string} property      The unprefixed name of the property
	* @param {string} value         The value to assign to the property
	*/
	function setPrefixedProperty(element, property, value) {
		// Capitalize the first letter in the string
		var capitalizedProperty = property[0].toUpperCase() + property.slice(1);
		// Loop over the vendors and set the prefixex property
		for (var index = 0, ubound = vendors.length; index < ubound; index++) {
			element.style[vendors[index] + capitalizedProperty] = value;
		}
		// Set the standard property
		element.style[property] = value;
	}

	/**
	* This method tries to determine the name of the transitionend event, it
	* could be the user's browser is using a prefixed version
	*/
	function transitionEndEventName() {
		// 1: The variable we use to keep track of the current key when
		//    iterating over the transitions object
		// 2: An element we can use to test if a CSS property if known to the
		//    browser
		// 3: The key:value pairs represent CSS-property:Event-name values. By
		//    testing if the browser supports a CSS property we can tell what
		//    name to use for the transitionend event
		var key,                                                       /* [1] */
		    el = document.createElement('div'),                        /* [2] */
		    transitions = {                                            /* [3] */
			    WebkitTransition : 'webkitTransitionEnd',
			    OTransition      : 'otransitionend',  // oTransitionEnd in very old Opera
			    MozTransition    : 'transitionend',
			    transition       : 'transitionend'
		    };

		// Loop over the keys in the transition object
		for (key in transitions) {
			// Check the key is a property of the object and check if the CSS
			// property does not return undefined. If the result is undefined it
			// means the browser doesn't recognize the (un)prefixed property
			if (transitions.hasOwnProperty(key) && el.style[key] !== undefined) {
				// The CSS property exists, this means we know which name of the
				// transitionend event we can use for this browser
				return transitions[key];
			}
		}

		// If the method reaches this line it means that none of the CSS
		// properties were recognized by the browser. It is safe to conclude
		// there is no support for transitions (or at least none that we can use
		// in any meaningful way)
		return NO_TRANSITIONS;
	}
	/* ==========================  HELPER METHODS  ========================== */



	/* ====================================================================== *\
	   ==                         EVENT HANDLERS                           ==
	\* ====================================================================== */

	/**
	* This method handles the transition end event fired when the last bar has
	* been removed from the graph. It is the cue to redraw the graph.
	*/
	function onClearGraphEnded(event) {
		// Remove the event listener, we no longer need it
		bars[0].removeEventListener(transitionEndEvent, onClearGraphEnded);
		// Wait 300ms before redrawing the graph, this has a nicer effect to it
		// than redrawing it immediately.
		setTimeout(drawGraph, 300);
	}

	/**
	* This method handles the change event of the input which the user can use
	* to set the duration for a bar to transition from 0 to 10.
	*/
	function onDurationChange(event) {
		// Try to parse the value to a float
		barTransitionTime = parseFloat(durationInput.value);
		// Check if the value could be parsed
		if (isNaN(barTransitionTime)) {
			// Invalid value, set to the default value
			barTransitionTime = 1;
			durationInput.value = 1;
		} else if (barTransitionTime < parseFloat(durationInput.getAttribute('min'))) {
			barTransitionTime = durationInput.value = parseFloat(durationInput.getAttribute('min'));
		} else if (barTransitionTime > parseFloat(durationInput.getAttribute('max'))) {
			barTransitionTime = durationInput.value = parseFloat(durationInput.getAttribute('max'));
		}
		drawGraph();
	}

	/**
	* This method handles the change in the selected easing method.
	*/
	function onEasingSelect(event) {
		// Copy the selected value for easy usage
		easingEffect = event.target.value;
		// Redraw the graph using the selected easing method
		drawGraph();
	}

	/**
	 * This method handles the click on the button to refresh the graph. It will
	 * generate a new data source and refresh the graph so this source is shown.
	 */
	function onRefreshGraph() {
		createDataSource();
		redrawGraph();
	}

	/**
	* This method handles the change in the selected transition style
	*/
	function onTransitionSelectHandler(event) {
		// Copy the selected value for easy usage
		barDrawEffect = event.target.value;
		// Redraw the graph using the selected easing method
		drawGraph();
	}

	/**
	* This method handels the change in the category to display in the graph.
	* @param {[type]} event [description]
	*/
	function onOptionSelectHandler(event) {
		// Make sure the selected option wasn't already selected
		if (event.target.value !== selectedCategory) {
			// The old class needs to be removed when redrawing the graph,
			// remember which category was selected
			classToClear = selectedCategory;
			// Set the category to show
			selectedCategory = event.target.value;
			// Clear the graph, this in turn will redraw the graph and it will
			// do so with the selected category
			redrawGraph();
		}
	}
	/* ==========================  EVENT HANDLERS  ========================== */

	function drawGraph() {
		// Check if we have the element to show the graph in, if not there is no
		// need to continue
		if (graph == null) {
			return;
		}

		// Make sure all existing elements are removed from the graph before we
		// continue.
		while (graph.firstChild) {
			graph.removeChild(graph.firstChild);
		}

		// A bar in the graph can only be as tall as the graph itself
		var maxHeight = graph.clientHeight;
		// Reset the array with references to the bars
		bars = [];

		// Check if there is a class to clear, this is the case when the visitor
		// has switched between the categories to show in the graph
		if (classToClear !== '') {
			// Remove the class
			graph.classList.remove(classToClear);
			// Reset the class to clear
			classToClear = '';
			// Apply the class for the selected category
			graph.classList.add(selectedCategory);
		}

		// Loop over all generated data points
		for (var index = 0, ubound = scores.length; index < ubound; index++) {
			// 1: Create an element to represent the current data point
			// 2: Calculate how long it should take the bar to reach the height
			//    necessary to show the score represented by the bar. A score of
			//    10 would take the full transition time, lower scores use a
			//    percentage of that time. We can determine the percentage by
			//    dividing the score by 10.
			// 3: Initialize the delay time for the bar
			var bar = document.createElement('div'),                                      /* [1] */
 			   duration = (scores[index] / 14) * barTransitionTime,    /* [2] */
			    delay = 0;                                                                /* [3] */

			// Check if the effect is height or combined
			if (barDrawEffect === 'height' || barDrawEffect === 'combined') {
				// No need to correct for anything, the duration we calculated
				// is already taking care that the shorter bars are shown
				// quicker than the larger bars. This is already the effect we
				// wanted
				delay += 0;
			}
			// Check if the effect is wave or combined
			if (barDrawEffect === 'wave' || barDrawEffect === 'combined') {
				// Each bar should wait a little longer than the bar before it
				// before it starts to animate to its desired height
				delay += barDelayTime * index;
			}
			// Specify the unit for the delay time, in this case it is seconds
			delay += 's';

			// Set the width, this is 3%. For the left position we use 3 1/3
			// which will create a nice gap in between bars
			bar.style.width = '8%';
			// Calculate the left position, this is simply the total width per
			// bar multiplied by its index
			bar.style.left = (10 * index) + '%';
			// The opacity is determined by the percentage of team members who
			// entered a score for tha day
			bar.style.opacity = 1;
			// Set the title attribute to show some information when the user
			// hovers the mouse over the bar
			// Set an attribute to remember the time we set for this bar to
			// transition to its specified height. We will need this information
			// when removing the bars. Storing it in an attribute is easier than
			// recalculating it later
			bar.setAttribute('data-duration', duration);
			// Set the transition property, we need to use the duration we've
			// calculated and the easing effect selected by the user
			setPrefixedProperty(bar, 'transition', 'height ' + duration + 's ' + easingEffect + ', background-image .3s ease-out, opacity .3s ease-out');
			// Set the transition delays, only the delay for the height
			// transition is variable, the others are fixed
			setPrefixedProperty(bar, 'transitionDelay', delay + ', 0, 0');
			// Place a reference to the bar in the array, this way we can easily
			// manipulate them later on
      if(index === 4){
        console.log("change color");
        bar.style.backgroundColor = '#ffafaf';
      }
			bars.push(bar);
			// Place the bar in the graph
			graph.appendChild(bar);
		}

		// We will set a timeout of 10ms before we set the height for the bars
		// to their desired height. We need to wait a little while or else the
		// transition won't trigger.
		setTimeout(function() {
			// We know how many bars there are, we need to loop over all of them
			for (index = 0; index < ubound; index++) {
				// Set the height of the bar to show the score it represents
				bars[index].style.height = (maxHeight * (scores[index] / 55)) + 'px';
			}
		}, 10);
	}

	/**
	* Removes all the bars from the graph and repopulates the graph with the
	* same datasource
	*/
	function redrawleft() {
		var ubound = bars.length - 1,
		index = ubound;

		if (transitionEndEvent !== NO_TRANSITIONS) {
			// Listen to the transition end event of the first bar in the graph,
			// this the bar which will be removed from the view as last and once
			// it has been removed it is time to redraw the graph
			bars[0].addEventListener(transitionEndEvent, onClearGraphEnded);
		}

		// Loop over all the bars in the graph from the last item to the first
		// item and set the delay. The bar representing the most recent
		// measurement will be removed first.
		for (; index >= 0; index--) {
			var delay = 0;
			// Calculate the delay for the bar before it is removed from view.
			// 1: We know in what time the bar was shown through the
			//    data-duration attribute. By substracting this value from 1 we
			//    can let the shorter bars wait longer to remove themselves than
			//    the longer bars. It will have the visual effect of the shorter
			//    bars waiting until the longer bars have caught up to their
			//    position
			// 2: By adding an additional wait time per bar based on how many
			//    bars came before it we introduce a sort of wave effect. The
			//    first bar in the graph will start its removal later than the
			//    bar representing the most recent date
			// 3: Now all the is left to do is specifying the unit, in this case
			//    the delay is specified in seconds
			if (barDrawEffect === 'height' || barDrawEffect === 'combined') {
				delay += (barTransitionTime - parseFloat(bars[index].getAttribute('data-duration')));   /* [1] */
			}
			if (barDrawEffect === 'wave' || barDrawEffect === 'combined') {
				delay += (barDelayTime * (ubound - index));                                             /* [2] */
			}
			delay += 's';                                                                               /* [3] */
			// Set the transition delay to what we've calculated
			setPrefixedProperty(bars[index], 'transitionDelay', delay);
			// Set the height of the bar to 0 to remove it from view
			bars[index].style.height = 0;
		}
	}

	function init() {
		// Determine the transition end event name
		transitionEndEvent = transitionEndEventName();

		// Get the refresh button and attach a click handler so we know when to
		// refresh the graph
		var element = document.getElementById('btnRefresh');
		if (element != null) {
			element.addEventListener('click', onRefreshGraph);
		}

		// Get the element where to user can specify the time it should take a
		// bar to go from 0 to 10 and attach a change handler so we know when
		// this value has changed
		durationInput = document.getElementById('input-duration');
		if (durationInput != null) {
			durationInput.addEventListener('change', onDurationChange);
		}

		// Get the element where the user can specify which easing method to use
		// when manipulating the height of the bars. Attach a change hanlder so
		// we know when the user has selected a different easing method
		element = document.getElementById('select-easing');
		if (element != null) {
			element.addEventListener('change', onEasingSelect);
		}

		// Get all the inputs belonging the the group to change which category
		// is shown in the graph. Attach click handlers so we know when we need
		// to show a different category
		var options = document.getElementsByName('score-select');
		for (var index = 0, ubound = options.length; index < ubound; index++) {
			options[index].addEventListener('click', onOptionSelectHandler);
		}

		// Get all the input elements belonging to the group to change which
		// effect is used when drawing the graph. Attach click handlers so we
		// know when we need to use a different effect
		options = document.getElementsByName('transition-select');
		for (index = 0, ubound = options.length; index < ubound; index++) {
			options[index].addEventListener('click', onTransitionSelectHandler);
			if (options[index].checked) {
				barDrawEffect = options[index].value;
			}
		}

		// Create a data source
		createDataSource();
		// Draw a graph for the created data source
		drawGraph();
	}

	init();
};
