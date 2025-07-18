import React from 'react'
import Hero from '../components/Hero'
import FeaturedPost from '../components/FeaturedPost'
import RecentPosts from '../components/RecentPosts'

const Home = () => {
  return (
    <main>
      <Hero />
      <section className='py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <FeaturedPost />
        <RecentPosts />
      </section>
    </main>
  )
}

export default Home
