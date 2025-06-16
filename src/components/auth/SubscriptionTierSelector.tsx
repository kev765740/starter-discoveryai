import React from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SubscriptionFeature {
  name: string;
  included: boolean;
}

interface SubscriptionTier {
  name: string;
  price: string;
  description: string;
  features: SubscriptionFeature[];
  popular?: boolean;
  buttonText: string;
}

interface SubscriptionTierSelectorProps {
  onSelectTier?: (tier: string) => void;
  selectedTier?: string;
}

const SubscriptionTierSelector: React.FC<SubscriptionTierSelectorProps> = ({
  onSelectTier = () => {},
  selectedTier = "free",
}) => {
  const subscriptionTiers: SubscriptionTier[] = [
    {
      name: "Free",
      price: "$0",
      description:
        "Basic features for individuals getting started with product discovery.",
      buttonText: "Get Started",
      features: [
        { name: "3 analyses per month", included: true },
        { name: "Basic AI insights", included: true },
        { name: "Export to PDF only", included: true },
        { name: "Community support", included: true },
        { name: "DiscoveryAI branding", included: true },
        { name: "Team collaboration", included: false },
        { name: "Advanced AI insights", included: false },
        { name: "Integration with tools", included: false },
      ],
    },
    {
      name: "Pro",
      price: "$29",
      description: "Advanced features for professionals and small teams.",
      buttonText: "Upgrade to Pro",
      popular: true,
      features: [
        { name: "50 analyses per month", included: true },
        { name: "Advanced AI insights with GPT-4", included: true },
        { name: "All export formats", included: true },
        { name: "Priority support", included: true },
        { name: "Custom branding", included: true },
        { name: "Team collaboration (up to 5)", included: true },
        { name: "Integration with development tools", included: true },
        { name: "White-label solution", included: false },
      ],
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "Complete solution for larger teams and organizations.",
      buttonText: "Contact Sales",
      features: [
        { name: "Unlimited analyses", included: true },
        { name: "White-label solution", included: true },
        { name: "Custom AI model training", included: true },
        { name: "API access", included: true },
        { name: "Advanced analytics dashboard", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Custom integrations", included: true },
        { name: "SLA guarantees", included: true },
      ],
    },
    {
      name: "Business",
      price: "$199",
      description: "Enterprise-grade features with multi-company management.",
      buttonText: "Contact Sales",
      features: [
        { name: "Everything in Enterprise", included: true },
        { name: "Multi-company management", included: true },
        { name: "Advanced reporting", included: true },
        { name: "Custom workflow automation", included: true },
        { name: "Bulk analysis processing", included: true },
        { name: "Data export APIs", included: true },
        { name: "Advanced security features", included: true },
        { name: "Custom consulting services", included: true },
      ],
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-background">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          Choose Your Plan
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the subscription tier that best fits your needs. All plans
          include access to our core AI-powered product discovery platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subscriptionTiers.map((tier) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex"
            whileHover={{ scale: 1.02 }}
          >
            <Card
              className={`flex flex-col w-full ${tier.popular ? "border-primary shadow-lg" : "border-border"}`}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{tier.name}</CardTitle>
                  {tier.popular && (
                    <Badge
                      variant="default"
                      className="bg-primary text-primary-foreground"
                    >
                      <Star className="h-3 w-3 mr-1" /> Popular
                    </Badge>
                  )}
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <CardDescription className="mt-2">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span
                        className={`mr-2 mt-0.5 ${feature.included ? "text-primary" : "text-muted-foreground"}`}
                      >
                        {feature.included ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <span className="block h-4 w-4 text-center">-</span>
                        )}
                      </span>
                      <span
                        className={
                          feature.included ? "" : "text-muted-foreground"
                        }
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={tier.popular ? "default" : "outline"}
                  className="w-full"
                  onClick={() => onSelectTier(tier.name.toLowerCase())}
                  disabled={selectedTier === tier.name.toLowerCase()}
                >
                  {selectedTier === tier.name.toLowerCase()
                    ? "Current Plan"
                    : tier.buttonText}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>
          All plans include a 14-day free trial. No credit card required to
          start.
        </p>
        <p className="mt-1">
          Need a custom solution?{" "}
          <a href="#" className="text-primary hover:underline">
            Contact our sales team
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SubscriptionTierSelector;
