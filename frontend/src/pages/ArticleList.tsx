import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Edit, Trash2, ThumbsUp, ThumbsDown, Ban } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSelector } from "react-redux";
import { RootState } from "@/services/store";
import { backendApi } from "@/api/endpoints";

const ArticleList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articles, setArticles] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const userId = useSelector((state: RootState) => state.userData.user_id)
  useEffect(() => {
    try {
      const fetchArticles = async () => {
        const response = await backendApi.fetchUserArticles(userId)
        setArticles(response);
      }
      fetchArticles()
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to load articles",
        variant: "destructive",
      });
    }
  }, [userId])

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await backendApi.deleteArticle(deleteId);

      setArticles((prevArticles) =>
        prevArticles.filter((a) => a._id !== deleteId)
      );

      toast({
        title: "Success",
        description: "Article deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete article",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };


  return (
    <div className="min-h-screen bg-secondary p-4">
      <div className="container mx-auto max-w-6xl py-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button onClick={() => navigate("/article/create")}>
            Create New Article
          </Button>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">My Articles</h1>
          <p className="text-muted-foreground">
            Manage and track your published articles
          </p>
        </div>

        <div className="grid gap-6">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                    <CardDescription>{article.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-4">
                    {article.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4 text-accent" />
                    <span>{article.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="h-4 w-4 text-destructive" />
                    <span>{article.dislikes} dislikes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Ban className="h-4 w-4 text-destructive" />
                    <span>{article.blocks} blocks</span>
                  </div>
                  <span className="ml-auto">Published: {article.date}</span>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/article/edit/${article._id}`)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteId(article._id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {articles.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                You haven't created any articles yet
              </p>
              <Button onClick={() => navigate("/article/create")}>
                Create Your First Article
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              article.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ArticleList;
