import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, X } from "lucide-react";
import { backendApi } from "@/api/endpoints";

const CATEGORIES = [
  { id: "sports", label: "Sports" },
  { id: "politics", label: "Politics" },
  { id: "space", label: "Space" },
  { id: "technology", label: "Technology" },
  { id: "entertainment", label: "Entertainment" },
  { id: "science", label: "Science" },
  { id: "health", label: "Health" },
  { id: "business", label: "Business" },
];

const ArticleEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [articleData, setArticleData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchArticlesDetails = async () => {
      try {
        if (id) {
          const response = await backendApi.fetchArticleDetails(id);
          const article = response.data;
          setArticleData({
            title: article.title,
            description: article.description,
            category: article.category,
            tags: article.tags?.join(", ") || "",
          });
          setImagePreview(article.imageUrl);
        }
      } catch (error) {
        toast({ description: "Failed to load article details", variant: "destructive" });
      }
    };

    fetchArticlesDetails();
  }, [id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!articleData.category) {
      toast({ description: "Please select a category", variant: "destructive" });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", articleData.title);
      formData.append("description", articleData.description);
      formData.append("category", articleData.category);
      formData.append("tags", articleData.tags);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await backendApi.updateArticle(id, formData);
      toast({
        title: "Success",
        description: "Article updated successfully!"
      });
      navigate("/articles");
    } catch (error) {
      toast({ description: "Error updating article", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-4">
      <div className="container mx-auto max-w-3xl py-8">
        <Button variant="ghost" onClick={() => navigate("/articles")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to My Articles
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Edit Article</CardTitle>
            <CardDescription>Update your article details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={articleData.title}
                  onChange={(e) => setArticleData({ ...articleData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={6}
                  value={articleData.description}
                  onChange={(e) => setArticleData({ ...articleData, description: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Category</Label>
                <Select
                  value={articleData.category}
                  onValueChange={(value) => setArticleData({ ...articleData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={articleData.tags}
                  onChange={(e) => setArticleData({ ...articleData, tags: e.target.value })}
                />
              </div>

              <div>
                <Label>Image</Label>
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="preview" className="w-full h-64 object-cover rounded-lg" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImagePreview(null);
                        setImageFile(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed p-8 rounded-lg text-center">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-primary underline">Click to upload</span>
                    </Label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArticleEdit;
