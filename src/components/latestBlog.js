import React from "react";
import { Link } from "react-router-dom";
import images from "../images/myphoto.jpg";
import styles from "./latestblog.module.css";
const LatestBlog = ({ imageurl, title, id}) => {
  return (
    <div className={styles.latestPostdivv}>
      
      <Link to={`/blog/${id}`}>
       
        
          <img src={imageurl || images} alt="images" className={styles.image}/>
          <h1 className={styles.heading}>{title}</h1>
        
      </Link>
    </div>
  );
};

export default LatestBlog;
