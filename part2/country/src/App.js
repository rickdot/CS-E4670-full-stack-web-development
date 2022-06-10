import { useState, useEffect } from 'react'
import axios from 'axios'


const Search = (props) => 
  <form>
      find countries <input value={props.filter} onChange={props.onChange}/>
  </form>

const Country = ({country, setSearch}) => {
  
  return(
    <div>
      {country.name.common}
      <button onClick={() => setSearch(country.name.common)}>
        show
      </button>
    </div>
    
  )
}

const Countries = ({countries, setSearch}) => 
  <div>
    {countries.map((country, i) => <Country key={i} country={country} setSearch={setSearch}/>)}
  </div> 

const CountryInfo = ({country}) => 
  <div>
    <h2>{country.name.common}</h2> 
    capital {country.capital} <br/>
    area {country.area}
  </div>

const Languages = ({country}) =>
  <div>
    <h2>languages:</h2>
    <ul>
      {Object.entries(country.languages).map((lang, i) => <li key={i}>{lang[1]}</li>)}
    </ul>
  </div> 


const Flag = ({country}) => 
  <img src={country.flags.png} alt='flag_image' />

const Weather = ({country}) => {
  const [weather, setWeather] = useState({})

  const lat = country.capitalInfo.latlng[0]
  const lng = country.capitalInfo.latlng[1]
  const api_key = process.env.REACT_APP_API_KEY
  // const api_key = ''

  const hook = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
  }
  useEffect(hook, [lat, lng, api_key])


  if(weather.main !== undefined){
    return(
      <div>
        <h2>Weather in {country.name.common} </h2>
        temperature {weather.main.temp} Celcius 
        <br/>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon"/>
        <br/>
        wind: {weather.wind.speed} m/s
      </div>
    )
  }
  return(
    <div></div>
  )

}
  


const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])
  
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }


  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))
  
  if(countriesToShow.length > 10){
    return(
      <div>
        <Search value={search} onChange={handleSearch} />
        Too many matches, specify another filter
      </div>
    )
  }

  if(countriesToShow.length === 1 ){
    const country = countriesToShow[0]
    return(
      <div>
        <Search value={search} onChange={handleSearch} />
        
        <CountryInfo country={country} />

        <Languages country={country} />
        
        <Flag country={country} />

        <Weather country={country}/>
      </div>
    )
  }

  return (
    <div>
      <Search value={search} onChange={handleSearch} />

      <Countries countries={countriesToShow} setSearch={setSearch}/>
    </div>
  )
}

export default App