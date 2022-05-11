import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const StatisticLine = (props) => {
  return (
    <tr>
    <td>{props.text}</td>
    <td>{props.value}{props.p}</td>
  </tr>
  )
  
}



const Statistics = (props) => {
  const good = props.clicks[0]
  const neutral = props.clicks[1]
  const bad = props.clicks[2]
  if (good+neutral+bad>0){
    return (
      <div>
        <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good+neutral+bad} />
        <StatisticLine text="average" value={(good-bad)/(good+neutral+bad)} />
        <StatisticLine text="positive" value={(good)/((good+neutral+bad)/100)} p="%" />
        </table>
      </div>
    )
  }
  return (
    <div>
      No feedback given
    </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGood = () => {
    setGood(good+1)
  }

  const handleNeutral = () => {
    setNeutral(neutral+1)
  }

  const handleBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h2>Statistics</h2>
      <Statistics clicks={[good,neutral,bad]} />
    </div>
    
  )
}




export default App