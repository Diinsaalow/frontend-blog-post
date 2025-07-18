import { useState, useTransition } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'
import { CalendarDays, Clock, User, Edit, Trash2 } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useUser } from '../context/UserContext'
import { toast } from 'react-hot-toast'

const BlogCard = ({
  id,
  title,
  content,
  thumbnailUrl,
  author,
  createdAt,
  featured = false,
  onDelete,
}) => {
  const [isPending, startTransition] = useTransition()
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const { user, getAuthHeaders } = useUser()
  const isAdmin = user.role?.toLowerCase() === 'admin'

  return (
    <article
      className={cn(
        'overflow-hidden rounded-lg border bg-card text-card-foreground card-hover',
        featured ? 'md:flex md:h-[380px]' : 'flex flex-col h-full'
      )}
      onMouseEnter={() => startTransition(() => setIsHovered(true))}
      onMouseLeave={() => startTransition(() => setIsHovered(false))}
    >
      <div
        className={cn(
          'overflow-hidden relative',
          featured ? 'md:w-1/2' : 'h-48'
        )}
      >
        <img
          src={
            thumbnailUrl ||
            'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80'
          }
          alt={title}
          className={cn(
            'h-full w-full object-cover transition-transform duration-300',
            isHovered ? 'scale-105' : 'scale-100'
          )}
        />
      </div>

      <div
        className={cn(
          'flex flex-col p-6',
          featured ? 'md:w-1/2 justify-center' : 'flex-1'
        )}
      >
        <h3
          className={cn(
            'font-bold transition-colors',
            featured ? 'text-2xl md:text-3xl mb-3' : 'text-xl mb-2',
            isHovered ? 'text-primary' : ''
          )}
        >
          <Link to={`/blogs/${id}`}>{title}</Link>
        </h3>

        <p className='text-muted-foreground mb-4 line-clamp-2'>
          {content.substring(0, 100)}...
        </p>

        <div className='mt-auto'>
          <div className='flex items-center text-sm text-muted-foreground space-x-4 mb-4 '>
            <div className='flex items-center '>
              <User className='h-4 w-4 mr-1' />
              <span>{author.fullName}</span>
            </div>
            <div className='flex items-center'>
              <CalendarDays className='h-4 w-4 mr-1' />
              <span>{new Date(createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <Link to={`/blogs/${id}`}>
              <Button
                variant='ghost'
                className='text-primary hover:text-primary/80 px-3'
              >
                Read More →
              </Button>
            </Link>

            {isAdmin && (
              <div className='flex items-center space-x-2'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-blue-600 hover:text-blue-700 px-2'
                  onClick={() => navigate(`/blogs/${id}/edit`)}
                >
                  <Edit className='h-4 w-4' />
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-red-600 hover:text-red-700 px-2'
                  onClick={async () => {
                    if (
                      window.confirm(
                        'Are you sure you want to delete this blog post?'
                      )
                    ) {
                      try {
                        const response = await fetch(
                          `${import.meta.env.VITE_API_URL}/api/v1/posts/${id}`,
                          {
                            method: 'DELETE',
                            headers: getAuthHeaders(),
                          }
                        )

                        if (!response.ok) {
                          throw new Error('Failed to delete blog post')
                        }

                        toast.success('Blog post deleted successfully')
                        if (onDelete) {
                          onDelete(id)
                        }
                      } catch (error) {
                        toast.error('Failed to delete blog post')
                        console.error(error)
                      }
                    }
                  }}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogCard
