import React, { useState }  from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genreFilter, setGenreFilter] = useState('');

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks

  let genres = []
  books.forEach((book) => {
    book.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre)
      }
    })
  })

  return (
    <div>
      <h2>books</h2>
      {genreFilter ? (
        <p>
          in genre <strong>{genreFilter}</strong>
        </p>
      ) : null}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books
            .filter((book) =>
              genreFilter ? book.genres.includes(genreFilter) : true
            )
            .map(b =>
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )
          }
        </tbody>
      </table>

      <button onClick={() => {setGenreFilter('')}}>all genres</button>
      {genres.map((genre) => (
          <button key={genre} onClick={() => {setGenreFilter(genre)}}>{genre}</button>
        )
      )}

    </div>
  )
}

export default Books