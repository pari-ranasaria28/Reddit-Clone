
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useClerkAuth } from "../context/ClerkAuthContext";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/clerk-react";

const Profile = () => {
  const { user } = useClerkAuth();

  if (!user) {
    return (
      <div className="container py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Not Signed In</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">Please sign in to view your profile</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-2xl">{user.username}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Member since {user.createdAt.toLocaleDateString()}
            </p>
          </div>
          <div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="space-y-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground">No posts yet</p>
                <Button className="mt-2" variant="outline">Create a Post</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="comments" className="space-y-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground">No comments yet</p>
              </div>
            </TabsContent>
            
            <TabsContent value="saved" className="space-y-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground">No saved posts yet</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
