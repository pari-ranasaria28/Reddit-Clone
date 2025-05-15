import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Post, Subreddit, Comment, SortOption } from "../types";
import { posts as initialPosts, subreddits as initialSubreddits, comments as initialComments, generateId } from "../utils/mockData";
import { useClerkAuth } from "./ClerkAuthContext";
import { toast } from "sonner";

interface DataContextType {
  posts: Post[];
  subreddits: Subreddit[];
  comments: Comment[];
  loading: boolean;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  getPostsBySubreddit: (subredditId: string) => Post[];
  getPost: (postId: string) => Post | undefined;
  getSubreddit: (subredditId: string) => Subreddit | undefined;
  getCommentsByPost: (postId: string) => Comment[];
  createPost: (title: string, content: string | undefined, url: string | undefined, subredditId: string) => void;
  createSubreddit: (name: string, description: string) => void;
  createComment: (content: string, postId: string, parentId?: string) => void;
  votePost: (postId: string, value: number) => void;
  voteComment: (commentId: string, value: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [subreddits, setSubreddits] = useState<Subreddit[]>(initialSubreddits);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("top");
  const { user } = useClerkAuth();

  // Get posts for a specific subreddit, sorted according to the current sort option
  const getPostsBySubreddit = (subredditId: string) => {
    const subredditPosts = posts.filter(post => post.subredditId === subredditId);
    return sortPosts(subredditPosts);
  };

  // Get a single post by ID
  const getPost = (postId: string) => {
    return posts.find(post => post.id === postId);
  };

  // Get a single subreddit by ID
  const getSubreddit = (subredditId: string) => {
    return subreddits.find(subreddit => subreddit.id === subredditId);
  };

  // Get comments for a specific post, organized into a threaded structure
  const getCommentsByPost = (postId: string) => {
    // Filter top-level comments (no parentId)
    const topLevelComments = comments
      .filter(comment => comment.postId === postId && !comment.parentId)
      .map(comment => {
        // Find replies for this comment
        const replies = comments.filter(reply => reply.parentId === comment.id);
        return { ...comment, replies };
      });

    return topLevelComments;
  };

  // Create a new post
  const createPost = (title: string, content: string | undefined, url: string | undefined, subredditId: string) => {
    if (!user) {
      toast.error("You must be logged in to create a post.");
      return;
    }

    const subreddit = subreddits.find(s => s.id === subredditId);
    if (!subreddit) {
      toast.error("Subreddit not found.");
      return;
    }

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const newPost: Post = {
        id: generateId(),
        title,
        content,
        url,
        createdAt: new Date(),
        updatedAt: new Date(),
        subredditId,
        authorId: user.id,
        voteCount: 1, // Author's upvote
        commentCount: 0,
        author: user,
        subreddit,
        userVote: 1 // Auto-upvote your own post
      };

      setPosts(prevPosts => [newPost, ...prevPosts]);
      
      toast.success("Post created successfully.");
      
      setLoading(false);
    }, 800);
  };

  // Create a new subreddit
  const createSubreddit = (name: string, description: string) => {
    if (!user) {
      toast.error("You must be logged in to create a subreddit.");
      return;
    }

    // Check if subreddit name already exists
    if (subreddits.some(s => s.name.toLowerCase() === name.toLowerCase())) {
      toast.error("A subreddit with that name already exists.");
      return;
    }

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const newSubreddit: Subreddit = {
        id: generateId(),
        name,
        description,
        createdAt: new Date(),
        creatorId: user.id,
        memberCount: 1 // Creator is the first member
      };

      setSubreddits(prevSubreddits => [...prevSubreddits, newSubreddit]);
      
      toast.success("Subreddit created successfully.");
      
      setLoading(false);
    }, 800);
  };

  // Create a new comment
  const createComment = (content: string, postId: string, parentId?: string) => {
    if (!user) {
      toast.error("You must be logged in to comment.");
      return;
    }

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const newComment: Comment = {
        id: generateId(),
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: user.id,
        postId,
        parentId,
        voteCount: 1, // Author's upvote
        author: user,
        userVote: 1, // Auto-upvote your own comment
        replies: []
      };

      setComments(prevComments => [...prevComments, newComment]);

      // Update the comment count on the post
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, commentCount: post.commentCount + 1 } 
            : post
        )
      );
      
      toast.success("Comment added successfully.");
      
      setLoading(false);
    }, 800);
  };

  // Vote on a post (upvote or downvote)
  const votePost = (postId: string, value: number) => {
    if (!user) {
      toast.error("You must be logged in to vote.");
      return;
    }

    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          // Calculate vote delta based on previous vote
          let voteDelta = value;
          if (post.userVote !== undefined) {
            if (post.userVote === value) {
              // Cancel vote if clicking the same button
              voteDelta = -value;
              return { ...post, voteCount: post.voteCount - value, userVote: undefined };
            } else {
              // Change vote direction (from upvote to downvote or vice versa)
              voteDelta = value * 2; // Double the effect (remove previous vote and add new vote)
            }
          }
          
          return { ...post, voteCount: post.voteCount + voteDelta, userVote: post.userVote === value ? undefined : value };
        }
        return post;
      })
    );
  };

  // Vote on a comment
  const voteComment = (commentId: string, value: number) => {
    if (!user) {
      toast.error("You must be logged in to vote.");
      return;
    }

    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === commentId) {
          // Calculate vote delta based on previous vote
          let voteDelta = value;
          if (comment.userVote !== undefined) {
            if (comment.userVote === value) {
              // Cancel vote if clicking the same button
              voteDelta = -value;
              return { ...comment, voteCount: comment.voteCount - value, userVote: undefined };
            } else {
              // Change vote direction (from upvote to downvote or vice versa)
              voteDelta = value * 2; // Double the effect (remove previous vote and add new vote)
            }
          }
          
          return { ...comment, voteCount: comment.voteCount + voteDelta, userVote: comment.userVote === value ? undefined : value };
        }
        return comment;
      })
    );
  };

  // Sort posts based on the current sort option
  const sortPosts = (postsToSort: Post[]) => {
    return [...postsToSort].sort((a, b) => {
      if (sortOption === "new") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else { // "top"
        return b.voteCount - a.voteCount;
      }
    });
  };

  return (
    <DataContext.Provider
      value={{
        posts: sortPosts(posts),
        subreddits,
        comments,
        loading,
        sortOption,
        setSortOption,
        getPostsBySubreddit,
        getPost,
        getSubreddit,
        getCommentsByPost,
        createPost,
        createSubreddit,
        createComment,
        votePost,
        voteComment
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
