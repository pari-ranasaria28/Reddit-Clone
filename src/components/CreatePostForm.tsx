
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useData } from "../context/DataContext";

interface CreatePostFormProps {
  subredditId: string;
}

const CreatePostForm = ({ subredditId }: CreatePostFormProps) => {
  const [title, setTitle] = useState("");
  const [postType, setPostType] = useState<"text" | "link">("text");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { createPost, loading } = useData();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length > 300) {
      newErrors.title = "Title must be less than 300 characters";
    }
    
    if (postType === "text") {
      // Content is optional for text posts
      if (content && content.length > 10000) {
        newErrors.content = "Content must be less than 10000 characters";
      }
    } else if (postType === "link") {
      if (!url.trim()) {
        newErrors.url = "URL is required";
      } else {
        try {
          new URL(url); // Validate URL format
        } catch (e) {
          newErrors.url = "Please enter a valid URL";
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (postType === "text") {
        createPost(title, content, undefined, subredditId);
      } else {
        createPost(title, undefined, url, subredditId);
      }
      
      // Navigate back to the subreddit page after submission
      navigate(`/r/${subredditId}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="post-title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="post-title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
            <p className="text-xs text-gray-500">
              {title.length}/300 characters
            </p>
          </div>
          
          <Tabs value={postType} onValueChange={(v) => setPostType(v as "text" | "link")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="link">Link</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="space-y-2">
              <Textarea
                placeholder="Text (optional)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`min-h-[200px] ${errors.content ? "border-red-500" : ""}`}
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content}</p>
              )}
              <p className="text-xs text-gray-500">
                {content.length}/10000 characters
              </p>
            </TabsContent>
            
            <TabsContent value="link" className="space-y-2">
              <Input
                placeholder="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={errors.url ? "border-red-500" : ""}
              />
              {errors.url && (
                <p className="text-sm text-red-500">{errors.url}</p>
              )}
            </TabsContent>
          </Tabs>
          
          <CardFooter className="px-0 pt-4">
            <div className="flex space-x-2 ml-auto">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Posting..." : "Post"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
