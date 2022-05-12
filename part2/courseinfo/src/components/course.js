import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

const Header = ({ course }) => <h3>{course}</h3>

const Content = ({ parts }) => 
    <div>
      {/* arbitrary number of parts */}
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>   
 
const Total = ({parts}) => {
  // exercise 2.3
  const ary = parts.map(part => part.exercises)
  // console.log(ary);
  const sum = ary.reduce((total,num) => total+num )
  return(
    <b>total of {sum} exercises </b>
  )
}

export default Course