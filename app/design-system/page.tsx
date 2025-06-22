"use client";

import React from "react";
import { DesignSystemShowcase } from "@/components/ui/design-system-showcase";
import NavigationBar from "@/components/ui/navigation-bar";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <NavigationBar />

      {/* Main Content */}
      <main className="pt-20">
        <div className="container mx-auto px-4">
          <DesignSystemShowcase />
        </div>
      </main>
    </div>
  );
}
