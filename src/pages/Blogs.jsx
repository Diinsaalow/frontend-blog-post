import { useState, useEffect, useTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Search, Plus } from 'lucide-react'
import { cn } from '../lib/utils'
import { useFetch } from '../hooks/UseFetch'
import { useUser } from '../context/UserContext'

const Blogs = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [isPending, startTransition] = useTransition()
  const [animatedBlogs, setAnimatedBlogs] = useState(false)
  const { user } = useUser()
  const isAdmin = user.role?.toLowerCase() === 'admin'

  const { data: blogs, loading, error, fetchData } = useFetch([])

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_URL}/api/v1/posts`)
  }, [fetchData])

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimatedBlogs(true)
    }, 300)
  }, [])

  const handleDeleteBlog = (deletedId) => {
    setFilteredBlogs((prev) => prev.filter((blog) => blog.id !== deletedId))
  }

  useEffect(() => {
    startTransition(() => {
      let filtered = [...blogs]

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filtered = filtered.filter(
          (blog) =>
            blog.title.toLowerCase().includes(query) ||
            blog.content.toLowerCase().includes(query)
        )
      }

      setFilteredBlogs(filtered)
    })
  }, [searchQuery, blogs])

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='min-h-screen bg-background'>
      <main className='pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold'>All Blog Posts</h1>

          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
              <Input
                type='search'
                placeholder='Search blogs...'
                className='pl-10 w-full md:w-[300px]'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

          </div>
        </div>

        {/* Blog list */}
        {filteredBlogs.length === 0 ? (
          <div className='text-center py-12'>
            <h2 className='text-xl font-semibold mb-2'>No blogs found</h2>
            <p className='text-muted-foreground mb-6'>
              Try changing your search or category filters
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className={cn(
                  'opacity-0 translate-y-4 transition-all duration-500',
                  animatedBlogs && 'opacity-100 translate-y-0',
                  { 'transition-delay-100': index % 3 === 0 },
                  { 'transition-delay-200': index % 3 === 1 },
                  { 'transition-delay-300': index % 3 === 2 }
                )}
              >
                <BlogCard {...blog} onDelete={handleDeleteBlog} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Blogs
