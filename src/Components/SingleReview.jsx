import { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom'
import { getReviewById } from '../Utils/api';

export const SingleReview = (currentReview) => {
   
    useEffect(()=>{
        getReviewById(currentReview).then(({data}) => {
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




