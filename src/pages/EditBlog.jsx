import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import BlogEditor from '../components/BlogEditor'
import { useUser } from '../context/UserContext'
import { useFetch } from '../hooks/UseFetch'

const EditBlog = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user, isLoading } = useUser()
  const hasShownToast = useRef(false)

  const { data: post, loading, error, fetchData } = useFetch(null)

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_URL}/api/v1/posts/${id}`)
  }, [fetchData, id])

  useEffect(() => {
    if (
      !isLoading &&
      user.role &&
      user.role.toLowerCase() !== 'admin' &&
      !hasShownToast.current
    ) {
      hasShownToast.current = true
      toast.error('You are not authorized to edit blog posts')
      navigate('/')
    }
  }, [user.role, isLoading, navigate])

  const handleUpdateBlog = () => {
    navigate('/blogs')
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
          <p>Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-500'>Error: {error}</p>
          <button
            onClick={() => navigate('/blogs')}
            className='mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90'
          >
            Back to Blogs
          </button>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center'>
          <p>Blog post not found</p>
          <button
            onClick={() => navigate('/blogs')}
            className='mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90'
          >
            Back to Blogs
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-background'>
      <main className='pt-24 pb-12 px-4'>
        <BlogEditor
          initialData={post}
          onSubmit={handleUpdateBlog}
          isEdit={true}
          id={id}
        />
      </main>
    </div>
  )
}

export default EditBlog
