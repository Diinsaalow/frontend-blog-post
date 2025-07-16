
import { useState, useEffect, useTransition } from 'react';
import BlogCard from '../components/BlogCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock data - would be fetched from backend in real app
const blogs = [
  {
    id: 'blog-1',
    title: 'Understanding React Hooks: A Comprehensive Guide',
    excerpt: 'Dive deep into React hooks and learn how to use them effectively in your web applications.',
    coverImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80',
    author: 'Sarah Williams',
    date: 'April 1, 2025',
    readTime: '5 min read',
    tags: ['React', 'Hooks', 'JavaScript'],
  },
  {
    id: 'blog-2',
    title: 'Tailwind CSS: Why It\'s Changing the Way We Style Web Applications',
    excerpt: 'Explore how Tailwind CSS has revolutionized frontend styling and why it\'s becoming the go-to choice for developers.',
    coverImage: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80',
    author: 'Michael Brown',
    date: 'March 28, 2025',
    readTime: '6 min read',
    tags: ['CSS', 'Tailwind', 'Styling'],
  },
  {
    id: 'blog-3',
    title: 'The Future of Web Performance Optimization',
    excerpt: 'Discover cutting-edge techniques to optimize the performance of your web applications and provide a better user experience.',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
    author: 'Emily Chen',
    date: 'March 25, 2025',
    readTime: '7 min read',
    tags: ['Performance', 'Optimization', 'Web'],
  },
  {
    id: 'blog-4',
    title: 'Building Accessible Web Applications',
    excerpt: 'Learn how to build web applications that are accessible to all users, including those with disabilities.',
    coverImage: 'https://images.unsplash.com/photo-1592424002053-21f369ad7fdb?auto=format&fit=crop&q=80',
    author: 'Alex Johnson',
    date: 'March 20, 2025',
    readTime: '8 min read',
    tags: ['Accessibility', 'Web', 'UX'],
  },
  {
    id: 'blog-5',
    title: 'The Complete Guide to Modern CSS Selectors',
    excerpt: 'A comprehensive look at CSS selectors and how to use them effectively in your web applications.',
    coverImage: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?auto=format&fit=crop&q=80',
    author: 'David Lee',
    date: 'March 15, 2025',
    readTime: '6 min read',
    tags: ['CSS', 'Frontend', 'Web'],
  },
  {
    id: 'blog-6',
    title: 'JavaScript Best Practices for 2025',
    excerpt: 'Stay up-to-date with the latest JavaScript best practices to write clean, efficient, and maintainable code.',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80',
    author: 'Olivia Wilson',
    date: 'March 10, 2025',
    readTime: '7 min read',
    tags: ['JavaScript', 'Best Practices', 'Web'],
  },
];

const categories = [
  'All',
  'React',
  'JavaScript',
  'CSS', 
  'Frontend',
];

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [isPending, startTransition] = useTransition();
  const [animatedBlogs, setAnimatedBlogs] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimatedBlogs(true);
    }, 300);
  }, []);

  useEffect(() => {
    startTransition(() => {
      let filtered = [...blogs];
      
      // Filter by category
      if (activeCategory !== 'All') {
        filtered = filtered.filter(blog => 
          blog.tags.some(tag => tag.toLowerCase() === activeCategory.toLowerCase())
        );
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(blog => 
          blog.title.toLowerCase().includes(query) || 
          blog.excerpt.toLowerCase().includes(query) ||
          blog.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      setFilteredBlogs(filtered);
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">All Blog Posts</h1>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search blogs..."
              className="pl-10 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full",
                activeCategory === category && "bg-primary hover:bg-primary/90"
              )}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Blog list */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No blogs found</h2>
            <p className="text-muted-foreground mb-6">Try changing your search or category filters</p>
            <Button onClick={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog, index) => (
              <div 
                key={blog.id}
                className={cn(
                  "opacity-0 translate-y-4 transition-all duration-500",
                  animatedBlogs && "opacity-100 translate-y-0",
                  { "transition-delay-100": index % 3 === 0 },
                  { "transition-delay-200": index % 3 === 1 },
                  { "transition-delay-300": index % 3 === 2 }
                )}
              >
                <BlogCard {...blog} />
              </div>
            ))}
          </div>
        )}
        
        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="w-10 h-10 p-0 bg-primary text-white border-primary">
              1
            </Button>
            <Button variant="outline" size="sm" className="w-10 h-10 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="w-10 h-10 p-0">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </main>
  
    </div>
  );
};

export default Blogs;
