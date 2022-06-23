import React, { useState } from "react";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate,useParams } from "react-router-dom";
import styles from "./blogedit.module.css";
import "react-toastify/ReactToastify.css";
import { useEffect } from "react";

//yu0ptdft

const initialState = {
  title: "",
  description: "",
  category: "",
  imageurl: "",
};
const categoryOption = [
  "Travel",
  "Fashion",
  "Fitness",
  "Sports",
  "Food",
  "Tech",
];

const Blogedit = () => {
  const navigate = useNavigate();
  
  const [fromValue, setFormvalue] = useState("");
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const [showEditBlog,setShowEditBlog] = useState(false);
  const { title, description, category, imageurl } = fromValue;
  const {id} = useParams();
  
  useEffect(()=>{
      if(id){
          setShowEditBlog(true)
          getSingleBlog(id)
      }else{
          setShowEditBlog(false)
          getSingleBlog({...initialState})
      }
  },[id])

  const getSingleBlog = async (id)=>{
        const singleblog = await axios.get(`http://localhost:5000/blogs/${id}`)
        console.log(singleblog)
        if(singleblog.status===200){
            setFormvalue({...singleblog.data})
        }else{
          window.alert("somethings went wrong")
        }

  }
  
  
  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };

  


  const handleSummit = async (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryErrMsg("Please Select A Category");
    }
    if(!showEditBlog){
      const imageValidation = !showEditBlog?imageurl:true;
      // basicaly ham yaha par ye bol rahe hai ki ager ham apni post ko edit nhi kar rahe hai to ham imageurl provide karege if else block ke ander 
      // otherwise ager ham blog create kar rahe hai to ham image url if else block me provide karege.
      // and another greate explination dege ki default me hamne showEditBlog state ki value false it's means ham blog create karna chate hai not edit(same logic upper likha hai)
      if (title && description && category) {
        const currentData = getDate();
        const UpdateBlogData = { ...fromValue, date: currentData };
        const response = await axios.post(
          "http://localhost:5000/blogs",
          UpdateBlogData
        );
        console.log(response);
        if (response.status === 201) {
          window.alert("blog created sucessfully")
           
           
          
        } else {
          window.alert("something went wrong ")
        }
        
      }
    }else{
      const response = await axios.put(
        `http://localhost:5000/blogs/${id}`,
        fromValue
      );
      console.log(response);
      if (response.status === 200) {
        window.alert("blog Updated sucessfully")
         
         
        
      } else {
        window.alert("something went wrong ")
      }

    }
    // in both condition editBlog or UpdateBlog we should remove the formValue to empty and send the user to home page
    setFormvalue({ title: "", description: "", category: "", imageurl: "" });
        navigate("/");
    
  };

  const inputdescription = (e) => {
    let valuedescription = e.target.value;
    setFormvalue({ ...fromValue, description: valuedescription });
  };

  const Inputtitle = (e) => {
    let valuetitle = e.target.value;
    setFormvalue({ ...fromValue, title: valuetitle });
  };

  const UploadImages = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "yu0ptdft");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/himanshuthakur/image/upload",
        formData
      )
      .then((res) => {
        toast.info("Image Uploaded Successfully");
        setFormvalue({ ...fromValue, imageurl: res.data.url });
        console.log(res);
      })
      .catch((err) => {
        window.alert("something that wrong");
      });
  };

  const OnChangeCategory = (e) => {
    setCategoryErrMsg(null);

    setFormvalue({ ...fromValue, category: e.target.value });
  };

  return (
    <div className={styles.fulldiv}>
     
      <form onSubmit={handleSummit}>

        <h1 className={styles.heading}>{showEditBlog?"Edit Your Blog":"Add A New Blog🥑"}</h1>
        <br />
        <input
          type="text"
          placeholder="Title"
          className={styles.title}
          value={title}
          onChange={Inputtitle}
          required
        />

        <br />
        <textarea
          type="text"
          placeholder="Body"
          value={description}
          className={styles.textArea}
          onChange={inputdescription}
          required
          cols="30"
          rows="10"
        ></textarea>

        <br />
        {!showEditBlog&&(<input
          type="file"
          onChange={(e) => UploadImages(e.target.files[0])}
          className={styles.files}
        />)}
        <br />

        <select
          value={category}
          onChange={OnChangeCategory}
          className={styles.option}
        >
          <option value="">Pls Select A Category</option>

          {categoryOption.map((opt, index) => (
            <option key={index} value={opt || ""}>
              {opt}
            </option>
          ))}
        </select>
        <br />
        {categoryErrMsg && (
          <div className={styles.categorymessage}>{categoryErrMsg}</div>
        )}

        <br />
        <button
          className={styles.uploadbtn}
          type="submit"
          onClick={handleSummit}
        >
          Upload
        </button>

        <button className={styles.gobackbtn} onClick={() => navigate("/")}>
          Go Back!
        </button>
      </form>
      
     
    </div>
  );
};

export default Blogedit;
