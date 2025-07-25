import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import FeaturedPost from "@/components/FeaturedPost";
import BlogPostCard from "@/components/BlogPostCard";
import { PostWithAuthorAndCategory } from "@shared/schema";
import { ArrowRight, Search, TrendingUp, Users, BookOpen, Sparkles, Star } from "lucide-react";
import { useState } from "react";

export default function Landing() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: posts = [], isLoading: postsLoading } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts"],
  });

  const { data: featuredPost, isLoading: featuredLoading } = useQuery<PostWithAuthorAndCategory>({
    queryKey: ["/api/posts/featured"],
  });

  // Filter posts based on search query
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&h=800&fit=crop&q=80"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-medium">Featured Stories</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-merriweather leading-tight">
              Discover Stories That
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Inspire
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
              Dive into a world of knowledge with expertly crafted articles on technology, design, and innovation from industry leaders.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-300 focus:bg-white/20"
              />
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center space-x-2 text-white/90">
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">{posts.length}+ Articles</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <Users className="w-5 h-5" />
                <span className="font-medium">Expert Authors</span>
              </div>
              <div className="flex items-center space-x-2 text-white/90">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Weekly Updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && !featuredLoading && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      {/* Recent Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h3 className="text-3xl font-bold text-primary font-merriweather mb-2">
              {searchQuery ? 'Search Results' : 'Latest Articles'}
            </h3>
            {searchQuery && (
              <p className="text-secondary">
                Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            )}
          </div>
          {!searchQuery && (
            <Button variant="outline" className="group">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>
        
        {postsLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse hover:shadow-lg transition-shadow">
                <div className="h-48 bg-muted rounded-t-lg" />
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded w-1/4 mb-2" />
                  <div className="h-6 bg-muted rounded w-3/4 mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(searchQuery ? filteredPosts : filteredPosts.slice(0, 9)).map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-xl font-semibold text-primary mb-2">No articles found</h4>
            <p className="text-secondary mb-4">
              Try adjusting your search terms or browse our latest articles below.
            </p>
            <Button onClick={() => setSearchQuery("")} variant="outline">
              Clear Search
            </Button>
          </div>
        ) : null}
      </section>

      <PublicFooter />
    </div>
  );
}
