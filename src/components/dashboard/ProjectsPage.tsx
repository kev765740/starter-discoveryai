import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "draft";
  lastUpdated: string;
  collaborators: number;
  analysisCount: number;
}

const ProjectsPage = () => {
  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "Mobile Banking App",
      description:
        "Comprehensive analysis for a new mobile banking application targeting millennials",
      status: "active",
      lastUpdated: "2024-01-15",
      collaborators: 3,
      analysisCount: 5,
    },
    {
      id: "2",
      name: "E-commerce Platform",
      description:
        "Market validation for B2B e-commerce platform in the healthcare sector",
      status: "completed",
      lastUpdated: "2024-01-10",
      collaborators: 2,
      analysisCount: 8,
    },
    {
      id: "3",
      name: "AI Writing Assistant",
      description:
        "Product discovery for AI-powered writing tool for content creators",
      status: "draft",
      lastUpdated: "2024-01-12",
      collaborators: 1,
      analysisCount: 2,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your product discovery projects and analyses
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(project.status)}
                  >
                    {project.status.charAt(0).toUpperCase() +
                      project.status.slice(1)}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Project</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm mb-4">
                {project.description}
              </CardDescription>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(project.lastUpdated).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {project.collaborators}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-muted-foreground">
                  {project.analysisCount} analyses
                </span>
                <Button variant="outline" size="sm">
                  View Project
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first project to start analyzing product opportunities
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
