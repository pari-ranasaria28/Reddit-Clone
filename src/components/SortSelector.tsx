
import { Button } from "@/components/ui/button";
import { SortOption } from "../types";
import { useData } from "../context/DataContext";

const SortSelector = () => {
  const { sortOption, setSortOption } = useData();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={sortOption === "top" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setSortOption("top")}
        className="text-sm"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="h-4 w-4 mr-1"
        >
          <path d="m18 15-6-6-6 6"/>
        </svg>
        Top
      </Button>
      <Button
        variant={sortOption === "new" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setSortOption("new")}
        className="text-sm"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="h-4 w-4 mr-1"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
        New
      </Button>
    </div>
  );
};

export default SortSelector;
