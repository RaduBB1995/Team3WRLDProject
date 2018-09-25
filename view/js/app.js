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
  setTimeout(time(), 2000);
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
</div>", {className: 'infopopupexterior', closeOnClick: true, autoClose: false, offset:[0,-50]}).openPopup();

function convertSlider2Timestamp(sliderHour, sliderValue){
		sliderTimeStamp  = get_Tstamp.calculate_Tstamp(sliderHour,sliderValue);
	time();
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

		resetPolyColors();

		console.log("Restaurant open");
		availableSeats = doughnutNC + doughnutNO;
		//hide element saying restaurant is closed, show element saying restaurant

		document.getElementById("bar").setAttribute('width',  availableSeats*3);
		document.getElementById('sidebarOpen').style.display = 'block';
		document.getElementById('sidebarOCB').style.background= '#00A000';
		document.getElementById('sidebarClosed').style.display = 'none';
		document.getElementById('restaurantopen').style.display = 'block';

		//console.log("Open element: " + document.getElementById('restaurantopen').style.display);
		document.getElementById('restaurantclosed').style.display = 'none';
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
		return "#ffffff";
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
		return "#ffffff";
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
  return chair.properties.lastOccupiedTime;

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
		incrementSlider();
		playClicked = true;
		document.getElementById("playPause").classList.remove("fa-play");
		document.getElementById("playPause").classList.add("fa-pause");
	}else{
		stopIncrement();
		playClicked = false;
		document.getElementById("playPause").classList.add("fa-play");
		document.getElementById("playPause").classList.remove("fa-pause");
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
