import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ArticleCreate from "./pages/ArticleCreate";
import ArticleList from "./pages/ArticleList";
import ArticleEdit from "./pages/ArticleEdit";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import { RootState } from "./services/store";

const queryClient = new QueryClient();

const App = () => {
  const isLogin = useSelector((state: RootState) => state.userData.isLogin);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={!isLogin ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={!isLogin ? <Login /> : <Navigate to="/dashboard" />} />

            {/* protect pages */}
            <Route path="/dashboard" element={isLogin ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/settings" element={isLogin ? <Settings /> : <Navigate to="/login" />} />
            <Route path="/article/create" element={isLogin ? <ArticleCreate /> : <Navigate to="/login" />} />
            <Route path="/articles" element={isLogin ? <ArticleList /> : <Navigate to="/login" />} />
            <Route path="/article/edit/:id" element={isLogin ? <ArticleEdit /> : <Navigate to="/login" />} />

            {/* catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
