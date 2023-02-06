import axios from 'axios'

const ncGamesAPI = axios.create({
    baseURL: "https://games-reviews-and-comments.onrender.com/api/"
})

export const getReviews = () => {
    return ncGamesAPI.get('/reviews').then(({data})=>{
        return data
    })
}