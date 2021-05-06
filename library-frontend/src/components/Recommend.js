import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, USER } from '../queries'

const Recommend = (props) => {
    // const user = {
    //     username: "Josh",
    //     favoriteGenre: "test"
    // }
    const userResult = useQuery(USER)
    const [user, setUser] = useState('')

    const [getBooks, bookResult] = useLazyQuery(ALL_BOOKS)

    useEffect(() => {
        if (userResult.data){
            setUser(userResult.data.me)
            getBooks({variables: { genre: user.favoriteGenre }})
        }
    }, [userResult.data, getBooks, user.favoriteGenre])

    if (!bookResult.data) {
        return <div>loading...</div>
    }

    const books = bookResult.data.allBooks

    if (!props.show) {
        return null
    }
    
    return (
        <div>
            <h2>recommendations</h2>
            <p>{user.username}, books in your favourite genre <b>{user.favoriteGenre}</b></p>
            <table>
            <tbody>
                <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
                </tr>
                {books.map(b => (
                <tr key={b.title}>
                    <td>{b.title}</td>
                    <td>{b.author.name}</td>
                    <td>{b.published}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}
    export default Recommend;