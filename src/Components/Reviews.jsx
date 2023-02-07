import { useEffect, useState } from 'react';
import {ReviewQueries} from './ReviewQueries';
import {getReviews } from '../Utils/api';
import {ReviewVotes} from './ReviewVotes';
import {Link} from 'react-router-dom'

import styles from '../CSS/Reviews.module.css'


export const Reviews = (categories, setCategories) => {
    const [reviews, setReviews] = useState([])
    const [voteCount, setVoteCount] = useState({}); 

    

    useEffect(()=>{
        getReviews().then((data)=>{
            setReviews(data.reviews)
        })
    },[])

    //working on in next branch for getting single review page up and running
    const onClick = (e) => {
        //got up to with attempting to make buttong for going to single review.
        console.log(e);
        // setCurrentReview()
    }

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
                            <p>{review.created_at}</p>
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