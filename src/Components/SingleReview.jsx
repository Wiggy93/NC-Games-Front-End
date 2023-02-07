import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getReviewById } from '../Utils/api';
import { dateConverter } from '../Utils/utils';
import { Comments } from './Comments';

export const SingleReview = ({currentReview, setCurrentReview}) => {
   const { reviewid } = useParams();
   const [newTime, setNewTime] = useState("")


    useEffect(()=>{
        getReviewById(+reviewid).then(({data}) => {
            return data.reviewObj[0];
        })
        .then((response)=>{
             console.log(response, "data.reviewObj");
            setCurrentReview(response)
            console.log(currentReview, "<<current review");
        })
        .then(()=>{
            const changeDateFormat = dateConverter(currentReview.created_at)
            setNewTime(changeDateFormat)
        })
        
    },[])
    
     return (
        <section>
          <br></br>
            <h2>{currentReview.title}</h2>
            <br></br>
            <h3>{currentReview.owner}</h3>
            <br></br>
            <p>{newTime}</p>
            <br></br>
            <p>{currentReview.review_body}</p>
          
            <Comments/>
            

        </section>
    )
    
    }
    //useEffect, on opening page run setCurrentReview to current reivw_id




