import axios from 'axios'

const ncGamesAPI = axios.create({
    baseURL: "https://games-reviews-and-comments.onrender.com/api/"
})

export const getReviews = () => {
    return ncGamesAPI.get('/reviews').then(({data})=>{return data})
}

export const getReviewById = (review_id) => {
    return ncGamesAPI.get(`/reviews/${review_id}`).then(({data})=> {return data})
}