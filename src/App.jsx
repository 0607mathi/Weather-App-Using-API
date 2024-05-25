import { useEffect, useState } from 'react'
import './App.css'
import Maginifier from './assets/magnifier.png'
import Rainy from './assets/rainy-day.png'
import Humidity from './assets/humidity.png'
import Wind from './assets/storm.png'
import Sun from './assets/sun.png'
import Clouds from './assets/clouds.png'
import Mist from './assets/mist.png'
import Snow from './assets/snow.png'
import DarkCloud from './assets/dark.png'
import Sunny from './assets/sunny.png'
import Thunder from './assets/thunderstorm.png'

const WetherDetails = ({icon,temp,city,country,lat,log,humidity,wind}) =>{
const TimeDateDay = new Date()
const Day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  return(
    <>
      <div className='image'>
        <img src={icon} width={100} alt="image" /> 
      </div>

      <div className="temp">{temp}°C</div> 

      <div className="time-section">
        <div className="time">
        {TimeDateDay.getHours()}:{TimeDateDay.getMinutes()}
        </div>
        <div className="date">
          {TimeDateDay.getDate()}/{TimeDateDay.getMonth()}/{TimeDateDay.getFullYear()}
        </div>
        <div className="day">
          {Day[TimeDateDay.getDay()]}
        </div>
      </div>

      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">longitude</span>
          <span>{log}</span>
        </div>
      </div>

      <div className="data-container">
        <div className="element">
          <img src={Humidity} alt="humidity" className='icon'/>
          <div className="data"></div>
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>

        <div className="element">
          <img src={Wind} alt="humidity" className='icon'/>
          <div className="data"></div>
          <div className="humidity-percent">{wind}Km/h</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </>
  )
}

function App() {

let api_key = "b06d77adb59cec57f87188b6f75f88bc"
const [icon, setIcon]=useState(Sun);
const [temp, setTemp]=useState(0);
const [city, setCity]=useState("Salem");
const [country, setCountry]=useState("In");
const [lat, setLat]=useState(0)
const [log, setLog]=useState(0)
const [humidity, setHumidity]=useState(0)
const [wind, setWind]=useState(0)
const [text, setText]=useState("Salem")

const weatherIconMap={
  "01d":Sunny,
  "01n":Sunny,
  "02d":Sun,
  "02n":Sun,
  "03d":Clouds,
  "03n":Clouds,
  "04d":DarkCloud,
  "04n":DarkCloud,
  "09d":Rainy,
  "09n":Rainy,
  "10d":Rainy,
  "10n":Rainy,
  "11d":Thunder,
  "11n":Thunder,
  "13d":Snow,
  "13n":Snow,
  "50d":Mist
}

const search = async () =>{
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}`
  try{
    let res =await fetch(url)
    let data = await res.json()
     console.log(data)
    if(data.cod=="404") alert("City not found")
    setTemp(Math.floor(Math.round(data.main.temp/10)))
    setCity(data.name)
    setCountry(data.sys.country)
    setLat(data.coord.lat)
    setLog(data.coord.lon)
    setHumidity(data.main.humidity)
    setWind(data.wind.speed)
    const weatherIconCode = data.weather[0].icon
    setIcon(weatherIconMap[weatherIconCode]||Rainy)
  }
  catch (error){
     console.error("AN error occurred :",error.message)
  }
}

const handleCity = (e)=>{
  setText(e.target.value)
}

const handleKeyDown =(e)=>{
  if(e.key==="Enter"){
    search()
  }
}

// one's open this site load default value
useEffect(function (){
  search();
},[])

  return (
    <>
      <div className='container'>
          <div className="input-container">
            <input type="text" value={text} className="cityInput" placeholder='Search City' onChange={handleCity} onKeyDown={handleKeyDown}/>
            <div className="search-icon">
              <img src={Maginifier} width={20} alt="Search" onClick={()=>{search()}}/>
            </div>
          </div>
          <WetherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>
          <p className="copyright">Designed by <span>Mathi</span></p>
      </div>
    </>
  )
}

export default App
