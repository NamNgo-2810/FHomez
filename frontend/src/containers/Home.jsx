import React from 'react'
import Header from '../components/Header/Header'
import Banner from '../components/Banner/Banner'
import Footer from '../components/Footer/Footer'

function Home() {
  return (
    <div className="container-fluid">
        <Header></Header>
        <Banner></Banner>
        <Footer></Footer>        
    </div>
  )
}

export default Home