const Wrld = require('wrld.js');
const env = require('./env');
const sideview = require('./sideview');
const {getChairPolys} = require('./api-service');
const get_Tstamp = require('./get_timestamp');
const {findTimeStamp} = require('./process-search');
//create chair array to receive all data from the JSON file
let chairPolys = [];
//create timestamp to be used to pull the relevant chair data. default: 2018-09-04 09:00:00
var sliderTimeStamp = "2018-09-04 09:00:00";
var hour = 0;
var dayAdjusted = 0;
//Seat colour variable that is set later after fetching relevant data
let seatcolour = "";
var availableSeats = 0;
//Array of JS objects we place our desired chairs into
var actualChairInfo = [];
//bool that tracks if the playbutton has been clicked in order to switch between the playing and paused states
var playClicked = false;
var sliderIncrement = 0;
var testArray = [];
//initialise arrays for Chart.JS
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
//initialise map
const map = Wrld.map("map", "65367fd6a1254b28843e482cbfade28d", {

  center: [56.460462, -2.978369],
  maxZoom: 30,
  zoom: 17,

  indoorsEnabled: true,
})
//Declare new feature group for all chair polygons
let chairGroup = new L.featureGroup();

//Add on clickevent for all layers in featureGroup
chairGroup.on('click', function(e) {
  populateChairChart(e.layer.options.label);
  map.setView(e.layer.getPopup().getLatLng(), 21.35, {
    animate: true
  });
  setTimeout(function() {
    barChart();
    e.layer.getPopup().setContent();
  }, 300);
});
//Events for page onLoad
window.addEventListener('load', async () => {
  const indoorMapId = 'westport_house';
  map.on('initialstreamingcomplete', async () => {
    //Run external script to connect to JSON server
    chairPolys = await getChairPolys();
    //Returns all the Data from the JSON file
    actualChairInfo = findTimeStamp(sliderTimeStamp, chairPolys);
    //filter data to only current timestamp
    actualChairInfo.forEach((currentChair) => {
      if (currentChair.properties.status === "occupied") {
        seatcolour = "#fe022f";
      } else if (currentChair.properties.status === "recentlyOccupied") {
        seatcolour = "#f0e46e";
      } else if (currentChair.properties.status === "notOccupied") {
        seatcolour = "#00f272";
      } else if (currentChair.properties.status === "closed") {
        seatcolour = "#ffffff";
      }
      //Add leaflet polygon for each seat, could easily be in an array of JS objects for easier referencing
      //Also bind popups using chair-specific variables to make each popup referencable
      var polyChair = L.polygon(currentChair.geometry.coordinates, {
          label: currentChair.properties.chairID,
          color: seatcolour,
          indoorMapId: "westport_house",
          indoorMapFloorId: 0
        }).bindPopup("<div class='chairdiv' id=chair" + currentChair.properties.chairID + ">" +
          "<div class='chairtitle' id=" + currentChair.properties.chairID + "title style='background-color: " + getColour(currentChair) + "'>" +
          "<h1 style='text-align:center + ;'>" + titleStatus(currentChair) + "</h1>" +
          "</div>" +
          "<div class='chairlastoccupied' id=" + currentChair.properties.chairID + "lastoccupied>" +
          "Last Occupied: " + lastOccupied(currentChair) +
          "</div>" +
          "<div class='chairdailyoccupants' id=" + currentChair.properties.chairID + "dailyoccupants>" +
          "Occupants Today: " + occupantsToday(currentChair) +
          "</div>" +
          "<article class='graph' id='barGraph'>" +
          "</article>" +
          "<div class='chairoccupancygraph' id=" + currentChair.properties.chairID + "occupancygraph>" +
          "Occupancy graph here" +
          "</div>" +
          "<div class='chairoccupancy' id=" + currentChair.properties.chairID + "occupancy>" +
          "Status: " + chairStatus(currentChair) +
          "</div>" +
          "</div>", {
            closeOnClick: true,
            autoClose: true,
            closeButton: false,
            indoorMapId: 'westport_house',
            indoorMapFloorId: 0
          })
        .addTo(map);
      //add created variable to featureGroup
      chairGroup.addLayer(polyChair);
      //add polygon to map
    });
    chairGroup.eachLayer(
      function(layer) {
        map.addLayer(layer)
      }
    )
    //Needed for Chart.js on load
    resetPolyColors();
  });
  time();
  const indoorControl = new WrldIndoorControl('widget-container', map);
});


