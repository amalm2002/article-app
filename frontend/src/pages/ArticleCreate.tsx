import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/services/store";
import { backendApi } from "@/api/endpoints";
import { validateDescription, validateImage, validateTags, validateTitle } from "@/utils/validation";

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

const ArticleCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articleData, setArticleData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    tags: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const userId = useSelector((state: RootState) => state.userData.user_id);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const titleError = validateTitle(articleData.title);
    const descError = validateDescription(articleData.description);
    const tagsError = validateTags(articleData.tags);
    const imageError = validateImage(imageFile);

    setErrors({
      title: titleError || "",
      description: descError || "",
      tags: tagsError || "",
      image: imageError || "",
    });

    if (titleError || descError || tagsError || imageError) {
      toast({
        title: "Validation Error",
        description: "Please fix all errors before submitting",
        variant: "destructive",
      });
      return;
    }

    if (!articleData.category) {
      toast({
        title: "Error",
        description: "Please select a category",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", articleData.title);
      formData.append("description", articleData.description);
      formData.append("category", articleData.category);
      formData.append("tags", articleData.tags);
      formData.append("userId", userId);
      if (imageFile) formData.append("image", imageFile);

      const response = await backendApi.createArticle(formData)

      toast({
        title: "Success",
        description: "Article created successfully!",
      });
      navigate("/articles");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create article",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-white/15 bg-opacity-70 z-50 flex justify-center items-center">
          <DotLottieReact
            src="https://lottie.host/4bb05fdc-1d61-4219-b2eb-96365755cdd5/clhETaNW1v.lottie"
            loop
            autoplay
            className="w-[350px] h-[350px] shrink-0"
          />
        </div>
      )}


      <div className="min-h-screen bg-secondary p-4">
        <div className="container mx-auto max-w-3xl py-8">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>Create New Article</CardTitle>
              <CardDescription>Share your thoughts with the community</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Article Title</Label>
                  <Input
                    id="title"
                    value={articleData.title}
                    onChange={(e) => {
                      setArticleData({ ...articleData, title: e.target.value });
                      setErrors({ ...errors, title: "" });
                    }}
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={articleData.description}
                    onChange={(e) => {
                      setArticleData({ ...articleData, description: e.target.value });
                      setErrors({ ...errors, description: "" });
                    }}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>


                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={articleData.category}
                    onValueChange={(value) => setArticleData({ ...articleData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input
                    value={articleData.tags}
                    onChange={(e) => {
                      setArticleData({ ...articleData, tags: e.target.value });
                      setErrors({ ...errors, tags: "" });
                    }}
                  />
                  {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
                </div>


                <div className="space-y-2">
                  <Label>Article Image</Label>
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
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
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <span className="text-primary hover:underline">Click to upload</span> or drag and drop
                      </Label>
                      <Input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </div>
                  )}
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                  )}

                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    Publish Article
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ArticleCreate;
