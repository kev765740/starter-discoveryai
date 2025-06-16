import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import AuthForm from "./auth/AuthForm";
import SubscriptionTierSelector from "./auth/SubscriptionTierSelector";

const Home = () => {
  const { user, loading } = useAuth();
  const [authStep, setAuthStep] = React.useState<"auth" | "subscription">(
    "auth",
  );
  const [authType, setAuthType] = React.useState<"login" | "signup">("login");

  // Redirect to dashboard if already authenticated
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleAuthSuccess = () => {
    setAuthStep("subscription");
  };

  const handleSubscriptionSelected = () => {
    // In a real app, this would navigate to the dashboard
    console.log("Subscription selected, would navigate to dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex flex-col">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">DiscoveryAI</h1>
        </div>
        <div className="flex gap-4">
          {authStep === "auth" && (
            <Button
              variant="ghost"
              onClick={() =>
                setAuthType(authType === "login" ? "signup" : "login")
              }
            >
              {authType === "login" ? "Sign Up" : "Log In"}
            </Button>
          )}
          <Button variant="outline">Contact Sales</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">
        {authStep === "auth" ? (
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Discover Your Next{" "}
                <span className="text-primary">Product Opportunity</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                AI-powered product discovery platform that helps teams validate
                ideas, analyze markets, and generate actionable insights.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Validate product ideas in minutes, not months</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Generate detailed market analysis reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Prioritize features with AI-driven insights</span>
                </div>
              </div>
            </motion.div>

            {/* Auth Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>
                    {authType === "login" ? "Welcome Back" : "Get Started"}
                  </CardTitle>
                  <CardDescription>
                    {authType === "login"
                      ? "Sign in to your DiscoveryAI account"
                      : "Create an account to start discovering product opportunities"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AuthForm onSuccess={handleAuthSuccess} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-6xl"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Choose Your Plan</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Select the subscription tier that best fits your needs. You can
                upgrade or downgrade at any time.
              </p>
            </div>
            <SubscriptionTierSelector onSelect={handleSubscriptionSelected} />
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Case Studies</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Community</li>
                <li>Help Center</li>
                <li>Partners</li>
                <li>Status</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Security</li>
                <li>GDPR</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold">DiscoveryAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DiscoveryAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
