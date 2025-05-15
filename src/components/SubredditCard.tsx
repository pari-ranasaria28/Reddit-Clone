
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Subreddit } from "../types";

interface SubredditCardProps {
  subreddit: Subreddit;
}

const SubredditCard = ({ subreddit }: SubredditCardProps) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="bg-reddit-blue/10 pb-2">
        <CardTitle className="text-lg">
          <Link to={`/r/${subreddit.id}`} className="hover:underline">
            r/{subreddit.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-gray-600 line-clamp-2">{subreddit.description || "No description"}</p>
        <div className="flex items-center mt-3 text-xs text-gray-500 space-x-2">
          <span>{subreddit.memberCount} members</span>
          <span>•</span>
          <span>Created {formatDistanceToNow(new Date(subreddit.createdAt))} ago</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/r/${subreddit.id}`} className="w-full">
          <Button variant="secondary" className="w-full">Browse Community</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SubredditCard;
