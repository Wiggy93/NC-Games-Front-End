import { useEffect , useState} from "react";
import { getCategories } from "../Utils/api";
import { ErrorPage } from "./ErrorPage";
import styles from '../CSS/ReviewQueries.module.css'

export const ReviewQueries = ({setCategories, categories, setSortBy, setCategory, setOrderBy}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(null)
    
    useEffect(()=>{
        setIsLoading(true);
        getCategories().then((data)=>{
            setCategories(data.categories)
            setIsLoading(false);
        })
        .catch((err)=>{
            console.log(err);
            setErr(err);
            setIsLoading(false);
        })
    },[])

    

    if(isLoading) return <p>Loading Filter Options</p>

    if (err) {
        return (
        <div >
            <ErrorPage err={err}/>
        </div>
        )
    }

    return (
        <section className={styles.querySection}>
            <form >
                <select
                    name="select-category"
                    onChange={(e)=> {
                        setCategory(e.target.value)
                        
                    }}>
                    <option defaultValue="">Select a Game Category</option>
                    {categories.map((dropdownOption)=>{
                        return <option key={dropdownOption.slug} value={dropdownOption.slug}>{dropdownOption.slug}</option>
                    })}
                </select>
                
                <br></br>
                <br></br>
                
                <select
                    name="select-sort"
                    onChange={(e) => setSortBy(e.target.value)}
                    >
                    <option defaultValue="">Sort by</option>
                    <option value="created_at">Date posted</option>
                    <option value="votes">Review Votes</option>
                    <option value="owner">Username</option>
                    <option value="designer">Game Designer</option>
                    {/* <option value="commentCount">Number of Comments</option>   */}
                    {/* if sorting by comment, either change backend or do sorting of array in frontend */}
                </select>
                <br></br>
                <br></br>
                <select onChange={(e) => setOrderBy(e.target.value)}>
                    <option defaultValue="desc">Sort in Descending Order</option>
                    <option value="asc">Sort in Ascending Order</option>
                </select>
            </form>
        </section>
    )
}