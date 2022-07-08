import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries'





const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  const [born, setBorn] = useState('')
  const [selected, setSelected] = useState(null)

  const [editBirthyear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const handleChange = (event) => {
    setSelected({value: event.target.value});
  }
  

  const submitBirthyear = async (event) => {
    event.preventDefault()
    if(!selected){
      console.log('not selected');
      return
    }
    
    editBirthyear({ variables: { name: selected.value, born: Number(born) } })
    

    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submitBirthyear}>
        <select onChange={handleChange}>
          <option disabled selected value> -- select an option -- </option>
          {authors.map(a => (
            <option value={a.name} key={a.name}>{a.name}</option>
          ))}
        </select>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
      
    </div>
  )
}

export default Authors
