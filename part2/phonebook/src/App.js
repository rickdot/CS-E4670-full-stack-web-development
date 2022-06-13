import { useState, useEffect } from 'react'

import personService from './service/person.js'
import Persons  from './components/Persons'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  // state of input fields
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilter = (event) => {
    setSearch(event.target.value)
  }


  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const foundObject = persons.find(person => person.name === newName)

    // doesn't exist
    if(foundObject === undefined){
      const newObject = {
        name: newName,
        number: newNum
      }
      personService
        .create(newObject)
        .then(returnedPersons => {  // retPersons is the new person object
          setPersons(persons.concat(returnedPersons))
          setNewName('')
          setNewNum('')
          setErrorMessage(
            `Added ${newObject.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        return
    }

    // already exist    confirm
    if(window.confirm(`${foundObject.name} is already added to the phonebook, replace the old number with a new one?`)){
      const newPerson = {...foundObject, number: newNum}
      personService
      .update(foundObject.id, newPerson)
      .catch(error => {
        setErrorMessage(`Information of ${newName} has already been removed from server`)
        setPersons(persons.filter(person => person.id !== foundObject.id))
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }
      )
    }
  }


  const deletePerson = id => {
    const personObject = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${personObject.name}?`)){
      personService
        .deleteOne(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id)) // remove it from persons
        })
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message={errorMessage} />

      <Search value={search} onChange={handleFilter} />

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