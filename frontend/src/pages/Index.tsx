import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, TrendingUp, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <BookOpen className="h-16 w-16 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold">Article Feeds</h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
            Discover, create, and share articles across various topics. Join our community of writers and readers today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" onClick={() => navigate("/register")}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-card">
            <Users className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-semibold">Community Driven</h3>
            <p className="text-muted-foreground">
              Connect with writers and readers who share your interests
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-card">
            <TrendingUp className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-semibold">Personalized Feed</h3>
            <p className="text-muted-foreground">
              Customize your preferences to see articles that matter to you
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-card">
            <Zap className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-semibold">Easy Publishing</h3>
            <p className="text-muted-foreground">
              Share your thoughts and manage your articles effortlessly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
