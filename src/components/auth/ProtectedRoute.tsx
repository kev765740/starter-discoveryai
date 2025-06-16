import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSubscription?: "free" | "pro" | "enterprise" | "business";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireSubscription,
}) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to home page with return url
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check subscription tier if required
  if (requireSubscription && profile) {
    const tierHierarchy = ["free", "pro", "enterprise", "business"];
    const userTierIndex = tierHierarchy.indexOf(profile.subscription_tier);
    const requiredTierIndex = tierHierarchy.indexOf(requireSubscription);

    if (userTierIndex < requiredTierIndex) {
      // Redirect to upgrade page or show upgrade modal
      return (
        <Navigate
          to="/upgrade"
          state={{ requiredTier: requireSubscription }}
          replace
        />
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
