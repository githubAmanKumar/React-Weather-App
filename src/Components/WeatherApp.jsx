import React, { useState } from 'react'
import cloud_icon from '../assets/cloud.png'
import clear_icon from '../assets/clear.png'
import warm_icon from '../assets/warm.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'

import search_icon from '../assets/search.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
function WeatherApp() {

    const [city, setCity] = useState(null)
    const [search, setSearch] = useState("")
    const [tempImage, setTempImage] = useState(cloud_icon)
    const [tempText, setTempText] = useState("")
    

    const fetchapi = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${import.meta.env.VITE_SECRET_KEY}`;
        const res = await fetch(url);
        const response = await res.json();
        console.log((response.main.temp - 273.15));
        setCity(response)

        if((response.main.temp - 273.15)<-20){
            setTempImage(snow_icon)
            setTempText("Snowy")
        }
        else if((response.main.temp - 273.15)<0){
            setTempImage(rain_icon)
            setTempText("Rainy")
        }
        else if((response.main.temp - 273.15)<10){
            setTempImage(drizzle_icon)
            setTempText("Drizzle")
        }
        else if((response.main.temp - 273.15)<20){
            setTempImage(cloud_icon)
            setTempText("Cloudy")
        }
        else if((response.main.temp - 273.15)<40){
            setTempImage(clear_icon)
            setTempText("Clear")
        }
        else if((response.main.temp - 273.15)>40){
            setTempImage(warm_icon)
            setTempText("Warm")
        }

    };


    return (

        <div className="weatherApp" >

            <div className="searchBar">
                <input className="searchBox"
                    onChange={(event) => { setSearch(event.target.value) }} placeholder='Enter City...'/>
                <div className="searchicon">
                    <img src={search_icon} onClick={() => { fetchapi() }} className='' alt="" />
                </div>
            </div>
            {
                !city ? (
                    <p>Welcome to my Weather App</p>
                ) : (
                    <div className='material'>
                        
                        <div className="weatherImage vibrate-1">
                            <img src={tempImage} className='weatherImageIcon' alt="" />
                        </div>


                        <div className="temperature">{Math.round((city.main.temp - 273.15))}°C - {tempText}</div>


                        <div className="cityName">{city.name}, 
                        {/* {city.location.region}, */}
                         {city.sys.country}</div>


                        <div className="humidityWind">

                            <div className="humidity">

                                <div className="humidityImage">
                                    <img src={humidity_icon} alt="" />
                                </div>
                                <div className="humidityValue">{city.main.humidity}% Humidity</div>
                            </div>

                            <div className="wind">

                                <div className="windImage">
                                    <img src={wind_icon} alt="" />
                                </div>
                                <div className="windValue"> {Math.round(city.wind.speed * 3)} km/hr Wind Speed</div>
                            </div>
                        </div>
                    </div>
                )
            }



        </div>
    )
}

export default WeatherApp
