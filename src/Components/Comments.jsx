import {AddComment} from './AddComment';
import {RemoveComment} from './RemoveComment'

export const Comments = (currentReview, setCommentCount, setComments) => {
    return (
        <section>
            <p>holder for review body for that id</p>
            <p>holder for mapping through current comments</p>
            <RemoveComment/>
            <AddComment setComments={setComments} setCommentCount={setCommentCount}/>
        </section>
    )
}