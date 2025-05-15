
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkAuthProvider } from "./context/ClerkAuthContext";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Communities from "./pages/Communities";
import Subreddit from "./pages/Subreddit";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ClerkAuthProvider>
      <AuthProvider>
        <DataProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/communities" element={<Communities />} />
                    <Route path="/r/:subredditId" element={<Subreddit />} />
                    <Route path="/r/:subredditId/submit" element={<CreatePost />} />
                    <Route path="/post/:postId" element={<Post />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <footer className="py-4 text-center text-sm text-gray-500 border-t">
                  <div className="container">
                    Reddit Clone MVP © {new Date().getFullYear()}
                  </div>
                </footer>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </DataProvider>
      </AuthProvider>
    </ClerkAuthProvider>
  </QueryClientProvider>
);

export default App;
