alert("Hello! Forecast4u obtains your local weather forecast automatically. Please allow the browser to track your location for full functionality. ");

window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => { 
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/2fea03c060103af74ede67bd022be70c/${lat},${long}`;
            fetch(api)
            .then(response =>{
                return response.json();
            }) 
            .then(data => {
                console.log(data);
                const {temperature,summary, icon}= data.currently;
                temperatureDegree.textContent = Math.floor(temperature);
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                    setIcons(icon, document.querySelector(".icon"));

                    let celsius = (temperature - 32) * (5 / 9 );

                    temperatureSection.addEventListener('click', () =>{
                        if (temperatureSpan.textContent === "° F"){
                            temperatureSpan.textContent = "° C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "° F";
                            temperatureDegree.textContent = Math.floor(temperature);
                        }
                    });     
            });
        });  
    } 
        else { 
            console.log('no cigar');
            window.alert("Unable to retrieve your location! Allow the browser to track your location!"); 
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});