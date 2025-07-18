import React from 'react'
import { cn } from '../lib/utils'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import BlogCard from './BlogCard'
import { useFetch } from '../hooks/UseFetch'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

const recentBlogs = [
  {
    id: 'blog-1',
    title: 'Understanding React Hooks: A Comprehensive Guide',
    excerpt:
      'Dive deep into React hooks and learn how to use them effectively in your web applications.',
    coverImage:
      'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80',
    author: 'Sarah Williams',
    date: 'April 1, 2025',
    readTime: '5 min read',
    tags: ['React', 'Hooks', 'JavaScript'],
  },
  {
    id: 'blog-2',
    title: "Tailwind CSS: Why It's Changing the Way We Style Web Applications",
    excerpt:
      "Explore how Tailwind CSS has revolutionized frontend styling and why it's becoming the go-to choice for developers.",
    coverImage:
      'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80',
    author: 'Michael Brown',
    date: 'March 28, 2025',
    readTime: '6 min read',
    tags: ['CSS', 'Tailwind', 'Styling'],
  },
  {
    id: 'blog-3',
    title: 'The Future of Web Performance Optimization',
    excerpt:
      'Discover cutting-edge techniques to optimize the performance of your web applications and provide a better user experience.',
    coverImage:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
    author: 'Emily Chen',
    date: 'March 25, 2025',
    readTime: '7 min read',
    tags: ['Performance', 'Optimization', 'Web'],
  },
]
const RecentPosts = () => {
  const { data: posts, loading, error, fetchData } = useFetch([])

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_URL}/api/v1/posts`)
  }, [fetchData])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <Loader2 className='w-8 h-8 animate-spin' />
      </div>
    )
  }
  if (error) {
    return <div className='text-red-500'>Error: {error}</div>
  }

  if (!posts || posts.length === 0) {
    return <div>No posts found</div>
  }

  const recentPosts = posts?.slice(0, 3)
  console.log('recentPosts', recentPosts)
  return (
    <div className='mt-20'>
      <h2 className='text-3xl font-bold mb-10'>Recent Posts</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {recentPosts.map((blog, index) => (
          <div
            key={blog.id}
            className={cn(
              'opacity translate-y-4 transition-all duration-500',

              { 'transition-delay-100': index === 0 },
              { 'transition-delay-200': index === 1 },
              { 'transition-delay-300': index === 2 }
            )}
          >
            <BlogCard {...blog} />
          </div>
        ))}
      </div>

      <div className='flex justify-center mt-10'>
        <Link to='/blogs'>
          <Button variant='outline' size='lg'>
            View All Posts
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default RecentPosts
