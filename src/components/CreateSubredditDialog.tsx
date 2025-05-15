
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useData } from "../context/DataContext";

interface CreateSubredditDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateSubredditDialog = ({ isOpen, onClose }: CreateSubredditDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { createSubreddit, loading } = useData();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = "Community name is required";
    } else if (name.length < 3) {
      newErrors.name = "Community name must be at least 3 characters";
    } else if (name.length > 21) {
      newErrors.name = "Community name must be less than 22 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      newErrors.name = "Community name can only contain letters, numbers, and underscores";
    }
    
    if (description && description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      createSubreddit(name, description);
      
      // Reset form fields
      setName("");
      setDescription("");
      
      // Close dialog and navigate to the new subreddit
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create a Community</DialogTitle>
          <DialogDescription>
            Create a community to share and discuss content with others.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="community-name">
              Name <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center">
              <span className="text-gray-500 mr-1">r/</span>
              <Input
                id="community-name"
                type="text"
                placeholder="community_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
            <p className="text-xs text-gray-500">
              Community names must be between 3-21 characters, and can only contain letters, numbers, and underscores.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="community-description">Description (Optional)</Label>
            <Textarea
              id="community-description"
              placeholder="What is this community about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
            <p className="text-xs text-gray-500">
              {description.length}/500 characters
            </p>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Community"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubredditDialog;
