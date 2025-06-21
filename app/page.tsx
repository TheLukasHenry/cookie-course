import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Cookie Course App
          </h1>
          <p className="text-xl text-muted-foreground">
            Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui Setup Complete!
            ✅
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>shadcn/ui Test</CardTitle>
              <CardDescription>
                Testing that components are working properly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-input">Test Input</Label>
                <Input id="test-input" placeholder="Type something..." />
              </div>
              <Button className="w-full">Test Button</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Setup Status</CardTitle>
              <CardDescription>Task 1 Implementation Status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span className="text-sm">Next.js 15 with TypeScript</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span className="text-sm">Tailwind CSS v4</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span className="text-sm">shadcn/ui Components</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span className="text-sm">App Router Structure</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>Ready for Task 2</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Azure Cosmos DB integration and database setup coming next!
              </p>
              <Button variant="outline" className="w-full mt-4">
                View Task 2
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Server running on{" "}
            <code className="bg-muted px-2 py-1 rounded">localhost:3000</code>
          </p>
        </div>
      </div>
    </div>
  );
}
