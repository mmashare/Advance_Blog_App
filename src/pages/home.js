import axios from "axios";
import React, { useState, useEffect } from "react";
import Blogshower from "../components/blogshower";
import styles from "./home.module.css";
import Search from "../components/search";
import Categoryopt from "../components/categoryopt";
import LatestBlog from "../components/latestBlog";
import Pagination from "../components/pagination";

const Home = () => {
  const [Data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [latestBlog, setLatestBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalBlog, setTotalBlog] = useState(null);
  const [PageLimit, setPageLimit] = useState(5);
  const [toggle,setToggle] = useState(true)
  useEffect(() => {
    loadBlogsData(0, 5, 0);
    getLatestBlog();
  }, []);

  const option = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];
  const loadBlogsData = async (start, end, increase, operation) => {
    const totalblog = await axios.get("http://localhost:5000/blogs");
    setTotalBlog(totalblog.data.length);
    const response = await axios.get(
      `http://localhost:5000/blogs?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setData(response.data);
      if (operation === "delete") {
        setCurrentPage(0);
      } else {
        setCurrentPage(currentPage + increase);
      }
    } else {
      window.alert("something went wrong");
    }
  };

  console.log("data", Data);

  const handleDelete = async (id) => {
    if (window.confirm("Are You Sure To Delete It?")) {
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      if (response.status === 200) {
        window.alert("Your blog is suceesfully delete");
        // after deleting some stuff in our data we have to refetch the data from server.
        loadBlogsData(0, 5, 0, "delete");
      } else {
        window.alert("something went wrong");
      }
    }
  };
  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 50) + "... ";
    }
    return str;
  };

  const onInputChange = (e) => {
    if (!e.target.value) {
      loadBlogsData(0, 5, 0);
    }
    setSearchValue(e.target.value);
  };


  const Reset = async (e) => {
    e.preventDefault();
    const responsess = await axios.get( "http://localhost:5000/blogs?_start=0&_end=5");
    if (responsess.status === 200) {
      setData(responsess.data);
      
    } else {
      window.alert("Not Reset");
    }
    setToggle(true)
    setCurrentPage(0);
    // loadBlogsData(0,5,0)
    
  }

  const HandleSearch = async (e) => {
    e.preventDefault();
    const responsess = await axios.get(
      `http://localhost:5000/blogs?q=${searchValue}`
    );
    if (responsess.status === 200) {
      setData(responsess.data);
      
    } else {
      window.alert("Not Found 🚫");
    }

    console.log(responsess);
  };
  const handleCategory = async (category) => {
    const response = await axios.get(
      `http://localhost:5000/blogs?category=${category}`
    );

    if (response.status === 200) {
      setData(response.data);
      setToggle(false)
    } else {
      window.alert("something went wrong");
    }
    console.log(response.data);
  };

  const getLatestBlog = async () => {
    const totalblog = await axios.get("http://localhost:5000/blogs");
    const start = totalblog.data.length - 3;
    const end = totalblog.data.length;

    const response = await axios.get(
      `http://localhost:5000/blogs?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setLatestBlog(response.data);
    } else {
      window.alert("Latest Blog Not Found");
    }
  };

  return (
    <div className={styles.fullcard}>
      <Search
        searchValue={searchValue}
        onInputChange={onInputChange}
        handleSearch={HandleSearch}
        reset={Reset}
      />
    

      <div>
        <Categoryopt options={option} handleCategory={handleCategory} />
      </div>

      
      <div className={styles.headingdiv}>
        <h2 className={styles.allpostheading}>All Posts</h2>
        {Data.length === 0 && <div><h1>Not Found!</h1></div>}
      </div>
      <div className={styles.maincard}>
        {Data &&
          Data.map((item, index) => (
            <Blogshower
              key={index}
              {...item}
              excerpt={excerpt}
              handleDelete={handleDelete}
            />
          ))}
      </div>
      <div>
        {toggle?<Pagination
          currentPage={currentPage}
          loadBlogsData={loadBlogsData}
          pagelimit={PageLimit}
          data={Data}
          totalBlog={totalBlog}
        />:""}
      </div>
      <div>
        <h2 className={styles.latestpostHeading}> Latest Blog</h2>
        <div className={styles.latestpostdiv}>
          {latestBlog &&
            latestBlog.map((item, index) => (
              <LatestBlog key={index} {...item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
