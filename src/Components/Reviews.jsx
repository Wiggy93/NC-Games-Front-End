import { useEffect, useState } from 'react';
import {ReviewQueries} from './ReviewQueries';
import {getReviews } from '../Utils/api';
import {ReviewVotes} from './ReviewVotes';
import {Link} from 'react-router-dom'

import styles from '../CSS/Reviews.module.css'
import { dateConverter } from '../Utils/utils';


export const Reviews = ({categories, setCategories}) => {
    const [reviews, setReviews] = useState([])
    const [voteCount, setVoteCount] = useState({}); 
    const [isLoading, setIsLoading] = useState(true);

    

    useEffect(()=>{
        getReviews().then((data)=>{
            setReviews(data.reviews);
            setIsLoading(false)
        })
    },[])

    if(isLoading) return <p>Loading results...</p>
    
    return (
    <main>
        <ReviewQueries setReviews={setReviews} setCategories={setCategories}/>
        <ul className={styles.reviewsBox}>
                {reviews.map((review)=>{
                return (
                    <Link to={`/reviews/${review.review_id}`} style={{textDecoration: 'none'}} key={review.review_id}>
                    <article className={styles.singleReviewBox}>
                        <h2>{review.title}</h2>
                        <h3>{review.owner}</h3>
                        <p>{dateConverter(review.created_at)}</p>
                        <p className={styles.singleReviewBody}>{review.review_body}</p>
                        <p>Votes: {review.votes}</p>
                        <ReviewVotes voteCount={voteCount} setVoteCount={setVoteCount}/>
                        <p>Number of Comments: {review.comment_count}</p>
                    </article>
                    </Link>
                    )
                })}
            </ul>
            
            
        
    </main>
    )
}