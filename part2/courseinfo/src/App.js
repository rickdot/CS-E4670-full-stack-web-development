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


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  // arbitrary number of courses
  return (
    <div>
      <h2>Web development curriculum</h2>
      
      {
        courses.map(course => <Course key={course.id} course={course}/>)
      }
      
    </div>
  )
}

export default App