
import { useParams, useNavigate } from "react-router-dom";
import CreatePostForm from "../components/CreatePostForm";
import { useData } from "../context/DataContext";
import { useClerkAuth } from "../context/ClerkAuthContext";
import { Button } from "@/components/ui/button";

const CreatePost = () => {
  const { subredditId } = useParams<{ subredditId: string }>();
  const { getSubreddit } = useData();
  const { isAuthenticated } = useClerkAuth();
  const navigate = useNavigate();
  
  const subreddit = subredditId ? getSubreddit(subredditId) : undefined;

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container max-w-2xl py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
        <p className="text-gray-600 mb-6">You need to be logged in to create a post.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  // Redirect if subreddit doesn't exist
  if (!subreddit) {
    return (
      <div className="container max-w-2xl py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Community Not Found</h1>
        <p className="text-gray-600 mb-6">The community you're trying to post to doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/communities")}>Browse Communities</Button>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-6">
      <h1 className="text-2xl font-bold mb-4">Create a post in r/{subreddit.name}</h1>
      <CreatePostForm subredditId={subredditId || ""} />
    </div>
  );
};

export default CreatePost;
