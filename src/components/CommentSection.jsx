import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { useUser } from '../context/UserContext'
import { toast } from 'react-hot-toast'
import { Edit, Trash2, Send, X, Check } from 'lucide-react'

const CommentSection = ({ postId }) => {
  const { user, getAuthHeaders } = useUser()
  const navigate = useNavigate()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [editingComment, setEditingComment] = useState(null)
  const [editContent, setEditContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Fetch comments
  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/comments/post/${postId}`
      )
      if (response.ok) {
        const data = await response.json()
        setComments(data)
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
      toast.error('Failed to load comments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postId])

  // Create new comment
  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    // Check if user is authenticated
    if (!user) {
      toast.error('Please login to comment')
      navigate('/signin')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/comments/post/${postId}`,
        {
          method: 'POST',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: newComment }),
        }
      )

      if (response.ok) {
        const createdComment = await response.json()
        setComments([createdComment, ...comments])
        setNewComment('')
        toast.success('Comment added successfully')
      } else {
        throw new Error('Failed to create comment')
      }
    } catch (error) {
      console.error('Error creating comment:', error)
      toast.error('Failed to add comment')
    } finally {
      setSubmitting(false)
    }
  }

  // Update comment
  const handleUpdateComment = async (commentId) => {
    if (!editContent.trim()) return

    setSubmitting(true)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/comments/${commentId}`,
        {
          method: 'PUT',
          headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: editContent }),
        }
      )

      if (response.ok) {
        const updatedComment = await response.json()
        setComments(
          comments.map((comment) =>
            comment.id === commentId ? updatedComment : comment
          )
        )
        setEditingComment(null)
        setEditContent('')
        toast.success('Comment updated successfully')
      } else {
        throw new Error('Failed to update comment')
      }
    } catch (error) {
      console.error('Error updating comment:', error)
      toast.error('Failed to update comment')
    } finally {
      setSubmitting(false)
    }
  }

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/comments/${commentId}`,
        {
          method: 'DELETE',
          headers: getAuthHeaders(),
        }
      )

      if (response.ok) {
        setComments(comments.filter((comment) => comment.id !== commentId))
        toast.success('Comment deleted successfully')
      } else {
        throw new Error('Failed to delete comment')
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
      toast.error('Failed to delete comment')
    }
  }

  // Start editing comment
  const startEditing = (comment) => {
    setEditingComment(comment.id)
    setEditContent(comment.content)
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingComment(null)
    setEditContent('')
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center py-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
      </div>
    )
  }

  console.log(user && user.role ? 'use logged in' : 'use not logged in')

  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <h2 className='text-2xl font-bold mb-6'>Comments ({comments.length})</h2>

      {/* Add new comment form */}
      <form onSubmit={handleSubmitComment} className='mb-8'>
        <div className='flex items-start space-x-3'>
          <div className='w-10 h-10 rounded-full overflow-hidden flex-shrink-0'>
            <img
              src={
                user?.profileImageUrl ||
                'https://randomuser.me/api/portraits/men/1.jpg'
              }
              alt={user?.fullName || 'Guest'}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='flex-1'>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={
                user && user.role
                  ? 'Write a comment...'
                  : 'Login to write a comment...'
              }
              className='min-h-[100px] resize-none'
              disabled={submitting}
            />
            <div className='flex justify-end mt-2'>
              <Button
                type='submit'
                disabled={!newComment.trim() || submitting}
                className='bg-blue-600 text-white hover:bg-blue-700'
              >
                {submitting ? (
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                ) : (
                  <>
                    <Send className='h-4 w-4 mr-2' />
                    {user && user.role ? 'Post Comment' : 'Login to Comment'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments list */}
      <div className='space-y-6'>
        {comments.length === 0 ? (
          <div className='text-center text-gray-500 py-8'>
            No comments yet. Be the first to comment!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className='border-b border-gray-200 pb-6'>
              <div className='flex items-start space-x-3'>
                <div className='w-10 h-10 rounded-full overflow-hidden flex-shrink-0'>
                  <img
                    src={
                      comment.author.profileImageUrl ||
                      'https://randomuser.me/api/portraits/men/1.jpg'
                    }
                    alt={comment.author.fullName}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='flex-1'>
                  <div className='flex items-center justify-between mb-2'>
                    <div>
                      <span className='font-semibold text-gray-900'>
                        {comment.author.fullName}
                      </span>
                      <span className='text-gray-500 text-sm ml-2'>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {user &&
                      (user.id === comment.author.id ||
                        user.role === 'ADMIN') && (
                        <div className='flex items-center space-x-2'>
                          {editingComment === comment.id ? (
                            <>
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={() => handleUpdateComment(comment.id)}
                                disabled={submitting}
                                className='text-green-600 border-green-600 hover:bg-green-50'
                              >
                                <Check className='h-4 w-4' />
                              </Button>
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={cancelEditing}
                                disabled={submitting}
                                className='text-gray-600 border-gray-600 hover:bg-gray-50'
                              >
                                <X className='h-4 w-4' />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={() => startEditing(comment)}
                                className='text-blue-600 border-blue-600 hover:bg-blue-50'
                              >
                                <Edit className='h-4 w-4' />
                              </Button>
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={() => handleDeleteComment(comment.id)}
                                className='text-red-600 border-red-600 hover:bg-red-50'
                              >
                                <Trash2 className='h-4 w-4' />
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                  </div>
                  {editingComment === comment.id ? (
                    <div className='space-y-2'>
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className='min-h-[80px] resize-none'
                        disabled={submitting}
                      />
                    </div>
                  ) : (
                    <p className='text-gray-700 whitespace-pre-wrap'>
                      {comment.content}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CommentSection
