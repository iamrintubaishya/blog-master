import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { format } from "date-fns";
import { ArrowLeft, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "wouter";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import { PostWithAuthorAndCategory } from "@shared/schema";

export default function Post() {
  const { slug } = useParams();

  const { data: post, isLoading, error } = useQuery<PostWithAuthorAndCategory>({
    queryKey: ["/api/posts", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <PublicHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="h-12 bg-muted rounded w-3/4" />
            <div className="h-64 bg-muted rounded" />
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
              <div className="h-4 bg-muted rounded w-4/6" />
            </div>
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <PublicHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Post Not Found</h1>
            <p className="text-secondary mb-8">The post you're looking for doesn't exist.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back button */}
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Post header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            {post.category && (
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                {post.category.name}
              </Badge>
            )}
            <time dateTime={post.publishedAt || post.createdAt!} className="text-sm text-secondary">
              {format(new Date(post.publishedAt || post.createdAt!), "MMMM d, yyyy")}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-merriweather leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-secondary leading-relaxed mb-8">
              {post.excerpt}
            </p>
          )}

          {/* Featured image */}
          {post.featuredImage && (
            <div className="mb-8">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          )}

          {/* Author info */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-8">
            <div className="flex items-center">
              <Avatar className="w-12 h-12 mr-4">
                <AvatarImage
                  src={post.author.profileImageUrl || ""}
                  alt={`${post.author.firstName} ${post.author.lastName}`}
                />
                <AvatarFallback>
                  {post.author.firstName?.[0]}{post.author.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-primary">
                  {post.author.firstName} {post.author.lastName}
                </p>
                <p className="text-sm text-secondary">{post.author.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-secondary">
              {post.readTime && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime} min read
                </div>
              )}
              {post.views !== undefined && (
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {post.views} views
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Post content */}
        <div 
          className="blog-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <PublicFooter />
    </div>
  );
}
