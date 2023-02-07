import {AddComment} from './AddComment';
import {RemoveComment} from './RemoveComment'
import { useParams } from 'react-router-dom';

export const Comments = (currentReview, setComments) => {
    const { reviewid } = useParams();
    
    


    return (
        <section>
            <p>holder for mapping through current comments</p>
            <RemoveComment/>
            <AddComment setComments={setComments}/>
        </section>
    )
}