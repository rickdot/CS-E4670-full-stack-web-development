import { useState } from 'react'

const Statistics = (props) => {
  return (<div>statistics {props.value}%</div>)
}

const Display = props => <div>{props.text} {props.value}</div>

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
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
      <Display text="all" value={good+neutral+bad} />
      <Display text="average" value={(good-bad)/(good+neutral+bad)} />
      <Statistics value={(good)/((good+neutral+bad)/100)} />
    </div>
    
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


export default App