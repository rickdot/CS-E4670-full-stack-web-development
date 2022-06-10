import { useState, useEffect } from 'react'
import axios from 'axios'


const Search = (props) => 
  <form>
      find countries <input value={props.filter} onChange={props.onChange}/>
  </form>

const CountryName = ({countries}) => 
  <div>
    {countries.map((country, i) => <div> {country.name.common} </div> )}
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
      {Object.entries(country.languages).map(lang => <li>{lang[1]}</li>)}
    </ul>
  </div> 


const Flag = ({country}) => 
  <img src={country.flags.png} alt='flag_image' />



const App = () => {
  const [countries, setCountries] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])


  // state of input fields
  const [search, setSearch] = useState('')

  
  const handleFilter = (event) => {
    setSearch(event.target.value)
  }

  
  let countriesToShow = []
  for(let i=0; i<countries.length; i++){
    if(countries[i].name.common.toLowerCase().includes(search.toLowerCase())){
      countriesToShow.push(countries[i])
    }
  }

  if(countriesToShow.length > 10){
    return(
      <div>
        <Search value={search} onChange={handleFilter} />
        Too many matches, specify another filter
      </div>
    )
  }

  if(countriesToShow.length === 1){
    const country = countriesToShow[0]
    // console.log(country);
    return(
      <div>
        <Search value={search} onChange={handleFilter} />
        
        <CountryInfo country={country} />

        <Languages country={country} />
        
        <Flag country={country} />

      </div>
    )
  }

  return (
    <div>
      <Search value={search} onChange={handleFilter} />

      <CountryName countries={countriesToShow}/>
    </div>
  )
}

export default App