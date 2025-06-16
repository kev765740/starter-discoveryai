import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Users,
  Puzzle,
  Bell,
  Search,
  ChevronDown,
  FolderOpen,
  Code,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectsPage from "./ProjectsPage";
import AnalysesPage from "./AnalysesPage";
import ResearchMonitor from "../research/ResearchMonitor";
import CodePreview from "../codeGeneration/CodePreview";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const userSubscription = profile?.subscription_tier || "free";
  const userName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "";
  const userAvatar = "";
  // Determine which navigation items to show based on subscription tier
  const showEnterpriseFeatures = ["enterprise", "business"].includes(
    userSubscription,
  );
  const showBusinessFeatures = userSubscription === "business";

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="p-4">
          <h1 className="text-xl font-bold text-primary">DiscoveryAI</h1>
        </div>
        <Separator />
        <nav className="space-y-1 p-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium w-full text-left ${
              activeTab === "dashboard"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium w-full text-left ${
              activeTab === "projects"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <FolderOpen className="mr-2 h-4 w-4" />
            Projects
          </button>
          <button
            onClick={() => setActiveTab("analyses")}
            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium w-full text-left ${
              activeTab === "analyses"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Analyses
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium w-full text-left ${
              activeTab === "reports"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <FileText className="mr-2 h-4 w-4" />
            Reports
          </button>
          <button
            onClick={() => setActiveTab("code-generation")}
            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium w-full text-left ${
              activeTab === "code-generation"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Code className="mr-2 h-4 w-4" />
            Code Generation
          </button>
          <button
            onClick={() => setActiveTab("research-monitor")}
            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium w-full text-left ${
              activeTab === "research-monitor"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Research Monitor
          </button>
          <button
            onClick={() => setActiveTab("integrations")}
            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium w-full text-left ${
              activeTab === "integrations"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Puzzle className="mr-2 h-4 w-4" />
            Integrations
          </button>
          {showEnterpriseFeatures && (
            <button
              onClick={() => setActiveTab("team")}
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium w-full text-left ${
                activeTab === "team"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Users className="mr-2 h-4 w-4" />
              Team
            </button>
          )}
          {showBusinessFeatures && (
            <button
              onClick={() => setActiveTab("custom-models")}
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium w-full text-left ${
                activeTab === "custom-models"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Custom Models
            </button>
          )}
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium w-full text-left ${
              activeTab === "settings"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-md bg-muted p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium">
                  {userSubscription.charAt(0).toUpperCase() +
                    userSubscription.slice(1)}{" "}
                  Plan
                </p>
                {userSubscription === "free" && (
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs text-primary"
                  >
                    Upgrade Now
                  </Button>
                )}
              </div>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[200px] sm:w-[300px] pl-8"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto bg-background p-6">
          {children ? (
            children
          ) : (
            <>
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                      Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                      Welcome back, {userName}! Here's what's happening with
                      your projects.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Active Projects
                        </CardTitle>
                        <FolderOpen className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">
                          +1 from last month
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Analyses Run
                        </CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">15</div>
                        <p className="text-xs text-muted-foreground">
                          +5 from last week
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Insights Generated
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">23</div>
                        <p className="text-xs text-muted-foreground">
                          +12 from last week
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Team Members
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">6</div>
                        <p className="text-xs text-muted-foreground">
                          Active collaborators
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
              {activeTab === "projects" && <ProjectsPage />}
              {activeTab === "analyses" && <AnalysesPage />}
              {activeTab === "code-generation" && <CodePreview />}
              {activeTab === "research-monitor" && <ResearchMonitor />}
              {activeTab === "reports" && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-2">Reports</h2>
                  <p className="text-muted-foreground">
                    Reports feature coming soon...
                  </p>
                </div>
              )}
              {activeTab === "integrations" && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-2">Integrations</h2>
                  <p className="text-muted-foreground">
                    Integrations feature coming soon...
                  </p>
                </div>
              )}
              {activeTab === "team" && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-2">Team Management</h2>
                  <p className="text-muted-foreground">
                    Team management feature coming soon...
                  </p>
                </div>
              )}
              {activeTab === "custom-models" && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-2">Custom Models</h2>
                  <p className="text-muted-foreground">
                    Custom AI models feature coming soon...
                  </p>
                </div>
              )}
              {activeTab === "settings" && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold mb-2">Settings</h2>
                  <p className="text-muted-foreground">
                    Settings feature coming soon...
                  </p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
