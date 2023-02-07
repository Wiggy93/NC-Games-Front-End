import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getReviewById } from '../Utils/api';
import { dateConverter } from '../Utils/utils';
import { Comments } from './Comments';

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
        console.log(changeDateFormat, "changeformate in review");
        setNewTime(changeDateFormat)
        setIsLoading(false)
    },[currentReview])

    if(isLoading) return <p>Loading results...</p>

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




