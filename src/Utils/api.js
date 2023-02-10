import axios from 'axios'

const ncGamesAPI = axios.create({
    baseURL: "https://games-reviews-and-comments.onrender.com/api/"
})

export const getReviews = (category, sortBy, order) => {
    return ncGamesAPI.get('/reviews', {
        params: {
            category: category,
            sort_by: sortBy,
            order: order
        }
    }).then(({data})=>{return data})
}

export const getReviewById = (review_id) => {
    return ncGamesAPI.get(`/reviews/${review_id}`).then((data)=> {return data})
}

export const getCommentsById = (review_id) => {
    return ncGamesAPI.get(`/reviews/${review_id}/comments`).then(({data})=>{
        return data
    })
}

export const updateVotes = (review_id, voteIncrement) => {
    return ncGamesAPI.patch(`/reviews/${review_id}`, {inc_votes: `${voteIncrement}`})
        .then(({data})=>{return data})
}

export const updateCommentVotes = (comment_id, voteIncrement) => {
    return ncGamesAPI.patch(`/comments/${comment_id}`, {inc_votes: `${voteIncrement}`})
        .then(({data})=>{return data})
}

export const getCategories = () => {
    return ncGamesAPI.get('/categories').then(({data})=>{return data})
}

export const postComment = (review_id, commentBody) => {
    return ncGamesAPI.post(`reviews/${review_id}/comments`, commentBody)
        .then(({data})=>{return data})
}