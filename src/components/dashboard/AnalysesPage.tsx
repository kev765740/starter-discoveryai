import React, { useState } from "react";
import {
  Play,
  BarChart3,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Analysis {
  id: string;
  title: string;
  project: string;
  status: "running" | "completed" | "failed" | "pending";
  progress: number;
  startedAt: string;
  completedAt?: string;
  insights: number;
  type:
    | "market-analysis"
    | "competitor-analysis"
    | "user-research"
    | "feature-prioritization";
}

const AnalysesPage = () => {
  const [analyses] = useState<Analysis[]>([
    {
      id: "1",
      title: "Market Opportunity Assessment",
      project: "Mobile Banking App",
      status: "completed",
      progress: 100,
      startedAt: "2024-01-15T10:00:00Z",
      completedAt: "2024-01-15T10:45:00Z",
      insights: 12,
      type: "market-analysis",
    },
    {
      id: "2",
      title: "Competitor Landscape Analysis",
      project: "E-commerce Platform",
      status: "running",
      progress: 65,
      startedAt: "2024-01-15T14:30:00Z",
      insights: 8,
      type: "competitor-analysis",
    },
    {
      id: "3",
      title: "User Persona Generation",
      project: "AI Writing Assistant",
      status: "pending",
      progress: 0,
      startedAt: "2024-01-15T16:00:00Z",
      insights: 0,
      type: "user-research",
    },
    {
      id: "4",
      title: "Feature Prioritization Matrix",
      project: "Mobile Banking App",
      status: "failed",
      progress: 25,
      startedAt: "2024-01-14T09:15:00Z",
      insights: 3,
      type: "feature-prioritization",
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "running":
        return <Play className="h-4 w-4 text-blue-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "running":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "market-analysis":
        return <BarChart3 className="h-4 w-4" />;
      case "competitor-analysis":
        return <BarChart3 className="h-4 w-4" />;
      case "user-research":
        return <FileText className="h-4 w-4" />;
      case "feature-prioritization":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analyses</h1>
          <p className="text-muted-foreground">
            Track your AI-powered product discovery analyses
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Play className="h-4 w-4" />
          New Analysis
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Analyses
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyses.filter((a) => a.status === "completed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyses.filter((a) => a.status === "running").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Insights
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyses.reduce((sum, a) => sum + a.insights, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analyses List */}
      <div className="space-y-4">
        {analyses.map((analysis) => (
          <Card key={analysis.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(analysis.type)}
                    <CardTitle className="text-lg">{analysis.title}</CardTitle>
                  </div>
                  <CardDescription>
                    Project: {analysis.project} • Started{" "}
                    {new Date(analysis.startedAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={getStatusColor(analysis.status)}
                  >
                    <div className="flex items-center gap-1">
                      {getStatusIcon(analysis.status)}
                      {analysis.status.charAt(0).toUpperCase() +
                        analysis.status.slice(1)}
                    </div>
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.status === "running" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{analysis.progress}%</span>
                    </div>
                    <Progress value={analysis.progress} className="h-2" />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{analysis.insights} insights generated</span>
                    {analysis.completedAt && (
                      <span>
                        Completed{" "}
                        {new Date(analysis.completedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {analysis.status === "completed" && (
                      <Button variant="outline" size="sm">
                        View Results
                      </Button>
                    )}
                    {analysis.status === "failed" && (
                      <Button variant="outline" size="sm">
                        Retry
                      </Button>
                    )}
                    {analysis.status === "running" && (
                      <Button variant="outline" size="sm">
                        View Progress
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnalysesPage;
