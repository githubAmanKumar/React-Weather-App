import React, { useState } from 'react'

import icon_01d from '../assets/icons/01d.png'
import icon_01n from '../assets/icons/01n.png'
import icon_02d from '../assets/icons/02d.png'
import icon_02n from '../assets/icons/02n.png'
import icon_03d from '../assets/icons/03d.png'
import icon_03n from '../assets/icons/03n.png'
import icon_04d from '../assets/icons/04d.png'
import icon_04n from '../assets/icons/04n.png'
import icon_09d from '../assets/icons/09d.png'
import icon_09n from '../assets/icons/09n.png'
import icon_10d from '../assets/icons/10d.png'
import icon_10n from '../assets/icons/10n.png'
import icon_11d from '../assets/icons/11d.png'
import icon_11n from '../assets/icons/11n.png'
import icon_13d from '../assets/icons/13d.png'
import icon_13n from '../assets/icons/13n.png'
import icon_50d from '../assets/icons/50d.png'
import icon_50n from '../assets/icons/50n.png'


import search_icon from '../assets/search.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'

function WeatherApp() {

    const [city, setCity] = useState(null)
    const [search, setSearch] = useState("")
    const [tempImage, setTempImage] = useState()
    const [tempText, setTempText] = useState("")

    const fetchapi = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${import.meta.env.VITE_SECRET_KEY}`;
        const res = await fetch(url);
        const response = await res.json();


        try {
            const res = await fetch(url);
            if (res.ok) {
                const response = await res.json();
                setCity(response)
                // console.log(response.weather[0].description);
                setTempText(response.weather[0].description);
                // console.log(response.weather[0].icon);

                switch (response.weather[0].icon) {
                    case '01d':
                        setTempImage(`${icon_01d}`)
                        break;
                    case '01n':
                        setTempImage(`${icon_01n}`)
                        break;
                    case '02d':
                        setTempImage(`${icon_02d}`)
                        break;
                    case '02n':
                        setTempImage(`${icon_02n}`)
                        break;
                    case '03d':
                        setTempImage(`${icon_03d}`)
                        break;
                    case '03n':
                        setTempImage(`${icon_03n}`)
                        break;
                    case '04d':
                        setTempImage(`${icon_04d}`)
                        break;
                    case '04n':
                        setTempImage(`${icon_04n}`)
                        break;
                    case '09d':
                        setTempImage(`${icon_09d}`)
                        break;
                    case '09n':
                        setTempImage(`${icon_09n}`)
                        break;
                    case '10d':
                        setTempImage(`${icon_10d}`)
                        break;
                    case '10n':
                        setTempImage(`${icon_10n}`)
                        break;
                    case '11d':
                        setTempImage(`${icon_11d}`)
                        break;
                    case '11n':
                        setTempImage(`${icon_11n}`)
                        break;
                    case '13d':
                        setTempImage(`${icon_13d}`)
                        break;
                    case '13n':
                        setTempImage(`${icon_13n}`)
                        break;
                    case '50d':
                        setTempImage(`${icon_50d}`)
                        break;
                    case '50n':
                        setTempImage(`${icon_50n}`)
                        break;

                    default:
                        break;
                }

                console.log(search);
            } else {
                alert('City not found');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    function handleKeyPress(event) {
        if (event.keyCode === 13) {
            fetchapi();
        }
    }

    return (

        <div className="weatherApp" >

            <div className="searchBar">
                <input className="searchBox"
                    onChange={(event) => { setSearch(event.target.value) }} placeholder='Enter City...' onKeyUp={handleKeyPress} />
                <div className="searchicon">
                    <img src={search_icon} onClick={() => { fetchapi() }} className='' alt="" />
                </div>
            </div>
            {
                !city ? (
                    <p> Welcome to the weather app 🙏</p>
                ) : (
                    <div className='material'>

                        <div className="weatherImage vibrate-1">
                            <img src={tempImage} className='weatherImageIcon color-change' alt="" />
                        </div>


                        <div className="temperature">{Math.round((city.main.temp - 273.15))}°C - {tempText}</div>


                        <div className="cityName">{city.name},{city.sys.country}</div>


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
