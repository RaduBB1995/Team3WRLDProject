var Chart = require('chart.js');

$(".slideViewToggle").click(function () {
    
    //window.alert("sometext");
    
    // Set the effect type
    //var effect = 'slide';

    // Set the options for the effect type chosen
    //var options = { direction: 'right' };

    // Set the duration (default: 400 milliseconds)
    var duration = 500;

    var clicks = $(this).data('clicks');
    if (clicks) {
       // odd clicks
       //window.alert("odd");
       $('.sideView').animate({"right": "-=345px"}, duration);
       $(".slideViewToggle").html("<i class='fas fa-angle-left'></i>");
    } else {
       // even clicks
       //window.alert("even");
       $('.sideView').animate({"right": "+=345px"}, duration);
       $(".slideViewToggle").html("<i class='fas fa-angle-right'></i>");
    }
    $(this).data("clicks", !clicks);
});


