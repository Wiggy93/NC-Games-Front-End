import {AddComment} from './AddComment';
import {RemoveComment} from './RemoveComment'
import { getCommentsById } from '../Utils/api';
import { dateConverter } from '../Utils/utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

export const Comments = ({currentReview, setCommentCount}) => {
    const { reviewid } = useParams();
    const [allComments, setAllComments] = useState([]);
    
  

    useEffect(()=>{
        getCommentsById(reviewid).then((data)=>{
            setAllComments(data.comments)
            console.log(data.comments, "<<<comments");
        })
    },[])
    

    return (
        <section>
            <ol>
                {allComments.map((comment)=>{
                    return (
                        <li>
                            <p>{comment.author}</p>
                            <p>{dateConverter(comment.created_at)}</p>
                            <p>{comment.body}</p>
                        </li>
                    )
                })}
            </ol>
            <RemoveComment allComments={allComments}/>
            <AddComment setAllComments={setAllComments} allComments={allComments} setCommentCount={setCommentCount}/>
        </section>
    )
}