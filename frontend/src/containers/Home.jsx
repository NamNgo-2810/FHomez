import React from 'react'
import Header from '../components/Header/Header'
import Banner from '../components/Banner/Banner'
import Footer from '../components/Footer/Footer'
import Search from '../components/Search/Search'
import ProductList from './ProductList'

function Home() {
  return (
    <div className="container-fluid">
        <Header></Header>
        <Banner></Banner>
        <div className="row">
            <Search></Search>
            <ProductList></ProductList>
        </div>
        <Footer></Footer>   
    </div>
  )
}

export default Home