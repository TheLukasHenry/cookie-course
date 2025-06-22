"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  DollarSign,
  Target,
  CheckCircle,
  Star,
  Heart,
  Shield,
  Zap,
  Award,
  BookOpen,
  Coffee,
} from "lucide-react";
import { MetricTile } from "./metric-tile";
import { ValueProposition } from "./value-proposition";
import { Button } from "./button";
import { Badge } from "./badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

export function DesignSystemShowcase() {
  return (
    <div className="w-full space-y-16 py-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-lavender-foreground via-mint-foreground to-soft-blue-foreground bg-clip-text text-transparent">
          Design System Showcase
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our comprehensive design system with pastel colors, animated
          components, and modern UI patterns.
        </p>
      </div>

      {/* Color Palette */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Pastel Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              name: "Lavender",
              bg: "bg-lavender",
              text: "text-lavender-foreground",
            },
            { name: "Mint", bg: "bg-mint", text: "text-mint-foreground" },
            {
              name: "Soft Blue",
              bg: "bg-soft-blue",
              text: "text-soft-blue-foreground",
            },
            { name: "Peach", bg: "bg-peach", text: "text-peach-foreground" },
            { name: "Rose", bg: "bg-rose", text: "text-rose-foreground" },
            { name: "Cream", bg: "bg-cream", text: "text-cream-foreground" },
          ].map((color, index) => (
            <motion.div
              key={color.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${color.bg} p-6 rounded-xl text-center shadow-lg`}
            >
              <div className={`${color.text} font-semibold`}>{color.name}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Metric Tiles */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Metric Tiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricTile
            title="Total Students"
            value={2457}
            change={{ value: 12.5, type: "increase" }}
            icon={Users}
            variant="lavender"
            size="lg"
            emphasis="strong"
          />
          <MetricTile
            title="Course Revenue"
            value={125340}
            prefix="$"
            change={{ value: 8.2, type: "increase" }}
            icon={DollarSign}
            variant="mint"
            size="md"
            emphasis="medium"
          />
          <MetricTile
            title="Completion Rate"
            value="89.5"
            suffix="%"
            change={{ value: 3.1, type: "increase" }}
            icon={Target}
            variant="softBlue"
            size="md"
            emphasis="medium"
          />
          <MetricTile
            title="Student Rating"
            value="4.9"
            suffix="/5"
            change={{ value: 0.2, type: "increase" }}
            icon={Star}
            variant="peach"
            size="md"
            emphasis="subtle"
          />
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Button Variants</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Button variant="lavender" size="lg">
            Lavender
          </Button>
          <Button variant="mint" size="lg">
            Mint
          </Button>
          <Button variant="softBlue" size="lg">
            Soft Blue
          </Button>
          <Button variant="peach" size="lg">
            Peach
          </Button>
          <Button variant="rose" size="lg">
            Rose
          </Button>
          <Button variant="cream" size="lg">
            Cream
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="gradientLavender" size="xl" className="font-bold">
            <Heart className="w-5 h-5" />
            Gradient Lavender
          </Button>
          <Button variant="gradientMint" size="xl" className="font-bold">
            <Zap className="w-5 h-5" />
            Gradient Mint
          </Button>
          <Button variant="gradientSoftBlue" size="xl" className="font-bold">
            <Award className="w-5 h-5" />
            Gradient Blue
          </Button>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Badge Variants</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="lavender">Lavender Badge</Badge>
          <Badge variant="mint">Mint Badge</Badge>
          <Badge variant="softBlue">Soft Blue Badge</Badge>
          <Badge variant="peach">Peach Badge</Badge>
          <Badge variant="rose">Rose Badge</Badge>
          <Badge variant="cream">Cream Badge</Badge>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Value Propositions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ValueProposition
            title="Expert-Led Courses"
            description="Learn from professional bakers with years of experience in creating delicious cookies and pastries."
            icon={BookOpen}
            features={[
              "Professional chef instructors",
              "Step-by-step video tutorials",
              "Real-time feedback",
              "Certificate of completion",
            ]}
            action={{
              label: "View Courses",
              href: "#courses",
            }}
            variant="filled"
            color="lavender"
            index={0}
          />
          <ValueProposition
            title="Hands-On Experience"
            description="Get practical experience with our interactive cooking sessions and personalized guidance."
            icon={Coffee}
            features={[
              "Interactive cooking sessions",
              "Personalized guidance",
              "Recipe variations",
              "Troubleshooting tips",
            ]}
            action={{
              label: "Start Learning",
              href: "#start",
            }}
            variant="filled"
            color="mint"
            index={1}
          />
          <ValueProposition
            title="Community Support"
            description="Join a community of passionate bakers and share your creations with fellow enthusiasts."
            icon={Users}
            features={[
              "Active community forum",
              "Recipe sharing",
              "Monthly challenges",
              "Expert Q&A sessions",
            ]}
            action={{
              label: "Join Community",
              href: "#community",
            }}
            variant="filled"
            color="softBlue"
            index={2}
          />
        </div>
      </section>

      {/* Card Variants */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Card Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-lavender/10 to-lavender/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-lavender-foreground" />
                Premium Quality
              </CardTitle>
              <CardDescription>
                We use only the finest ingredients in all our recipes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Every recipe is tested multiple times to ensure perfect results
                every time you bake.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-mint/10 to-mint/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-mint-foreground" />
                Easy to Follow
              </CardTitle>
              <CardDescription>
                Step-by-step instructions that anyone can follow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our clear instructions and visual guides make baking accessible
                to beginners and experts alike.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-soft-blue/10 to-soft-blue/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-soft-blue-foreground" />
                Award Winning
              </CardTitle>
              <CardDescription>
                Recognized by culinary institutions worldwide.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our courses have won multiple awards for excellence in culinary
                education.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Typography Scale */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Typography Scale</h2>
        <div className="space-y-4">
          <h1 className="text-6xl font-bold">Heading 1</h1>
          <h2 className="text-5xl font-bold">Heading 2</h2>
          <h3 className="text-4xl font-bold">Heading 3</h3>
          <h4 className="text-3xl font-bold">Heading 4</h4>
          <h5 className="text-2xl font-bold">Heading 5</h5>
          <h6 className="text-xl font-bold">Heading 6</h6>
          <p className="text-lg">Large paragraph text for important content</p>
          <p className="text-base">Regular paragraph text for body content</p>
          <p className="text-sm">
            Small text for captions and secondary information
          </p>
        </div>
      </section>
    </div>
  );
}
