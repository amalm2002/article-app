import { useState } from "react";
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

interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  image: string;
  likes: number;
  dislikes: number;
}

interface ArticleDialogProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleDialog = ({ article, isOpen, onClose }: ArticleDialogProps) => {
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      toast({ description: "Like removed" });
    } else {
      setLiked(true);
      setDisliked(false);
      toast({ description: "Article liked!" });
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
      toast({ description: "Dislike removed" });
    } else {
      setDisliked(true);
      setLiked(false);
      toast({ description: "Article disliked" });
    }
  };

  const handleBlock = () => {
    setBlocked(true);
    toast({
      title: "Article blocked",
      description: "You won't see articles from this category anymore",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <DialogTitle className="text-2xl">{article.title}</DialogTitle>
              <Badge variant="secondary">{article.category}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>By {article.author}</span>
              <span>•</span>
              <span>{article.date}</span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover rounded-lg"
          />

          <p className="text-foreground leading-relaxed">{article.description}</p>

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
                {liked ? "Liked" : "Like"} ({article.likes + (liked ? 1 : 0)})
              </Button>
              <Button
                variant={disliked ? "destructive" : "outline"}
                size="sm"
                onClick={handleDislike}
                disabled={blocked}
              >
                <ThumbsDown className="h-4 w-4 mr-2" />
                {disliked ? "Disliked" : "Dislike"} ({article.dislikes + (disliked ? 1 : 0)})
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
