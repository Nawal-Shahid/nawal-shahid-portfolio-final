/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Smartphone, 
  Database, 
  Layout, 
  Moon, 
  Sun, 
  ChevronRight,
  Download,
  Terminal,
  Cpu,
  Globe,
  Menu,
  X,
  Zap
} from 'lucide-react';

// --- Components ---

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-ube pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(131, 135, 195, 0.2)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-ube rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePos.x - 3,
          y: mousePos.y - 3,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 500, mass: 0.1 }}
      />
    </>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-4 glass' : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="text-2xl font-display font-bold text-ube"
          >
            <a href="#">N.</a>
          </motion.div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-ube transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ube transition-all group-hover:w-full" />
                </a>
              ))}
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-ube"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[40] bg-chinese-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-display font-bold text-white hover:text-ube transition-colors"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const [text, setText] = useState('');
  const words = [
    "Software Engineer", 
    "ML Engineer", 
    "Data Analyst", 
    "Full-stack / Backend Engineer", 
    "UI/UX Engineer", 
    "Mobile App Engineer"
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
        setSpeed(50);
      } else {
        setText(currentWord.substring(0, text.length + 1));
        setSpeed(100);
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, speed]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-ube rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-american-blue rounded-full blur-[120px]" 
        />
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8387c311_1px,transparent_1px),linear-gradient(to_bottom,#8387c311_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-ube/50" />
            <span className="text-ube font-mono text-sm tracking-widest uppercase block">
              {text}<span className="animate-pulse">|</span>
            </span>
            <span className="w-8 h-[1px] bg-ube/50" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-9xl font-display font-bold text-white dark:text-white mb-6 tracking-tighter leading-none">
            Nawal <span className="text-gradient">Shahid</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-cadet-grey mb-12 leading-relaxed font-light">
            Innovative and results-driven engineer crafting <span className="text-white font-medium">robust, user-centric</span> applications 
            across web and mobile platforms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(131, 135, 195, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-ube text-chinese-black font-bold rounded-full hover:bg-white transition-all flex items-center gap-2"
            >
              View My Work <ChevronRight size={18} />
            </motion.a>
            
            <motion.a
              href="/Nawal_Shahid_Software_Engineer_Resume.pdf"
              download="Nawal_Shahid_Software_Engineer_Resume.pdf"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(131, 135, 195, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-ube/30 text-ube font-bold rounded-full transition-all flex items-center gap-2"
            >
              Resume <Download size={18} />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-ube font-bold rounded-full transition-colors"
            >
              Let's Talk
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ube/50"
      >
        <div className="w-6 h-10 border-2 border-ube/30 rounded-full flex justify-center pt-2">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-ube rounded-full" 
          />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-chinese-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 order-2 md:order-1"
          >
            <h2 className="text-4xl font-display font-bold text-white">
              About <span className="text-ube">Me</span>
            </h2>
            <div className="w-20 h-1 bg-ube rounded-full" />
            <p className="text-lg text-cadet-grey leading-relaxed">
              I'm a passionate Software Engineer based in Karachi, Pakistan, with a BSc in Software Engineering from Jinnah University for Women. 
              My journey is driven by a desire to translate complex problems into scalable, impactful digital experiences.
            </p>
            <p className="text-lg text-cadet-grey leading-relaxed">
              With a strong foundation in full-stack development and mobile applications, I leverage technologies like Python, JavaScript, React, and Node.js to build robust solutions. 
              I'm also skilled in machine learning and continuously exploring emerging technologies to drive innovation.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div>
                <h4 className="text-white font-bold mb-1">Education</h4>
                <p className="text-sm">BSc Software Engineering</p>
                <p className="text-xs text-ube">Jinnah University for Women</p>
                <p className="text-xs font-bold mt-1">GPA: 3.5/4.0</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Location</h4>
                <p className="text-sm">Karachi, Pakistan</p>
                <p className="text-xs text-ube">Available for Remote</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative order-1 md:order-2 max-w-md mx-auto w-full"
          >
            <div className="aspect-square rounded-2xl overflow-hidden border-2 border-ube/20 bg-american-blue/10 flex items-center justify-center p-4 sm:p-8">
              <div className="grid grid-cols-2 gap-4 w-full h-full">
                <div className="bg-ube/5 rounded-xl flex flex-col items-center justify-center p-4 border border-ube/10">
                  <Code2 className="text-ube mb-2" size={32} />
                  <span className="text-xs font-mono">Web Dev</span>
                </div>
                <div className="bg-ube/5 rounded-xl flex flex-col items-center justify-center p-4 border border-ube/10">
                  <Smartphone className="text-ube mb-2" size={32} />
                  <span className="text-xs font-mono">Mobile Dev</span>
                </div>
                <div className="bg-ube/5 rounded-xl flex flex-col items-center justify-center p-4 border border-ube/10">
                  <Database className="text-ube mb-2" size={32} />
                  <span className="text-xs font-mono">Backend</span>
                </div>
                <div className="bg-ube/5 rounded-xl flex flex-col items-center justify-center p-4 border border-ube/10">
                  <Cpu className="text-ube mb-2" size={32} />
                  <span className="text-xs font-mono">ML</span>
                </div>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-ube/20 rounded-full -z-10" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-ube/5 rounded-full -z-10 blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      company: 'Kazim Trust',
      role: 'Web & Mobile App Developer - DigiLex',
      period: '2024 – 2025',
      description: 'Leading end-to-end development of DigiLex, an ed-tech platform designed to support dyslexic learners through accessible digital solutions. Built a full-featured, accessibility-first website using React.js, Node.js, MongoDB, and Tailwind CSS. Currently developing the DigiLex cross-platform mobile app using React Native and Firebase, ensuring consistent performance across Android and iOS. Collaborated with educators, therapists, and accessibility specialists to align digital features with real-world needs and inclusive design standards (WCAG).',
      skills: ['React.js', 'React Native', 'Node.js', 'MongoDB', 'Firebase', 'Tailwind CSS', 'WCAG', 'Accessibility']
    },
    {
      company: 'AJD Marketing (Qatar)',
      role: 'Web Developer Apprentice',
      period: '2023 – 2024',
      description: 'Developed and maintained responsive websites using React, PHP, SQL, and Tailwind CSS. Handled full-stack development, including both frontend UI components and backend logic. Applied SEO best practices that boosted site traffic and engagement. Debugged and optimized legacy code for performance, accessibility, and responsiveness. Produced clean, reusable code and documented solutions for long-term maintainability.',
      skills: ['React', 'PHP', 'SQL', 'Tailwind CSS', 'SEO', 'Full-Stack', 'Performance Optimization']
    }
  ];

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Work <span className="text-ube">Experience</span></h2>
          <div className="w-20 h-1 bg-ube rounded-full mx-auto" />
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 border-l-2 border-ube/20"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-ube shadow-[0_0_10px_rgba(131,135,195,0.5)]" />
              <div className="bg-american-blue/10 border border-ube/10 rounded-2xl p-8 hover:border-ube/30 transition-all group">
                <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-ube transition-colors">{exp.role}</h3>
                    <p className="text-ube font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm font-mono text-cadet-grey bg-chinese-black px-3 py-1 rounded-full h-fit border border-white/5">
                    {exp.period}
                  </span>
                </div>
                <p className="text-cadet-grey mb-6 leading-relaxed">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span key={skill} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-ube/10 text-ube rounded border border-ube/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: 'DigiLex - Multilingual Accessible Learning Platform',
      category: 'EdTech Platform',
      tech: 'React Native, Expo, Firebase, Node.js, Firestore',
      description: 'Cross-platform mobile learning platform supporting individuals with dyslexia through interactive, gamified, and accessible educational experiences in Urdu, English, and Arabic. Features personalized adaptive learning paths, interactive reading/writing modules with text-to-speech and speech-to-text, gamified reward system with badges and daily streaks, cognitive skill-building exercises, dyslexia-friendly fonts with customizable colors and spacing, progress tracking dashboards for learners/parents/teachers, offline accessibility with sync, and inclusive UI with simple navigation and high-contrast design.',
      image: '/Digilex.png',
      link: '#'
    },
    {
      title: 'News Classifier - Advanced Classification System',
      category: 'Machine Learning',
      tech: 'Python, scikit-learn, Streamlit, TextBlob, LLM, NLP, Pandas & NumPy',
      description: 'Production-ready news classifier for 5 categories (Business, Entertainment, Politics, Sports, Technology) on 40,000+ BBC articles. Achieved 93.1% accuracy with ensemble of Naive Bayes, SVM, and Random Forest. Added real-time sentiment analysis using TextBlob. Developed interactive Streamlit dashboard with URL input, dataset upload, word clouds, probability histograms, and downloadable CSV. Automated URL extraction & preprocessing with per-prediction explainability (feature importance, class probability).',
      image: '/News_Classification.png',
      link: 'https://github.com/Nawal-Shahid/news_classifier?tab=readme-ov-file'
    },
    {
      title: 'Movie Discovery - Android App',
      category: 'Mobile App',
      tech: 'Kotlin, MVVM, Room, Retrofit, Firebase Auth, Jetpack, Android Studio, Figma',
      description: 'Production-grade movie discovery app using Material 3 and MVVM architecture for maintainable, testable code. Integrated TheMovieDB API via Retrofit + OkHttp to fetch trending, popular, and now-playing movies with pagination and caching. Built Firebase Auth flow (Email + Google Sign-In) with profile management, secure sign-out and token refresh. Optimized image loading with Glide and improved UX via Jetpack Navigation (safe args) and custom splash activity.',
      image: '/movie_explorer_app.png',
      link: 'https://github.com/Nawal-Shahid/movie-explorer-app?tab=readme-ov-file'
    },
    {
      title: 'Movie Discovery - Full Stack Application',
      category: 'Full Stack',
      tech: 'React, Node.js, Express, Kotlin, Firebase, JWT, REST APIs',
      description: 'Full-stack movie platform with React frontend, Node.js/Express backend, and Android app. Backend provides RESTful APIs to fetch movies from TheMovieDB with pagination, caching, and response optimization. Manages user favorites, watchlists, and authentication using Firebase Admin SDK and JWT validation. React web frontend allows browsing, filtering by genre, searching, viewing cast/crew details, and managing favorites. Android app built with MVVM, Material 3, Room database for offline favorites, Retrofit, and Firebase Auth. Both frontends sync user data across platforms with lazy loading, client-side caching, responsive layouts, and secure authentication flows.',
      image: '/movie_explorer_website.png',
      link: 'https://github.com/Nawal-Shahid/movie-explorer-website?tab=readme-ov-file'
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-chinese-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-display font-bold text-white mb-4">Featured <span className="text-ube">Projects</span></h2>
            <div className="w-20 h-1 bg-ube rounded-full" />
          </div>
          <p className="text-cadet-grey max-w-md">
            A selection of my recent work, ranging from machine learning models to full-stack web and mobile applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-max">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -12,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                borderColor: "rgba(131, 135, 195, 0.4)"
              }}
              className="group bg-american-blue/10 border border-ube/10 rounded-3xl overflow-hidden flex flex-col transition-colors duration-300"
            >
              <div className="h-48 bg-american-blue/20 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-ube/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <Terminal className="text-ube/30 group-hover:text-ube/60 transition-colors" size={64} />
                )}
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <span className="text-xs font-mono text-ube uppercase tracking-widest mb-2">{project.category}</span>
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-cadet-grey text-sm mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono text-cadet-grey/70">{project.tech}</span>
                  <motion.a
                    href={project.link}
                    whileHover={{ scale: 1.1 }}
                    className="p-2 bg-ube/10 text-ube rounded-full hover:bg-ube hover:text-chinese-black transition-all"
                  >
                    <ExternalLink size={16} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillGroups = [
    {
      title: 'Frontend',
      icon: <Layout size={20} />,
      skills: ['HTML5', 'CSS3', 'Sass', 'JavaScript (ES6+)', 'TypeScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Material UI', 'Chakra UI', 'Ant Design', 'Bootstrap', 'Responsive Design', 'Mobile-First', 'Cross-Browser Compatibility', 'PWA', 'SPA', 'Redux', 'Redux Toolkit', 'Zustand', 'Context API', 'Web Vitals', 'Lighthouse']
    },
    {
      title: 'Backend',
      icon: <Database size={20} />,
      skills: ['Node.js', 'Express.js', 'Nest.js', 'RESTful APIs', 'GraphQL', 'Apollo Server', 'WebSockets', 'Socket.io', 'MongoDB', 'Mongoose', 'Firebase Firestore', 'Firebase Realtime DB', 'PostgreSQL', 'MySQL', 'SQLite', 'MS SQL Server', 'JWT', 'OAuth2', 'Passport.js', 'Firebase Auth', 'Auth0', 'Session Management', 'Cloud Functions', 'Serverless', 'Sequelize', 'TypeORM', 'API Rate Limiting', 'Error Handling']
    },
    {
      title: 'Mobile & Cross-Platform',
      icon: <Smartphone size={20} />,
      skills: ['React Native', 'Expo', 'EAS', 'Android Studio', 'Xcode', 'Kotlin', 'Swift', 'Java', 'MVVM', 'MVC', 'Clean Architecture', 'Room Database', 'SQLite', 'Core Data', 'Firebase Integration', 'Offline Persistence', 'Push Notifications', 'FCM', 'Biometric Auth', 'Deep Linking', 'App Store Deployment', 'TestFlight']
    },
    {
      title: 'DevOps & Cloud',
      icon: <Cpu size={20} />,
      skills: ['Git', 'GitHub', 'GitLab', 'GitHub Actions', 'GitLab CI/CD', 'Jenkins', 'CircleCI', 'CI/CD', 'Docker', 'Docker Compose', 'Kubernetes', 'AWS (EC2, S3, Lambda, RDS)', 'Google Cloud', 'Firebase Console', 'Microsoft Azure', 'Netlify', 'Vercel', 'Heroku', 'Railway']
    },
    {
      title: 'Testing & QA',
      icon: <Code2 size={20} />,
      skills: ['Jest', 'Vitest', 'React Testing Library', 'Cypress', 'Playwright', 'Selenium', 'JUnit', 'Supertest', 'Snapshot Testing', 'Performance Testing', 'TDD', 'BDD', 'Mockito', 'Sinon', 'Code Coverage']
    },
    {
      title: 'Programming Languages',
      icon: <Terminal size={20} />,
      skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Kotlin', 'Swift', 'PHP', 'C', 'C++', 'SQL', 'GraphQL', 'HTML5', 'CSS3', 'Bash', 'JSON', 'YAML', 'XML']
    },
    {
      title: 'Tools & IDEs',
      icon: <Globe size={20} />,
      skills: ['VS Code', 'IntelliJ IDEA', 'Android Studio', 'Xcode', 'PyCharm', 'WebStorm', 'Postman', 'Insomnia', 'Swagger', 'OpenAPI', 'Figma', 'Adobe XD', 'Sketch', 'Jira', 'Trello', 'Asana', 'Confluence', 'Notion']
    },
    {
      title: 'Specializations',
      icon: <Globe size={20} />,
      skills: ['SEO & Technical SEO', 'Web Accessibility (WCAG 2.1)', 'Performance Optimization', 'Lazy Loading', 'Code Splitting', 'Screen Reader Compatibility', 'API Documentation', 'Code Review', 'Pair Programming', 'Software Architecture', 'System Design', 'Design Patterns', 'Refactoring', 'Agile/Scrum', 'Git Flow']
    }
  ];

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Technical <span className="text-ube">Skills</span></h2>
          <div className="w-20 h-1 bg-ube rounded-full mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-american-blue/10 border border-ube/10 rounded-3xl hover:border-ube/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-6 text-ube">
                {group.icon}
                <h3 className="text-lg font-bold text-white">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-chinese-black text-cadet-grey text-xs rounded-full border border-white/5">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!formData.name.trim() || !formData.message.trim()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mnjokwkd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        // Show success message
        setIsSubmitted(true);
        
        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' });
          setEmailError('');
          setIsSubmitted(false);
          setIsLoading(false);
        }, 2000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailError('Failed to send message. Please try again.');
      setIsLoading(false);
    }
  };

  const isEmailValid = formData.email && validateEmail(formData.email);
  const isFormValid = formData.name && formData.message && isEmailValid;

  return (
    <section id="contact" className="py-24 px-6 bg-chinese-black/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-white mb-4">Get In <span className="text-ube">Touch</span></h2>
          <div className="w-20 h-1 bg-ube rounded-full mx-auto" />
          <p className="mt-6 text-cadet-grey">
            Have a project in mind or just want to say hi? Feel free to reach out!
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-american-blue/10 border border-ube/10 rounded-3xl p-8 md:p-12"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-cadet-grey">
                Thank you for reaching out. I'll get back to you soon!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ube ml-1">Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-chinese-black border border-ube/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-ube transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ube ml-1">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    className={`w-full bg-chinese-black border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                      emailError ? 'border-red-500 focus:border-red-500' : 'border-ube/20 focus:border-ube'
                    }`}
                    value={formData.email}
                    onChange={handleEmailChange}
                    disabled={isLoading}
                  />
                  {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-ube ml-1">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can I help you?"
                  className="w-full bg-chinese-black border border-ube/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-ube transition-colors resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              <motion.button
                whileHover={isFormValid ? { scale: 1.02 } : {}}
                whileTap={isFormValid ? { scale: 0.98 } : {}}
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
                  isFormValid
                    ? 'bg-ube text-chinese-black hover:bg-white cursor-pointer'
                    : 'bg-ube/40 text-chinese-black/60 cursor-not-allowed'
                }`}
              >
                {isLoading ? 'Sending...' : 'Send Message'} <Mail size={18} />
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-3xl font-display font-bold text-ube">N.</div>
          <p className="text-sm font-medium text-white tracking-widest uppercase">Nawal Shahid</p>
        </div>
        
        <div className="flex gap-6">
          {[
            { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/nawal-shahid-015529263/' },
            { icon: <Github size={20} />, href: 'https://github.com/Nawal-Shahid' },
            { icon: <Mail size={20} />, href: 'mailto:nawal.shahid113@gmail.com' }
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: '#8387C3' }}
              className="text-cadet-grey transition-colors"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
        
        <p className="text-xs text-cadet-grey/50">
          © {new Date().getFullYear()} Nawal Shahid. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-ube/30">
      <CustomCursor />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-ube z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
