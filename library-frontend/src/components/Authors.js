import React, { useState } from 'react'
import Select from 'react-select'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR_BORN } from '../queries'

const Authors = ({show, setError}) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthorBorn ] = useMutation(EDIT_AUTHOR_BORN, {
    refetchQueries: [ {query: ALL_AUTHORS } ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
      //onError on mutations currently fails
      //https://github.com/apollographql/apollo-client/issues/5708
    }
  })

  if (!show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    
    editAuthorBorn({ variables: { name, born } })

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
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div style={{width:"175px"}}>
          name
          <Select 
            defaultValue={name}
            onChange={({ value }) => setName(value)}
            options={authors.map(a => ({value: a.name, label: a.name}) )}
          />
          {/* <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors
