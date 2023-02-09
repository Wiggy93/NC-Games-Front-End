import { useEffect, useState } from 'react';
import {ReviewQueries} from './ReviewQueries';
import {getReviews, updateVotes } from '../Utils/api';
import {Link} from 'react-router-dom'

import styles from '../CSS/Reviews.module.css'
import { dateConverter } from '../Utils/utils';


export const Reviews = ({categories, setCategories, searchCategory, setSearchCategory}) => {
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({display: "none"})

    

    useEffect(()=>{
       getReviews(searchCategory)
      
        .then((data)=>{
            setReviews(data.reviews);
            setIsLoading(false);
            setSearchCategory(undefined)
        })
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        getReviews()
        .then((data)=>{
            setReviews(data.reviews);
            setIsLoading(false);
            setSearchCategory(undefined)
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
        <ReviewQueries setReviews={setReviews} setCategories={setCategories}/>
        <button onClick={handleSubmit}>Clear filters</button>
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