window.onload = function() {}
//create an array of coordinates, to be used in the creation of a polygon
var buildingLatLong = [
  [56.459780, -2.978628],
  [56.460245, -2.978793],
  [56.460350, -2.978019],
  [56.460018, -2.977921],
  [56.460005, -2.978004],
  [56.459906, -2.977976],
  [56.459857, -2.978132]
]
//create the building polygon
var buildingPoly = L.polygon(buildingLatLong, {
  color: '#7aebff'
}).addTo(map);


//bind a popup containing HTML to the polygon
buildingPoly.bindPopup("<div id='restauranttitle'><h2 style='font-size: 30px;' > Westport Hotel Restaurant</h2></div>\
  <div id='restaurantinfo'>\
  <div class='capacity'><p style='font-size: 14px;'>Capacity: 66</p></div>\
	<div id='restaurantinfo1'>\
	<div id='mydiv2' style='margin-right:10px;'><canvas style='clear:both; position: relative;' id='myChart2'></canvas></div>\
	<div id='restaurantinfo2' style='font-size: 14px;'><p>Seats available here</p></div>\
	<div id='restaurantopen' style='display:block'><p style='font-size: 14px;'><span style='color:green'>OPEN</span>. Closes after 6:00pm</p></div>\
	<div id='restaurantclosed' style='display:none'><p style='font-size: 14px;'><span style='color:red'>CLOSED</span>. Opens at 9:00am</p></div>\
	<div id='westportinfo'><p style='font-size: 14px;'><a href='http://www.westportservicedapartments.com/' target='_blank'>View the Westport House website</a></p></div>\
  </div>", {
  className: 'infopopupexterior',
  closeOnClick: true,
  autoClose: false,
  offset: [0, -50],
  closeButton: false
}).openPopup();
//take current "time" and slider value - adjusted for selected day - to generate a timestamp
function convertSlider2Timestamp(sliderHour, sliderValue) {
  sliderTimeStamp = get_Tstamp.calculate_Tstamp(sliderHour, sliderValue);
  //call time() to update the clock
  time();
}

