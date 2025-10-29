import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ThumbsUp, ThumbsDown, Ban, Unlock } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/services/store";
import { backendApi } from "@/api/endpoints";

const BlockedArticleList = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [blockedArticles, setBlockedArticles] = useState<any[]>([]);

    const userId = useSelector((state: RootState) => state.userData.user_id);

    useEffect(() => {
        const fetchBlockedArticles = async () => {
            try {
                const response = await backendApi.fetchBlockedArticles(userId);
                setBlockedArticles(response);
            } catch (error: any) {
                toast({
                    title: "Error",
                    description: error.response?.data?.message || "Failed to load blocked articles",
                    variant: "destructive",
                });
            }
        };
        fetchBlockedArticles();
    }, [userId]);

    const handleUnblock = async (articleId: string) => {
        try {
            await backendApi.unblockArticle(articleId);
            setBlockedArticles((prev) => prev.filter((a) => a._id !== articleId));

            toast({
                title: "Success",
                description: "Article unblocked successfully",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to unblock article",
                variant: "destructive",
            });
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
                </div>

                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">Blocked Articles</h1>
                    <p className="text-muted-foreground">
                        Review and manage articles that have been blocked
                    </p>
                </div>

                <div className="grid gap-6">
                    {blockedArticles.map((article) => (
                        <Card key={article._id}>
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
                            <CardFooter>
                                <Button onClick={() => handleUnblock(article._id)} className="bg-green-600 hover:bg-green-700">
                                    <Unlock className="h-4 w-4 mr-2" />
                                    Unblock
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {blockedArticles.length === 0 && (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-muted-foreground mb-4">
                                No blocked articles found.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default BlockedArticleList;
