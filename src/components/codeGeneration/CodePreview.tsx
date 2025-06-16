import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Download,
  Copy,
  Eye,
  Code,
  Smartphone,
  Monitor,
  Tablet,
  Settings,
  Zap,
  FileText,
  GitBranch,
  CheckCircle,
  AlertCircle,
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
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface GenerationStep {
  id: string;
  name: string;
  status: "pending" | "running" | "completed" | "error";
  description: string;
  duration?: number;
  output?: string;
}

interface CodeFile {
  id: string;
  name: string;
  path: string;
  language: string;
  content: string;
  size: number;
  lastModified: string;
}

interface PreviewDevice {
  name: string;
  width: number;
  height: number;
  icon: React.ReactNode;
}

const CodePreview = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState("desktop");
  const [previewUrl, setPreviewUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [overallProgress, setOverallProgress] = useState(0);

  const devices: Record<string, PreviewDevice> = {
    mobile: {
      name: "Mobile",
      width: 375,
      height: 667,
      icon: <Smartphone className="h-4 w-4" />,
    },
    tablet: {
      name: "Tablet",
      width: 768,
      height: 1024,
      icon: <Tablet className="h-4 w-4" />,
    },
    desktop: {
      name: "Desktop",
      width: 1200,
      height: 800,
      icon: <Monitor className="h-4 w-4" />,
    },
  };

  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([
    {
      id: "1",
      name: "Analyzing Requirements",
      status: "completed",
      description:
        "Processing user requirements and generating project structure",
      duration: 2.3,
      output: "✓ Requirements analyzed successfully",
    },
    {
      id: "2",
      name: "Generating Components",
      status: "completed",
      description: "Creating React components based on specifications",
      duration: 4.7,
      output: "✓ 8 components generated",
    },
    {
      id: "3",
      name: "Setting up Routing",
      status: "running",
      description: "Configuring React Router and navigation structure",
    },
    {
      id: "4",
      name: "Styling & Theming",
      status: "pending",
      description: "Applying Tailwind CSS styles and theme configuration",
    },
    {
      id: "5",
      name: "Testing & Optimization",
      status: "pending",
      description: "Running tests and optimizing performance",
    },
    {
      id: "6",
      name: "Building Preview",
      status: "pending",
      description: "Compiling and deploying preview version",
    },
  ]);

  const [generatedFiles, setGeneratedFiles] = useState<CodeFile[]>([
    {
      id: "1",
      name: "App.tsx",
      path: "src/App.tsx",
      language: "typescript",
      content: `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;`,
      size: 1024,
      lastModified: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Dashboard.tsx",
      path: "src/components/Dashboard.tsx",
      language: "typescript",
      content: `import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;`,
      size: 2048,
      lastModified: "2024-01-15T10:32:00Z",
    },
    {
      id: "3",
      name: "Home.tsx",
      path: "src/components/Home.tsx",
      language: "typescript",
      content: `import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to Your App
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          This is your generated application. Start building amazing features!
        </p>
        <Button size="lg">
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Home;`,
      size: 1536,
      lastModified: "2024-01-15T10:31:00Z",
    },
  ]);

  const handleStartGeneration = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setCurrentStep(0);
    setOverallProgress(0);

    // Simulate generation process
    for (let i = 0; i < generationSteps.length; i++) {
      setCurrentStep(i);
      setGenerationSteps((prev) =>
        prev.map((step, index) =>
          index === i ? { ...step, status: "running" } : step,
        ),
      );

      // Simulate processing time with progress updates
      const stepDuration = 2000 + Math.random() * 3000;
      const progressInterval = setInterval(() => {
        setOverallProgress((prev) => {
          const stepProgress = ((i + 1) / generationSteps.length) * 100;
          return Math.min(stepProgress, prev + 2);
        });
      }, 100);

      await new Promise((resolve) => setTimeout(resolve, stepDuration));
      clearInterval(progressInterval);

      setGenerationSteps((prev) =>
        prev.map((step, index) =>
          index === i
            ? {
                ...step,
                status: "completed",
                duration: stepDuration / 1000,
                output: `✓ ${step.name} completed successfully`,
              }
            : step,
        ),
      );

      setOverallProgress(((i + 1) / generationSteps.length) * 100);
    }

    setIsGenerating(false);
    setPreviewUrl("https://festive-neumann4-ekgrc.view-3.tempo-dev.app");
  };

  const handleStopGeneration = () => {
    setIsGenerating(false);
  };

  const handleReset = () => {
    setGenerationSteps((prev) =>
      prev.map((step) => ({
        ...step,
        status: "pending",
        duration: undefined,
        output: undefined,
      })),
    );
    setCurrentStep(0);
    setPreviewUrl("");
    setOverallProgress(0);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "running":
        return (
          <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        );
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return (
          <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
        );
    }
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Code Generation & Live Preview
          </h1>
          <p className="text-muted-foreground">
            Generate code from natural language and see live previews as your
            project builds
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Generation Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Code Generation
          </CardTitle>
          <CardDescription>
            Describe what you want to build and watch as AI generates the code
            in real-time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">What do you want to build?</Label>
            <Input
              id="prompt"
              placeholder="e.g., Create a dashboard with user analytics, charts, and a sidebar navigation..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[60px]"
            />
          </div>
          <div className="flex items-center gap-2">
            {!isGenerating ? (
              <Button onClick={handleStartGeneration} disabled={!prompt.trim()}>
                <Play className="h-4 w-4 mr-2" />
                Start Generation
              </Button>
            ) : (
              <Button onClick={handleStopGeneration} variant="destructive">
                <Pause className="h-4 w-4 mr-2" />
                Stop Generation
              </Button>
            )}
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generation Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              Generation Progress
            </CardTitle>
            <CardDescription>
              Real-time progress of your code generation process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generationSteps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-3">
                  <div className="mt-1">{getStepIcon(step.status)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{step.name}</h4>
                      {step.duration && (
                        <span className="text-xs text-muted-foreground">
                          {step.duration.toFixed(1)}s
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                    {step.output && (
                      <p className="text-xs text-green-600">{step.output}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Live Preview
            </CardTitle>
            <CardDescription>
              See your application as it's being built
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Device Selector */}
              <div className="flex items-center gap-2">
                {Object.entries(devices).map(([key, device]) => (
                  <Button
                    key={key}
                    variant={selectedDevice === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDevice(key)}
                  >
                    {device.icon}
                    <span className="ml-1">{device.name}</span>
                  </Button>
                ))}
              </div>

              {/* Preview Frame */}
              <div className="border rounded-lg overflow-hidden bg-gray-50">
                {previewUrl ? (
                  <div
                    className="mx-auto bg-white shadow-sm"
                    style={{
                      width: Math.min(devices[selectedDevice].width, 600),
                      height: Math.min(devices[selectedDevice].height, 400),
                    }}
                  >
                    <iframe
                      src={previewUrl}
                      className="w-full h-full border-0"
                      title="Live Preview"
                    />
                  </div>
                ) : (
                  <div
                    className="mx-auto bg-gray-100 flex items-center justify-center"
                    style={{
                      width: Math.min(devices[selectedDevice].width, 600),
                      height: Math.min(devices[selectedDevice].height, 400),
                    }}
                  >
                    <div className="text-center text-muted-foreground">
                      <Monitor className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Preview will appear here</p>
                      <p className="text-sm">
                        Start generation to see live updates
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generated Files */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generated Files
          </CardTitle>
          <CardDescription>
            Explore and edit the generated code files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="files" className="space-y-4">
            <TabsList>
              <TabsTrigger value="files">File Explorer</TabsTrigger>
              <TabsTrigger value="code">Code Editor</TabsTrigger>
            </TabsList>

            <TabsContent value="files" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedFiles.map((file) => (
                  <Card
                    key={file.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{file.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {file.language}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs">
                        {file.path}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{(file.size / 1024).toFixed(1)} KB</span>
                        <span>
                          {new Date(file.lastModified).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Code className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(file.content)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="code">
              <div className="border rounded-lg">
                <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between">
                  <span className="text-sm font-medium">App.tsx</span>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="p-4">
                  <pre className="text-sm overflow-x-auto">
                    <code>{generatedFiles[0]?.content}</code>
                  </pre>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodePreview;
