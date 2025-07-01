"use client";

import React, { useState } from "react";
import NavigationBar from "@/components/ui/navigation-bar";
import LessonsTable from "@/components/lessons-table";
import { motion } from "framer-motion";
import { BookOpen, ChefHat, Users, Star } from "lucide-react";

// Glass morphism card component
function GlassMorphismCard({
  children,
  className = "",
  blur = "md",
  opacity = 10,
}: {
  children: React.ReactNode;
  className?: string;
  blur?: string;
  opacity?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`backdrop-blur-${blur} bg-white/${opacity} border border-white/20 rounded-xl shadow-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function LessonsPage() {
  const stats = [
    {
      icon: BookOpen,
      label: "Total Lessons",
      value: "50+",
      description: "Comprehensive recipes"
    },
    {
      icon: ChefHat,
      label: "Expert Instructors",
      value: "12",
      description: "Professional chefs"
    },
    {
      icon: Users,
      label: "Students Enrolled",
      value: "10K+",
      description: "Active learners"
    },
    {
      icon: Star,
      label: "Average Rating",
      value: "4.9",
      description: "Student satisfaction"
    }
  ];

  // Navigation items for the lessons page
  const navItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "lessons", label: "Lessons", href: "/lessons" },
    { id: "participants", label: "Participants", href: "#participants" },
    { id: "about", label: "About", href: "#about" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Background with overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/backgroundImages/baking1.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-orange-900/50 to-red-900/60" />
      </div>

      {/* Navigation */}
      <NavigationBar items={navItems} />

      {/* Main content */}
      <div className="relative z-10 pt-20">
        {/* Header Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <GlassMorphismCard className="p-8 md:p-12" opacity={15}>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Our Baking{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-red-300">
                    Lessons
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                  Discover our comprehensive collection of baking lessons, from beginner-friendly basics to advanced artisan techniques.
                </p>
              </GlassMorphismCard>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassMorphismCard className="p-6 text-center" opacity={12}>
                    <stat.icon className="w-8 h-8 text-amber-300 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-lg font-semibold text-white/90 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-white/70">
                      {stat.description}
                    </div>
                  </GlassMorphismCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Lessons Table Section */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <LessonsTable />
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}