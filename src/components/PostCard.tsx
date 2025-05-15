
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Post } from "../types";
import { useData } from "../context/DataContext";
import { useClerkAuth } from "../context/ClerkAuthContext";

interface PostCardProps {
  post: Post;
  showSubreddit?: boolean;
}

const PostCard = ({ post, showSubreddit = true }: PostCardProps) => {
  const { votePost } = useData();
  const { isAuthenticated } = useClerkAuth();
  const [expandContent, setExpandContent] = useState(false);

  const handleVote = (value: number) => {
    votePost(post.id, value);
  };

  // Function to determine if the content should be truncated
  const shouldTruncate = post.content && post.content.length > 300;

  // Render post content or URL
  const renderContent = () => {
    if (post.url) {
      return (
        <a 
          href={post.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:underline break-all"
        >
          {post.url}
        </a>
      );
    }
    
    if (post.content) {
      if (shouldTruncate && !expandContent) {
        return (
          <>
            <p className="mt-2 text-gray-700">
              {post.content.substring(0, 300)}...
            </p>
            <button 
              onClick={() => setExpandContent(true)}
              className="text-sm text-reddit-blue mt-1 hover:underline"
            >
              Read more
            </button>
          </>
        );
      }
      
      return <p className="mt-2 text-gray-700">{post.content}</p>;
    }
    
    return null;
  };

  return (
    <Card className="overflow-hidden hover:border-reddit-blue transition-colors">
      {/* Voting sidebar */}
      <div className="flex">
        <div className="flex flex-col items-center py-2 px-2 bg-gray-50 text-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-6 w-6 ${post.userVote === 1 ? 'text-reddit-orange' : ''}`}
            onClick={() => isAuthenticated && handleVote(1)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-4 w-4"
            >
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </Button>
          
          <span className="text-sm font-medium my-1">{post.voteCount}</span>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-6 w-6 ${post.userVote === -1 ? 'text-blue-600' : ''}`}
            onClick={() => isAuthenticated && handleVote(-1)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-4 w-4"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </Button>
        </div>
        
        <CardContent className="flex-1 p-3">
          <div className="flex items-center text-xs text-gray-500 space-x-1">
            {showSubreddit && (
              <>
                <Link 
                  to={`/r/${post.subredditId}`} 
                  className="font-medium text-black hover:underline"
                >
                  r/{post.subreddit.name}
                </Link>
                <span>•</span>
              </>
            )}
            <span>Posted by</span>
            <span className="hover:underline">u/{post.author.username}</span>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
          </div>
          
          <Link to={`/post/${post.id}`} className="block mt-1">
            <h2 className="text-lg font-medium hover:text-reddit-blue">{post.title}</h2>
          </Link>
          
          {renderContent()}
          
          <CardFooter className="flex items-center p-0 mt-3">
            <Link to={`/post/${post.id}`} className="flex items-center text-gray-500 hover:bg-gray-100 px-2 py-1 rounded-md">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-4 w-4 mr-1"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="text-xs">{post.commentCount} comments</span>
            </Link>
          </CardFooter>
        </CardContent>
      </div>
    </Card>
  );
};

export default PostCard;
