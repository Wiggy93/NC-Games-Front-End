import { useEffect, useState } from 'react';
import {ReviewQueries} from './ReviewQueries';
import {getReviews, updateVotes } from '../Utils/api';
import {Link, useNavigate, useSearchParams} from 'react-router-dom'

import styles from '../CSS/Reviews.module.css'
import { dateConverter } from '../Utils/utils';


export const Reviews = ({categories, setCategories}) => {
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({display: "none"})
    let [searchParams, setSearchParams] = useSearchParams();
    const [resetFilters, setResetFilters] = useState(false)
   
    const navigate = useNavigate();

    let categoryQuery = searchParams.get("category")


    useEffect(()=>{
        setIsLoading(true);
        if (resetFilters === true) {
            categoryQuery = undefined;
        }
        getReviews(categoryQuery)     
        .then((data)=>{
            setReviews(data.reviews);
            setIsLoading(false);
        })
    },[resetFilters])

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setResetFilters(true)
        getReviews()
        .then((data)=>{
            setReviews(data.reviews);
            setIsLoading(false);
            setResetFilters(false)
        })
        .then(()=>{
            navigate('/reviews')
        })
    }
  

    if(isLoading) return <p>Loading results...</p>

    const updateVoteButton = (review_id, e) =>{
        setReviews((currentReviews)=>{
            return currentReviews.map((review)=>{
                if (review.review_id === review_id) {
                    return {...review, votes: review.votes + Number(e)}
                }
                return review
            })
        })
        setErrorMessage({display: "none"})
        updateVotes(review_id, Number(e))
        .catch((err)=>{
            console.log(err);
            setReviews((currentReviews)=>{
                return currentReviews.map((review)=>{
                    if (review.review_id === review_id) {
                        return {...review, votes: review.votes - Number(e)}
                    }
                    return review
                })
            })
            setErrorMessage({display: "block" })
        })
    }
    
    return (
    <main>
        <ReviewQueries setReviews={setReviews} setCategories={setCategories} categories={categories}/>
        <Link to={'/reviews/'}>
            <h2 onClick={handleSubmit}>Clear filters</h2>
        </Link>
        <ul className={styles.reviewsBox}>
                {reviews.map((review)=>{
                return (
                    <div key={review.review_id} className={styles.singleReviewBox} >

                    <Link 
                    to={`/reviews/${review.review_id}`} 
                    style={{textDecoration: 'none'}}
                   
                    >
                    <article >
                        <h2>{review.title}</h2>
                        <h3>{review.owner}</h3>
                        <p>{dateConverter(review.created_at)}</p>
                        <h4>Category: {review.category}</h4>
                        <p>Game designer: {review.designer}</p>
                        <p className={styles.singleReviewBody}>{review.review_body}</p>
                        <p>Votes: {review.votes}</p>
                        <p>Number of Comments: {review.comment_count}</p>
                    </article>
                    </Link>
                    <button value={1} onClick={(e) => updateVoteButton(review.review_id, e.target.value)}>Vote: +1</button> 
                    {/* for accessibility put thumbs up/down for +1 or -1 */}
                    <button value={-1} onClick={(e) => updateVoteButton(review.review_id, e.target.value)}>Vote: -1</button>
                    
    
                    <p style={errorMessage}>Error updating review votes</p>
                    </div>
                    )
                })}
            </ul>
            
            
        
    </main>
    )
}