import {AddComment} from './AddComment';
import {RemoveComment} from './RemoveComment'

export const Comments = (currentReview, setCommentCount, setComments) => {
    return (
        <section>
            <p>holder for mapping through current comments</p>
            <RemoveComment/>
            <AddComment setComments={setComments} setCommentCount={setCommentCount}/>
        </section>
    )
}