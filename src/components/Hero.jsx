import { Link } from "react-router"
import FeaturedBlogCard from "../components/FeaturedBlogCard"
import BlogCard from "../components/BlogCard"
import { Button } from "../components/ui/button"
import { cn } from "../lib/utils"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { useEffect } from "react"

const Hero = () => {
  const [animatedBlogs, setAnimatedBlogs] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimatedBlogs(true)
    }, 300)

    // Remove any opacity classes that might be affecting the hero section
    const heroElements = document.querySelectorAll(
      ".hero-section h1, .hero-section p, .hero-section div"
    )
    heroElements.forEach((el) => {
      el.classList.add("is-visible")
    })
  }, [])

  const featuredBlog = {
    id: "2",
    title: "The Ultimate Guide to Modern Web Development Practices in 2025",
    excerpt:
      "Learn about the latest trends, tools, and techniques that are shaping modern web development in 2025 and beyond.",
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80",
    author: "Alex Johnson",
    date: "April 2, 2025",
    readTime: "8 min read",
    tags: ["Web Development", "React", "Trends"],
  }

  const recentBlogs = [
    {
      id: "blog-1",
      title: "Understanding React Hooks: A Comprehensive Guide",
      excerpt:
        "Dive deep into React hooks and learn how to use them effectively in your web applications.",
      coverImage:
        "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80",
      author: "Sarah Williams",
      date: "April 1, 2025",
      readTime: "5 min read",
      tags: ["React", "Hooks", "JavaScript"],
    },
    {
      id: "blog-2",
      title:
        "Tailwind CSS: Why It's Changing the Way We Style Web Applications",
      excerpt:
        "Explore how Tailwind CSS has revolutionized frontend styling and why it's becoming the go-to choice for developers.",
      coverImage:
        "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80",
      author: "Michael Brown",
      date: "March 28, 2025",
      readTime: "6 min read",
      tags: ["CSS", "Tailwind", "Styling"],
    },
    {
      id: "blog-3",
      title: "The Future of Web Performance Optimization",
      excerpt:
        "Discover cutting-edge techniques to optimize the performance of your web applications and provide a better user experience.",
      coverImage:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
      author: "Emily Chen",
      date: "March 25, 2025",
      readTime: "7 min read",
      tags: ["Performance", "Optimization", "Web"],
    },
  ]
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden bg-gradient-to-br from-muted/40 to-background pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-10 -left-20 h-[300px] w-[200px] rounded-full bg-primary/10 blur-3xl"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl animate-fade-in is-visible">
              Insights &amp; Ideas for <br /> the{" "}
              <span className="text-primary">Modern</span> Web
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in animation-delay-100 is-visible">
              Discover thought-provoking stories, in-depth analyses, and expert
              opinions on web development, design, and technology.
            </p>
            <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 animate-fade-in animation-delay-200 is-visible">
              <Link to="/blogs">
                <Button size="lg" className="font-medium">
                  Explore All Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-10">Featured Post</h2>
          <FeaturedBlogCard {...featuredBlog} />
        </div>

        {/* Recent Posts Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-10">Recent Posts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className={cn(
                  "opacity translate-y-4 transition-all duration-500",
                  animatedBlogs && "opacity-100 translate-y-0",
                  { "transition-delay-100": index === 0 },
                  { "transition-delay-200": index === 1 },
                  { "transition-delay-300": index === 2 }
                )}
              >
                <BlogCard {...blog} />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link to="/blogs">
              <Button variant="outline" size="lg">
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Hero
