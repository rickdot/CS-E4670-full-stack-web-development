import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE } from '../queries'
import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

const Books = (props) => {
  const [books, setBooks] = useState([]);

  const [filter, setFilter] = useState('')
  const result = useQuery(ALL_BOOKS)
  // const booksByGenre = useQuery(ALL_BOOKS_BY_GENRE, {variables: {genre: filter}})

  const [getBooksByGenre, {called, loading, data}] = useLazyQuery(ALL_BOOKS_BY_GENRE)


  useEffect(() => {
    if (filter === "all") {
      getBooksByGenre();
    } else {
      getBooksByGenre({ variables: { genre: filter } });
    }
  }, [getBooksByGenre, filter]);

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks);
    }
  }, [setBooks, data]);

  let genresArr = []
  if(result.data){
    result.data.allBooks.forEach(element => {
      genresArr = genresArr.concat(element.genres)
    });
  }
  const genresSet = [...new Set(genresArr)]

  // show books page
  if (!props.show) {
    return null
  }

  // const books = result.data.allBooks
  let booksFiltered = []
  if(filter==='all'){
    setFilter(null)
    return
  } else {
    booksFiltered = books.filter(e => e.genres.includes(filter))
  }


  if(filter){

    return(
      <div>
        <h2>books</h2>
        <p>in genre <b>{filter}</b></p>
        <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genresSet.map(element => 
          <button key={element} onClick={() => setFilter(element) }>{element}</button>
      )}
      <button key="all" onClick={() => setFilter('all') }>all</button>

      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genresSet.map(element => 
          <button key={element} onClick={() => setFilter(element) }>{element}</button>
      )}
      <button key="all"  onClick={() => setFilter('all') }>all</button>

    </div>
  )
}

export default Books
