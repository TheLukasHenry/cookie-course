import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Building,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Clock,
  Globe,
  Shield,
  Zap,
  Award,
  Users,
  Calendar,
  TrendingUp,
  Cookie,
  ChefHat,
  Star,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

interface ContactSectionProps {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

const AboutSection = ({
  title = "About Our Cookie Course",
  subtitle = "DISCOVER THE MAGIC",
  description = "We're passionate bakers and educators dedicated to sharing the art of cookie making. Our comprehensive course combines traditional techniques with modern innovations, creating an unforgettable learning experience that will transform you into a cookie master.",
}: AboutSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const services = [
    {
      icon: <Cookie className="w-6 h-6" />,
      secondaryIcon: (
        <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-pink-400" />
      ),
      title: "Basic Techniques",
      description:
        "Master the fundamentals of cookie dough preparation, mixing methods, and essential baking principles that form the foundation of perfect cookies.",
      position: "left" as const,
    },
    {
      icon: <ChefHat className="w-6 h-6" />,
      secondaryIcon: (
        <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-pink-400" />
      ),
      title: "Advanced Decorating",
      description:
        "Learn professional decorating techniques including royal icing, fondant work, and intricate piping methods to create stunning cookie art.",
      position: "left" as const,
    },
    {
      icon: <Star className="w-6 h-6" />,
      secondaryIcon: (
        <Heart className="w-4 h-4 absolute -top-1 -right-1 text-pink-400" />
      ),
      title: "Recipe Development",
      description:
        "Discover how to create your own unique cookie recipes, understand ingredient functions, and develop signature flavors that wow.",
      position: "left" as const,
    },
    {
      icon: <Building className="w-6 h-6" />,
      secondaryIcon: (
        <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-pink-400" />
      ),
      title: "Business Skills",
      description:
        "Turn your passion into profit with essential business knowledge for starting your own cookie business or bakery venture.",
      position: "right" as const,
    },
    {
      icon: <Globe className="w-6 h-6" />,
      secondaryIcon: (
        <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-pink-400" />
      ),
      title: "Global Styles",
      description:
        "Explore cookie traditions from around the world, learning international techniques and flavor profiles to expand your repertoire.",
      position: "right" as const,
    },
    {
      icon: <Award className="w-6 h-6" />,
      secondaryIcon: (
        <Heart className="w-4 h-4 absolute -top-1 -right-1 text-pink-400" />
      ),
      title: "Certification",
      description:
        "Earn your professional cookie making certificate upon completion, validating your skills and opening new opportunities.",
      position: "right" as const,
    },
  ];

  const stats = [
    { icon: <Award />, value: 500, label: "Students Graduated", suffix: "+" },
    { icon: <Users />, value: 98, label: "Success Rate", suffix: "%" },
    { icon: <Calendar />, value: 5, label: "Years Teaching", suffix: "" },
    { icon: <TrendingUp />, value: 4.9, label: "Average Rating", suffix: "/5" },
  ];

  const StatCounter = ({
    icon,
    value,
    label,
    suffix,
    delay,
  }: {
    icon: React.ReactNode;
    value: number;
    label: string;
    suffix: string;
    delay: number;
  }) => {
    const countRef = useRef(null);
    const isInView = useInView(countRef, { once: false });
    const [hasAnimated, setHasAnimated] = useState(false);

    const springValue = useSpring(0, {
      stiffness: 50,
      damping: 10,
    });

    React.useEffect(() => {
      if (isInView && !hasAnimated) {
        springValue.set(value);
        setHasAnimated(true);
      } else if (!isInView && hasAnimated) {
        springValue.set(0);
        setHasAnimated(false);
      }
    }, [isInView, value, springValue, hasAnimated]);

    const displayValue = useTransform(springValue, (latest) =>
      value === 4.9 ? latest.toFixed(1) : Math.floor(latest)
    );

    return (
      <motion.div
        className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl flex flex-col items-center text-center group hover:bg-white transition-colors duration-300 shadow-lg"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay },
          },
        }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <motion.div
          className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center mb-4 text-pink-600 group-hover:bg-pink-200 transition-colors duration-300"
          whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
        >
          {icon}
        </motion.div>
        <motion.div
          ref={countRef}
          className="text-3xl font-bold text-gray-800 flex items-center"
        >
          <motion.span>{displayValue}</motion.span>
          <span>{suffix}</span>
        </motion.div>
        <p className="text-gray-600 text-sm mt-1">{label}</p>
        <motion.div className="w-10 h-0.5 bg-pink-400 mt-3 group-hover:w-16 transition-all duration-300" />
      </motion.div>
    );
  };

  const ServiceItem = ({
    icon,
    secondaryIcon,
    title,
    description,
    variants,
    delay,
    direction,
  }: {
    icon: React.ReactNode;
    secondaryIcon?: React.ReactNode;
    title: string;
    description: string;
    variants: any;
    delay: number;
    direction: "left" | "right";
  }) => {
    return (
      <motion.div
        className="flex flex-col group"
        variants={variants}
        transition={{ delay }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <motion.div
          className="flex items-center gap-3 mb-3"
          initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
        >
          <motion.div
            className="text-pink-600 bg-pink-100 p-3 rounded-lg transition-colors duration-300 group-hover:bg-pink-200 relative"
            whileHover={{
              rotate: [0, -10, 10, -5, 0],
              transition: { duration: 0.5 },
            }}
          >
            {icon}
            {secondaryIcon}
          </motion.div>
          <h3 className="text-xl font-medium text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
            {title}
          </h3>
        </motion.div>
        <motion.p
          className="text-sm text-gray-600 leading-relaxed pl-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.4 }}
        >
          {description}
        </motion.p>
        <motion.div
          className="mt-3 pl-12 flex items-center text-pink-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
        >
          <span className="flex items-center gap-1">
            Learn more <ArrowRight className="w-3 h-3" />
          </span>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full py-24 px-4 bg-gradient-to-b from-pink-50 to-purple-50 text-gray-800 overflow-hidden relative min-h-screen"
    >
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-pink-200/30 blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-200/30 blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
      />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          className="flex flex-col items-center mb-6"
          variants={itemVariants}
        >
          <motion.span
            className="text-pink-600 font-medium mb-2 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Cookie className="w-4 h-4" />
            {subtitle}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-center">
            {title}
          </h2>
          <motion.div
            className="w-24 h-1 bg-pink-400"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.p
          className="text-center max-w-2xl mx-auto mb-16 text-gray-600"
          variants={itemVariants}
        >
          {description}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="left"
                />
              ))}
          </div>

          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <motion.div
              className="relative w-full max-w-xs"
              variants={itemVariants}
            >
              <motion.div
                className="rounded-2xl overflow-hidden shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <div className="w-full h-80 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
                  <div className="text-center">
                    <Cookie className="w-16 h-16 text-pink-600 mx-auto mb-4" />
                    <p className="text-gray-700 font-medium">
                      3D Cookie Illustration
                    </p>
                    <p className="text-gray-500 text-sm">
                      Interactive Learning
                    </p>
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-transparent flex items-end justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <motion.button
                    className="bg-white text-pink-600 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Course <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <div className="space-y-16">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="right"
                />
              ))}
          </div>
        </div>

        <motion.div
          ref={statsRef}
          className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1">
            <h3 className="text-2xl font-medium mb-2">
              Ready to start your cookie journey?
            </h3>
            <p className="text-white/80">
              Join thousands of students who've mastered the art of cookie
              making.
            </p>
          </div>
          <motion.button
            className="bg-white text-pink-600 px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors hover:bg-pink-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enroll Now <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

