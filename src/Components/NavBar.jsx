import {NavLink} from 'react-router-dom'
import styles from '../CSS/NavBar.module.css'

export const NavBar = () => {
    return (
        <nav>
            <NavLink to="/categories" className={styles.link}>Categories</NavLink>
            <NavLink to="/users" className={styles.link}>Users</NavLink>
            <NavLink to="/reviews" className={styles.link}>All Reviews</NavLink>

        </nav>
    )
}