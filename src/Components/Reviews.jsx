import { useEffect, useState } from 'react';
import {Routes, Route, Link } from 'react-router-dom';
import {ReviewQueries} from './ReviewQueries';
import {SingleReview} from './SingleReview';
import { getReviewById, getReviews } from '../Utils/api';
import {ReviewVotes} from './ReviewVotes';
import { CommentTotal } from './CommentTotal';
import { Comments } from './Comments';

import styles from '../CSS/Reviews.module.css'


export const Reviews = (categories, setCategories) => {
    const [reviews, setReviews] = useState([])
    const [voteCount, setVoteCount] = useState({}); 
    const [commentCount, setCommentCount] = useState("");
    const [currentReview, setCurrentReview] = useState([]);
    const [comments, setComments] = useState([]); 
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
                        <Link to={`/reviews/${review.review_id}`}  key={review.review_id}>
                            <article className={styles.singleReviewBox}>
                                    <h2>{review.title}</h2>
                                    <h3>{review.owner}</h3>
                                    <p>{review.created_at}</p>
                                    <p className={styles.singleReviewBody}>{review.review_body}</p>
                                    <p>Votes: {review.votes}</p>
                                    <ReviewVotes voteCount={voteCount} setVoteCount={setVoteCount}/>
                                    <p>Number of Comments: {review.comment_count}</p>
                                    <CommentTotal commentCount={commentCount} setCommentCount={setCommentCount}/>
                                    <Routes>
                                        <Route path='/reviews/:reviewid/comments' element={<Comments currentReview={currentReview} setCommentCount={setCommentCount} setComments={setComments}/>}>Go to all comments for this review id holder</Route>
                                    </Routes>
                                </article>
                                </Link>
                        )
                    })}
                </ul>
                
              
            
        </main>
    )
}