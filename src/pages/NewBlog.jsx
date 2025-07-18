import { useNavigate } from 'react-router-dom'

import BlogEditor from '../components/BlogEditor'

const NewBlog = () => {
  const navigate = useNavigate()

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
