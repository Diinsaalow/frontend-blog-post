import React from 'react'
import FeaturedBlogCard from './FeaturedBlogCard'
import { useEffect } from 'react'
import { useFetch } from '../hooks/UseFetch'
import FeaturedBlogCardSkeleton from './FeaturedBlogCardSkeleton'

const FeaturedPost = () => {
  const { data: posts, loading, error, fetchData } = useFetch([])

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_URL}/api/v1/posts`)
  }, [fetchData])

  // Find featured blog from posts
  const featuredBlog = posts?.find((blog) => blog.isFeatured)

  if (loading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <FeaturedBlogCardSkeleton />
      </div>
    )
  }

  if (error) {
    return <div className='text-center text-red-500'>Error: {error}</div>
  }

  if (!posts || posts.length === 0) {
    return <div className='text-center text-gray-500'>No posts found</div>
  }

  return (
    <div className='mb-12'>
      <h2 className='text-3xl font-bold mb-10'>Featured Post</h2>
      {featuredBlog && <FeaturedBlogCard {...featuredBlog} />}
    </div>
  )
}

export default FeaturedPost
