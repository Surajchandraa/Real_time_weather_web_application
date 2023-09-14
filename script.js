let submit = document.getElementById("submit");
let input = document.getElementById("search-bar");
let inputvalue = "";
let apiresponse = {};
let title=document.getElementById("title");
let temp=document.getElementById("temperature-value");
let date=document.getElementById("date");
let status=document.getElementById("status");
let mimimum_temperature=document.getElementById("minimum");
let maximum_temperature=document.getElementById("maximum");
let humidity_=document.getElementById("humidity");
let wind_speed=document.getElementById("wind-speed");
let image=document.getElementById("image");
let sunrisetime=document.getElementById("sunrise");
let sunsettime=document.getElementById("sunset");






submit.addEventListener("click", function () {
    inputvalue = input.value;
    console.log(inputvalue);

    setTimeout(function(){
        let p1= fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${inputvalue}`, {
            method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'ae52e81696mshdd2b8a38367ac86p11ab25jsnb1ae2b46f35a',
                    'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
                } })
            // })
        .then(function(value){
            return value.json()
        }).then(function(value){
            // console.log(value)
            apiresponse=value;
            senddata(apiresponse);
            time();
            status_(apiresponse);
            max_min_temp(apiresponse);
            humidity_windspeed(apiresponse);
            sunrise(apiresponse);
            sunset(apiresponse);
            
        console.log(apiresponse)
        console.log("this is api response")
        }).catch(function(error){
            console.log(error)
        })


        
    },500)


    function senddata(apiresp){
        let apiresp2=apiresp;

        title.textContent=inputvalue;
        temp.textContent=apiresp2.temp;


    }

    function time(){

        const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const nowInMumbai = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    
        let t = new Date
        let month=monthNames[t.getMonth()]
        let day=t.getDate()
        let year=t.getFullYear()
    
        date.textContent=`${month} ${day},${year}`;
    }


     function status_(apiresp){
        let apiresp2=apiresp;
        let cloudiness=apiresp2.cloud_pct;
    
            if (cloudiness <= 10) {
                status.textContent="Clear Sky";
                image.src="required_images_for_website/clear_sky.png";
            } else if (cloudiness <= 30) {
                status.textContent="Partly Cloudy";
                image.src="required_images_for_website/partially.png";
            } else if (cloudiness <= 60) {
                status.textContent="Cloudy";
                image.src="required_images_for_website/overset.png";
            } else {
                status.textContent="Overcast";
                image.src="required_images_for_website/cloudy.png";
            }
        }

})

function max_min_temp(apiresp){
    let apiresp2=apiresp;
    let minimum=apiresp2.min_temp;
    let maximum=apiresp2.max_temp;
    mimimum_temperature.textContent=minimum;
    maximum_temperature.textContent=`/${maximum}`;


}

function humidity_windspeed(apiresp){
    let apiresp2=apiresp;
    let humidity=apiresp2.humidity;
    let wind=apiresp2.wind_speed;

    let wind_deg=apiresp2. wind_degrees;

    let wind_drn=getWindDirection(wind_deg);




const windDirection = getWindDirection(wind_deg);
console.log(`Wind direction is ${windDirection}`);


    humidity_.textContent=`humidity:${humidity}%`;
    wind_speed.textContent=`wind speed:${wind}km/hr  [${wind_drn}]`;
}

function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

function convertTimestampToTime(timestamp) {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes(); // Add leading zero if needed
    const formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
}


function sunrise(apiresp){
    let apiresp2=apiresp;
    let timestamp=apiresp2.sunrise;

    let sun_rise_time=convertTimestampToTime(timestamp);
    sunrisetime.textContent=`Sunrise:${sun_rise_time}`;

}

function sunset(apiresp){
    let apiresp2=apiresp;
    let timestamp=apiresp2.sunset;

    let sunset_time=convertTimestampToTime(timestamp);

    sunsettime.textContent=`Sunset:${sunset_time}`;
    
}

