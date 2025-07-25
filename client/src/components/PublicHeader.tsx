import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Search } from "lucide-react";

export default function PublicHeader() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <h1 className="text-xl font-bold text-primary font-inter cursor-pointer">
                ModernBlog
              </h1>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-secondary hover:text-primary transition-colors duration-200">
                Home
              </Link>
              <a href="#" className="text-secondary hover:text-primary transition-colors duration-200">
                Categories
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors duration-200">
                About
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors duration-200">
                Contact
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="w-4 h-4" />
            </Button>
            {isAuthenticated ? (
              <Link href="/admin">
                <Button className="bg-accent hover:bg-accent/90">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Button 
                onClick={() => window.location.href = "/api/login"}
                className="bg-accent hover:bg-accent/90"
              >
                Admin Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
