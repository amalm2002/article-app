export interface ArticlePreference {
    userId: string;
    preferences: string[]
}

export interface Article {
    _id: string;
    title: string;
    description: string;
    category: string;
    author: string;
    date: string;
    image: string;
    imageUrl?: string;
    userId: string;
    likes: number;
    dislikes: number;
    likedBy?: string[];
    dislikedBy?: string[];
}

export interface ArticleDialogProps {
    article: Article;
    isOpen: boolean;
    onClose: () => void;
    onBlocked?: (id: string) => void;
    onUpdateArticle: (article: any) => void;
    onRemoveArticle: (id: string) => void;
}


export interface ArticleCard {
    id: number;
    title: string;
    description: string;
    category: string;
    author: string;
    date: string;
    image: string;
    imageUrl?: string;
    likes: number;
    dislikes: number;
}

export interface ArticleCardProps {
    article: ArticleCard;
    onView: () => void;
}