import React from 'react'
import {Link} from "react-router-dom"
import styles from './blogshower.module.css'
import images from "../images/myphoto.jpg"

const Blogshower = ({title,description,imageurl,category,excerpt,id,handleDelete}) => {
  return (
    
      <div className={styles.fullpanel} >
        
        <span className={styles.conatainer}>
          <img src={imageurl || images} alt={"gdfg"} className={styles.images}/>
          </span>    
       
       
            <h5 className={styles.titlepanel}>{title}</h5>
      

       
          <p className={styles.descriptionpanel} style={{overflowWrap: "break-word",wordBreak: "break-all"}}>{excerpt(description)} </p>
          <Link to={`/blog/${id}`}><p className={styles.readmepanel}>ReadMore</p></Link>
         
       

        
            <p className={styles.categorypanel}>{category}</p>
       

        
            <Link to={`/editblog/${id}`} ><button className={styles.edittag}> Edit </button></Link>
        
          <button onClick={()=>handleDelete(id)} className={styles.deletebtn}>Delete</button>
        
        </div>
   
  )
}

export default Blogshower