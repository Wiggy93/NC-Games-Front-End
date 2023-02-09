import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getReviewById, updateVotes } from '../Utils/api';
import { dateConverter } from '../Utils/utils';
import { Comments } from './Comments';
import { ErrorPage } from './ErrorPage';

import styles from '../CSS/SingleReview.module.css'

export const SingleReview = ({currentReview, setCurrentReview, currentUser}) => {
   const { reviewid } = useParams();
   const [newTime, setNewTime] = useState("")
   const [err, setErr] = useState(null)
   const [isLoading, setIsLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState({display: "none"})

   useEffect(()=>{
    setIsLoading(true)
    getReviewById(+reviewid)
    .then(({data}) => {
        setCurrentReview(data.reviewObj[0])
        setIsLoading(false)
    })
    .catch((err)=>{
        console.log(err);
        setErr(err);
        setIsLoading(false);
    })
    },[currentReview])
    
    useEffect(()=>{
        const changeDateFormat = dateConverter(currentReview.created_at);
        setNewTime(changeDateFormat)
        setIsLoading(false)
    },[currentReview])

    const updateVoteButton = (review_id, e) =>{
      
        setCurrentReview((currentReview)=>{
            return currentReview.votes = currentReview.votes + Number(e)
               })
        
        setErrorMessage({display: "none"})
        updateVotes(review_id, Number(e))
        
        .catch((err)=>{
            console.log(err);
            setCurrentReview((review)=>{
                return currentReview.votes = currentReview.votes - Number(e)
                   })
                
            setErrorMessage({display: "block" })
                })
    }

    if(isLoading) return <p>Loading review...</p>

    if (err) {
        return <ErrorPage err={err}/>
    }

     return (
     
        <section className={styles.reviewcard}>
            <h2 id={styles.title} className={styles.gridItem}>{currentReview.title}</h2>
            <h3 id={styles.username} className={styles.gridItem}>{currentReview.owner}</h3>
            <p id={styles.timeOfPost} className={styles.gridItem}>{newTime}</p>
            <p id={styles.category} className={styles.gridItem}>Category: {currentReview.category}</p>
            <img src={currentReview.review_img_url} alt={`The game ${currentReview.title}`} className={styles.gridItem}></img>

            <p id={styles.body} className={styles.gridItem}>{currentReview.review_body} </p>
            <br></br>
            <p id={styles.votes} className={styles.gridItem} >Review Votes: {currentReview.votes}</p>
            
            <div id={styles.voteButtons}>
            <button  value={1} onClick={(e) => updateVoteButton(currentReview.review_id, e.target.value)}>Vote: +1</button> 
                    {/* for accessibility put thumbs up/down for +1 or -1 */}
            <button value={-1} onClick={(e) => updateVoteButton(currentReview.review_id, e.target.value)}>Vote: -1</button>
            </div>
            
                    
            <p style={errorMessage}>Error updating review votes</p>
           <Comments currentUser={currentUser}/>
        </section>
    )
}
