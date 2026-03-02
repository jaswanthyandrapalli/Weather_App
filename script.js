const input = document.querySelector("#input")
const search = document.querySelector("#search")
const currentBtn = document.querySelector("#current")
let city = document.querySelector("#city")
let report = document.querySelector("#report")
const darkModeBtn = document.querySelector(".dark-mode")

// ================= SEARCH BY CITY =================
search.addEventListener("click", () => {
    if (input.value === "") {
        alert("Enter correct city")
    } else {
        getCityCoordinates(input.value)
    }
})

// Get latitude & longitude from city name
async function getCityCoordinates(cityName) {
    try {
        let res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`)
        let data = await res.json()

        if (!data.results) {
            alert("City not found")
            return
        }

        let { latitude, longitude, name } = data.results[0]

        // Call reusable weather function
        getWeather(latitude, longitude, name)

    } catch (err) {
        console.log(err)
    }
}

// ================= GET WEATHER FUNCTION (Reusable) =================
async function getWeather(lat, lon, cityName) {
    try {
        let res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        )
        let data = await res.json()

        city.textContent = cityName
        report.innerHTML = `
            <li>🌡 Temperature: ${data.current_weather.temperature}°C</li>
            <li>💨 Wind Speed: ${data.current_weather.windspeed} km/h</li>
        `

    } catch (err) {
        console.log(err)
    }
}

// ================= CURRENT LOCATION =================
currentBtn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                let lat=position.coords.latitude
                let lon=position.coords.longitude
                getWeather(lat, lon, "Current Location")
            },
            (error)=>{
             alert("Location access denied or unavailable")
        }
            )


        }else{
            alert("Geolocation is not supported by this browser.")
        }

        }
    
    

   
    )

// ================= DARK MODE =================
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark")

    if (document.body.classList.contains("dark")) {
    document.body.style.background =
        "linear-gradient(135deg, #002b1f, #00695c, #00c853)";
    document.body.style.color = "white";
    document.querySelector(".container").style.background = "rgba(255, 255, 255, 0.1)";
    darkModeBtn.textContent = "☀️";
} else {
    document.body.style.background = "";
    document.body.style.color = "white";
    darkModeBtn.textContent = "🌙";
}   
})