import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCategories } from "../Utils/api"
import styles from "../CSS/Categories.module.css"

export const Categories = ({categories, setCategories, setSearchCategory, searchCategory}) => {
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(()=>{
        setIsLoading(true);
        getCategories().then((data)=>{
            setCategories(data.categories)
            setIsLoading(false);
        })
    },[])

    if(isLoading) return <p>Loading categories...</p>

    return (
        <section className={styles.section}>
            <h2>Game Categories</h2>
            <div className={styles.categoriesBox}>
                {categories.map((category)=>{
                    return (
                        <Link 
                        className={styles.singleCategory} 
                        key={category.slug} 
                        to={`/reviews/`}
                        onClick={()=>{
                            setSearchCategory(category.slug)
                        }}
                        >
                            <h3>{category.slug} games</h3>
                            <br></br>
                            <p>{category.description}</p>
                        </Link>
                        
                    )   
                })}
            </div>
        </section>
    )
}