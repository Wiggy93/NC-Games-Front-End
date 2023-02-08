import {AddComment} from './AddComment';
import {RemoveComment} from './RemoveComment'
import { getCommentsById } from '../Utils/api';
import { dateConverter } from '../Utils/utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import styles from '../CSS/Comments.module.css'

export const Comments = ({currentReview, setCommentCount}) => {
    const { reviewid } = useParams();
    const [allComments, setAllComments] = useState([]);
    
  

    useEffect(()=>{
        getCommentsById(reviewid).then((data)=>{
            setAllComments(data.comments)
        })
    },[])
    

    return (
        <section >
            <div className='ol'>
                {allComments.map((comment)=>{
                    return (
                        <article className={styles.commentBox} key={comment.comment_id}>
                            <p>Written by {comment.author} on {dateConverter(comment.created_at)}</p>
                            <br></br>
                            <p>{comment.body}</p>
                        </article>
                    )
                })}
            </div>
            <RemoveComment allComments={allComments}/>
            <AddComment setAllComments={setAllComments} allComments={allComments} setCommentCount={setCommentCount}/>
        </section>
    )
}