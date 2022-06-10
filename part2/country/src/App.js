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



const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  // const [countryToShow, setCountryToShow] = useState([])

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

  console.log(search);

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
    // console.log(country);
    return(
      <div>
        <Search value={search} onChange={handleSearch} />
        
        <CountryInfo country={country} />

        <Languages country={country} />
        
        <Flag country={country} />

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