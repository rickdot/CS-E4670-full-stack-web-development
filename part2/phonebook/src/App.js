import { useState } from 'react'

const Person = ({person}) => 
  <div>
    {person.name}
  </div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    
    const newPerson = {
      name: newName
    }
    // check existence
    let flag = 0
    for(let i=0; i<persons.length; i++){
      if(JSON.stringify(persons[i]) === JSON.stringify(newPerson)){
        flag = 1
        break
      }
    }

    if(flag){
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
    }

  }

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person, i) => <Person key={i} person={person} />)}
    </div>
  )
}

export default App