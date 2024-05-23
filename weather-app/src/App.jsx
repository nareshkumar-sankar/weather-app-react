

import rain from './assets/rain.png';
import search from './assets/search.png';
import cold from './assets/cold.png';
import littlesunny from './assets/littelsunny.png';
import rainthunder from './assets/rain-thunder.png';
import rainbow from './assets/rainbow.png';
import sunny from './assets/sunny.png';
import sunnyrain from './assets/sunnyrain.png';
import thunder from './assets/thunder.png';
import wind1 from './assets/wind1.png';
import humidity from './assets/humidity.png';
import wind from './assets/wind.png';

import "./App.css"
import { useEffect, useState } from 'react';

const WeatherDatails = ({ icon, temp, city ,country,lat,log,wid,hum}) => {
  return (
    <>
      <div className='image'>
        <img src={icon} alt="Image" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="city">{city}</div>
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
          <img src={humidity} alt="humidity" className='icon' width="40px"/>
          <div className='data'>
            <div className="humidity-percent">{hum}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="wind" className='icon' width="40px"/>
          <div className='data'>
            <div className="wind-percent">{wid}km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
     
    </>
  )
}



function App() {
  let apiKey=`e5f44278546befc74905dbbe8e7aff48`
  const [text,setText] = useState("chennai")
  const [icon, setIcon] = useState(sunny)
  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState("Chennai")
  const [country, setCountry] = useState("IN")
  const [lat, setLat] = useState(0)
  const [log, setLog] = useState(0)
  const [wid, setWid] = useState(5)
  const [hum, setHum] = useState(0)
  const [cityNotFound, setCityNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,setError] = useState(null);

  const weatherIconMap={
    "01d":sunny,
    "01n":sunny,
    "02d":littlesunny,
    "02n":littlesunny,
    "03d":rainthunder,
    "03n":rainthunder,
    "04d":sunnyrain,
    "04n":sunnyrain,
    "09d":rain,
    "09n":rain,
    "010d":rainthunder,
    "010n":rainthunder,
    "013d":cold,
    "013n":cold,
  }


  const searchCity=async ()=>{
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}`
    
    try{
      let res =await fetch(url)
      let data=await res.json()
      if (data.cod ==="404") {
        console.log("city not found")
        setCityNotFound(true)
        setLoading(false)
        
      }
      setHum(data.main.humidity);
      setWid(data.wind.speed)
      setTemp(Math.floor(data.main.temp))
      setCity(data.name)
      setCountry(data.sys.country)
      setLog(data.coord.lon)
      setLat(data.coord.lat)
      const weatherIconCode=data.weather[0].icon
      setIcon(weatherIconMap[weatherIconCode] || sunny)
      setCityNotFound(false)
      setError(false)
    }
    catch(err){
      console.error("an error occurred",err.message)
      setError("An error occured while feching data.");
    }
    finally{
      setLoading(false)
    }
  };

  const handleCity=(e)=>{
    setText(e.target.value)
  };

  const handleKeyDown=(e)=>{
    if (e.key==="Enter") {
      searchCity()
    }
  }

  useEffect(()=>{
    searchCity()
  },[])

  return (
    <>
      <div className='container'>
        <div className="input-container">
          <input type="text" className='city-input' placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
          <div className="search-icon" onClick={()=>searchCity()}>
            <img src={search} alt="search" width="20px" />
          </div>
        </div>
        {!loading && !cityNotFound &&<WeatherDatails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} hum={hum} wid={wid}/>}
       {loading && <div className='loading-msg'>loading...</div>}
       {error && <div className='error-msg'>{error}</div>}
        {cityNotFound && <div className='city-not-found'>city not found</div>}
        <p className='copyright'>
        Designed By <span>NK</span>
      </p>
      </div>
    </>
  )
}

export default App
