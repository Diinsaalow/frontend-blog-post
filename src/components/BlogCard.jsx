import { useState, useTransition } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'
import { CalendarDays, Clock, User } from 'lucide-react'
import { Button } from '../components/ui/button'

const BlogCard = ({
  id,
  title,
  excerpt,
  coverImage,
  author,
  date,
  tags = [],
  featured = false,
}) => {
  const [isPending, startTransition] = useTransition()
  const [isHovered, setIsHovered] = useState(false)

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
          src={coverImage}
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
        <div className='flex flex-wrap gap-2 mb-3'>
          {tags.map((tag) => (
            <span key={tag} className='tag'>
              {tag}
            </span>
          ))}
        </div>

        <h3
          className={cn(
            'font-bold transition-colors',
            featured ? 'text-2xl md:text-3xl mb-3' : 'text-xl mb-2',
            isHovered ? 'text-primary' : ''
          )}
        >
          <Link to={`/blogs/${id}`}>{title}</Link>
        </h3>

        <p className='text-muted-foreground mb-4 line-clamp-2'>{excerpt}</p>

        <div className='mt-auto'>
          <div className='flex items-center text-sm text-muted-foreground space-x-4 mb-4 '>
            <div className='flex items-center '>
              <User className='h-4 w-4 mr-1' />
              <span>{author}</span>
            </div>
            <div className='flex items-center'>
              <CalendarDays className='h-4 w-4 mr-1' />
              <span>{date}</span>
            </div>
          </div>

          <Link to={`/blogs/${id}`}>
            <Button
              variant='ghost'
              className='text-primary hover:text-primary/80 px-3'
            >
              Read More →
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default BlogCard
