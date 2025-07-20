import { useState, useTransition } from 'react'
import { useNavigate } from 'react-router-dom'

import { ImageIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { useUser } from '../context/UserContext'
import { useFetch } from '../hooks/UseFetch'

const BlogEditor = ({ initialData, isEdit = false, id }) => {
  const [isPending, startTransition] = useTransition()
  const [imagePreview, setImagePreview] = useState(
    initialData?.coverImage || null
  )
  const { getAuthHeaders } = useUser()
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    coverImage: initialData?.coverImage || '',
    isFeatured: initialData?.isFeatured || false,
  })

  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setFormData((prev) => ({ ...prev, coverImage: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const { fetchData } = useFetch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    startTransition(async () => {
      try {
        let response
        if (isEdit) {
          response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/v1/posts/${id}`,
            {
              method: 'PUT',
              headers: getAuthHeaders(),
              body: JSON.stringify(formData),
            }
          )
        } else {
          response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/v1/posts`,
            {
              method: 'POST',
              headers: getAuthHeaders(),
              body: JSON.stringify(formData),
            }
          )
        }

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to save blog post')
        }

        toast.success(
          isEdit
            ? 'Blog post updated successfully'
            : 'Blog post created successfully'
        )
        navigate('/blogs')
      } catch (error) {
        toast.error(
          error.message || 'Failed to save blog post. Please try again.'
        )
        console.error(error)
      }
    })
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>
        {isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h1>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Title</label>
          <Input
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            placeholder='Enter your blog title'
            className='text-xl'
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium'>Cover Image</label>
          <div className='flex items-center space-x-4'>
            <label className='cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-12 px-4 hover:border-gray-400 transition-colors'>
              <ImageIcon className='h-5 w-5 mr-2' />
              <span>Upload Image</span>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
              />
            </label>
            {imagePreview && (
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() => {
                  setImagePreview(null)
                  setFormData((prev) => ({ ...prev, coverImage: '' }))
                }}
              >
                Remove Image
              </Button>
            )}
          </div>

          {imagePreview && (
            <div className='mt-4 relative'>
              <img
                src={imagePreview}
                alt='Preview'
                className='rounded-md max-h-64 object-cover'
              />
            </div>
          )}
        </div>
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Content</label>
          <Textarea
            name='content'
            value={formData.content}
            onChange={handleInputChange}
            placeholder='Write your blog content here...'
            rows={15}
            className='font-serif resize-none min-h-[150px] text-lg leading-relaxed'
          />
        </div>

        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <input
              type='checkbox'
              id='isFeatured'
              name='isFeatured'
              checked={formData.isFeatured}
              onChange={handleInputChange}
              className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
            />
            <label htmlFor='isFeatured' className='text-sm font-medium'>
              Mark as Featured Post
            </label>
          </div>
          <p className='text-xs text-gray-500'>
            Featured posts will be highlighted on the homepage
          </p>
        </div>

        <div className='flex items-center space-x-4'>
          <Button type='submit' disabled={isPending}>
            {isPending ? 'Saving...' : isEdit ? 'Update Post' : 'Publish Post'}
          </Button>
          <Button type='button' variant='outline' onClick={() => navigate('/')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BlogEditor
