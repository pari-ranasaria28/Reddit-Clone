
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import PostCard from "../components/PostCard";
import CommentItem from "../components/CommentItem";
import { useData } from "../context/DataContext";
import { useClerkAuth } from "../context/ClerkAuthContext";

const Post = () => {
  const { postId } = useParams<{ postId: string }>();
  const { getPost, getCommentsByPost, createComment, loading } = useData();
  const { isAuthenticated } = useClerkAuth();
  const navigate = useNavigate();
  
  const [commentContent, setCommentContent] = useState("");
  
  const post = postId ? getPost(postId) : undefined;
  const comments = postId ? getCommentsByPost(postId) : [];

  if (!post) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-6">The post you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/")}>Return to Home</Button>
      </div>
    );
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (commentContent.trim()) {
      createComment(commentContent, postId || "");
      setCommentContent("");
    }
  };

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="order-2 md:order-1 md:col-span-2 space-y-4">
          <PostCard post={post} />
          
          {/* Comment form */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">
                {isAuthenticated ? "Add a comment" : "Log in to add a comment"}
              </h3>
              
              {isAuthenticated ? (
                <form onSubmit={handleCommentSubmit}>
                  <Textarea
                    placeholder="What are your thoughts?"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-end mt-2">
                    <Button 
                      type="submit" 
                      disabled={!commentContent.trim() || loading}
                    >
                      {loading ? "Posting..." : "Comment"}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="bg-gray-50 p-4 rounded-md text-center">
                  <p className="text-gray-600 mb-2">You need to be logged in to comment</p>
                  <Button variant="outline">Log In</Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Comments section */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">
                {post.commentCount} {post.commentCount === 1 ? "Comment" : "Comments"}
              </h3>
              
              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} postId={post.id} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No comments yet</p>
                  <p className="text-sm text-gray-400 mt-1">Be the first to share your thoughts!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="order-1 md:order-2 space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">
                <Link to={`/r/${post.subredditId}`} className="hover:underline">
                  r/{post.subreddit.name}
                </Link>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {post.subreddit.description || "No description available"}
              </p>
              <Button 
                className="w-full" 
                onClick={() => navigate(`/r/${post.subredditId}/submit`)}
                disabled={!isAuthenticated}
              >
                Create Post
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Post;
