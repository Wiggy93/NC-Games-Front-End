import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';
import styles from '../CSS/AddComment.module.css'

export const AddComment = ({setAllComments, allComments, currentUser}) => {
    const { reviewid } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(null)
    const [postBody, setPostBody] = useState("")
    const [message, setMessage] = useState({
        author: currentUser,
        body: postBody,
        review_id: reviewid,
        // votes: allComments   //need to work on getting the right vote out of the right comment
      })

    const handleSubmit = () =>{

    }
    
    if(isLoading) return <p>Loading results...</p>

    if (err) {
        return <ErrorPage err={err}/>
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
            <button type="submit"></button>
        </form>
    </section>
    )
}