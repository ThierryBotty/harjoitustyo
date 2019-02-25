import React, { useState, useEffect } from 'react'
import axios from 'axios'
import XML2JS from 'xml2js'

const City = ({ city }) => {
  const [ weather, setWeather ] = useState(null)
  if (city === "") {city = "helsinki"}
  useEffect(() => {
    axios.get(`http://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&
storedquery_id=fmi::forecast::hirlam::surface::point::multipointcoverage&
place=${city}&`)
    .then(result => {
      XML2JS.parseString(result.data, (error, res) => {
        console.log(res)
        setWeather(res)
      })
    })
  }, [])

return (
  <>
  <h2> Weather in {city} </h2>
  <div> <Weather weather = {weather} city = {city}/> </div> </> )
}

const Weather = ( {weather, city} ) => {
  if(!weather) return <div>Weather not found.</div>

  let a = weather["wfs:FeatureCollection"]["wfs:member"][0]["omso:GridSeriesObservation"][0]["om:result"][0]["gmlcov:MultiPointCoverage"][0]["gmlcov:rangeType"][0]["swe:DataRecord"][0]["swe:field"]
  let b = a[1]["$"]
  let c = weather["wfs:FeatureCollection"]["wfs:member"][0]["omso:GridSeriesObservation"][0]["om:observedProperty"][0]["$"]["xlink:href"]
  console.log(c)
  return(
    <>
      <div>
      Weekly forecast in {city}:
      </div>
      <div>
      <b>Temperature: </b>
      <svg> <use href={c} />
      </svg>
    </div>
  </>)
}

const App = () => {
  const [ city, setCity ] = useState('')
    return (
      <>
      <div>
        <form>
          <label> City:
            <input value={city} onChange={(x)=>{
              x.preventDefault()
              setCity(x.target.value)}
              } name="city" />
          </label>
          <City city = {city}/>
        </form>
      </div>
      </>
    )
  }

export default App;
