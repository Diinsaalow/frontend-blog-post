import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, PenSquare } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { useUser } from "../context/UserContext";
import { toast } from "react-hot-toast";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const { user, logout, isAuthenticated, isLoading } = useUser();

  console.log("The user is: ", user);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully");
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-30 transition-all duration-300 bg-primary",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blog-accent">
              BLOGIES
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive("/")
                    ? "text-blog-accent"
                    : "text-gray-600 hover:text-blog-accent"
                )}
              >
                Home
              </Link>

              <Link
                to="/blogs"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive("/blogs")
                    ? "text-blog-accent"
                    : "text-gray-600 hover:text-blog-accent"
                )}
              >
                Blogs
              </Link>
              {!isLoading && user.role.toLowerCase() === "admin" && (
                <Link to="/new-blog">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <PenSquare className="h-4 w-4" />
                    Add New Blog
                  </Button>
                </Link>
              )}
              {!isLoading && isAuthenticated ? (
                <>
                  <Link to="/profile">
                    <Button variant="ghost" size="sm">
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : !isLoading ? (
                <>
                  <Link to="/signin">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>

                  <Link to="/signup">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </>
              ) : (
                <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blog-accent focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 shadow-lg backdrop-blur-md">
            <Link
              to="/"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                isActive("/")
                  ? "text-blog-accent"
                  : "text-gray-600 hover:text-blog-accent"
              )}
            >
              Home
            </Link>

            <Link
              to="/blogs"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                isActive("/blogs")
                  ? "text-blog-accent"
                  : "text-gray-600 hover:text-blog-accent"
              )}
            >
              Blogs
            </Link>

            <Link
              to="/new-blog"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blog-accent"
            >
              Write a Blog
            </Link>

            <div className="pt-4 flex flex-col space-y-2">
              {!isLoading && isAuthenticated ? (
                <>
                  <Link to="/profile">
                    <Button variant="outline" className="w-full">
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : !isLoading ? (
                <>
                  <Link to="/signin">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              ) : (
                <div className="animate-pulse bg-gray-200 h-8 w-full rounded"></div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
