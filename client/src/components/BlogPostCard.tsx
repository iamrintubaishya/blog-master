import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "wouter";
import { PostWithAuthorAndCategory } from "@shared/schema";

interface BlogPostCardProps {
  post: PostWithAuthorAndCategory;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/post/${post.slug}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer">
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
        )}
        <CardContent className="p-6">
          <div className="flex items-center mb-3">
            {post.category && (
              <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                {post.category.name}
              </Badge>
            )}
            <span className="ml-auto text-xs text-secondary">
              {format(new Date(post.publishedAt || post.createdAt!), "MMM d, yyyy")}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-primary mb-3 font-merriweather leading-tight">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-secondary text-sm mb-4 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={post.author.profileImageUrl || ""}
                  alt={`${post.author.firstName} ${post.author.lastName}`}
                />
                <AvatarFallback className="text-xs">
                  {post.author.firstName?.[0]}{post.author.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <span className="ml-2 text-sm text-secondary">
                {post.author.firstName} {post.author.lastName}
              </span>
            </div>
            {post.readTime && (
              <span className="text-xs text-secondary">{post.readTime} min read</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
