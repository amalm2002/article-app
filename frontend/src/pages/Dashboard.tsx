import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Plus, Settings, List, LogOut } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import ArticleDialog from "@/components/ArticleDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/services/store";
import { userLogout } from "@/services/slice/userSlice";
import { toast } from "@/hooks/use-toast";
import { backendApi } from "@/api/endpoints";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const userId = useSelector((state: RootState) => state.userData.user_id);
  const preferences = useSelector((state: RootState) => state.userData.preferences);

  useEffect(() => {
    const fetchUserPreferenceArticles = async () => {
      try {
        setLoading(true);
        const response = await backendApi.userPreferenceArticles({ userId, preferences });

        setArticles(response.articles || []);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to load articles",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (userId && preferences?.length > 0) {
      fetchUserPreferenceArticles();
    }
  }, [userId, preferences]);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    dispatch(userLogout());
  };

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
              <Button variant="ghost" size="sm" onClick={() => navigate("/article/create")}>
                <Plus className="h-4 w-4 mr-2" /> Create Article
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/articles")}>
                <List className="h-4 w-4 mr-2" /> My Articles
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate("/settings")}>
                <Settings className="h-4 w-4 mr-2" /> Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" /> Logout
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

        {/* Loading */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading articles...</p>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article._id}
                article={{
                  id: article._id,
                  title: article.title,
                  description: article.description,
                  category: article.category,
                  author: article.userId,
                  date: new Date(article.createdAt).toLocaleDateString(),
                  image: article.imageUrl || article.image,
                  likes: article.likes || 0,
                  dislikes: article.dislikes || 0,
                }}
                onView={() => setSelectedArticle(article)}
              />

            ))}
          </div>
        ) : (
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
