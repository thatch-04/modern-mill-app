import React from 'react'
import {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Show from '../pages/Show';
import {Link} from 'react-router-dom';


function Main(props) {

    const [form, setForm] = useState('');
    const [data, setData] = useState(null);

    const URL=`https://www.googleapis.com/books/v1/volumes?q=${form.title}+intitle:${form.title}&key=AIzaSyC6j4bZ4ZvK4pkxk0lGiQw6Y16TLIsM6eY`

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        //prevent default
        event.preventDefault()
        //Call API for searched term
        getBook()
    }

    const getBook = async () => {
        const response = await fetch(URL)
        const bookData = await response.json()

        setData(bookData)

        return bookData
    }

    const loaded = () => {
        return data.items.map((book) => (
            
            <div key={book.id} className="book card">
                <Link to={{
                    pathname: `books/${book.id}`,
                    state: {
                        book: book
                    }
                }}>
                    <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={book.volumeInfo.imageLinks.thumbnail}/>
                    <div className="card-body">
                    <h2 className="card-title">{book.volumeInfo.title}</h2>
                    <h4 className="card-text">{book.volumeInfo.authors}</h4>
                    </div>
                    
                </Link>
            </div>
        ))
        
    }

    const loading = () => {
        return <h2 className="loading">Loading....</h2>
    }
    
    return(
        <main className="main">


            <Switch>
                <Route exact path="/">
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={form.name} name="title" placeholder="Search A Business" onChange={handleChange} className="input" />
                        <input type="submit" value="Find Business" class="btn btn-sm"/>
                    </form>
                    <div className="cards">
                    {data ? loaded() : loading()}
                    </div>                    
                </Route>
                <Route path="/books/:id" render={(rp) => <Show {...rp}/>}/>
            </Switch>
        </main>
    ) 
}


export default Main;

