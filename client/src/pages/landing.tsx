import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import FeaturedPost from "@/components/FeaturedPost";
import BlogPostCard from "@/components/BlogPostCard";
import { PostWithAuthorAndCategory } from "@shared/schema";

export default function Landing() {
  const { data: posts = [], isLoading: postsLoading } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts"],
  });

  const { data: featuredPost, isLoading: featuredLoading } = useQuery<PostWithAuthorAndCategory>({
    queryKey: ["/api/posts/featured"],
  });

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-subtle py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-merriweather">
            Welcome to ModernBlog
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            Discover insightful articles, thoughtful perspectives, and engaging stories from our community of writers.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && !featuredLoading && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <FeaturedPost post={featuredPost} />
        </section>
      )}

      {/* Latest Articles */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-primary mb-8 font-merriweather">Latest Articles</h2>
        
        {postsLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="w-full h-48 bg-muted animate-pulse" />
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted animate-pulse rounded w-1/4" />
                    <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
                    <div className="h-4 bg-muted animate-pulse rounded w-full" />
                    <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 6).map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">No articles published yet.</p>
          </div>
        )}
      </section>

      <PublicFooter />
    </div>
  );
}
