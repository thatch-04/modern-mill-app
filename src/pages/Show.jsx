import React, { useEffect } from 'react'
import {useState} from "react"
import { useLocation } from 'react-router'


const Show = (props) => {
    const location = useLocation()
    const data = location.state.data.businesses

    const [singleData, setSingleData] = useState(null)


    const getSingleData = () => {

        const businessData = data.find( (business) => business.id === props.match.params.id)

        console.log(businessData)
        console.log(data)

        const displayData = () => {
            return (
                <div>
                    <h1>{businessData.name}</h1>
                    <img src={businessData.image_url}/>
                    <h2>Rating: {businessData.rating} Reviews: {businessData.review_count}</h2>
                    <h2>Phone: {businessData.display_phone}</h2>
                    <h3>Location: {businessData.location.city}</h3>
                    <a href={businessData.url}>Visit Yelp Page</a>
                </div>
            )
        }
        setSingleData(displayData)
    }

    useEffect(() => {
        getSingleData()
    }, [])

    return (
        <div>
            {singleData}
        </div>
    )
}


export default Show