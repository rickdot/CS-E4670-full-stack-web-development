import { useState } from 'react'


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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  // state of input fields
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterVal, setFilterVal] = useState('')

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

    setPersons(persons.concat(newPerson))
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