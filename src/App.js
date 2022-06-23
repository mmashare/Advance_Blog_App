import styles from "./App.module.css"
import Home from "./pages/home"
import EditBlog from "./pages/blogedit"
import About from "./pages/about"
import NotFound from "./pages/notfound"
import Blogs from "./pages/blogs"
import Header from "./components/header"

import {BrowserRouter,Route,Routes} from "react-router-dom"

function App() {
  return (
    <div>
    <BrowserRouter>
    <Header />
      <div  >
          <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/addblog" element={<EditBlog/>} />
                <Route path="/editblog/:id" element={<EditBlog/>} />
                <Route path="/blog/:id" element={<Blogs/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="*" element={<NotFound/>}/>
                
                
          </Routes>
      </div>
    </BrowserRouter>
    </div>
    );
}

export default App;
