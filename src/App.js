import React, { useState, useEffect } from 'react'
import axios from 'axios'
import xml2js from 'xml2js'

const City = ({ city }) => {
  const [ weather, setWeather ] = useState(null)

useEffect(() => {
  axios.get(`http://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&
  storedquery_id=fmi::forecast::hirlam::surface::point::multipointcoverage&
  place=${city}`)
  .then(result => {
    console.log(result.data.current)
    setWeather(result.data.current)
    })
  }, [])

  return <div> <Weather weather = {weather}/></div>)
}


const Weather = ( {weather} ) => {
  if(!weather) {return null}
  return(
    <>
      <div>
      Temperature: {weather.temp_c} Celcius
      </div>
      <div>
      <b>Wind: </b>{weather.wind_kph} kph, direction {weather.wind_dir}
    </div>
  </>)
}

const App = () => {
    return (
      <>
      <div>
        <form>
          <label> City: <input type="text" name="city" /> </label>
          <input type="submit" value="Submit" />
        </form>
      </div>

      </>
    )
  }


export default App;
