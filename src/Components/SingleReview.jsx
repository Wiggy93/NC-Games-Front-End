import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getReviewById } from '../Utils/api';

export const SingleReview = (currentReview) => {
   const { reviewid } = useParams();
   console.log(useParams, "usePArams");
   console.log(reviewid, "<<<game id 14 hopefully")

    useEffect(()=>{
        getReviewById(reviewid).then(({data}) => {
            console.log(data, "axios fetch data on review id");
            return data;
         })
        }
    ,[])
    
    return (
        <section>
           
            <p>singel review page</p>
            
            

        </section>
    )
    
    }
    //useEffect, on opening page run setCurrentReview to current reivw_id




