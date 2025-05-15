
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "../components/PostCard";
import SortSelector from "../components/SortSelector";
import { useData } from "../context/DataContext";
import { useClerkAuth } from "../context/ClerkAuthContext";
import { formatDistanceToNow } from "date-fns";

const Subreddit = () => {
  const { subredditId } = useParams<{ subredditId: string }>();
  const { getSubreddit, getPostsBySubreddit } = useData();
  const { isAuthenticated } = useClerkAuth();
  const navigate = useNavigate();
  
  const subreddit = getSubreddit(subredditId || "");
  const posts = subredditId ? getPostsBySubreddit(subredditId) : [];

  if (!subreddit) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Community Not Found</h1>
        <p className="text-gray-600 mb-6">The community you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/communities")}>Browse Communities</Button>
      </div>
    );
  }

  return (
    <div>
      {/* Subreddit header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container py-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">r/{subreddit.name}</h1>
              <p className="text-sm text-gray-500">
                {subreddit.memberCount} members • Created {formatDistanceToNow(new Date(subreddit.createdAt))} ago
              </p>
            </div>
            
            <Button 
              onClick={() => navigate(`/r/${subredditId}/submit`)}
              disabled={!isAuthenticated}
            >
              Create Post
            </Button>
          </div>
          
          {subreddit.description && (
            <p className="mt-3 text-gray-700">{subreddit.description}</p>
          )}
        </div>
      </div>
      
      {/* Posts section */}
      <div className="container py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="order-2 md:order-1 md:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold">Posts</h2>
              <SortSelector />
            </div>
            
            {posts.map((post) => (
              <PostCard key={post.id} post={post} showSubreddit={false} />
            ))}
            
            {posts.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <p className="text-gray-500 mb-4">No posts in this community yet</p>
                  {isAuthenticated ? (
                    <Button 
                      onClick={() => navigate(`/r/${subredditId}/submit`)}
                    >
                      Create the first post
                    </Button>
                  ) : (
                    <p className="text-center text-sm">
                      <Link to="/login" className="text-reddit-blue hover:underline">
                        Log in
                      </Link>{" "}
                      to start posting in this community.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="order-1 md:order-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>About r/{subreddit.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {subreddit.description || "No description available"}
                </p>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Members:</span>
                    <span className="font-medium">{subreddit.memberCount}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-500">Created:</span>
                    <span className="font-medium">{formatDistanceToNow(new Date(subreddit.createdAt))} ago</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={() => navigate(`/r/${subredditId}/submit`)}
                  disabled={!isAuthenticated}
                >
                  Create Post
                </Button>
                
                {!isAuthenticated && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    You need to be logged in to create a post.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subreddit;
