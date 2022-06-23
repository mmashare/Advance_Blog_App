import React from 'react'
import styles from "./header.module.css"
import {NavLink} from "react-router-dom"
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <div className={styles.divcontainer}>
      {/* if link tag don't work work properly means because we give position absolute htat's why */}
         <Link to={"/"}><h3 className={styles.logo}>Logo</h3></Link>
         {/* <Link to={"/"} className={styles.logo}>fgf</Link> */}
           <ul className={styles.ullist}>
                
                
                    <NavLink to="/" className={styles.home}>
                            Home
                    </NavLink>
                
                <NavLink to="/addblog" className={styles.addblog}>
                            AddBlog
                </NavLink>
                
                    <NavLink to="/about" className={styles.about}>
                        About
                    </NavLink>
                
            </ul>
        
    </div>
  )
}

export default Header