import React from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import images from "../images/myphoto.jpg";
import styles from "./blogs.module.css";
import RelatedPost from "../components/relatedPost"

const Blogs = () => {
  const [blog, setBlog] = useState({});
  const [relatedPost,setRelatedPost] = useState([])
  

  const { id } = useParams();
    // don't be confuse because when you go to this route=/blog/${id} and it show blog component as we mention it in routing at app.js page 
  useEffect(() => {
    if (id) {
      getSingleblog(id);
      
    }
  }, [id]);

  const excert = (str)=>{
      if (str.length > 60){
          str = str.substring(0,60) + "..."
      }
      return str
  }

  const getSingleblog = async (id) => {
    const response = await axios.get(`http://localhost:5000/blogs/${id}`);
    const SamePost = await axios.get(`http://localhost:5000/blogs?category=${response.data.category}&_start=0`)
    if (response.status === 200 || relatedPost === 200) {

      console.log(response.data);
      console.log(SamePost.data)
      setRelatedPost(SamePost.data)
      setBlog(response.data);
    } else {
      window.alert("something went wrong");
    }
  };

 

  return (
    <div className={styles.container}>
       <img
        src={(blog && blog.imageurl) || images}
        alt="nope"
        className={styles.imagess}
      />
      <h1 className={styles.heading}>{blog && blog.title}</h1>
      <p className={styles.categoryy}>{blog && blog.category}</p>
      <p className={styles.datee}>{blog && blog.date}</p>
      <h4 className={styles.descriptions}>{blog && blog.description}</h4>
     
      
     
      
      
      
        {relatedPost && relatedPost.length > 0 && (
            <div className={styles.relatedpostdiv}>
            {relatedPost.length > 1?<h1 className={styles.raledPosttitle}>Related Post</h1>:""}
            <div className={styles.uppermaindiv}>
              {relatedPost.filter((item)=>item.id != id).slice(0,3).map((item,index)=>( 
                
               <RelatedPost 
               {...item}
               key={index}
               excert={excert}
              
               />
               
              
              
              ))}
               </div>
           
            </div>
        )}
      
    </div>
  );
};

export default Blogs;
