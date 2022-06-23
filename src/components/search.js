import React from 'react'
import styles from './search.module.css'
const Search = ({searchValue,onInputChange,handleSearch,reset}) => {
  return (
    <div className={styles.container}>
        <form onSubmit={handleSearch}>
            <input type="search"  value={searchValue} onChange={onInputChange} className={styles.inputt}/>
        <button className={styles.btn}>Search</button>
        <button onClick={reset} className={styles.resetbtn}>Reset</button>
        </form>
      
    </div>
  )
}

export default Search