import { useState, useTransition } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'
import { CalendarDays, Clock, User } from 'lucide-react'
import { Button } from '../components/ui/button'

const FeaturedBlogCard = ({
  id,
  title,
  excerpt,
  coverImage,
  author,
  date,
  tags = [],
}) => {
  const [isPending, startTransition] = useTransition()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <article
      className='relative h-[500px] md:h-[600px] rounded-lg overflow-hidden group'
      onMouseEnter={() => startTransition(() => setIsHovered(true))}
      onMouseLeave={() => startTransition(() => setIsHovered(false))}
    >
      {/* Background image with overlay */}
      <div className='absolute inset-0'>
        <img
          src={coverImage}
          alt={title}
          className={cn(
            'h-full w-full object-cover transition-transform duration-500',
            isHovered ? 'scale-105' : 'scale-100'
          )}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20'></div>
      </div>

      {/* Content */}
      <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8'>
        <div className='flex flex-wrap gap-2 mb-4'>
          {tags.map((tag) => (
            <span key={tag} className='tag bg-white/10 backdrop-blur-sm'>
              {tag}
            </span>
          ))}
        </div>

        <Link to={`/blogs/${id}`} className='block'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4 transition-colors hover:text-primary'>
            {title}
          </h2>
        </Link>

        <p className='text-white/80 mb-6 max-w-2xl line-clamp-3'>{excerpt}</p>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center text-sm text-white/70 space-x-4 mb-4 sm:mb-0'>
            <div className='flex items-center'>
              <User className='h-4 w-4 mr-1' />
              <span>{author}</span>
            </div>
            <div className='flex items-center'>
              <CalendarDays className='h-4 w-4 mr-1' />
              <span>{date}</span>
            </div>
          </div>

          <Link to={`/blog/${id}`}>
            <Button className='bg-primary hover:bg-primary/90'>
              Read Article
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default FeaturedBlogCard
