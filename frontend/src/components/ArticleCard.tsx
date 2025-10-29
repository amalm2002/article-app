import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Eye } from "lucide-react";

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

interface ArticleCardProps {
  article: Article;
  onView: () => void;
}

const ArticleCard = ({ article, onView }: ArticleCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            {article.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {article.description}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" />
            <span>{article.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsDown className="h-3 w-3" />
            <span>{article.dislikes}</span>
          </div>
          <span className="ml-auto">{article.date}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onView} variant="outline" className="w-full">
          <Eye className="h-4 w-4 mr-2" />
          Read Article
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
