import React, { useEffect } from 'react'
import { useFetch } from '../hooks/UseFetch'
import { Loader2 } from 'lucide-react'

// Example 1: Fetching a list of posts
export const PostsList = () => {
  const { data: posts, loading, error, fetchData } = useFetch([])

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_URL}/api/v1/posts`)
  }, [fetchData])

  if (loading) return <Loader2 className='w-6 h-6 animate-spin' />
  if (error) return <div className='text-red-500'>Error: {error}</div>
  if (!posts?.length) return <div>No posts found</div>

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}

// Example 2: Fetching a single post by ID
export const SinglePost = ({ postId }) => {
  const { data: post, loading, error, fetchData } = useFetch()

  useEffect(() => {
    if (postId) {
      fetchData(`${import.meta.env.VITE_API_URL}/api/v1/posts/${postId}`)
    }
  }, [postId, fetchData])

  if (loading) return <Loader2 className='w-6 h-6 animate-spin' />
  if (error) return <div className='text-red-500'>Error: {error}</div>
  if (!post) return <div>Post not found</div>

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}

// Example 3: Creating a new post
export const CreatePost = () => {
  const { loading, error, fetchData } = useFetch()

  const handleSubmit = async (formData) => {
    try {
      await fetchData(`${import.meta.env.VITE_API_URL}/api/v1/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(formData),
      })
      // Handle success (e.g., redirect, show message)
    } catch (err) {
      // Error is already handled by useFetch
      console.log('Failed to create post')
    }
  }

  return (
    <div>
      {loading && <Loader2 className='w-6 h-6 animate-spin' />}
      {error && <div className='text-red-500'>Error: {error}</div>}
      {/* Your form component here */}
    </div>
  )
}

// Example 4: Fetching with initial data
export const PostsWithInitialData = () => {
  const {
    data: posts,
    loading,
    error,
    fetchData,
  } = useFetch([{ id: 1, title: 'Loading...', content: 'Please wait...' }])

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_URL}/api/v1/posts`)
  }, [fetchData])

  return (
    <div>
      {loading && <div>Loading more posts...</div>}
      {error && <div className='text-red-500'>Error: {error}</div>}
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
