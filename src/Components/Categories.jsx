import { useEffect } from "react"
import { Link } from "react-router-dom"
import { getCategories } from "../Utils/api"
import styles from "../CSS/Categories.module.css"

export const Categories = ({categories, setCategories}) => {
    
    useEffect(()=>{
        getCategories().then((data)=>{
            setCategories(data.categories)
        })
    },[])

    return (
        <section>
            <h2>Game Categories</h2>
            <ul>
                {categories.map((category)=>{
                    return (
                        <Link key={category.slug} to={`/reviews/?category=${category.slug}`}>
                            <h3>{category.slug}</h3>
                            <br></br>
                            <p>{category.description}</p>
                        </Link>
                        
                    )   
                })}
            </ul>
        </section>
    )
}