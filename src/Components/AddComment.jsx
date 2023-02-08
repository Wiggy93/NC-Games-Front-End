import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../CSS/AddComment.module.css'

export const AddComment = ({setAllComments, allComments, currentUser, setCurrentUser}) => {
    const { reviewid } = useParams();

    const [postBody, setPostBody] = useState("")
    const [message, setMessage] = useState({
        author: currentUser,
        body: postBody,
        review_id: reviewid,
        // votes: allComments   //need to work on getting the right vote out of the right comment
      })

    const handleSubmit = () =>{

    }
    
    return (
    <section className={styles.postComment}>
        <h2>add comment to review in addcomment</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor='postBody'>Post Message: </label>
            <input 
            id="postBody" 
            value={postBody}
            onChange={(e)=>{setPostBody(e.target.value)}}
            ></input>
        </form>
    </section>
    )
}