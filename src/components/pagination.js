import React from 'react'

const Pagination = ({currentPage,pagelimit,loadBlogsData,data,totalBlog}) => {
    const renderPagination = ()=>{
        if((currentPage===0 && data.length < 5) || (totalBlog===pagelimit && currentPage===0))return null
        if(currentPage===0){
                return(
                    <div>
                        <p>1</p>
                        <button onClick={()=> loadBlogsData(5,10,1)}>Next</button>
                    </div>
                )
                //&& (
        }else if(currentPage < pagelimit -1 && data.length === pagelimit &&(totalBlog-data.length) !== pagelimit ){
            console.log("else if")
                return (<div>
                    
                    <button onClick={()=>loadBlogsData((currentPage -1)*5,currentPage*5,-1)}>Prev</button>
                    <p>{currentPage+1}</p>
                    <button onClick={()=>loadBlogsData((currentPage +1)*5,(currentPage+2)*5,1)}>Next</button>
                </div>)
        }else {
            console.log("else")
            return (<div>
                <button onClick={()=>loadBlogsData((currentPage -1)*5,currentPage*5,-1)}>Prev</button>
                <p>{currentPage+1}</p>
            </div>)
        }
    }
  return (
    <div>
            {renderPagination()}
    </div>
  )
}

export default Pagination