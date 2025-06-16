import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github, Mail } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  companyName: z.string().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

interface AuthFormProps {
  onSubmit?: (
    values: LoginFormValues | SignupFormValues,
    type: "login" | "signup",
  ) => void;
  isLoading?: boolean;
  onSuccess?: () => void;
}

const AuthForm = ({
  onSubmit,
  isLoading = false,
  onSuccess,
}: AuthFormProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      companyName: "",
    },
  });

  const handleLoginSubmit = async (values: LoginFormValues) => {
    try {
      setAuthLoading(true);
      setError(null);

      if (onSubmit) {
        onSubmit(values, "login");
        return;
      }

      const { error } = await signIn(values.email, values.password);

      if (error) {
        setError(error.message);
      } else {
        if (onSuccess) {
          onSuccess();
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignupSubmit = async (values: SignupFormValues) => {
    try {
      setAuthLoading(true);
      setError(null);

      if (onSubmit) {
        onSubmit(values, "signup");
        return;
      }

      const { error } = await signUp(
        values.email,
        values.password,
        values.fullName,
        values.companyName,
      );

      if (error) {
        setError(error.message);
      } else {
        if (onSuccess) {
          onSuccess();
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-background">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Welcome to DiscoveryAI
        </CardTitle>
        <CardDescription className="text-center">
          {activeTab === "login"
            ? "Sign in to your account"
            : "Create a new account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            {error}
          </div>
        )}

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "signup")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form
              onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...loginForm.register("email")}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-xs"
                    type="button"
                  >
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...loginForm.register("password")}
                />
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || authLoading}
              >
                {isLoading || authLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form
              onSubmit={signupForm.handleSubmit(handleSignupSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  {...signupForm.register("fullName")}
                />
                {signupForm.formState.errors.fullName && (
                  <p className="text-sm text-destructive">
                    {signupForm.formState.errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="name@example.com"
                  {...signupForm.register("email")}
                />
                {signupForm.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {signupForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  {...signupForm.register("password")}
                />
                {signupForm.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {signupForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name (Optional)</Label>
                <Input
                  id="companyName"
                  placeholder="Acme Inc."
                  {...signupForm.register("companyName")}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || authLoading}
              >
                {isLoading || authLoading
                  ? "Creating account..."
                  : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="outline" type="button" className="w-full">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" type="button" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
        <p>By continuing, you agree to DiscoveryAI's</p>
        <p>
          <Button variant="link" className="p-0 h-auto text-xs" type="button">
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button variant="link" className="p-0 h-auto text-xs" type="button">
            Privacy Policy
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
