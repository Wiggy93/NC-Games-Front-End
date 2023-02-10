import { useEffect , useState} from "react";
import { getCategories } from "../Utils/api";

export const ReviewQueries = ({setReviews, setCategories, categories}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState("")
    const [sortBy, setSortBy] = useState("");
    const [orderBy, setOrderBy] = useState("")
    //local states for sortby and order
    //set filter as


    useEffect(()=>{
        setIsLoading(true);
        getCategories().then((data)=>{
            setCategories(data.categories)
            setIsLoading(false);
        })
    },[])

    return (
        <section>
            <form>
                <select
                    name="select-category"
                    onChange={(e)=> setCategory(e.target.value)}>
                    <option defaultValue="">Select a Game Category</option>
                    {categories.map((dropdownOption)=>{
                        return <option key={dropdownOption.slug} value={dropdownOption.slug}>{dropdownOption.slug}</option>
                    })}
                </select>
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
                    {/* <option value="commentCount"></option>  need to adjust API to allow for commentCount - or build into frontend*/}
                </select>
                <div>
                    <input 
                    type="checkbox" 
                    name="orderToggleSwitch"
                    id="toggleSwitch"
                    />
                    <label htmlFor="toggleSwitch">
                        <span className="toggleSwitchAsc"></span>
                        <span className="toggleSwitchDesc"></span>
                    </label>
                    
                </div>
            </form>
            <p>holder for multiple dropdowns</p>
        </section>
    )
}