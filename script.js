const input=document.querySelector("#input")
const search=document.querySelector("#search")
let city=document.querySelector("#city")
let report=document.querySelector("#report")
search.addEventListener("click",()=>{
    if(input.value===""){
        alert("Enter correct city")
    }else{
        fun(input.value)
    }
})

async function fun(cityName){
    try{
        let res=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`)
        let data=await res.json()
        console.log(data.results[0].name)
        console.log(data.results[0].latitude)
        console.log(data.results[0].longitude)
        
        let [lat, lon] = [data.results[0].latitude, data.results[0].longitude]
        let res1 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        let dat1 = await res1.json()
        console.log(dat1.current_weather.temperature)
        console.log(dat1.current_weather.windspeed)
       
        city.textContent=data.results[0].name
        report.innerHTML=`<p>Temperature: ${dat1.current_weather.temperature}°C</p>
            <p>Wind Speed: ${dat1.current_weather.windspeed} km/h</p>`

    }catch(err){
        console.log(err)
    }
}
