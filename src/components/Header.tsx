
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useClerkAuth } from "../context/ClerkAuthContext";
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Search, User, Settings } from "lucide-react";
import { useData } from "../context/DataContext";

const Header = () => {
  const { user, isAuthenticated } = useClerkAuth();
  const navigate = useNavigate();
  const { subreddits } = useData();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Search for subreddits matching the query
    const matchedSubreddit = subreddits.find(
      subreddit => subreddit.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (matchedSubreddit) {
      navigate(`/r/${matchedSubreddit.id}`);
      setSearchQuery("");
      toast.success(`Navigated to r/${matchedSubreddit.name}`);
    } else {
      toast.error(`Couldn't find a community named "${searchQuery}"`);
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-reddit-orange">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                  fill="white" 
                />
                <circle cx="9" cy="12" r="1.5" fill="#FF4500" />
                <circle cx="15" cy="12" r="1.5" fill="#FF4500" />
                <path 
                  d="M15.5 17C14.5 18 13.3 18.4 12 18.4C10.7 18.4 9.5 18 8.5 17" 
                  stroke="#FF4500" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M18.5 10.5C19.3284 10.5 20 9.82843 20 9C20 8.17157 19.3284 7.5 18.5 7.5C17.6716 7.5 17 8.17157 17 9C17 9.82843 17.6716 10.5 18.5 10.5Z" 
                  fill="#FF4500" 
                />
                <path 
                  d="M5.5 10.5C6.32843 10.5 7 9.82843 7 9C7 8.17157 6.32843 7.5 5.5 7.5C4.67157 7.5 4 8.17157 4 9C4 9.82843 4.67157 10.5 5.5 10.5Z" 
                  fill="#FF4500" 
                />
                <path 
                  d="M19 9C19 9 19 10 17.769 10.615C16.538 11.231 15.155 11.538 12.001 11.538C8.84642 11.538 7.41744 11.231 6.24106 10.615C5.06469 10 5.00024 9 5.00024 9" 
                  stroke="#FF4500" 
                  strokeWidth="1.5" 
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-reddit-dark">redditclone</h1>
          </Link>
        </div>
        
        <div className="flex-1 hidden max-w-xl px-4 mx-4 md:block">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search for communities"
              className="w-full bg-gray-100 border-gray-200 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
        
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative flex items-center space-x-2 h-9 w-auto">
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={user?.avatar} alt={user?.username} />
                    <AvatarFallback>{user?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden md:block">{user?.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleNavigate("/profile")} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigate("/settings")} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="w-full">
                    <UserButton afterSignOutUrl="/" />
                    <span className="ml-2">Sign Out</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="outline">Log In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Sign Up</Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
