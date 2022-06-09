import { useState } from 'react'

const Person = ({person}) => 
  <div>
    {person.name} {person.number}
  </div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  // state of input fields
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNum
    }
    // check name existence
    let flag = 0
    for(let i=0; i<persons.length; i++){
      if(JSON.stringify(persons[i].name) === JSON.stringify(newPerson.name)){
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

  const handleNumChange = (event) => {
    // console.log(event.target.value);
    setNewNum(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNum} onChange={handleNumChange} />
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