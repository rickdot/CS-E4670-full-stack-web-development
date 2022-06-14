import React from 'react'

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


export default Persons