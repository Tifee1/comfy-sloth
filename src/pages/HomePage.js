import React from 'react'
import Hero from '../components/Hero'
import { FeaturedProducts } from '../components/productsPage'
import { Services, Contact } from '../components'

const HomePage = () => {
  document.title = 'Comfy Sloth || HOME'
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  )
}

export default HomePage
