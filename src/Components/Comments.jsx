import {AddComment} from './AddComment';
import {RemoveComment} from './RemoveComment'
import { useParams } from 'react-router-dom';

export const Comments = (currentReview, setComments) => {
    const { reviewid } = useParams();
    
    


    return (
        <section>
            <div>
                {}
            </div>
            <p>holder for review body for that id</p>
            <p>holder for mapping through current comments</p>
            <RemoveComment/>
            <AddComment setComments={setComments}/>
        </section>
    )
}