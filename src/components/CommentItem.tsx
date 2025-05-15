import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { Comment } from "../types";
import { useData } from "../context/DataContext";
import { useClerkAuth } from "../context/ClerkAuthContext";

interface CommentItemProps {
  comment: Comment;
  postId: string;
}

const CommentItem = ({ comment, postId }: CommentItemProps) => {
  const { voteComment, createComment } = useData();
  const { isAuthenticated, user } = useClerkAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleVote = (value: number) => {
    voteComment(comment.id, value);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (replyContent.trim()) {
      createComment(replyContent, postId, comment.id);
      setReplyContent("");
      setShowReplyForm(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex">
        <div className="flex flex-col items-center mr-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-6 w-6 ${comment.userVote === 1 ? 'text-reddit-orange' : ''}`}
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
          
          <span className="text-xs font-medium my-1">{comment.voteCount}</span>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-6 w-6 ${comment.userVote === -1 ? 'text-blue-600' : ''}`}
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
        
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <Avatar className="w-6 h-6 mr-2">
              <AvatarImage src={comment.author.avatar} alt={comment.author.username} />
              <AvatarFallback>{comment.author.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{comment.author.username}</span>
            <span className="text-xs text-gray-500 ml-2">
              {formatDistanceToNow(new Date(comment.createdAt))} ago
            </span>
          </div>
          
          <div className="text-sm text-gray-800">{comment.content}</div>
          
          <div className="mt-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 px-2 text-xs text-gray-500 hover:bg-gray-100"
              onClick={() => isAuthenticated && setShowReplyForm(!showReplyForm)}
            >
              {showReplyForm ? "Cancel" : "Reply"}
            </Button>
          </div>
          
          {showReplyForm && isAuthenticated && (
            <form onSubmit={handleReplySubmit} className="mt-2">
              <Textarea
                placeholder="What are your thoughts?"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end mt-2 space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowReplyForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  size="sm"
                  disabled={!replyContent.trim()}
                >
                  Reply
                </Button>
              </div>
            </form>
          )}
          
          {/* Nested comments */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="border-l-2 border-gray-200 pl-4 mt-2">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} postId={postId} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
