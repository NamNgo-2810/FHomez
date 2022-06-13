import React from 'react'
import Banner from '../components/Banner/Banner'
import Search from '../components/Search/Search'
import ProductList from './ProductList'

function Home() {
  return (
    <div className="col">      
        <Banner></Banner>
        <div className="row">
            <Search></Search>
            <ProductList></ProductList>
        </div>  
    </div>
  )
}

export default Home