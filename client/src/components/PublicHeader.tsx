import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Search, X } from "lucide-react";
import { useState } from "react";

export default function PublicHeader() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <h1 className="text-xl font-bold text-primary font-inter cursor-pointer hover:text-blue-600 transition-colors duration-200">
                <span className="text-gradient">Blog</span>Master
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
            <div className="relative">
              {showSearch ? (
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 h-9"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery("");
                    }}
                    type="button"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <Button type="submit" hidden /> {/* Hidden submit button for form submission */}
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSearch(true)}
                  className="hidden md:flex"
                >
                  <Search className="w-4 h-4" />
                </Button>
              )}
            </div>
            {isAuthenticated && (
              <Link href="/admin">
                <Button className="bg-accent hover:bg-accent/90">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}