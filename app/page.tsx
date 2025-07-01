"use client";

import { useState, useEffect } from "react";
import NavigationBar from "@/components/ui/navigation-bar";
import ParticipantsTable from "@/components/participants-table";
import LessonsTable from "@/components/lessons-table";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Calendar,
  ChefHat,
  BookOpen,
  Star,
  Clock,
  Mail,
  Phone,
  MapPin,
  Send,
  UserPlus,
} from "lucide-react";
import { useBackgroundParallax } from "@/hooks/useParallax";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Enhanced animated text cycle component
function AnimatedTextCycle({
  words,
  interval = 3000,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  const containerVariants = {
    hidden: { y: -20, opacity: 0, filter: "blur(8px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
    exit: { y: 20, opacity: 0, filter: "blur(8px)" },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={currentIndex}
        className={`inline-block font-bold ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {words[currentIndex]}
      </motion.span>
    </AnimatePresence>
  );
}

// Enhanced glowing gradient button
function GlowingGradientButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  [key: string]: any;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const gradientClass =
    variant === "primary"
      ? "from-amber-400 via-orange-500 to-red-500"
      : "from-blue-400 via-purple-500 to-pink-500";

  return (
    <button
      className={`relative px-6 py-3.5 rounded-lg text-xl text-white cursor-pointer transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradientClass} rounded-lg`}
      />
      <div
        className={`absolute inset-0.5 bg-gray-900/90 rounded-md transition-opacity duration-500 ${
          isHovered ? "opacity-70" : "opacity-100"
        }`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradientClass} rounded-lg blur-xl transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// Enhanced glass morphism card
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

// Enhanced Hero Section with Parallax Background (Content on LEFT)
const EnhancedHeroSection = () => {
  const parallaxRef = useBackgroundParallax({ speed: 0.4 });
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        width: Math.random() * 8 + 4,
        height: Math.random() * 8 + 4,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  const bakingWords = [
    "artisanal cookies",
    "fresh pastries",
    "custom cakes",
    "gourmet treats",
    "seasonal delights",
  ];

  return (
    <section
      id="hero"
      ref={parallaxRef}
      className="relative min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden flex items-center justify-start"
      style={{
        backgroundImage: "url('/backgroundImages/baking1.png')",
      }}
    >
      {/* Enhanced overlay with warm colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-orange-900/70 to-transparent" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-300/30"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              top: p.top,
              left: p.left,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Content positioned on the left */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <GlassMorphismCard className="p-6 md:p-12" opacity={15}>
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-flex items-center px-4 py-2 bg-amber-500/20 rounded-full mb-6">
                  <Star className="w-4 h-4 text-amber-300 mr-2" />
                  <span className="text-amber-200 text-sm font-medium">
                    New Cookie Course Available
                  </span>
                </div>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Master the Art of{" "}
                <AnimatedTextCycle
                  words={bakingWords}
                  interval={3000}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 drop-shadow-lg"
                />
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Join thousands in our comprehensive cookie course, from basic
                techniques to artisan mastery.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <GlowingGradientButton className="text-lg px-8 py-4">
                  <ChefHat className="w-5 h-5 mr-2 inline" />
                  Start Learning Today
                </GlowingGradientButton>

                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-4"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Watch Preview
                </Button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-300">10K+</div>
                  <div className="text-white/70 text-sm">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-300">4.9★</div>
                  <div className="text-white/70 text-sm">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-300">50+</div>
                  <div className="text-white/70 text-sm">Recipes</div>
                </div>
              </motion.div>
            </GlassMorphismCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Enhanced About Section with Parallax Background
const EnhancedAboutSection = () => {
  const parallaxRef = useBackgroundParallax({ speed: 0.3 });

  const features = [
    {
      icon: ChefHat,
      title: "Expert Instructors",
      desc: "Learn from professional pastry chefs",
    },
    {
      icon: BookOpen,
      title: "50+ Recipes",
      desc: "Comprehensive recipe collection",
    },
    {
      icon: Users,
      title: "Community",
      desc: "Join 10,000+ baking enthusiasts",
    },
    {
      icon: Star,
      title: "Certification",
      desc: "Earn your professional certificate",
    },
  ];

  return (
    <section
      id="about"
      ref={parallaxRef}
      className="relative min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden py-24"
      style={{
        backgroundImage: "url('/backgroundImages/baking6.png')",
      }}
    >
      {/* Enhanced overlay with cool tones */}
      <div className="absolute inset-0 bg-gradient-to-l from-blue-900/85 via-indigo-900/75 to-purple-900/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content positioned on the right */}
          <div className="lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GlassMorphismCard className="p-4 md:p-8" opacity={15}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full mb-6">
                    <Clock className="w-4 h-4 text-blue-300 mr-2" />
                    <span className="text-blue-200 text-sm font-medium">
                      Professional Training
                    </span>
                  </div>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  We're passionate bakers and{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
                    educators
                  </span>
                </h2>

                <p className="text-white/90 text-lg mb-6 leading-relaxed">
                  Our comprehensive course combines traditional techniques with
                  modern innovations, creating an unforgettable learning
                  experience that will transform you into a cookie master.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
                    >
                      <feature.icon className="w-8 h-8 text-blue-300 mb-2" />
                      <div className="text-lg font-semibold text-white mb-1">
                        {feature.title}
                      </div>
                      <div className="text-white/70 text-sm">
                        {feature.desc}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <GlowingGradientButton variant="secondary">
                  <UserPlus className="w-5 h-5 mr-2 inline" />
                  Join Our Community
                </GlowingGradientButton>
              </GlassMorphismCard>
            </motion.div>
          </div>

          {/* Visual element on the left */}
          <div className="lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <GlassMorphismCard className="p-4 md:p-8" opacity={10}>
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center"
                  >
                    <ChefHat className="w-16 h-16 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    3D Cookie Illustration
                  </h3>
                  <p className="text-white/70">
                    Interactive Learning Experience
                  </p>

                  <motion.div
                    className="mt-6 grid grid-cols-2 gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                      <div className="text-2xl font-bold text-blue-300">
                        25+
                      </div>
                      <div className="text-white/70 text-sm">
                        Years Experience
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                      <div className="text-2xl font-bold text-blue-300">
                        150+
                      </div>
                      <div className="text-white/70 text-sm">Daily Items</div>
                    </div>
                  </motion.div>
                </div>
              </GlassMorphismCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Contact Section with Parallax Background
const EnhancedContactSection = () => {
  const parallaxRef = useBackgroundParallax({ speed: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={parallaxRef}
      className="relative min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden py-24"
      style={{
        backgroundImage: "url('/backgroundImages/baking10.png')",
      }}
    >
      {/* Enhanced overlay with warm sunset colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-900/85 via-orange-900/75 to-yellow-900/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-pink-500/20 rounded-full mb-6">
            <Mail className="w-4 h-4 text-pink-300 mr-2" />
            <span className="text-pink-200 text-sm font-medium">
              Let's Connect
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-orange-300 to-yellow-300">
              Touch
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions about our cookie course? We'd love to hear from you!
            Reach out and let's start your sweet journey together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact form on the right */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:order-2"
          >
            <GlassMorphismCard className="p-4 md:p-8" opacity={15}>
              <h3 className="text-2xl font-bold text-white mb-6">
                Send us a message
              </h3>
              <p className="text-white/70 mb-6">
                We typically respond within 24 hours. Can't wait to hear about
                your cookie dreams!
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/15 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/15 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your cookie goals..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm resize-none focus:bg-white/15 transition-all duration-300"
                    required
                  />
                </div>

                <GlowingGradientButton type="submit" className="w-full">
                  <Send className="w-5 h-5 mr-2 inline" />
                  Send Message
                </GlowingGradientButton>
              </form>
            </GlassMorphismCard>
          </motion.div>

          {/* Contact info on the left */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:order-1 space-y-6"
          >
            <GlassMorphismCard className="p-6" opacity={12}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Email Us
                  </h4>
                  <p className="text-white/80">
                    Send us a message anytime
                    <br />
                    <span className="text-pink-300">
                      hello@cookiecourse.com
                    </span>
                  </p>
                </div>
              </div>
            </GlassMorphismCard>

            <GlassMorphismCard className="p-6" opacity={12}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Call Us
                  </h4>
                  <p className="text-white/80">
                    Speak with our team
                    <br />
                    <span className="text-orange-300">(555) 123-COOKIE</span>
                  </p>
                </div>
              </div>
            </GlassMorphismCard>

            <GlassMorphismCard className="p-6" opacity={12}>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Visit Us
                  </h4>
                  <p className="text-white/80">
                    Our baking studio
                    <br />
                    <span className="text-yellow-300">Sweet Street Bakery</span>
                  </p>
                </div>
              </div>
            </GlassMorphismCard>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <GlassMorphismCard className="p-6 text-center" opacity={15}>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-yellow-300 mb-2">
                  Quick Response Promise
                </div>
                <p className="text-white/80 text-sm">
                  We're passionate about helping you succeed! All course
                  inquiries are answered within 24 hours, and we'll schedule a
                  sweet consultation to discuss your baking goals.
                </p>
              </GlassMorphismCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [showParticipants, setShowParticipants] = useState(false);
  const [showLessons, setShowLessons] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <NavigationBar />

      {/* Hero Section */}
      <EnhancedHeroSection />

      {/* Participants Section */}
      <section
        id="participants"
        className="min-h-screen flex flex-col justify-center py-20 px-4"
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Participants
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Manage and track all course participants with our comprehensive
              management system.
            </p>

            <Button
              onClick={() => setShowParticipants(!showParticipants)}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
            >
              <Users className="w-6 h-6 mr-2" />
              {showParticipants ? "Hide Participants" : "Show Participants"}
            </Button>
          </motion.div>

          <AnimatePresence>
            {showParticipants ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <ParticipantsTable />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <motion.div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                  <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Active Students
                  </h3>
                  <p className="text-4xl font-bold text-blue-400">847</p>
                </motion.div>
                <motion.div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                  <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Enrolled This Month
                  </h3>
                  <p className="text-4xl font-bold text-purple-400">124</p>
                </motion.div>
                <motion.div className="bg-gradient-to-br from-pink-500/20 to-red-600/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                  <ChefHat className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Completion Rate
                  </h3>
                  <p className="text-4xl font-bold text-pink-400">94%</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lessons Section */}
      <section
        id="lessons"
        className="min-h-screen flex flex-col justify-center py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
              Lessons
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Comprehensive lesson management system for scheduling and tracking
              course progress.
            </p>

            <Button
              onClick={() => setShowLessons(!showLessons)}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
            >
              <BookOpen className="w-6 h-6 mr-2" />
              {showLessons ? "Hide Lessons" : "Show Lessons"}
            </Button>
          </motion.div>

          <AnimatePresence>
            {showLessons ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <LessonsTable />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <motion.div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                  <BookOpen className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Total Lessons
                  </h3>
                  <p className="text-4xl font-bold text-amber-400">156</p>
                </motion.div>
                <motion.div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                  <Calendar className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    This Week
                  </h3>
                  <p className="text-4xl font-bold text-orange-400">23</p>
                </motion.div>
                <motion.div className="bg-gradient-to-br from-red-500/20 to-pink-600/20 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                  <Users className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Avg Attendance
                  </h3>
                  <p className="text-4xl font-bold text-red-400">89%</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* About Section */}
      <EnhancedAboutSection />

      {/* Contact Section */}
      <EnhancedContactSection />
    </div>
  );
}
