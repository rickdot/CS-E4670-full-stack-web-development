import { useState, useEffect } from 'react'
import axios from 'axios'



const Filter = (props) => 
  <form>
      filter shown with <input value={props.filter} onChange={props.onChange}/>
  </form>

const PersonForm = (props) => 
  <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.nameHandler} />
    </div>
    <div>
      number: <input value={props.newNum} onChange={props.numHandler} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  


const Person = ({person}) => 
  <div>
    {person.name} {person.number}
  </div>

const Persons = (props) => 
  <div>
    {props.personsToShow.map((person, i) => <Person key={i} person={person} />)}
  </div>
  

const App = () => {
  const [persons, setPersons] = useState([])

  // state of input fields
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterVal, setFilterVal] = useState('')


  const hook = () => {
    // console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])


  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNum
    }

    // check name existence
    for(let i=0; i<persons.length; i++){
      if(JSON.stringify(persons[i].name) === JSON.stringify(newPerson.name)){
        alert(`${newName} is already added to phonebook`)
        return
      }
    }
    
    axios
    .post('http://localhost:3001/persons', newPerson)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNum('')
    })

    
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    // console.log(event.target.value);
    setNewNum(event.target.value)
  }

  const handleFilter = (event) => {
    // console.log(event.target.value);
    setFilterVal(event.target.value)
  }


  let personsToShow = []
  for(let i=0; i<persons.length; i++){
    if(persons[i].name.toLowerCase().includes(filterVal.toLowerCase())){
      personsToShow.push(persons[i])
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filterVal} onChange={handleFilter} />

      <h3> Add a new </h3>

      <PersonForm newName={newName} nameHandler={handleNameChange} 
        newNum={newNum} numHandler={handleNumChange} 
        addPerson={addPerson}/>

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App