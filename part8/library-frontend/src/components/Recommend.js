import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME, ALL_BOOKS_BY_GENRE } from '../queries'
import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

const Recommend = (props) => {
  const [books, setBooks] = useState([]);
  // get favourite genre of user
  const currentUser = useQuery(ME)
  console.log(currentUser.data);
  let fav = null
  if(currentUser.data && currentUser.data.me){
    fav = currentUser.data.me.favouriteGenre
  }
  console.log(fav);
  
  const [getBooksByGenre, {called, loading, data}] = useLazyQuery(ALL_BOOKS_BY_GENRE)


  useEffect(() => {
    if(fav){
      getBooksByGenre({ variables: { genre: String(fav) } });
    }
      
  }, [getBooksByGenre, currentUser, fav]);

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks);
    }
  }, [setBooks, data]);


  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>recommendations</h2>
        <p>books in your favorite genre <b>database</b></p>
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

    </div>
  )
}

export default Recommend
