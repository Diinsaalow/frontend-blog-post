import { Link } from 'react-router-dom'
import FeaturedBlogCard from '../components/FeaturedBlogCard'
import BlogCard from '../components/BlogCard'
import { Button } from '../components/ui/button'
import { cn } from '../lib/utils'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useEffect } from 'react'
import FeaturedPost from './FeaturedPost'
import RecentPosts from './RecentPosts'

const Hero = () => {
  const [animatedBlogs, setAnimatedBlogs] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimatedBlogs(true)
    }, 300)

    // Remove any opacity classes that might be affecting the hero section
    const heroElements = document.querySelectorAll(
      '.hero-section h1, .hero-section p, .hero-section div'
    )
    heroElements.forEach((el) => {
      el.classList.add('is-visible')
    })
  }, [])

  


  return (
    <section className='hero-section relative overflow-hidden bg-gradient-to-br from-muted/40 to-background pt-24 pb-16 md:pt-32 md:pb-24'>
      <div className='absolute inset-0 z-0 opacity-50'>
        <div className='absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl'></div>
        <div className='absolute -bottom-10 -left-20 h-[300px] w-[200px] rounded-full bg-primary/10 blur-3xl'></div>
      </div>

      <div className='container relative z-10 mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center text-center'>
          <h1 className='max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl animate-fade-in is-visible'>
            Insights &amp; Ideas for <br /> the{' '}
            <span className='text-primary'>Modern</span> Web
          </h1>
          <p className='mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in animation-delay-100 is-visible'>
            Discover thought-provoking stories, in-depth analyses, and expert
            opinions on web development, design, and technology.
          </p>
          <div className='mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 animate-fade-in animation-delay-200 is-visible'>
            <Link to='/blogs'>
              <Button size='lg' className='font-medium'>
                Explore All Articles
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent'></div>
    </section>
  )
}

export default Hero