function populateRestaurantChart() {
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
  halfTimeArray = findTimeStamp(get_Tstamp.calculate_Tstamp(hour - 0.5, (dayAdjusted)), chairPolys);
  oneTimeArray = findTimeStamp(get_Tstamp.calculate_Tstamp(hour - 1, (dayAdjusted)), chairPolys);
  onehalfTimeArray = findTimeStamp(get_Tstamp.calculate_Tstamp(hour - 1.5, (dayAdjusted)), chairPolys);
  twoTimeArray = findTimeStamp(get_Tstamp.calculate_Tstamp(hour - 2, (dayAdjusted)), chairPolys);

  //Arrays of chair objects from previous day timestamp
  currYesterday = findTimeStamp(get_Tstamp.calculate_Tstamp(hour, (dayAdjusted - 24)), chairPolys);
  halfTimeDBArray = findTimeStamp(get_Tstamp.calculate_Tstamp(hour - 0.5, (dayAdjusted - 24)), chairPolys);
  oneTimeDBArray = findTimeStamp(get_Tstamp.calculate_Tstamp(hour - 1, (dayAdjusted - 24)), chairPolys);
  onehalfTimeDBArray = findTimeStamp(get_Tstamp.calculate_Tstamp(hour - 1.5, (dayAdjusted - 24)), chairPolys);
  twoTimeDBArray = findTimeStamp(get_Tstamp.calculate_Tstamp(hour - 2, (dayAdjusted - 24)), chairPolys);

  //Get total occupancy at current time going  backwards 4 incremnts
  actualChairInfo.forEach((currInstance) => {
    if (currInstance.properties.status === "occupied") {
      currOccupancy += 1;
    }
  });
  halfTimeArray.forEach((halfInstance) => {
    if (halfInstance.properties.status === "occupied") {
      halfTimeOcc += 1;
    }
  });
  oneTimeArray.forEach((oneInstance) => {
    if (oneInstance.properties.status === "occupied") {
      oneTimeOcc += 1;
    }
  });
  onehalfTimeArray.forEach((onehalfInstance) => {
    if (onehalfInstance.properties.status === "occupied") {
      oneHalfTimeOcc += 1;
    }
  });
  twoTimeArray.forEach((twoInstance) => {
    if (twoInstance.properties.status === "occupied") {
      twoTimeOcc += 1;
    }
  });

  //Same totals from previous day
  currYesterday.forEach((currYInstance) => {
    if (currYInstance.properties.status === "occupied") {
      currYOccupancy += 1;
    }
  });
  halfTimeDBArray.forEach((halfYInstance) => {
    if (halfYInstance.properties.status === "occupied") {
      halfYTimeOcc += 1;
    }
  });
  oneTimeDBArray.forEach((oneYInstance) => {
    if (oneYInstance.properties.status === "occupied") {
      oneYTimeOcc += 1;
    }
  });
  onehalfTimeDBArray.forEach((onehalfYInstance) => {
    if (onehalfYInstance.properties.status === "occupied") {
      oneHalfYTimeOcc += 1;
    }
  });
  twoTimeDBArray.forEach((twoYInstance) => {
    if (twoYInstance.properties.status === "occupied") {
      twoYTimeOcc += 1;
    }
  });
}
//populate the chair charts
function populateChairChart(chairID) {
  chairOccCount = 0;
  chairYOccCount = 0;
  chairYYOccCount = 0;

  chairYCurrArr = findTimeStamp(get_Tstamp.calculate_Tstamp(hour, (dayAdjusted - 24)), chairPolys);
  chairYYCurrArr = findTimeStamp(get_Tstamp.calculate_Tstamp(hour, (dayAdjusted - 48)), chairPolys);

  actualChairInfo.forEach((currChairInfo) => {
    if (currChairInfo.properties.chairID === chairID) {
      chairOccCount = currChairInfo.properties.UniqueOccupants;
    }
  });

  chairYCurrArr.forEach((currYChairInfo) => {
    if (currYChairInfo.properties.chairID === chairID) {
      chairYOccCount = currYChairInfo.properties.UniqueOccupants;
    }
  });

  chairYYCurrArr.forEach((currYYChairInfo) => {
    if (currYYChairInfo.properties.chairID === chairID) {
      chairYYOccCount = currYYChairInfo.properties.UniqueOccupants;
    }
  });

}



