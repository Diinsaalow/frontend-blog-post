import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-muted py-8 px-4 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-primary">BLOGIES</h2>
        </div>

        <nav className="flex gap-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Link
            to="/blogs"
            className="text-muted-foreground hover:text-foreground"
          >
            Blogs
          </Link>
        </nav>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} BLOGIES. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
