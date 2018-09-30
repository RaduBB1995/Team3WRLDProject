var Chart = require('chart.js');

$(".slideViewToggle").click(function () {
    // Set the duration (default: 500 milliseconds)
    var duration = 500;

    var clicks = $(this).data('clicks');
    if (clicks) {
       // odd clicks
       $('.sideView').animate({"right": "-=345px"}, duration);
       $(".slideViewToggle").html("<i class='fas fa-angle-left'></i>");
    } else {
       // even clicks
       $('.sideView').animate({"right": "+=345px"}, duration);
       $(".slideViewToggle").html("<i class='fas fa-angle-right'></i>");
    }
    $(this).data("clicks", !clicks);
});
