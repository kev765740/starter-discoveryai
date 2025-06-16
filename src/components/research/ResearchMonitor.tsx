import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Star,
  ExternalLink,
  RefreshCw,
  Filter,
  Search,
  Calendar,
  Users,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface MarketTrend {
  id: string;
  title: string;
  category: string;
  trend: "up" | "down" | "stable";
  percentage: number;
  description: string;
  source: string;
  timestamp: string;
  relevanceScore: number;
  tags: string[];
}

interface CompetitorInsight {
  id: string;
  company: string;
  product: string;
  action: string;
  impact: "high" | "medium" | "low";
  description: string;
  source: string;
  timestamp: string;
  category: string;
}

interface TechTrend {
  id: string;
  technology: string;
  adoption: "emerging" | "growing" | "mature" | "declining";
  description: string;
  useCases: string[];
  marketSize: string;
  growthRate: string;
  keyPlayers: string[];
}

const ResearchMonitor = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data - in real app, this would come from APIs
  const [marketTrends] = useState<MarketTrend[]>([
    {
      id: "1",
      title: "AI-Powered Customer Service Tools",
      category: "AI/ML",
      trend: "up",
      percentage: 45,
      description:
        "Growing demand for automated customer support solutions with 45% increase in searches",
      source: "Google Trends",
      timestamp: "2024-01-15T10:30:00Z",
      relevanceScore: 92,
      tags: ["AI", "Customer Service", "Automation", "SaaS"],
    },
    {
      id: "2",
      title: "No-Code Development Platforms",
      category: "Development",
      trend: "up",
      percentage: 38,
      description:
        "Significant growth in no-code/low-code platform adoption among businesses",
      source: "Industry Reports",
      timestamp: "2024-01-15T09:15:00Z",
      relevanceScore: 88,
      tags: ["No-Code", "Development", "Business Tools"],
    },
    {
      id: "3",
      title: "Traditional CRM Solutions",
      category: "Business Tools",
      trend: "down",
      percentage: -12,
      description:
        "Decline in traditional CRM adoption as businesses move to integrated solutions",
      source: "Market Analysis",
      timestamp: "2024-01-15T08:45:00Z",
      relevanceScore: 75,
      tags: ["CRM", "Business Tools", "Legacy"],
    },
  ]);

  const [competitorInsights] = useState<CompetitorInsight[]>([
    {
      id: "1",
      company: "Notion",
      product: "Notion AI",
      action: "Launched AI writing assistant",
      impact: "high",
      description:
        "Notion integrated AI writing capabilities directly into their workspace platform",
      source: "Product Hunt",
      timestamp: "2024-01-14T16:20:00Z",
      category: "Product Launch",
    },
    {
      id: "2",
      company: "Figma",
      product: "FigJam",
      action: "Added real-time collaboration features",
      impact: "medium",
      description:
        "Enhanced whiteboarding capabilities with improved real-time collaboration",
      source: "Tech News",
      timestamp: "2024-01-14T14:10:00Z",
      category: "Feature Update",
    },
    {
      id: "3",
      company: "Linear",
      product: "Linear Insights",
      action: "Raised $50M Series B",
      impact: "high",
      description:
        "Funding round to expand project management and analytics capabilities",
      source: "Venture Beat",
      timestamp: "2024-01-13T11:30:00Z",
      category: "Funding",
    },
  ]);

  const [techTrends] = useState<TechTrend[]>([
    {
      id: "1",
      technology: "Large Language Models (LLMs)",
      adoption: "growing",
      description: "Rapid adoption of LLMs for various business applications",
      useCases: [
        "Content Generation",
        "Code Assistance",
        "Customer Support",
        "Data Analysis",
      ],
      marketSize: "$4.3B",
      growthRate: "35% CAGR",
      keyPlayers: ["OpenAI", "Anthropic", "Google", "Microsoft"],
    },
    {
      id: "2",
      technology: "Edge Computing",
      adoption: "emerging",
      description:
        "Growing need for low-latency processing at the network edge",
      useCases: [
        "IoT Applications",
        "Real-time Analytics",
        "Content Delivery",
        "Gaming",
      ],
      marketSize: "$8.9B",
      growthRate: "28% CAGR",
      keyPlayers: ["AWS", "Microsoft", "Google Cloud", "Cloudflare"],
    },
    {
      id: "3",
      technology: "Quantum Computing",
      adoption: "emerging",
      description:
        "Early-stage but promising technology for complex problem solving",
      useCases: [
        "Cryptography",
        "Drug Discovery",
        "Financial Modeling",
        "Optimization",
      ],
      marketSize: "$1.3B",
      growthRate: "32% CAGR",
      keyPlayers: ["IBM", "Google", "Microsoft", "IonQ"],
    },
  ]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <BarChart3 className="h-4 w-4 text-gray-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAdoptionColor = (adoption: string) => {
    switch (adoption) {
      case "emerging":
        return "bg-blue-100 text-blue-800";
      case "growing":
        return "bg-green-100 text-green-800";
      case "mature":
        return "bg-purple-100 text-purple-800";
      case "declining":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Research Monitor
          </h1>
          <p className="text-muted-foreground">
            Stay updated with market trends, competitor insights, and technology
            developments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search trends, companies, or technologies..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Trending Topics
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Competitor Updates
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+3 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Market Opportunities
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">High potential</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tech Trends</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Emerging technologies
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
          <TabsTrigger value="competitors">Competitor Insights</TabsTrigger>
          <TabsTrigger value="technology">Technology Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          {marketTrends.map((trend) => (
            <Card key={trend.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {getTrendIcon(trend.trend)}
                      <CardTitle className="text-lg">{trend.title}</CardTitle>
                      <Badge variant="secondary">{trend.category}</Badge>
                    </div>
                    <CardDescription>{trend.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-lg font-bold ${
                        trend.trend === "up"
                          ? "text-green-600"
                          : trend.trend === "down"
                            ? "text-red-600"
                            : "text-gray-600"
                      }`}
                    >
                      {trend.percentage > 0 ? "+" : ""}
                      {trend.percentage}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Score: {trend.relevanceScore}/100
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {trend.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{trend.source}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span>
                      {new Date(trend.timestamp).toLocaleDateString()}
                    </span>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="competitors" className="space-y-4">
          {competitorInsights.map((insight) => (
            <Card key={insight.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">
                        {insight.company}
                      </CardTitle>
                      <Badge variant="secondary">{insight.product}</Badge>
                      <Badge className={getImpactColor(insight.impact)}>
                        {insight.impact.toUpperCase()} IMPACT
                      </Badge>
                    </div>
                    <CardDescription>{insight.action}</CardDescription>
                  </div>
                  <Badge variant="outline">{insight.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{insight.source}</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span>
                      {new Date(insight.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="technology" className="space-y-4">
          {techTrends.map((tech) => (
            <Card key={tech.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">
                        {tech.technology}
                      </CardTitle>
                      <Badge className={getAdoptionColor(tech.adoption)}>
                        {tech.adoption.toUpperCase()}
                      </Badge>
                    </div>
                    <CardDescription>{tech.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{tech.marketSize}</div>
                    <div className="text-sm text-muted-foreground">
                      {tech.growthRate}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Use Cases:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tech.useCases.map((useCase, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {useCase}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Players:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tech.keyPlayers.map((player, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {player}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResearchMonitor;