function sliderToHour() {
  //slider goes from -24 at midnight to 0 at midnight the next day
  var slide = document.getElementById('timeSlider').value;
  hour = 24 - Math.abs(slide % 24); //remainder is equivalent to relative simulated time
  if (daySelected === 0) {
    //day 1, relative range -96 to -72
    //-Math.abs necessary to convert back to positive
    dayAdjusted = -Math.abs(hour + 72);
  } else if (daySelected === 1) {
    //day 2, relative range -72 to -48
    dayAdjusted = -Math.abs(hour + 48);
  } else if (daySelected === 2) {
    //day 3, relative range -48 to -24
    dayAdjusted = -Math.abs(hour + 24);
  } else if (daySelected === 3) {
    //day 4, relative range -24 to 0
    dayAdjusted = -Math.abs(hour);
  }
  //passing hour value to be used to calculate which timestamp to use
  convertSlider2Timestamp(hour, dayAdjusted);

  actualChairInfo = findTimeStamp(sliderTimeStamp, chairPolys);
  populateRestaurantChart();
  resetPolyColors();


  availableSeats = doughnutNC + doughnutNO;


  if (hour >= 9 && hour <= 18) {
    //Restaurant is open, hide elements saying it's closed and show elements sayin it's open.
    //Change sidebar title background colour to green
    document.getElementById('sidebarOpen').style.display = 'block';
    document.getElementById('sidebarOCB').style.background = '#00A000';
    document.getElementById('sidebarClosed').style.display = 'none';
    document.getElementById('restaurantopen').style.display = 'block';
    document.getElementById('restaurantclosed').style.display = 'none';
  } else {
    //Restaurant is closed, hide elements saying it's open and show elements sayin it's closed.
    //Change sidebar title background colour to red
    document.getElementById('sidebarOpen').style.display = 'none';
    document.getElementById('sidebarOCB').style.background = '#fe022f';
    document.getElementById('sidebarClosed').style.display = 'block';
    document.getElementById('restaurantopen').style.display = 'none';
    document.getElementById('restaurantclosed').style.display = 'block';
  }
  //Set the "available seats" element to show the current number of available seats
  document.getElementById('restaurantinfo2').innerHTML = availableSeats + " seats available";
  //setContent() somehow works to update the popup
  buildingPoly.getPopup().setContent();
}
//push data to doughnut chart
function updateChart(myDoughnutChart, chairDoughnutData) {
  myDoughnutChart.data.datasets.forEach((dataset) => {
    dataset.data.push(chairDoughnutData);
  });
  myDoughnutChart.update();
}
//push data to bar chart
function updateBarChart(myChart, uoArray) {
  myChart.data.datasets.forEach((dataset) => {
    dataset.data.push(uoArray);
  });
  myChart.update();
}
//occupancy variables for charts
var doughnutO = 0;
var doughnutNO = 0;
var doughnutNC = 0;
var doughnutC = 0;

function createDoughnutDataArray() {
  //add occupancy variables to doughnut data array
  chairDoughnutData[0] = doughnutO;
  chairDoughnutData[1] = doughnutNO;
  chairDoughnutData[2] = doughnutNC;
  chairDoughnutData[3] = doughnutC;
}
//set chair polygon colour to reflect state
function getColour(chair) {
  if (chair.properties.status === "occupied") {
    return "#fe022f";
  } else if (chair.properties.status === "recentlyOccupied") {
    return "#f0e46e";
  } else if (chair.properties.status === "notOccupied") {
    return "#00f272";
  } else if (chair.properties.status === "closed") {
    return "#000000";
  }
}

