
export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Subreddit {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  creatorId: string;
  memberCount: number;
}

export interface Post {
  id: string;
  title: string;
  content?: string;
  url?: string;
  createdAt: Date;
  updatedAt: Date;
  subredditId: string;
  authorId: string;
  voteCount: number;
  commentCount: number;
  author: User;
  subreddit: Subreddit;
  userVote?: number; // 1 for upvote, -1 for downvote, undefined for no vote
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  postId: string;
  parentId?: string;
  voteCount: number;
  author: User;
  userVote?: number; // 1 for upvote, -1 for downvote, undefined for no vote
  replies?: Comment[];
}

export interface Vote {
  id: string;
  value: number; // 1 for upvote, -1 for downvote
  userId: string;
  postId?: string;
  commentId?: string;
}

export type SortOption = "new" | "top";
