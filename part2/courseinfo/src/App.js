const Header = ({ course }) => <h1>{course}</h1>

const Total = ({parts}) => {
  // exercise 2.3
  const ary = parts.map(part => part.exercises)
  // console.log(ary);
  const sum = ary.reduce((total,num) => total+num )
  return(
    <b>total of {sum} exercises </b>
  )
}



const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    <Part
      part={parts[0]} 
    />
    <Part
      part={parts[1]} 
    />
    <Part
      part={parts[2]} 
    />      
  </>


const Course = ({course, parts}) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Course course={course} parts={parts}/>
      
    </div>
  )
}

export default App