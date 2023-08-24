$(function(){
    
    //variables
    
    
    
   var mode=0; //App mode
    var timeCounter=0;//timecounter
    var lapCounter=0;//lapcounter
    var action; //variable for set interval
     var lapNumber=0;//number of laps
    
    //min,sec,centisec for time and lap
    var timeMinutes,timeSeconds,timeCentiseconds,lapMinutes,lapSeconds,lapCentiseconds;
    
    //on app load show start and lap buttons
    hideshowButtons("#startButton","#lapButton");
    
    
    //click startbutton
    $("#startButton").click(function(){
         //mode on
        mode=1;
    //show stop and lap button
        hideshowButtons("#stopButton","#lapButton");
    //start counter
        startAction();
    });
    
     
    
    
    //click stopbutton
     $("#stopButton").click(function(){
         
    
       //show resume and reset buttons
        hideshowButtons("#resumeButton","#resetButton");
    //stop counter
        clearInterval(action);
    });
    
    
    
    //click on resumebutton
    $("#resumeButton").click(function(){
         // show stop and lap button
        hideshowButtons("#stopButton","#lapButton")
    //start action
        startAction();
    });
  
    
    //click on resetbutton
    $("#resetButton").click(function(){
        //reload the page
        location.reload();
    });
    
    
    //click on lapbutton
      $("#lapButton").click(function(){
        //if mode is ON
        if(mode){
            //stop action
            clearInterval(action);
            //resetLap and print lap details
            lapCounter = 0;
            addLap();
            //start action
            startAction();
        }
    });
    
    
    //functions
    //hide show buttonfunction to show to buttons
    function hideshowButtons(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    
    //start counter
    function startAction(){
        action=setInterval(function(){
            timeCounter++;
            if(timeCounter==100*60*100){
                timeCounter=0;
            }
            lapCounter++;
            if(lapCounter==100*60*100){
                lapCounter=0;
            }
            updateTime();
        },10);
    }
    
    //updateTime: convert counter to min,sec,centisec
    function updateTime(){
        //1min=60*100centiseconds=6000centiseconds
        timeMinutes=Math.floor(timeCounter/6000);
        
        //1sec=100centiseconds
        timeSeconds=Math.floor((timeCounter%6000)/100);
        
        timeCentiseconds=(timeCounter%6000)%100;
        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));
        
          //1min=60*100centiseconds=6000centiseconds
        lapMinutes=Math.floor(timeCounter/6000);
        
        //1sec=100centiseconds
        lapSeconds=Math.floor((timeCounter%6000)/100);
        
        lapCentiseconds=(timeCounter%6000)%100;
        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds)); 
    }
    
    //format number
    function format(number){
        if(number<10){
            return '0'+number;
        }else{
            return number;
        }
    }
    
    
    //addlap function: print lap details iinside the lapbox
      function addLap(){
        lapNumber++;
           var myLapDetails =
               '<div class="lap">'+
                    '<div class="laptimetitle">'+
                        'Lap'+ lapNumber +
                    '</div>'+
                    '<div class="laptime">'+
                        '<span>'+ format(lapMinutes) +'</span>'+
                        ':<span>'+ format(lapSeconds) +'</span>'+
                        ':<span>'+ format(lapCentiseconds) +'</span>'+
                    '</div>'+
               '</div>';
        $(myLapDetails).prependTo("#laps");
    }
     
});