import { useEffect , useState} from "react";
import { getCategories } from "../Utils/api";

export const ReviewQueries = ({setReviews, setCategories, categories}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState("created_at");
    const [orderBy, setOrderBy] = useState("desc")
    //local states for sortby and order
    //set filter as


    useEffect(()=>{
        setIsLoading(true);
        getCategories().then((data)=>{
            setCategories(data.categories)
            setIsLoading(false);
        })
    },[])

    const filterCategory = (event) =>{

    }

    const sortBy = (event) => {

    }

    const orderBy = (event) => {
        
    }

    return (
        <section>
            <form>
                <select
                    name="select-category"
                    onChange={filterCategory}
                >
                    <option defaultValue="">Select a Game Category</option>
                    {categories.map((dropdownOption)=>{
                        return <option key={dropdownOption.slug}>{dropdownOption.slug}</option>
                    })}
                </select>
                <br></br>
                <select
                    name="select-sort"
                    onChange={(e) => }
                    >
                    <option defaultValue="">Sort by</option>
                    <option value="created_at">Date posted</option>
                    <option value="votes">Review Votes</option>
                    <option value=""></option>
                </select>
            </form>
            <p>holder for multiple dropdowns</p>
        </section>
    )
}