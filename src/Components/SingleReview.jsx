import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getReviewById } from '../Utils/api';
import { dateConverter } from '../Utils/utils';
import { Comments } from './Comments';
import styles from '../CSS/SingleReview.module.css'

export const SingleReview = ({currentReview, setCurrentReview}) => {
   const { reviewid } = useParams();
   const [newTime, setNewTime] = useState("")
   const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        getReviewById(+reviewid)
        .then(({data}) => setCurrentReview(data.reviewObj[0]))
    },[])
    
    useEffect(()=>{
        const changeDateFormat = dateConverter(currentReview.created_at)
        setNewTime(changeDateFormat)
        setIsLoading(false)
    },[currentReview])

    if(isLoading) return <p>Loading results...</p>

     return (
        <div>

        <section className={styles.reviewcard}>
            <h2 id={styles.title} className={styles.gridItem}>{currentReview.title}</h2>
            <h3 id={styles.username} className={styles.gridItem}>{currentReview.owner}</h3>
            <p id={styles.timeOfPost} className={styles.gridItem}>{newTime}</p>
            <img src={currentReview.review_img_url} alt={`The game ${currentReview.title}`} className={styles.gridItem}></img>

            <p id={styles.body} className={styles.gridItem}>{currentReview.review_body} </p>
           
           <Comments id={styles.comments} className={styles.gridItem} />
           
        </section>
          
            

        </div>
    )
    
    }