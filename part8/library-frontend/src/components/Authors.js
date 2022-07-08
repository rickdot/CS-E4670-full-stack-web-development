import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import { useMutation } from '@apollo/client'

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

const EDIT_BIRTHYEAR = gql`
  mutation editBirth(
    $name: String! 
    $born: Int!
  ) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
  }
}
`


const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

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

  
  const submitBirthyear = async (event) => {
    event.preventDefault()
    
    editBirthyear({ variables: { name, born: Number(born) } })
    
    setName('')
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
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default Authors
