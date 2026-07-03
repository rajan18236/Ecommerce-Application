import React from 'react'
import HeroSection from '../components/Herosection'
import CategorySection from '../components/CategorySection'
import FeaturedProudcts from '../components/FeaturedProducts'

const Home = () => {
  return (
    <div>
       <HeroSection />
       <CategorySection />
       <FeaturedProudcts />
    </div>
  )
}

export default Home