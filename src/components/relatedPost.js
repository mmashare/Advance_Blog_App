import React from 'react'
import {Link} from "react-router-dom"
import styles from './ralatedpost.module.css'
import images from "../images/myphoto.jpg";

const RelatedPost = ({title,description,imageurl,id,excert,date}) => {
  return (
    <div className={styles.container}>
      <span  className={styles.maincardofrelatedpost}>
               <Link to={`/blog/${id}`}><img src={imageurl || images} alt="images" className={styles.imagess}/></Link>
               </span> 
               <h3 className={styles.titles}>{title}</h3>
               <p className={styles.dates}>{date}</p>
               <p className={styles.descriptions}>{excert(description)}</p>
              
                 

    </div>
  )
}

export default RelatedPost