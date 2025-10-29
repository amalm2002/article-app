import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Plus, Settings, List, LogOut } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import ArticleDialog from "@/components/ArticleDialog";
import { useDispatch } from "react-redux";
import { userLogout } from "@/services/slice/userSlice";

// Mock data
const MOCK_ARTICLES = [
  {
    id: 1,
    title: "The Future of Space Exploration",
    description: "Discover the latest advancements in space technology and upcoming missions to Mars and beyond.",
    category: "space",
    author: "John Doe",
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=800&auto=format&fit=crop",
    likes: 42,
    dislikes: 3,
  },
  {
    id: 2,
    title: "Championship Finals Preview",
    description: "An in-depth analysis of the upcoming championship match and what to expect from both teams.",
    category: "sports",
    author: "Jane Smith",
    date: "2024-01-14",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop",
    likes: 128,
    dislikes: 8,
  },
  {
    id: 3,
    title: "Political Landscape Shifts",
    description: "Analysis of recent political developments and their implications for the upcoming election season.",
    category: "politics",
    author: "Mike Johnson",
    date: "2024-01-13",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop",
    likes: 87,
    dislikes: 15,
  },
  {
    id: 4,
    title: "AI Breakthroughs in 2024",
    description: "The most significant artificial intelligence achievements and what they mean for the future.",
    category: "technology",
    author: "Sarah Williams",
    date: "2024-01-12",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    likes: 203,
    dislikes: 12,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<typeof MOCK_ARTICLES[0] | null>(null);

  const filteredArticles = MOCK_ARTICLES.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dispatch = useDispatch()
  const handileLogout = () => {
    dispatch(userLogout())
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Article Feeds</h1>
            </div>
            <nav className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/article/create")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Article
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/articles")}
              >
                <List className="h-4 w-4 mr-2" />
                My Articles
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/settings")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handileLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onView={() => setSelectedArticle(article)}
            />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found</p>
          </div>
        )}
      </main>

      {/* Article Dialog */}
      {selectedArticle && (
        <ArticleDialog
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