function createBarDataArray() {
  //populate arrays for the bar charts
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

function titleStatus(chair) {
  //Return current state to be used in a div
  if (chair.properties.status === "occupied") {
    return "Seat Unavailable";
  } else if (chair.properties.status === "recentlyOccupied") {
    return "To Be Cleared";
  } else if (chair.properties.status === "notOccupied") {
    return "Seat Available";
  } else if (chair.properties.status === "closed") {
    return "Closed";
  }
}

function chairStatus(chair) {
  //Return current state to be used in a div
  if (chair.properties.status === "occupied") {
    return "Taken";
  } else if (chair.properties.status === "recentlyOccupied") {
    return "Being Cleared";
  } else if (chair.properties.status === "notOccupied") {
    return "Free";
  } else if (chair.properties.status === "closed") {
    return "Closed";
  }
}

function lastOccupied(chair) {
  //Get a substring of the last occupied time to only show hour and minute
  return chair.properties.lastOccupiedTime.substring(10, 16);

}

function occupantsToday(chair) {
  //return daily occupants of the chair
  return chair.properties.UniqueOccupants;

}

function resetPolyColors() {
  //reset occupancy variables
  doughnutO = 0;
  doughnutNO = 0;
  doughnutNC = 0;
  doughnutC = 0;
  //remove chair polygons from the map
  chairGroup.eachLayer(
    function(layer) {
      map.removeLayer(layer)
      chairGroup.removeLayer(layer)
    }
  )
  actualChairInfo.forEach((currentChair) => {
    //set seat colours and increment occupancy variables
    if (currentChair.properties.status === "occupied") {
      seatcolour = "#fe022f";
      doughnutO += 1;
    } else if (currentChair.properties.status === "recentlyOccupied") {
      seatcolour = "#f0e46e";
      doughnutNO += 1;
    } else if (currentChair.properties.status === "notOccupied") {
      seatcolour = "#00f272";
      doughnutNC += 1;
    } else if (currentChair.properties.status === "closed") {
      seatcolour = "#ffffff";
      doughnutC += 1;
    }
    //Add leaflet polygon for each seat, could easily be in an array of JS objects for easier referencing
    var polyChair = L.polygon(currentChair.geometry.coordinates, {
      label: currentChair.properties.chairID,
      color: seatcolour,
      indoorMapId: "westport_house",
      indoorMapFloorId: 0
    }).bindPopup("<div class='chairdiv' id=chair" + currentChair.properties.chairID + ">" +
      "<div class='chairtitle' id=" + currentChair.properties.chairID + "title style='background-color: " + getColour(currentChair) + "'>" +
      "<h1 class='chairtitletext' style='text-align:center + ;'>" + titleStatus(currentChair) + "</h1>" +
      "</div>" +
      "<div class='chairlastoccupied' id=" + currentChair.properties.chairID + "lastoccupied>" +
      "Last Occupied: " + lastOccupied(currentChair) +
      "</div>" +
      "<div class='chairdailyoccupants' id=" + currentChair.properties.chairID + "dailyoccupants>" +
      "Occupants Today: " + occupantsToday(currentChair) +
      "</div>" +
      "<div class='pContainerChair'><p class='headerP'>Chair Busyness</p><p class='descP'>Based on last 2 days</p>" +
      "<div class='chairoccupancygraph' id=" + currentChair.properties.chairID + "occupancygraph>" +
      "<article class='graph' id='barGraph'>" +
      "</article>" +
      "<div class='barXInfo'>" +
      "<p class ='leftP'>-48hr</p>" +
      "<p class ='middleP'>-24hr</p>" +
      "<p class ='rightP'>now</p>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>", {
        closeOnClick: true,
        autoClose: true,
        closeButton: false,
        indoorMapId: 'westport_house',
        indoorMapFloorId: 0
      })
    //add created variable to featureGroup
    chairGroup.addLayer(polyChair);

  })
  //add layers in featuregroup to map
  chairGroup.eachLayer(
    function(layer) {
      map.addLayer(layer)
    }
  )
  //create, update and draw charts
  createDoughnutDataArray();
  createBarDataArray();
  updateBarChart(myChart, uoArray);
  updateChart(myDoughnutChart, chairDoughnutData);
  DrawChart();

}

function checkValue(event) {
  sliderToHour();
}

function clickBuilding(event) {
  //force building popup to only open at the centre of the polygon
  this.getPopup().setLatLng(this.getCenter());
}

function mouseOverBuilding(event) {
  //set building polygon to a lighter colour
  this.setStyle({
    color: '#bff5ff'
  });
}

function mouseOutBuilding(event) {
  //reset building polygon to darker colour
  this.setStyle({
    color: '#7aebff'
  });
}

function onEnter(event) {
  //wait for the hardcoded entry animation to run
  setTimeout(function() {
    //Pan the camera around to our chosen position, heading, tilt and zoom
    map.setView([56.460196, -2.978106], 19.75, {
      headingDegrees: 169,
      tiltDegrees: 20,
      animate: true,
      durationSeconds: 2
    });
  }, 0);
  //display the sidebar elements
  $("#sidebarButton").css("display", "inline-block");
  $(".sideView").css("display", "block");
  setTimeout(function() {
    //fire a click event for the sidebar button to ensure it opens when the user enters the building
    $("#sidebarButton").trigger("click");
  }, 2000);
}

function onExit(event) {
  //hide the sidebar elements
  $("#sidebarButton").css("display", "none");
  $(".sideView").css("display", "none");
}


$.fn.redraw = function() {
  $(this).each(function() {
    var redraw = this.offsetHeight;
  });
};
//event trackers
map.indoors.on("indoormapenter", onEnter);
map.indoors.on("indoormapexit", onExit);
buildingPoly.on("mouseover", mouseOverBuilding);
buildingPoly.on("mouseout", mouseOutBuilding);
buildingPoly.on("click", clickBuilding);
buildingPoly.on("popupopen", checkValue);
$("#timeSlider").on("change", sliderToHour);


var ctx = document.getElementById('myDoughnutChart').getContext('2d');
//create the Chart.js doughnut chart
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
      'To Be Cleared',
      'Available',
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
function incrementSlider() {
  sliderIncrement = setInterval(function() {
    //animate a loading bar on the play/pause button to show the user it's doing something
    $("#loadingBar").toggleClass('widen');
    $("#loadingBar").css('transition', 'width 0');
    $("#loadingBar").css('-webkit-transition', 'width 0');
    $("#loadingBar").css('-moz-transition', 'width 0');
    $("#loadingBar").css('width', '0');
    $("#loadingBar").css('width', '');
    $("#loadingBar").css('transition', '');
    $("#loadingBar").css('-webkit-transition', '');
    $("#loadingBar").css('-moz-transition', '');
    $("#loadingBar").toggleClass('widen');
    if ($('#timeSlider').val() != 0) {
      var newSlide = -Math.abs($('#timeSlider').val()) + 0.5;
      $('#timeSlider').val(newSlide);
      $('#timeSlider').trigger('change');
    } else {
      //if the slider reaches the end, go to the next day
      if (daySelected === 0) {
        $("#link2Clicked").trigger('click');
        $('#timeSlider').val(-Math.abs(24));
        $('#timeSlider').trigger('change');
      }
      if (daySelected === 1) {
        $("#link3Clicked").trigger('click');
        $('#timeSlider').val(-Math.abs(24));
        $('#timeSlider').trigger('change');
      }
      if (daySelected === 2) {
        $("#link4Clicked").trigger('click');
        $('#timeSlider').val(-Math.abs(24));
        $('#timeSlider').trigger('change');
      }
      if (daySelected === 3) {
        //at the end of the last day, stop the increment
        $(".playButton").trigger('click');
      }
    }
  }, 5000);
}



function stopIncrement() {
  clearInterval(sliderIncrement);
}

//from slider.js
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
$("#sliderDropdownButton").click(function() {
  document.getElementById("myDropdown").classList.add("show");
  $(".dropbtn").css('border-top-left-radius', '0');
  $(".dropbtn").css('border-top-right-radius', '0');

  document.getElementById("usa").classList.add("fa-angle-down");
  document.getElementById("usa").classList.remove("fa-angle-up");
});


window.onclick = function(event) {
  if (!event.target.matches('#sliderDropdownButton')) {
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
/*Set the current day when the user clicks on the respective button
  and trigger the slider change event to update the other elements*/
$("#link1Clicked").click(function() {

  daySelected = 0;
  $("#currentDay").html("01/09/2018");
  $('#timeSlider').trigger('change');
});

$("#link2Clicked").click(function() {
  daySelected = 1;
  $("#currentDay").html("02/09/2018");
  $('#timeSlider').trigger('change');
});

$("#link3Clicked").click(function() {
  daySelected = 2;
  $("#currentDay").html("03/09/2018");
  $('#timeSlider').trigger('change');
});

$("#link4Clicked").click(function() {
  daySelected = 3;
  $("#currentDay").html("04/09/2018");
  $('#timeSlider').trigger('change');
});
//increment slider by -0.5 or 0.5 if the user clicks rewind or foward
$(".rewindButton").click(function() {
  if ($('#timeSlider').val() != -24) {
    var newSlide = -Math.abs($('#timeSlider').val()) - 0.5;
    $('#timeSlider').val(newSlide);
    $('#timeSlider').trigger('change');
  }
});

$(".forwardButton").click(function() {
  if ($('#timeSlider').val() != 0) {
    var newSlide = -Math.abs($('#timeSlider').val()) + 0.5;
    $('#timeSlider').val(newSlide);
    $('#timeSlider').trigger('change');
  }
});

$(".playButton").click(function() {
  //change the play/pause button to pause/play and begin/end the increment
  if (playClicked === false) {
    $("#loadingBar").toggleClass('resetWidth');
    $("#loadingBar").toggleClass('widen');

    incrementSlider();


    document.getElementById("playPause").classList.remove("fa-play");
    document.getElementById("playPause").classList.add("fa-pause");

    playClicked = true;
  } else {
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

function time() {
  //get the current timestamp and substring-slice to only get the hour and minute value.
  var dateAndTime = sliderTimeStamp;
  var timeFromTimeStamp;
  timeFromTimeStamp = dateAndTime.substr(11);
  timeFromTimeStamp = timeFromTimeStamp.slice(0, -3);
  $("#clock").html(timeFromTimeStamp);
}


var ctx2 = document.getElementById("myChart").getContext('2d');
//create the bar chart
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
      }
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
      '-2hrs',
      '-1.5hrs',
      '-1hr',
      '-.5hrs',
      'Now'

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
//draw the bar chart
function DrawChart() {
  var ctx3 = document.getElementById("myChart2").getContext('2d');
  var myChart2 = new Chart(ctx3, {
    type: 'horizontalBar',
    data: {
      //labels: ['Avialability'],
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
          backgroundColor: [
            'rgba(218, 204, 5, 0.5)'
          ],
          label: ["To Be Cleared"]
        },
        {
          data: [doughnutNC],
          backgroundColor: [
            'rgba(19, 218, 5, 0.5)'
          ],
          label: ["Available"]
        }
      ]
    },
    options: {
      legend: {
        labels: {
          boxWidth: 10
        }
      },
      scales: {
        xAxes: [{
          stacked: true,
          gridLines: {
            offsetGridLines: true,
            drawOnChartArea: false
          }
        }],
        yAxes: [{
          stacked: true,
          gridLines: {
            offsetGridLines: true,
            drawOnChartArea: false
          }
        }]
      }
    }
  })
}
buildingPoly.on("click", (event, MouseEvent) => {
  DrawChart();
})
//bar chart code credit: https://codepen.io/tbusser-itouch/pen/zxNPRK

function barChart() {
  'use strict';

  var scores = [],
    bars = [],
    graph = document.getElementById('barGraph'),
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
    var key, /* [1] */
      el = document.createElement('div'),
      /* [2] */
      transitions = { /* [3] */
        WebkitTransition: 'webkitTransitionEnd',
        OTransition: 'otransitionend', // oTransitionEnd in very old Opera
        MozTransition: 'transitionend',
        transition: 'transitionend'
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
    // Copy the selected value for easy usageunction barChart() {
    'use strict';

    var scores = [],
      bars = [],
      graph = document.getElementById('bargraph'),
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
  }
  /* ====================================================================== *\
     ==                          HELPER METHODS                          ==
  \* ====================================================================== */
  /**
   * Creates a mock datasource for the graph.
   */
  function createDataSource() {
    // Determine the number of data points to generate, this will be a
    // number between 1 and 30 (inclusive)
    var count = 3;
    scores = [];
    scores.push(chairYYOccCount);
    scores.push(chairYOccCount);
    scores.push(chairOccCount);
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
    var key, /* [1] */
      el = document.createElement('div'),
      /* [2] */
      transitions = { /* [3] */
        WebkitTransition: 'webkitTransitionEnd',
        OTransition: 'otransitionend', // oTransitionEnd in very old Opera
        MozTransition: 'transitionend',
        transition: 'transitionend'
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
      var bar = document.createElement('div'),
        /* [1] */
        duration = (scores[index] / 5) * barTransitionTime,
        /* [2] */
        delay = 0; /* [3] */
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
      bar.style.width = '6.4%';
      // Calculate the left position, this is simply the total width per
      // bar multiplied by its index
      bar.style.left = (15 * index) + '%';
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
      if (index === 2) {
        bar.style.backgroundColor = '#f9807f';
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
        bars[index].style.height = (maxHeight * (scores[index] / 10)) + 'px';
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
        delay += (barTransitionTime - parseFloat(bars[index].getAttribute('data-duration'))); /* [1] */
      }
      if (barDrawEffect === 'wave' || barDrawEffect === 'combined') {
        delay += (barDelayTime * (ubound - index)); /* [2] */
      }
      delay += 's'; /* [3] */
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
