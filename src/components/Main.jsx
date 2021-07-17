import React from 'react'
import {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Show from '../pages/Show';
import {Link} from 'react-router-dom';



function Main(props) {

    const [form, setForm] = useState('');
    const [data, setData] = useState(null);

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
        fetch(`https://modern-mill-backend-api.herokuapp.com/yelpAPI/search/${form.term}`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                //set state for data
                setData(data)
            })
            .catch(err => console.log(err)
        )
    }

    const loaded = () => {
        return data.businesses.map((business) => (
            
            <div key={business.id}>
                <Link to={{
                    pathname: `business/${business.id}`,
                    state: {
                        data: data
                    }
                }}>
                    <div className="card-body">
                    <h2 className="card-title">{business.name}</h2>
                    <img src={business.image_url}/>
                    <h4 className="card-text">Rating: {business.rating} Reviews: {business.review_count}</h4>
                    <br></br>
                    <hr className="hr"></hr>
                    </div>
                    
                </Link>
            </div>
        ))
        
    }

    const loading = () => {
        return <h2 className="loading">Search for a Business using a Keyword</h2>
    }
    
    return(
        <main className="main">

            <h1>Naperville Business App</h1>
            <Switch>
                <Route exact path="/">
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={form.name} name="term" placeholder="Search A Business" onChange={handleChange} className="input" />
                        <input type="submit" value="Find Business" className="btn btn-sm"/>
                    </form>
                    <div className="cards">
                        {data ? loaded() : loading()}
                    </div>                    
                </Route>
                <Route path="/business/:id" render={(rp) => <Show {...rp}/>}/>
            </Switch>
        </main>
    ) 
}


export default Main;

