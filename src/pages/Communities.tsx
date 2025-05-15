
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SubredditCard from "../components/SubredditCard";
import CreateSubredditDialog from "../components/CreateSubredditDialog";
import { useData } from "../context/DataContext";
import { useClerkAuth } from "../context/ClerkAuthContext";
import { Search } from "lucide-react";

const Communities = () => {
  const { subreddits } = useData();
  const { isAuthenticated } = useClerkAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateSubredditOpen, setIsCreateSubredditOpen] = useState(false);

  // Filter subreddits based on search term
  const filteredSubreddits = subreddits.filter((subreddit) =>
    subreddit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (subreddit.description && subreddit.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Communities</h1>
        <Button 
          onClick={() => setIsCreateSubredditOpen(true)}
          disabled={!isAuthenticated}
        >
          Create Community
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Find a community</CardTitle>
          <CardDescription>
            Search for communities by name or description.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search communities"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSubreddits.map((subreddit) => (
          <SubredditCard key={subreddit.id} subreddit={subreddit} />
        ))}
        
        {filteredSubreddits.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg mb-2">No communities found</p>
            <p className="text-sm text-gray-400">
              {searchTerm ? "Try a different search term" : "Create a new community to get started"}
            </p>
          </div>
        )}
      </div>
      
      <CreateSubredditDialog 
        isOpen={isCreateSubredditOpen} 
        onClose={() => setIsCreateSubredditOpen(false)} 
      />
    </div>
  );
};

export default Communities;
