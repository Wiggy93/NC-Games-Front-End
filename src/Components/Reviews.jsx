import { useEffect, useState } from 'react';
import {ReviewQueries} from './ReviewQueries';
import {SingleReview} from './SingleReview';
import { getReviews } from '../Utils/api';


export const Reviews = (categories, setCategories) => {
    const [reviews, setReviews] = useState([])

    useEffect(()=>{
        getReviews().then((data)=>{
            console.log(data.reviews);
        })
    },[])

    return (
        <main>
            <ReviewQueries setReviews={setReviews} setCategories={setCategories}/>
            <section>
                {/* {map through all the single reviews pulled in} */}
                <ul>holding section for all the reviews that come back</ul>
                <SingleReview reviews={reviews}/>
            </section>
        </main>
    )
}