import { useNavigate } from 'react-router-dom'

import BlogEditor from '../components/BlogEditor'
import { toast } from 'react-hot-toast'
import { useEffect, useRef } from 'react'
import { useUser } from '../context/UserContext'

const NewBlog = () => {
  const navigate = useNavigate()
  const { user, isLoading } = useUser()
  const hasShownToast = useRef(false)

  useEffect(() => {
    if (
      !isLoading &&
      user.role &&
      user.role.toLowerCase() !== 'admin' &&
      !hasShownToast.current
    ) {
      hasShownToast.current = true
      toast.error('You are not authorized to create a new blog')
      navigate('/')
    }
  }, [user.role, isLoading, navigate])

  const handleCreateBlog = () => {
    navigate('/blogs')
  }

  return (
    <div className='min-h-screen bg-background'>
      <main className='pt-24 pb-12 px-4'>
        <BlogEditor onSubmit={handleCreateBlog} />
      </main>
    </div>
  )
}

export default NewBlog