const ContactSection = ({
  title = "Get in Touch",
  description = "Have questions about our cookie course? We'd love to hear from you! Reach out and let's start your sweet journey together.",
  phone = "(555) 123-COOKIE",
  email = "hello@cookiecourse.com",
  web = { label: "cookiecourse.com", url: "https://cookiecourse.com" },
}: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a message anytime",
      value: email,
      link: `mailto:${email}`,
      gradient: "from-pink-500/20 to-purple-500/20",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      value: phone,
      link: `tel:${phone.replace(/[^\d]/g, "")}`,
      gradient: "from-purple-500/20 to-blue-500/20",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our baking studio",
      value: "Sweet Street Bakery",
      link: "#location",
      gradient: "from-blue-500/20 to-pink-500/20",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-purple-50 to-pink-50 min-h-screen"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 border border-pink-200 backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Cookie className="h-4 w-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-700">
              Let's Connect
            </span>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Send us a message
              </h3>
              <p className="text-gray-600">
                We typically respond within 24 hours. Can't wait to hear about
                your cookie dreams!
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className={`pl-10 ${
                            errors.name ? "border-red-400" : ""
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className={`pl-10 ${
                            errors.email ? "border-red-400" : ""
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Textarea
                        id="message"
                        placeholder="Tell us about your cookie goals..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        className={`pl-10 resize-none ${
                          errors.message ? "border-red-400" : ""
                        }`}
                      />
                    </div>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thanks for reaching out! We'll get back to you within 24
                    hours.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    variant="outline"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Other ways to reach us
              </h3>
              <p className="text-gray-600">
                Choose the method that works best for you.
              </p>
            </div>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  className="block p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-pink-200 hover:bg-white transition-all group shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.gradient} border border-pink-200 flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <method.icon className="w-6 h-6 text-pink-600" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">
                        {method.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {method.description}
                      </p>
                      <p className="text-gray-800 font-medium">
                        {method.value}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="p-6 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl border border-pink-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-pink-600" />
                Quick Response Promise
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                We're passionate about helping you succeed! All course inquiries
                are answered within 24 hours, and we'll schedule a sweet
                consultation call to discuss your baking goals and how our
                course can help you achieve them.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { AboutSection, ContactSection };
