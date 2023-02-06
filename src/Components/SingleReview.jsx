import {ReviewVotes} from './ReviewVotes';
import { CommentTotal } from './CommentTotal';
import { Comments } from './Comments';
import { useState } from 'react';
import {Routes, Route} from 'react-router-dom'


export const SingleReview = (reviews) => {
    const [currentReview, setCurrentReview] = useState([]);
    const [voteCount, setVoteCount] = useState({}); 
    const [commentCount, setCommentCount] = useState("");
    const [comments, setComments] = useState([]);   

    //useEffect, on opening page run setCurrentReview to current reivw_id

    return (
        <section>
            <p>holder for each review data</p>
            <p>pull out title, review body, review owner, created at</p>
            <ReviewVotes voteCount={voteCount} setVoteCount={setVoteCount}/>
            <CommentTotal commentCount={commentCount} setCommentCount={setCommentCount}/>
            <Routes>
                <Route path='/reviews/:reviewid/comments' element={<Comments currentReview={currentReview} setCommentCount={setCommentCount} setComments={setComments}/>}>Go to all comments for this review id holder</Route>
            </Routes>
            
            

        </section>
    )
}


