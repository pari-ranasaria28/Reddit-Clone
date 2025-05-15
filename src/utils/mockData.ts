
import { User, Subreddit, Post, Comment } from "../types";

// Mock users
export const users: User[] = [
  {
    id: "1",
    username: "reddituser1",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    username: "techguru",
    avatar: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "3",
    username: "memer2000",
    avatar: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    createdAt: new Date("2023-02-01"),
  },
];

// Mock subreddits
export const subreddits: Subreddit[] = [
  {
    id: "1",
    name: "programming",
    description: "All things programming and coding",
    createdAt: new Date("2023-01-10"),
    creatorId: "2",
    memberCount: 1250,
  },
  {
    id: "2",
    name: "technology",
    description: "Latest tech news and discussions",
    createdAt: new Date("2023-01-20"),
    creatorId: "1",
    memberCount: 980,
  },
  {
    id: "3",
    name: "movies",
    description: "Discuss your favorite films and TV shows",
    createdAt: new Date("2023-02-05"),
    creatorId: "3",
    memberCount: 2100,
  },
  {
    id: "4",
    name: "gaming",
    description: "For gamers and gaming enthusiasts",
    createdAt: new Date("2023-02-15"),
    creatorId: "1",
    memberCount: 1830,
  },
  {
    id: "5",
    name: "funny",
    description: "Share humor and memes",
    createdAt: new Date("2023-03-01"),
    creatorId: "3",
    memberCount: 3200,
  },
];

// Mock posts
export const posts: Post[] = [
  {
    id: "1",
    title: "What's your favorite programming language?",
    content: "I'm learning to code and can't decide what to focus on first. What language do you recommend for beginners?",
    createdAt: new Date("2023-04-05"),
    updatedAt: new Date("2023-04-05"),
    subredditId: "1",
    authorId: "1",
    voteCount: 42,
    commentCount: 5,
    author: users.find(u => u.id === "1")!,
    subreddit: subreddits.find(s => s.id === "1")!,
    userVote: 1
  },
  {
    id: "2",
    title: "New AI breakthrough can code entire websites from text descriptions",
    url: "https://tech-news-example.com/ai-coding",
    createdAt: new Date("2023-04-10"),
    updatedAt: new Date("2023-04-10"),
    subredditId: "2",
    authorId: "2",
    voteCount: 128,
    commentCount: 12,
    author: users.find(u => u.id === "2")!,
    subreddit: subreddits.find(s => s.id === "2")!,
  },
  {
    id: "3",
    title: "What do you think of the new Dune movie?",
    content: "Just watched it and was blown away by the visuals. What did everyone else think?",
    createdAt: new Date("2023-04-15"),
    updatedAt: new Date("2023-04-15"),
    subredditId: "3",
    authorId: "3",
    voteCount: 95,
    commentCount: 8,
    author: users.find(u => u.id === "3")!,
    subreddit: subreddits.find(s => s.id === "3")!,
    userVote: -1
  },
  {
    id: "4",
    title: "Tips for optimizing React applications?",
    content: "Working on a complex React app that's getting slow. Any best practices for performance optimization?",
    createdAt: new Date("2023-04-20"),
    updatedAt: new Date("2023-04-21"),
    subredditId: "1",
    authorId: "2",
    voteCount: 78,
    commentCount: 7,
    author: users.find(u => u.id === "2")!,
    subreddit: subreddits.find(s => s.id === "1")!,
  },
  {
    id: "5",
    title: "Leaked images of the next iPhone",
    url: "https://tech-news-example.com/iphone-leak",
    createdAt: new Date("2023-04-25"),
    updatedAt: new Date("2023-04-25"),
    subredditId: "2",
    authorId: "1",
    voteCount: 203,
    commentCount: 24,
    author: users.find(u => u.id === "1")!,
    subreddit: subreddits.find(s => s.id === "2")!,
  },
  {
    id: "6",
    title: "Best games of 2023 so far?",
    content: "We're halfway through the year. What are your top games released in 2023?",
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2023-05-01"),
    subredditId: "4",
    authorId: "3",
    voteCount: 67,
    commentCount: 14,
    author: users.find(u => u.id === "3")!,
    subreddit: subreddits.find(s => s.id === "4")!,
  },
  {
    id: "7",
    title: "This dog's reaction to its birthday cake is priceless",
    url: "https://funny-videos.example.com/dog-birthday",
    createdAt: new Date("2023-05-05"),
    updatedAt: new Date("2023-05-05"),
    subredditId: "5",
    authorId: "1",
    voteCount: 352,
    commentCount: 18,
    author: users.find(u => u.id === "1")!,
    subreddit: subreddits.find(s => s.id === "5")!,
  },
];

// Mock comments
export const comments: Comment[] = [
  {
    id: "1",
    content: "Python is great for beginners due to its readability and vast ecosystem.",
    createdAt: new Date("2023-04-05T12:30:00"),
    updatedAt: new Date("2023-04-05T12:30:00"),
    authorId: "2",
    postId: "1",
    voteCount: 15,
    author: users.find(u => u.id === "2")!,
    replies: [
      {
        id: "2",
        content: "I agree! Python was my first language and it made learning concepts much easier.",
        createdAt: new Date("2023-04-05T13:15:00"),
        updatedAt: new Date("2023-04-05T13:15:00"),
        authorId: "3",
        postId: "1",
        parentId: "1",
        voteCount: 8,
        author: users.find(u => u.id === "3")!,
      }
    ]
  },
  {
    id: "3",
    content: "JavaScript is unavoidable if you want to do web development.",
    createdAt: new Date("2023-04-05T14:00:00"),
    updatedAt: new Date("2023-04-05T14:00:00"),
    authorId: "1",
    postId: "1",
    voteCount: 12,
    author: users.find(u => u.id === "1")!,
    replies: []
  },
  {
    id: "4",
    content: "This is mind-blowing technology. The future of development is changing fast.",
    createdAt: new Date("2023-04-10T09:45:00"),
    updatedAt: new Date("2023-04-10T09:45:00"),
    authorId: "3",
    postId: "2",
    voteCount: 24,
    author: users.find(u => u.id === "3")!,
    replies: [
      {
        id: "5",
        content: "I wonder if developers will become obsolete or just work at a higher level of abstraction.",
        createdAt: new Date("2023-04-10T10:30:00"),
        updatedAt: new Date("2023-04-10T10:30:00"),
        authorId: "1",
        postId: "2",
        parentId: "4",
        voteCount: 18,
        author: users.find(u => u.id === "1")!,
      }
    ]
  },
];

// Helper function to create a UUID-like string
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Mock current user
export const currentUser: User = {
  id: "1",
  username: "reddituser1",
  avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  createdAt: new Date("2023-01-01"),
};

// Helper function to sort posts by new or top
export function sortPosts(posts: Post[], sortBy: "new" | "top"): Post[] {
  return [...posts].sort((a, b) => {
    if (sortBy === "new") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else {
      return b.voteCount - a.voteCount;
    }
  });
}
