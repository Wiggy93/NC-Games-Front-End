import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getReviewById } from '../Utils/api';
import { Comments } from './Comments';

export const SingleReview = (currentReview, setCurrentReview) => {
   const { reviewid } = useParams();

    useEffect(()=>{
        getReviewById(+reviewid).then(({data}) => {
            return data.reviewObj[0];
         })
         .then((response)=>{
            
         })
        },[])
    
    return (
        <section>
           
            <p>singel review page</p>
            <Comments/>
            

        </section>
    )
    
    }
    //useEffect, on opening page run setCurrentReview to current reivw_id




