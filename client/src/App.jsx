import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Code,
  Database,
  Smartphone,
  Globe,
  Server,
  Cpu,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ui/ProjectCard";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "./context/AuthContext";
import axios from "axios";

function App() {
  const { data } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const { toast } = useToast();
  const [devImg, setDevImg] = useState("");
  const [devName, setDevName] = useState("");
  const [professionName, setProfessionName] = useState("");
  const [bio, setBio] = useState("");
  const [aboutME, setAboutME] = useState(null);
  const [aboutMECover, setAboutMECover] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNUmber] = useState(null);
  const [addressDetails, setAddressDetails] = useState(null);
  const [guiLink, setGuitLink] = useState(null);
  const [linkedInLink, setLinkedInLink] = useState(null);
  const [resumeLink, setResumeLink] = useState(null);
  const [formEndpoint, setFormEndpoint] = useState(null);
  const [projects, setProjects] = useState(null);
  const [skills, setSkills] = useState(null);
  const [facebookLink, setFacebookLink] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLinkAction = (url) => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      setIsPopupVisible(true);
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 2000);
      setTimeout(() => {
        // window.location.href = url;
        window.open(url, "_blank");
      }, 500);
    } catch (err) {
      if(import.meta.env.VITE_NODE_ENV === 'development') {
        console.error("Failed to copy text or redirect: ", err);
      }
      alert("Could not copy link. Please copy it manually: " + url);
      // window.location.href = url;
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    let userData = {
      profileImageSrc:
        "https://images.unsplash.com/photo-1551437288-dce670e4d1e6",
      name: "Md Aldehan Kabir Rhyme",
      profession: "Full Stack Web Developer & Programmer",
      bioDetails:
        "I specialize in building modern, responsive web applications and WordPress websites. With over 7 years of experience, I have worked on a wide range of technologies including HTML, CSS (Bootstrap, Tailwind), JavaScript (React, React Native, Node.js, Express), MongoDB, PHP, and WordPress. I'm also proficient in Python, Java, and C++.",
      aboutME: {
        Starting:
          'I discovered my passion for programming at the age of 12, when I wrote my first "Hello World" program. What started as curiosity quickly became an obsession with creating digital solutions that make a real impact.',
        ProfessionalMilestone:
          "One of my proudest achievements was collaborating with the VP of Sales at Squarespace to launch a successful digital marketing campaign. This experience taught me the importance of combining technical expertise with business strategy.",
        Today:
          "With over 7 years of experience, I continue to push the boundaries of what's possible on the web. I'm passionate about creating user-centric applications that solve real-world problems and deliver exceptional experiences.",
      },
      aboutMeCoverImage:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
      Email: "aldehan2500@gmail.com",
      phoneNumber: "+88 (018) 6870 0109",
      addressDetails: "Dhaka 1200, Bangladesh",
      guitHubLink: "#",
      LinkedinLink: "#",
      resumelink: "#",
      FBlink: "#",
      formendpoint: "#",
      projects: [
        {
          title: "E-Commerce Platform",
          description:
            "Full-stack e-commerce solution with React, Node.js, and MongoDB",
          projectDescription: `This project is a React-based web application for managing tasks. 
      It features a clean and intuitive user interface, persistent data storage using local storage, 
      and full responsiveness for mobile and desktop devices. It utilizes Tailwind CSS for styling 
      and is optimized for performance.`,
          technologies: [
            "React",
            "Node.js",
            "MongoDB",
            "Express",
            "Tailwind CSS",
          ],
          image:
            "Modern e-commerce website with shopping cart and product gallery",
        },
        {
          title: "Task Management App",
          description:
            "Collaborative task management application with real-time updates",
          projectDescription: `This project is a React-based web application for managing tasks. 
      It features a clean and intuitive user interface, persistent data storage using local storage, 
      and full responsiveness for mobile and desktop devices. It utilizes Tailwind CSS for styling 
      and is optimized for performance.`,
          technologies: ["React", "Firebase", "Material-UI", "JavaScript"],
          image: "Clean task management interface with kanban board",
        },
        {
          title: "WordPress Business Site",
          description: "Custom WordPress theme for a digital marketing agency",
          projectDescription: `This project is a React-based web application for managing tasks. 
      It features a clean and intuitive user interface, persistent data storage using local storage, 
      and full responsiveness for mobile and desktop devices. It utilizes Tailwind CSS for styling 
      and is optimized for performance.`,
          technologies: ["WordPress", "PHP", "CSS", "JavaScript", "MySQL"],
          image: "Professional business website with modern design",
        },
        {
          title: "Mobile Banking App",
          description: "React Native mobile application for banking services",
          projectDescription: `This project is a React-based web application for managing tasks. 
      It features a clean and intuitive user interface, persistent data storage using local storage, 
      and full responsiveness for mobile and desktop devices. It utilizes Tailwind CSS for styling 
      and is optimized for performance.`,
          technologies: ["React Native", "Redux", "Node.js", "PostgreSQL"],
          image: "Mobile banking app interface with transaction history",
        },
        {
          title: "Data Analytics Dashboard",
          description:
            "Interactive dashboard for business intelligence and analytics",
          projectDescription: `This project is a React-based web application for managing tasks. 
      It features a clean and intuitive user interface, persistent data storage using local storage, 
      and full responsiveness for mobile and desktop devices. It utilizes Tailwind CSS for styling 
      and is optimized for performance.`,
          technologies: ["Python", "Django", "Chart.js", "PostgreSQL"],
          image: "Analytics dashboard with charts and data visualizations",
        },
        {
          title: "Real Estate Platform",
          description:
            "Property listing and management system with advanced search",
          projectDescription: `This project is a React-based web application for managing tasks. 
      It features a clean and intuitive user interface, persistent data storage using local storage, 
      and full responsiveness for mobile and desktop devices. It utilizes Tailwind CSS for styling 
      and is optimized for performance.`,
          technologies: ["React", "Express", "MongoDB", "Google Maps API"],
          image: "Real estate website with property listings and map view",
        },
      ],
      skills: [
        {
          category: "Frontend",
          icon: <Code className="w-6 h-6" />,
          items: [
            "HTML",
            "CSS",
            "Bootstrap",
            "Tailwind CSS",
            "JavaScript",
            "React",
            "jQuery",
          ],
        },
        {
          category: "Backend",
          icon: <Server className="w-6 h-6" />,
          items: ["Node.js", "Express", "PHP", "Python", "Java", "C++"],
        },
        {
          category: "Database",
          icon: <Database className="w-6 h-6" />,
          items: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"],
        },
        {
          category: "Mobile",
          icon: <Smartphone className="w-6 h-6" />,
          items: [
            "React Native",
            "Mobile-First Design",
            "Progressive Web Apps",
          ],
        },
        {
          category: "CMS",
          icon: <Globe className="w-6 h-6" />,
          items: ["WordPress", "Custom Themes", "Plugin Development"],
        },
        {
          category: "Tools",
          icon: <Cpu className="w-6 h-6" />,
          items: ["Git", "Docker", "AWS", "Heroku", "Netlify", "Vercel"],
        },
      ],
    };
    if (data?.user) {
      userData = data.user;
    }

    const imgSrc = userData.profileImageSrc;
    const name = userData.name;
    const profession = userData.profession;
    const bioDetails = userData.bioDetails;

    const about = userData.aboutME;
    const aboutMeCoverImage = userData.aboutMeCoverImage;
    const Email = userData.Email;
    const phoneNum = userData.phoneNumber;
    const addressDetail = userData.addressDetails;
    const guitHubLink = userData.guitHubLink;
    const LinkedinLink = userData.LinkedinLink;
    const resumelink = userData.resumelink;
    const FBlink = userData.FBlink;
    const formendpoint = userData.formendpoint;
    let Userprojects = userData.projects;
    let Userskills = userData.skills;

    if (data?.projects) Userprojects = data.projects;
    if (data?.skills) Userskills = data.skills;

    setDevImg(imgSrc);
    setDevName(name);
    setProfessionName(profession);
    setBio(bioDetails);
    setAboutME(about);
    setAboutMECover(aboutMeCoverImage);
    setEmail(Email);
    setPhoneNUmber(phoneNum);
    setAddressDetails(addressDetail);
    setGuitLink(guitHubLink);
    setLinkedInLink(LinkedinLink);
    setResumeLink(resumelink);
    setFacebookLink(FBlink);
    setFormEndpoint(formendpoint);
    setProjects(Userprojects);
    setSkills(Userskills);
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "about", "skills", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    setStatus("Sending...");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact`,
        formData,
      );
      setStatus("Message sent successfully!");
      setFormData({ name: "", mail: "", message: "" });
    } catch (err) {
      setStatus("Failed to send message. Try again later.");
    }

    // toast({
    //   title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    //   duration: 5000,
    // });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900"}`}
    >
      <Helmet>
        <title>
          {devName} - {professionName}
        </title>
        <meta
          name="description"
          content="Full Stack Web Developer with 7+ years of experience in React, Node.js, WordPress, and modern web technologies. Specializing in responsive web applications and digital solutions."
        />
      </Helmet>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${darkMode ? "bg-slate-900/90 backdrop-blur-md border-b border-purple-500/20" : "bg-white/90 backdrop-blur-md border-b border-indigo-200/50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Aldehan Kabir
            </motion.div>

            <div className="hidden md:flex space-x-8">
              {["home", "projects", "about", "skills", "contact"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-colors duration-200 hover:text-purple-400 ${
                      activeSection === section
                        ? "text-purple-400 font-semibold"
                        : ""
                    }`}
                  >
                    {section}
                  </button>
                ),
              )}
            </div>

            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 pt-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              className="max-w-full max-h-64 mx-auto my-8 rounded-lg border-4 border-purple-400/50 shadow-2xl object-contain"
              alt={`${devName} - Full Stack Developer`}
              src={
                devImg
                  ? `${import.meta.env.VITE_BACKEND_URL}${devImg}`
                  : "https://images.unsplash.com/photo-1551437288-dce670e4d1e6"
              }
            />

            <h1 className="text-5xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              {devName}
            </h1>

            <h2 className="text-2xl md:text-2xl font-semibold mb-8 text-purple-300">
              {professionName}
            </h2>

            <p
              className={`text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              {bio}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
              >
                View My Work
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className={`px-8 py-3 text-lg ${darkMode ? "border-purple-400 text-purple-400 hover:bg-purple-400/10" : "border-indigo-500 text-indigo-500 hover:bg-indigo-50"}`}
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-20 px-4 ${darkMode ? "bg-slate-800/50" : "bg-white/50"}`}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Here are some of the exciting projects I've built using
              cutting-edge technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, index) => (
              <ProjectCard
                key={index}
                index={index}
                project={project}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                className="w-full rounded-2xl shadow-2xl"
                alt="Aldehan Kabir working on code"
                src={
                  aboutMECover
                    ? import.meta.env.VITE_BACKEND_URL + aboutMECover
                    : "https://images.unsplash.com/photo-1581094794329-c8112a89af12"
                }
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div
                className={`p-6 rounded-2xl ${darkMode ? "bg-slate-800/50 border border-purple-500/20" : "bg-white/50 border border-indigo-200/50"}`}
              >
                <h3 className="text-2xl font-bold mb-4 text-purple-400">
                  My Journey Started Early
                </h3>
                <p
                  className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {aboutME?.Starting};
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl ${darkMode ? "bg-slate-800/50 border border-purple-500/20" : "bg-white/50 border border-indigo-200/50"}`}
              >
                <h3 className="text-2xl font-bold mb-4 text-purple-400">
                  Professional Milestone
                </h3>
                <p
                  className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {aboutME?.ProfessionalMilestone}
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl ${darkMode ? "bg-slate-800/50 border border-purple-500/20" : "bg-white/50 border border-indigo-200/50"}`}
              >
                <h3 className="text-2xl font-bold mb-4 text-purple-400">
                  Today
                </h3>
                <p
                  className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {aboutME?.Today}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-20 px-4 ${darkMode ? "bg-slate-800/50" : "bg-white/50"}`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills?.map((skillCategory, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-2xl ${darkMode ? "bg-slate-800/80 border border-purple-500/20" : "bg-white/80 border border-indigo-200/50"} hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white mr-4">
                    {skillCategory.icon}
                  </div>
                  <h3 className="text-xl font-bold text-purple-400">
                    {skillCategory.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        darkMode
                          ? "bg-purple-500/20 text-purple-300"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Ready to bring your ideas to life? Let's discuss your next
              project!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div
                className={`p-6 rounded-2xl ${darkMode ? "bg-slate-800/50 border border-purple-500/20" : "bg-white/50 border border-indigo-200/50"}`}
              >
                <h3 className="text-2xl font-bold mb-6 text-purple-400">
                  Get In Touch
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-purple-400 mr-4" />
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-600"}
                    >
                      {email}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-purple-400 mr-4" />
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-600"}
                    >
                      {phoneNumber}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-purple-400 mr-4" />
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-600"}
                    >
                      {addressDetails}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <Button
                    onClick={() => handleLinkAction(guiLink)}
                    variant="outline"
                    size="icon"
                    className={`rounded-full ${darkMode ? "border-purple-400 text-purple-400 hover:bg-purple-400/10" : "border-indigo-500 text-indigo-500 hover:bg-indigo-50"}`}
                  >
                    <Github className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={() => handleLinkAction(linkedInLink)}
                    variant="outline"
                    size="icon"
                    className={`rounded-full ${darkMode ? "border-purple-400 text-purple-400 hover:bg-purple-400/10" : "border-indigo-500 text-indigo-500 hover:bg-indigo-50"}`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={() => handleLinkAction(resumeLink)}
                    variant="outline"
                    size="icon"
                    className={`rounded-full ${darkMode ? "border-purple-400 text-purple-400 hover:bg-purple-400/10" : "border-indigo-500 text-indigo-500 hover:bg-indigo-50"}`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form
                onSubmit={handleContactSubmit}
                className={`p-6 rounded-2xl ${darkMode ? "bg-slate-800/50 border border-purple-500/20" : "bg-white/50 border border-indigo-200/50"}`}
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-purple-400">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                        darkMode
                          ? "bg-slate-700 border-slate-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-purple-400">
                      Email
                    </label>
                    <input
                      type="email"
                      name="mail"
                      value={formData.mail}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                        darkMode
                          ? "bg-slate-700 border-slate-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-purple-400">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none ${
                        darkMode
                          ? "bg-slate-700 border-slate-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 text-lg"
                  >
                    Send Message
                  </Button>
                </div>

                {status && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p
                        className={`text-center text-sm mt-2 ${status.includes("successfully") ? "text-green-400" : "text-red-400"}`}
                      >
                        {status}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 px-4 border-t ${darkMode ? "border-purple-500/20 bg-slate-900/50" : "border-indigo-200/50 bg-white/50"}`}
      >
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            © 2024 {devName}. All rights reserved.
          </p>
          <p className={`mt-2 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
            Visit my website:{" "}
            <span className="text-purple-400">aldehankabir.com</span>
          </p>
          <div className="mt-2 space-x-4">
            <a
              href="/privacy-policy"
              target="_blank"
              className={`underline ${darkMode ? "text-gray-400 hover:text-purple-400" : "text-gray-600 hover:text-indigo-600"}`}
            >
              Privacy Policy
            </a>
            <a
              href="/terms-and-conditions"
              target="_blank"
              className={`underline ${darkMode ? "text-gray-400 hover:text-purple-400" : "text-gray-600 hover:text-indigo-600"}`}
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </footer>

      <Toaster />

      {/* Conditional pop-up message */}
      {isPopupVisible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-xl transition-all duration-300 z-50 animate-pop-in">
          Link copied! & restricting
        </div>
      )}
    </div>
  );
}

export default App;
