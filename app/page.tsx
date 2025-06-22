"use client";

import { useState } from "react";
import NavigationBar from "@/components/ui/navigation-bar";
import CookieHeroSection from "@/components/ui/cookie-hero-section";
import {
  AboutSection,
  ContactSection,
} from "@/components/ui/about-contact-sections";
import ParticipantsTable from "@/components/participants-table";
import LessonsTable from "@/components/lessons-table";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Calendar, ChefHat, BookOpen } from "lucide-react";

// Participants Section Component
const ParticipantsSection = () => {
  const [showTable, setShowTable] = useState(false);

  return (
    <section
      id="participants"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center px-4 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <motion.div
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 border border-blue-200 backdrop-blur-sm mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <Users className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">
            Student Community
          </span>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Meet Our{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Students
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Join a vibrant community of passionate bakers from around the world.
          Manage enrollments, track progress, and celebrate achievements
          together.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => setShowTable(!showTable)}
            size="lg"
            className={`px-8 py-6 text-lg font-semibold transition-all duration-300 ${
              showTable
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            }`}
          >
            <Users className="mr-2 h-5 w-5" />
            {showTable ? "Hide Participants" : "Manage Participants"}
          </Button>
        </motion.div>
      </motion.div>

      {showTable && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-7xl mx-auto"
        >
          <ParticipantsTable />
        </motion.div>
      )}

      {!showTable && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            {
              icon: ChefHat,
              title: "Active Students",
              value: "2,847",
              desc: "Currently enrolled",
            },
            {
              icon: BookOpen,
              title: "Completed Courses",
              value: "1,203",
              desc: "Successfully graduated",
            },
            {
              icon: Calendar,
              title: "Success Rate",
              value: "96%",
              desc: "Course completion",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg border border-white/20"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {stat.value}
              </h3>
              <p className="text-lg font-medium text-gray-700 mb-1">
                {stat.title}
              </p>
              <p className="text-sm text-gray-500">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

// Lessons Section Component
const LessonsSection = () => {
  const [showTable, setShowTable] = useState(false);

  return (
    <section
      id="lessons"
      className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 flex flex-col items-center justify-center px-4 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <motion.div
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 border border-green-200 backdrop-blur-sm mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <Calendar className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-gray-700">
            Course Curriculum
          </span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Cookie{" "}
          <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Masterclasses
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Comprehensive lessons designed by master bakers. From basic techniques
          to advanced decorating, every session is crafted to elevate your
          skills.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => setShowTable(!showTable)}
            size="lg"
            className={`px-8 py-6 text-lg font-semibold transition-all duration-300 ${
              showTable
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
            }`}
          >
            <Calendar className="mr-2 h-5 w-5" />
            {showTable ? "Hide Lessons" : "View Lessons"}
          </Button>
        </motion.div>
      </motion.div>

      {showTable && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-7xl mx-auto"
        >
          <LessonsTable />
        </motion.div>
      )}

      {!showTable && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            {
              icon: BookOpen,
              title: "Total Lessons",
              value: "24",
              desc: "Comprehensive modules",
            },
            {
              icon: Calendar,
              title: "Duration",
              value: "8 weeks",
              desc: "Self-paced learning",
            },
            {
              icon: ChefHat,
              title: "Skill Levels",
              value: "3",
              desc: "Beginner to Advanced",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg border border-white/20"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <stat.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {stat.value}
              </h3>
              <p className="text-lg font-medium text-gray-700 mb-1">
                {stat.title}
              </p>
              <p className="text-sm text-gray-500">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Navigation */}
      <NavigationBar />

      {/* Hero Section */}
      <CookieHeroSection />

      {/* Participants Section */}
      <ParticipantsSection />

      {/* Lessons Section */}
      <LessonsSection />

      {/* About Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
