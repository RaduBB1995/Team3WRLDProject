var exports = module.exports = {};

var whole_hour;
var half_hour;
												//value helps find what day
    exports.calculate_Tstamp = function(sliderHour, sliderValue){
    	// most recent timestamp is 2018-09-04 18:00:00
    	//oldest is 2018-09-01 09:00:00
    	//half hour gaps
    	// 
    	
    	if (sliderHour >= 9 && sliderHour <= 18){

    		//check if sliderHour is a decimal 
    		if (Number.isInteger(sliderHour)) {
    			whole_hour = sliderHour
    			half_hour = "00";
    		}
    		else
    		{
    			 whole_hour = sliderHour - 0.5
    			 half_hour = "30";
    		}

    		//using the slider value i get which day it is 
			if (sliderValue >= -96 && sliderValue < -72)
			 {
				 if(whole_hour<10)
				 {
    		 		//adds a leading zero to timestamp to correct format
    		 		var timeStamp = "2018-09-01 0" + whole_hour +":"+half_hour+":00";
    		 		console.log("timestamp calcauted  " + timeStamp);
    		 	}
    		 	else{
    		 		var timeStamp = "2018-09-01 " + whole_hour +":"+half_hour+":00";
    		 		console.log("timestamp calcauted  " + timeStamp);
    		 	}
			 }
			 
    		 if (sliderValue >= -72 && sliderValue < -48)
			 {
				 if(whole_hour<10)
				 {
    		 		//adds a leading zero to timestamp to correct format
    		 		var timeStamp = "2018-09-02 0" + whole_hour +":"+half_hour+":00";
    		 		console.log("timestamp calcauted  " + timeStamp);
    		 	}
    		 	else{
    		 		var timeStamp = "2018-09-02 " + whole_hour +":"+half_hour+":00";
    		 		console.log("timestamp calcauted  " + timeStamp);
    		 	}
			 }
			 
			 if (sliderValue >= -48 && sliderValue <= -24)
    		 {
    		 	
    		 	if (whole_hour<10)
    		 	{
    		 		//adds a leading zero to timestamp to correct format
    		 		var timeStamp = "2018-09-03 0" + whole_hour +":"+half_hour+":00";
    		 		console.log("timestamp calcauted  " + timeStamp);
    		 	}
    		 	else{
    		 		var timeStamp = "2018-09-03 " + whole_hour +":"+half_hour+":00";
    		 		console.log("timestamp calcauted  " + timeStamp);
    		 	}

    		 	// day3 time stamp needed
    		 	
    		 }

    		 if (sliderValue > -24){
    		 	//day 4 timestamp needed 
    		 	if (whole_hour<10)
    		 	{
    		 		var timeStamp = "2018-09-04 0" + whole_hour +":"+half_hour+":00";
    		 		console.log("timestamp calcauted  " + timeStamp);
    		 	}
    		 	else{
    		 		var timeStamp = "2018-09-04 " + whole_hour +":"+half_hour+":00";
    		 		console.log("timestamp calcauted  " + timeStamp);
    		 	}

    		 }


    	}
    	else
    	{
    		return "closed";
    	}

    	
    	return timeStamp;

    };