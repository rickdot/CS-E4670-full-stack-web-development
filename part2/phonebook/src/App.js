import { useState, useEffect } from 'react'
import personService from './service/person.js'


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
  


const Person = ({person, deletePerson}) => {
  return(
    <div>
    {person.name} {person.number} <button onClick={()=>deletePerson(person.id)}>delete</button>
  </div>
  )
  
}
  

const Persons = ({personsToShow, deletePerson}) => 
  <div>
    {personsToShow.map((person, i) => <Person key={i} person={person} deletePerson={deletePerson}/>)}
  </div>
  

const App = () => {
  const [persons, setPersons] = useState([])

  // state of input fields
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterVal, setFilterVal] = useState('')


  const hook = () => {
    // console.log('effect')
    personService
      .getAll()
      .then(response => {
        // console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])


  const addPerson = (event) => {
    event.preventDefault()
    
    const personObject = persons.find(person => person.name === newName)

    // doesn't exist
    if(personObject === undefined){
      const newPerson = {
        name: newName,
        number: newNum
      }
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNum('')
        })
        return
    }

    // already exist. confirm
    if(window.confirm(`${personObject.name} is already added to the phonebook, replace the old number with a new one?`)){
      personService.deleteOne(personObject.id)
          
      let persons_copy  = persons.filter(person => person.id !== personObject.id)
      const newObject = {
        name: newName,
        number: newNum,
        id: personObject.id
      }
      personService
        .create(newObject)
        .then(response => {
          setPersons(persons_copy.concat(response.data))
          setNewName('')
          setNewNum('')
        })
    }
    


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

  const deletePerson = id => {
    const personObject = persons.find(person => person.id === id)
    console.log(personObject.id);
    if(window.confirm(`Delete ${personObject.name}?`)){
      personService
        .deleteOne(id)
        .then(() => {
          const newPersons = persons.filter(person => person.id !== id)
          setPersons(newPersons)
        })
    }
    
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

      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App