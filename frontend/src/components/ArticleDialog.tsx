import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, ThumbsDown, Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { backendApi } from "@/api/endpoints";
import { ArticleDialogProps } from "@/interfaces/article.types";



const ArticleDialog = ({ article, isOpen, onClose }: ArticleDialogProps) => {
  const { toast } = useToast();

  const [currentArticle, setCurrentArticle] = useState(article);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    setCurrentArticle(article);
    setLiked(article.likedBy?.includes(article.userId) || false);
    setDisliked(article.dislikedBy?.includes(article.userId) || false);
  }, [article]);

  const handleLike = async () => {
    try {
      const response = await backendApi.handleLike(
        currentArticle._id,
        currentArticle.userId
      );

      setCurrentArticle(response.data); 
      setLiked(!liked);
      setDisliked(false);

      toast({
        description: liked ? "Like removed" : "Article liked!",
      });
    } catch (error) {
      toast({ description: "Error while liking article" });
    }
  };

  const handleDislike = async () => {
    try {
      const response = await backendApi.handleDislike(
        currentArticle._id,
        currentArticle.userId
      );

      setCurrentArticle(response.data); 
      setDisliked(!disliked);
      setLiked(false);

      toast({
        description: disliked ? "Dislike removed" : "Article disliked!",
      });
    } catch (error) {
      toast({ description: "Error while disliking article" });
    }
  };

 const handleBlock = async () => {
  try {
    const response = await backendApi.blockArticle(currentArticle._id);

    setBlocked(true);
    toast({
      title: "Article blocked",
      description: "This article has been blocked successfully.",
    });

    onClose(); 
  } catch (error: any) {
    toast({
      title: "Error",
      description: error.response?.data?.message || "Failed to block article",
      variant: "destructive",
    });
  }
};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <DialogTitle className="text-2xl">{currentArticle.title}</DialogTitle>
              <Badge variant="secondary">{currentArticle.category}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>By {currentArticle.author}</span>
              <span>•</span>
              <span>{currentArticle.date}</span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="w-full h-64 overflow-hidden rounded-lg">
            <img
              src={currentArticle.imageUrl}
              alt={currentArticle.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <p className="text-foreground leading-relaxed">
            {currentArticle.description}
          </p>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant={liked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                disabled={blocked}
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                {liked ? "Liked" : "Like"} ({currentArticle.likes ?? 0})
              </Button>

              <Button
                variant={disliked ? "destructive" : "outline"}
                size="sm"
                onClick={handleDislike}
                disabled={blocked}
              >
                <ThumbsDown className="h-4 w-4 mr-2" />
                {disliked ? "Disliked" : "Dislike"} ({currentArticle.dislikes ?? 0})
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleBlock}
              disabled={blocked}
            >
              <Ban className="h-4 w-4 mr-2" />
              {blocked ? "Blocked" : "Block"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleDialog;
