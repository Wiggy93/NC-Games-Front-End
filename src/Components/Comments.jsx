import {AddComment} from './AddComment';
import {RemoveComment} from './RemoveComment'
import { getCommentsById, updateCommentVotes } from '../Utils/api';
import { dateConverter } from '../Utils/utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import styles from '../CSS/Comments.module.css'

export const Comments = ({currentUser, setCurrentUser}) => {
    const { reviewid } = useParams();
    const [allComments, setAllComments] = useState([]);
    const [errorMessage, setErrorMessage] = useState({display: "none"})
    const [isLoading, setIsLoading] = useState(true);
    
  

    useEffect(()=>{
        getCommentsById(reviewid).then((data)=>{
            setAllComments(data.comments);
            setIsLoading(false);
        })
    },[])
    
    const updateVoteButton = (comment_id, e) =>{
        setAllComments((currentComments)=>{
            return currentComments.map((comment)=>{
                if (comment.comment_id === comment_id) {
                    return {...comment, votes: comment.votes + Number(e)}
                }
                return comment
            })
        })
       
        setErrorMessage({display: "none"})
        updateCommentVotes(comment_id, Number(e))
        .catch((err)=>{
            console.log(err);
            setAllComments((currentComments)=>{
                return currentComments.map((comment)=>{
                    if (comment.comment_id === comment_id) {
                        return {...comment, votes: comment.votes - Number(e)}
                    }
                    return comment
                })
            })
            setErrorMessage({display: "block" })
        })
    }

    if(isLoading) return <p>Loading results...</p>

    return (
        <section >
            <div className='ol'>
                {allComments.map((comment)=>{
                    return (
                        <article className={styles.commentBox} key={comment.comment_id}>
                            <p>Written by {comment.author} on {dateConverter(comment.created_at)}</p>
                            <br></br>
                            <p>{comment.body}</p>
                            <p>Votes: {comment.votes}</p>
                            <button value={1} onClick={(e) => updateVoteButton(comment.comment_id, e.target.value)}>Vote: +1</button>
                            {/* for accessibility put thumbs up/down for +1 or -1 */}
                            <button value={-1} onClick={(e) => updateVoteButton(comment.comment_id, e.target.value)}>-Vote: -1</button>
                            <p style={errorMessage}>Error updating comment votes</p>
                        </article>
                    )
                })}
            </div>
            <AddComment className={styles.postComment} setAllComments={setAllComments} allComments={allComments} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            <RemoveComment allComments={allComments}/>
           
        </section>
    )
}