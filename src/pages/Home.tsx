
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SubredditCard from "../components/SubredditCard";
import PostCard from "../components/PostCard";
import SortSelector from "../components/SortSelector";
import CreateSubredditDialog from "../components/CreateSubredditDialog";
import { useData } from "../context/DataContext";
import { useClerkAuth } from "../context/ClerkAuthContext";

const Home = () => {
  const { posts, subreddits } = useData();
  const { isAuthenticated } = useClerkAuth();
  const [isCreateSubredditOpen, setIsCreateSubredditOpen] = useState(false);

  // Show only the top 5 subreddits on the home page
  const topSubreddits = [...subreddits]
    .sort((a, b) => b.memberCount - a.memberCount)
    .slice(0, 5);

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Home</h1>
        <SortSelector />
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="order-2 md:order-1 md:col-span-2 space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          
          {posts.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <p className="text-gray-500 mb-4">No posts yet</p>
                {isAuthenticated ? (
                  <p className="text-center text-sm">
                    Join a community and start posting!
                  </p>
                ) : (
                  <p className="text-center text-sm">
                    <Link to="/login" className="text-reddit-blue hover:underline">
                      Log in
                    </Link>{" "}
                    to start posting and interacting with communities.
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="order-1 md:order-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>
                Welcome to RedditClone, a community-based content sharing platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Join communities, share content, and interact with other users.
              </p>
              <Button 
                className="w-full" 
                onClick={() => setIsCreateSubredditOpen(true)}
                disabled={!isAuthenticated}
              >
                Create Community
              </Button>
              {!isAuthenticated && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  You need to be logged in to create a community.
                </p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Communities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topSubreddits.map((subreddit) => (
                <SubredditCard key={subreddit.id} subreddit={subreddit} />
              ))}
              
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/communities">View All Communities</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <CreateSubredditDialog 
        isOpen={isCreateSubredditOpen} 
        onClose={() => setIsCreateSubredditOpen(false)} 
      />
    </div>
  );
};

export default Home;
