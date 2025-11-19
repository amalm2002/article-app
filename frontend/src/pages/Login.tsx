import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import axiosConnection from "@/services/axios/axios";
import { useDispatch } from "react-redux";
import { userLogin } from "@/services/slice/userSlice";
import { validateEmail, validatePassword } from "@/utils/validation";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });


  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (errors.email || errors.password) {
      toast({
        title: "Error",
        description: "Please fix the errors before submitting",
        variant: "destructive",
      });
      return;
    }

    try {
      setShowAnimation(true);

      const response = await axiosConnection.post('/login', credentials)

      const userData = response.data.data;

      setTimeout(() => {
        dispatch(
          userLogin({
            user: `${userData.firstName} ${userData.lastName}`,
            user_id: userData._id,
            preferences: userData.preferences || [],
            isLogin: true
          })
        );
        setShowAnimation(false);
        toast({
          title: "Success",
          description: "Logged in successfully!",
        });
        navigate("/dashboard");
      }, 3000);

      return;
    } catch (error) {
      setShowAnimation(false);
      const errorMsg = error.response?.data?.message || "Failed to login";
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {showAnimation && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
          <DotLottieReact
            src="https://lottie.host/a7fd9ab5-0a0d-4885-b81d-a5bceb9618f8/k20Sd7CQKv.lottie"
            loop
            autoplay
            style={{ width: "250px", height: "250px" }}
          />
        </div>
      )}
      <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailOrPhone">Email</Label>
                <Input
                  id="emailOrPhone"
                  type="text"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCredentials({ ...credentials, email: value });

                    const error = validateEmail(value);
                    setErrors((prev) => ({ ...prev, email: error || "" }));
                  }}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) => {
                      const value = e.target.value;
                      setCredentials({ ...credentials, password: value });

                      const error = validatePassword(value);
                      setErrors((prev) => ({ ...prev, password: error || "" }));
                    }}
                    className="pr-10"
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>


              <Button type="submit" className="w-full">
                Sign In
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Create one
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </>

  );
};

export default Login;
