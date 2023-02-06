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

    useEffect(()=>{
        getReviews().then((data)=>{
            setReviews(data.reviews)
        })
    },[])

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
                            <article className={styles.singleReviewBox} key={review.review_id}>
                                <Link to={`/reviews/${review.review_id}`}>
                                <button onClick={(e) => {
                                    setCurrentReview(review.review_id).then(()=>{
                                        return <SingleReview currentReview={currentReview}/>

                                    })
                                    
                                    }}>
                                    <h2>{review.title}</h2>
                                </button>
                                
                                </Link>

                                <h3>{review.owner}</h3>
                                <p>{review.created_at}</p>
                                <p className={styles.singleReviewBody}>{review.review_body}</p>
                                <ReviewVotes voteCount={voteCount} setVoteCount={setVoteCount}/>
                                <CommentTotal commentCount={commentCount} setCommentCount={setCommentCount}/>
                                <Routes>
                                    <Route path='/reviews/:reviewid/comments' element={<Comments currentReview={currentReview} setCommentCount={setCommentCount} setComments={setComments}/>}>Go to all comments for this review id holder</Route>
                                </Routes>
                            </article>
                        )
                    })}
                </ul>
                
              
            
        </main>
    )
}