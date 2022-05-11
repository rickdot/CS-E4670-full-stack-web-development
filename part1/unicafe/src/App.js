import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = props => <div>{props.text} {props.value}{props.p}</div>

const Statistics = (props) => {
  const good = props.clicks[0]
  const neutral = props.clicks[1]
  const bad = props.clicks[2]
  if (good+neutral+bad>0){
    return (
      <div>
        <h2>Statistics</h2>
        <Display text="good" value={good} />
        <Display text="neutral" value={neutral} />
        <Display text="bad" value={bad} />
        <Display text="all" value={good+neutral+bad} />
        <Display text="average" value={(good-bad)/(good+neutral+bad)} />
        <Display text="positive" value={(good)/((good+neutral+bad)/100)} p="%" />
      </div>
    )
  }
  return (
    <div>
      <h2>Statistics</h2>
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
      <Statistics clicks={[good,neutral,bad]} />
    </div>
    
  )
}




export default App