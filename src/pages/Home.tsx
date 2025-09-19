import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Heart, 
  Brain, 
  Target, 
  Users, 
  BookOpen, 
  Zap, 
  Calendar, 
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Star,
  Flame,
  Award,
  MessageCircle,
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  Compass,
  Camera,
  Lock,
  CheckCircle2,
  BarChart3,
  Smile,
  Bed,
  Dumbbell,
  Book,
  Plus,
  Crown,
  Share,
  Filter,
  Search,
  Send,
  ThumbsUp,
  Video,
  FileText,
  Eye,
  EyeOff
} from 'lucide-react';

// Custom cursor component
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    const moveCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        if (cursor) {
          cursor.style.top = `${e.clientY}px`;
          cursor.style.left = `${e.clientX}px`;
        }
      });
    };
    
    const handlePointerElements = () => {
      const pointerElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
      
      const mouseOver = () => setIsPointer(true);
      const mouseOut = () => setIsPointer(false);
      
      pointerElements.forEach(el => {
        el.addEventListener('mouseover', mouseOver);
        el.addEventListener('mouseout', mouseOut);
      });
      
      return () => {
        pointerElements.forEach(el => {
          el.removeEventListener('mouseover', mouseOver);
          el.removeEventListener('mouseout', mouseOut);
        });
      };
    };
    
    window.addEventListener('mousemove', moveCursor);
    const cleanup = handlePointerElements();
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cleanup();
    };
  }, []);
  
  return (
    <div className="hidden md:block">
      <div 
        ref={cursorRef} 
        className={`fixed w-6 h-6 rounded-full pointer-events-none z-50 transition-transform duration-150 ${isPointer ? 'scale-150' : 'scale-100'}`}
        style={{ 
          border: '2px solid #D4B996',
          top: -100,
          left: -100,
          marginLeft: -12,
          marginTop: -12,
        }}
      />
    </div>
  );
};

// Magnetic element component
const MagneticElement = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    setPosition({ x: x * 0.1, y: y * 0.1 });
  };
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  
  return (
    <motion.div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className || ''}
    >
      {children}
    </motion.div>
  );
};

// Breathing animation component
const BreathingOrb = () => {
  return (
    <motion.div
      className="w-32 h-32 rounded-full bg-gradient-to-br from-[#D4B996]/20 to-[#D4B996]/40 flex items-center justify-center"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="w-16 h-16 rounded-full bg-[#D4B996] flex items-center justify-center"
        animate={{
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Heart className="w-8 h-8 text-white" />
      </motion.div>
    </motion.div>
  );
};

// Progress ring component
const ProgressRing = ({ progress, size = 120, strokeWidth = 8, children }: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2C3E50"
          strokeOpacity="0.1"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#D4B996"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

// Chart component for analytics
const MiniChart = ({ data, color = "#D4B996" }: { data: number[], color?: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  return (
    <div className="h-16 flex items-end space-x-1">
      {data.map((value, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${((value - min) / range) * 100}%` }}
          transition={{ duration: 0.8, delay: index * 0.05 }}
          className="flex-1 rounded-t-sm"
          style={{ backgroundColor: color, minHeight: '4px' }}
        />
      ))}
    </div>
  );
};

// Achievement badge component
const AchievementBadge = ({ icon: Icon, title, description, unlocked = false, progress = 0 }: {
  icon: any;
  title: string;
  description: string;
  unlocked?: boolean;
  progress?: number;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-xl border transition-all cursor-pointer ${
        unlocked 
          ? 'bg-gradient-to-br from-[#D4B996]/10 to-[#D4B996]/5 border-[#D4B996]/20 shadow-sm' 
          : 'bg-[#2C3E50]/5 border-[#2C3E50]/10'
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          unlocked ? 'bg-[#D4B996] text-white' : 'bg-[#2C3E50]/20 text-[#2C3E50]/40'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium text-sm ${unlocked ? 'text-[#2C3E50]' : 'text-[#2C3E50]/60'}`}>
            {title}
          </h4>
          <p className="text-xs text-[#2C3E50]/50 mt-1">{description}</p>
          {!unlocked && progress > 0 && (
            <div className="mt-2">
              <div className="w-full bg-[#2C3E50]/10 rounded-full h-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1 }}
                  className="h-1 bg-[#D4B996] rounded-full"
                />
              </div>
              <span className="text-xs text-[#2C3E50]/40 mt-1">{progress}%</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Community post component
const CommunityPost = ({ user, content, likes, comments, timeAgo, avatar }: {
  user: string;
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
  avatar: string;
}) => {
  const [liked, setLiked] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 border border-[#2C3E50]/5 hover:border-[#D4B996]/20 transition-colors"
    >
      <div className="flex items-start space-x-4">
        <img src={avatar} alt={user} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-medium text-[#2C3E50]">{user}</h4>
            <span className="text-xs text-[#2C3E50]/40">{timeAgo}</span>
          </div>
          <p className="text-[#2C3E50]/70 mb-4 leading-relaxed">{content}</p>
          <div className="flex items-center space-x-6">
            <MagneticElement>
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center space-x-2 transition-colors ${
                  liked ? 'text-red-500' : 'text-[#2C3E50]/40 hover:text-red-500'
                }`}
              >
                <ThumbsUp className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} />
                <span className="text-sm">{likes + (liked ? 1 : 0)}</span>
              </button>
            </MagneticElement>
            <button className="flex items-center space-x-2 text-[#2C3E50]/40 hover:text-[#D4B996] transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{comments}</span>
            </button>
            <button className="text-[#2C3E50]/40 hover:text-[#D4B996] transition-colors">
              <Share className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Dashboard Component
const InnerCompassDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [moodRating, setMoodRating] = useState(4);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(5);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [energyLevel, setEnergyLevel] = useState(3);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [gratitudeText, setGratitudeText] = useState('');
  const [intentionText, setIntentionText] = useState('');
  const [journalPrivate, setJournalPrivate] = useState(true);

  // Sample data for analytics
  const moodData = [3, 4, 3, 5, 4, 4, 5, 3, 4, 5, 4, 4, 3, 5];
  const energyData = [2, 3, 4, 3, 4, 5, 4, 3, 4, 4, 3, 5, 4, 3];

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive && (timerMinutes > 0 || timerSeconds > 0)) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        }
      }, 1000);
    } else if (timerMinutes === 0 && timerSeconds === 0) {
      setIsTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timerMinutes, timerSeconds]);

  const resetTimer = () => {
    setIsTimerActive(false);
    setTimerMinutes(5);
    setTimerSeconds(0);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const learningModules = [
    { 
      title: "Emotional Intelligence", 
      progress: 75, 
      icon: Heart, 
      color: "#D4B996",
      type: "Interactive Course",
      duration: "6 weeks",
      nextLesson: "Understanding Empathy",
      locked: false
    },
    { 
      title: "Mindful Communication", 
      progress: 45, 
      icon: MessageCircle, 
      color: "#2C3E50",
      type: "Video Series",
      duration: "4 weeks", 
      nextLesson: "Active Listening",
      locked: false
    },
    { 
      title: "Goal Setting Mastery", 
      progress: 90, 
      icon: Target, 
      color: "#D4B996",
      type: "Workshop",
      duration: "3 weeks",
      nextLesson: "Review & Reflect",
      locked: false
    },
    { 
      title: "Advanced Meditation", 
      progress: 0, 
      icon: Brain, 
      color: "#2C3E50",
      type: "Guided Practice",
      duration: "8 weeks",
      nextLesson: "Breathing Foundations",
      locked: true
    },
  ];

  const habits = [
    { name: "Morning Meditation", streak: 14, completed: true, icon: Sun, time: "7:00 AM", category: "Mindfulness" },
    { name: "Gratitude Journal", streak: 8, completed: false, icon: BookOpen, time: "9:00 PM", category: "Reflection" },
    { name: "Evening Reflection", streak: 21, completed: true, icon: Moon, time: "10:00 PM", category: "Reflection" },
    { name: "Acts of Kindness", streak: 5, completed: false, icon: Heart, time: "Anytime", category: "Connection" },
    { name: "Physical Movement", streak: 12, completed: true, icon: Dumbbell, time: "6:00 PM", category: "Wellness" },
    { name: "Reading", streak: 18, completed: false, icon: Book, time: "8:00 PM", category: "Growth" },
  ];

  

  

  const achievements = [
    { icon: Flame, title: "Week Warrior", description: "7 days of consistent habits", unlocked: true },
    { icon: Crown, title: "Focus Master", description: "50 deep work sessions", unlocked: true },
    { icon: Heart, title: "Kindness Champion", description: "100 acts of kindness", unlocked: false, progress: 73 },
    { icon: Star, title: "Mindful Milestone", description: "30 days of meditation", unlocked: false, progress: 47 },
    { icon: Award, title: "Growth Guru", description: "Complete 5 learning modules", unlocked: false, progress: 60 },
    { icon: Users, title: "Community Builder", description: "Help 10 accountability partners", unlocked: false, progress: 30 },
  ];

  const communityPosts = [
    {
      user: "Elena Rodriguez",
      content: "Just completed my first week of morning meditation! The 5-minute sessions from Inner Compass really helped me ease into it. Feeling more centered already. 🧘‍♀️",
      likes: 24,
      comments: 8,
      timeAgo: "2h ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c92b35?w=100&h=100&fit=crop&crop=face"
    },
    {
      user: "Marcus Chen", 
      content: "The goal-setting framework completely changed how I approach my aspirations. Breaking everything into micro-habits has been a game changer. Thank you to my accountability partner Sarah for keeping me on track!",
      likes: 31,
      comments: 12,
      timeAgo: "4h ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      user: "Sophie Anderson",
      content: "Anyone else find that the emotional intelligence modules hit differently when you're actually going through a challenging time? The empathy exercises helped me navigate a difficult conversation with my partner.",
      likes: 18,
      comments: 15,
      timeAgo: "6h ago", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const accountabilityPartners = [
    { name: "Alex Thompson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", sharedGoals: 2, streak: 12, status: "online" },
    { name: "Maria Santos", avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face", sharedGoals: 1, streak: 8, status: "away" },
    { name: "David Kim", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", sharedGoals: 3, streak: 15, status: "online" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF5] font-sans antialiased">
      <CustomCursor />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-xl z-40 border-r border-[#2C3E50]/5">
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center mb-12"
          >
            <div className="w-10 h-10 rounded-full bg-[#D4B996] flex items-center justify-center mr-3">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-light text-[#2C3E50]">Inner Compass</span>
          </motion.div>

          {/* User Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#D4B996]/10 to-[#D4B996]/5 rounded-xl p-4 mb-8 border border-[#D4B996]/20"
          >
            <div className="flex items-center space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face" 
                alt="Sarah" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-[#2C3E50]">Sarah Johnson</h3>
                <p className="text-sm text-[#2C3E50]/60">Level 7 Explorer</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#D4B996] flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs text-[#2C3E50]/60 mb-1">
                <span>Progress to Level 8</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-[#2C3E50]/10 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-2 bg-[#D4B996] rounded-full"
                />
              </div>
            </div>
          </motion.div>

          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: Compass },
              { id: 'learning', label: 'Learning Path', icon: BookOpen },
              
              { id: 'community', label: 'Community', icon: Users },
              { id: 'accountability', label: 'Accountability', icon: Users },
              { id: 'insights', label: 'AI Insights', icon: Brain },
            ].map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all group ${
                  activeTab === item.id 
                    ? 'bg-[#D4B996]/10 text-[#D4B996]' 
                    : 'text-[#2C3E50]/70 hover:bg-[#2C3E50]/5 hover:text-[#2C3E50]'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-light">{item.label}</span>
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="ml-auto w-2 h-2 rounded-full bg-[#D4B996]"
                  />
                )}
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-center justify-between">
            <MagneticElement>
              <button className="p-2 rounded-lg hover:bg-[#2C3E50]/5 transition-colors">
                <Settings className="w-5 h-5 text-[#2C3E50]/70" />
              </button>
            </MagneticElement>
            <MagneticElement>
              <button className="p-2 rounded-lg hover:bg-[#2C3E50]/5 transition-colors relative">
                <Bell className="w-5 h-5 text-[#2C3E50]/70" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">3</span>
                </div>
              </button>
            </MagneticElement>
            <MagneticElement>
              <button className="p-2 rounded-lg hover:bg-[#2C3E50]/5 transition-colors">
                <LogOut className="w-5 h-5 text-[#2C3E50]/70" />
              </button>
            </MagneticElement>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-light text-[#2C3E50] mb-2">
              {getGreeting()}, Sarah
            </h1>
            <p className="text-[#2C3E50]/60">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })} • {formatTime(currentTime)}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <MagneticElement>
              <button className="flex items-center px-4 py-2 bg-[#D4B996] text-white rounded-lg hover:bg-[#D4B996]/90 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Add Entry
              </button>
            </MagneticElement>
            <MagneticElement>
              <button className="flex items-center px-4 py-2 border border-[#D4B996] text-[#D4B996] rounded-lg hover:bg-[#D4B996]/5 transition-colors">
                <Camera className="w-4 h-4 mr-2" />
                Capture Moment
              </button>
            </MagneticElement>
          </div>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Today's Check-in */}
              <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-sm border border-[#2C3E50]/5">
                <h2 className="text-xl font-light text-[#2C3E50] mb-6">Today's Check-in</h2>
                
                {/* Mood & Energy */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-[#2C3E50]/70 mb-4">How are you feeling today?</p>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <MagneticElement key={rating}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMoodRating(rating)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                              moodRating >= rating 
                                ? 'bg-[#D4B996] text-white' 
                                : 'bg-[#2C3E50]/5 text-[#2C3E50]/40 hover:bg-[#2C3E50]/10'
                            }`}
                          >
                            <Smile className="w-6 h-6" fill={moodRating >= rating ? 'currentColor' : 'none'} />
                          </motion.button>
                        </MagneticElement>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[#2C3E50]/70 mb-4">Energy Level</p>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <MagneticElement key={level}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setEnergyLevel(level)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                              energyLevel >= level 
                                ? 'bg-[#2C3E50] text-white' 
                                : 'bg-[#2C3E50]/5 text-[#2C3E50]/40 hover:bg-[#2C3E50]/10'
                            }`}
                          >
                            <Zap className="w-6 h-6" fill={energyLevel >= level ? 'currentColor' : 'none'} />
                          </motion.button>
                        </MagneticElement>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sleep Tracking */}
                <div className="mb-8">
                  <p className="text-[#2C3E50]/70 mb-4">Sleep Quality (Last Night)</p>
                  <div className="flex items-center space-x-4">
                    <Bed className="w-6 h-6 text-[#2C3E50]/60" />
                    <div className="flex-1">
                      <input
                        type="range"
                        min="4"
                        max="12"
                        step="0.5"
                        value={sleepHours}
                        onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                        className="w-full h-2 bg-[#2C3E50]/10 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                    <span className="text-[#2C3E50] font-medium">{sleepHours}h</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-light text-[#2C3E50]">Gratitude</h3>
                      <button 
                        onClick={() => setJournalPrivate(!journalPrivate)}
                        className="text-[#2C3E50]/40 hover:text-[#2C3E50]/60 transition-colors"
                      >
                        {journalPrivate ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <textarea
                      placeholder="What are you grateful for today?"
                      value={gratitudeText}
                      onChange={(e) => setGratitudeText(e.target.value)}
                      className="w-full h-32 p-4 border border-[#2C3E50]/10 rounded-lg resize-none focus:border-[#D4B996] focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-light text-[#2C3E50] mb-2">Today's Intention</h3>
                    <textarea
                      placeholder="Set an intention for your day..."
                      value={intentionText}
                      onChange={(e) => setIntentionText(e.target.value)}
                      className="w-full h-32 p-4 border border-[#2C3E50]/10 rounded-lg resize-none focus:border-[#D4B996] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <MagneticElement>
                    <button className="px-6 py-2 bg-[#D4B996] text-white rounded-lg hover:bg-[#D4B996]/90 transition-colors">
                      Save Check-in
                    </button>
                  </MagneticElement>
                </div>
              </div>

              {/* Mindfulness Timer */}
              <div className="bg-gradient-to-br from-[#2C3E50] to-[#2C3E50]/90 rounded-xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-30">
                  <BreathingOrb />
                </div>
                
                <h3 className="text-xl font-light mb-6">Mindful Moment</h3>
                
                <div className="flex items-center justify-center mb-8">
                  <ProgressRing progress={(timerMinutes * 60 + timerSeconds) / 300 * 100} size={120}>
                    <div className="text-center">
                      <div className="text-2xl font-light">
                        {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-white/60 mt-1">minutes</div>
                    </div>
                  </ProgressRing>
                </div>

                <div className="flex justify-center space-x-4 mb-6">
                  <MagneticElement>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsTimerActive(!isTimerActive)}
                      className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                      {isTimerActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </motion.button>
                  </MagneticElement>
                  
                  <MagneticElement>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetTimer}
                      className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <RotateCcw className="w-6 h-6" />
                    </motion.button>
                  </MagneticElement>
                </div>

                <div className="text-center">
                  <p className="text-white/70 text-sm mb-4">Today's Practice</p>
                  <p className="text-white/90">"Focus on your breath and let thoughts pass like clouds"</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 border border-[#2C3E50]/5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-light text-[#2C3E50]">Mood Trend</h3>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <MiniChart data={moodData} />
                  <p className="text-sm text-[#2C3E50]/60 mt-2">+12% this week</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-[#2C3E50]/5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-light text-[#2C3E50]">Energy</h3>
                    <Zap className="w-5 h-5 text-[#D4B996]" />
                  </div>
                  <MiniChart data={energyData} color="#2C3E50" />
                  <p className="text-sm text-[#2C3E50]/60 mt-2">Stable pattern</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-[#2C3E50]/5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-light text-[#2C3E50]">Habits</h3>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-light text-[#2C3E50] mb-1">
                    {habits.filter(h => h.completed).length}/{habits.length}
                  </div>
                  <p className="text-sm text-[#2C3E50]/60">completed today</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-[#2C3E50]/5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-light text-[#2C3E50]">Streak</h3>
                    <Flame className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="text-2xl font-light text-[#2C3E50] mb-1">
                    {Math.max(...habits.map(h => h.streak))}
                  </div>
                  <p className="text-sm text-[#2C3E50]/60">days longest</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Learning Tab */}
          {activeTab === 'learning' && (
            <motion.div
              key="learning"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-light text-[#2C3E50] mb-2">Learning Path</h2>
                  <p className="text-[#2C3E50]/60">Continue your personal development journey</p>
                </div>
                <div className="flex items-center space-x-4">
                  <MagneticElement>
                    <button className="flex items-center px-4 py-2 border border-[#D4B996] text-[#D4B996] rounded-lg hover:bg-[#D4B996]/5 transition-colors">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </button>
                  </MagneticElement>
                  <MagneticElement>
                    <button className="flex items-center px-4 py-2 bg-[#D4B996] text-white rounded-lg hover:bg-[#D4B996]/90 transition-colors">
                      <Search className="w-4 h-4 mr-2" />
                      Browse All
                    </button>
                  </MagneticElement>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {learningModules.map((module, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white rounded-xl p-8 border transition-all cursor-pointer group relative overflow-hidden ${
                      module.locked 
                        ? 'border-[#2C3E50]/10 opacity-60' 
                        : 'border-[#2C3E50]/5 hover:border-[#D4B996]/20 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {module.locked && (
                      <div className="absolute top-4 right-4">
                        <Lock className="w-5 h-5 text-[#2C3E50]/40" />
                      </div>
                    )}

                    <div className="flex items-start space-x-4 mb-6">
                      <div 
                        className="w-16 h-16 rounded-xl flex items-center justify-center" 
                        style={{ backgroundColor: `${module.color}20` }}
                      >
                        <module.icon className="w-8 h-8" style={{ color: module.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span 
                            className="text-xs px-2 py-1 rounded-full text-white"
                            style={{ backgroundColor: module.color }}
                          >
                            {module.type}
                          </span>
                          <span className="text-xs text-[#2C3E50]/40">{module.duration}</span>
                        </div>
                        <h3 className="text-xl font-medium text-[#2C3E50] group-hover:text-[#D4B996] transition-colors">
                          {module.title}
                        </h3>
                      </div>
                    </div>

                    {!module.locked && (
                      <>
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-[#2C3E50]/60">Progress</span>
                            <span className="text-sm font-medium text-[#2C3E50]">{module.progress}%</span>
                          </div>
                          <div className="w-full bg-[#2C3E50]/5 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${module.progress}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                              className="h-2 rounded-full"
                              style={{ backgroundColor: module.color }}
                            />
                          </div>
                        </div>

                        <div className="mb-6">
                          <p className="text-sm text-[#2C3E50]/60 mb-2">Next Lesson</p>
                          <p className="text-[#2C3E50] font-medium">{module.nextLesson}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Video className="w-4 h-4 text-[#2C3E50]/40" />
                              <span className="text-xs text-[#2C3E50]/60">12 videos</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FileText className="w-4 h-4 text-[#2C3E50]/40" />
                              <span className="text-xs text-[#2C3E50]/60">8 exercises</span>
                            </div>
                          </div>
                          <MagneticElement>
                            <button className="text-[#D4B996] hover:text-[#D4B996]/80 transition-colors">
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </MagneticElement>
                        </div>
                      </>
                    )}

                    {module.locked && (
                      <div className="text-center py-8">
                        <Lock className="w-12 h-12 text-[#2C3E50]/20 mx-auto mb-4" />
                        <p className="text-[#2C3E50]/60">Complete previous modules to unlock</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Achievements Section */}
              <div className="bg-gradient-to-r from-[#D4B996]/10 to-[#D4B996]/5 rounded-xl p-8 border border-[#D4B996]/20">
                <h3 className="text-xl font-light text-[#2C3E50] mb-6">Learning Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {achievements.slice(0, 6).map((achievement, index) => (
                    <AchievementBadge key={index} {...achievement} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Community Tab */}
          {activeTab === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-light text-[#2C3E50] mb-2">Community</h2>
                  <p className="text-[#2C3E50]/60">Connect with fellow growth-minded individuals</p>
                </div>
                <div className="flex items-center space-x-4">
                  <MagneticElement>
                    <button className="flex items-center px-4 py-2 border border-[#D4B996] text-[#D4B996] rounded-lg hover:bg-[#D4B996]/5 transition-colors">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter Posts
                    </button>
                  </MagneticElement>
                  <MagneticElement>
                    <button className="flex items-center px-4 py-2 bg-[#D4B996] text-white rounded-lg hover:bg-[#D4B996]/90 transition-colors">
                      <Plus className="w-4 h-4 mr-2" />
                      Share Update
                    </button>
                  </MagneticElement>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {communityPosts.map((post, index) => (
                    <CommunityPost key={index} {...post} />
                  ))}
                </div>

                <div className="space-y-6">
                  {/* Community Stats */}
                  <div className="bg-white rounded-xl p-6 border border-[#2C3E50]/5">
                    <h3 className="text-lg font-light text-[#2C3E50] mb-4">Community Impact</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[#2C3E50]/60">Active Members</span>
                        <span className="font-medium text-[#2C3E50]">1,247</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#2C3E50]/60">Posts Today</span>
                        <span className="font-medium text-[#2C3E50]">23</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#2C3E50]/60">Your Contributions</span>
                        <span className="font-medium text-[#D4B996]">8</span>
                      </div>
                    </div>
                  </div>

                  {/* Trending Topics */}
                  <div className="bg-white rounded-xl p-6 border border-[#2C3E50]/5">
                    <h3 className="text-lg font-light text-[#2C3E50] mb-4">Trending Topics</h3>
                    <div className="space-y-3">
                      {[
                        { topic: "#MorningRoutines", posts: 47 },
                        { topic: "#MindfulnessTips", posts: 32 },
                        { topic: "#GoalSetting2024", posts: 28 },
                        { topic: "#GratitudePractice", posts: 24 },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-[#2C3E50]/5 transition-colors cursor-pointer"
                        >
                          <span className="text-[#D4B996] font-medium">{item.topic}</span>
                          <span className="text-sm text-[#2C3E50]/60">{item.posts} posts</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Accountability Tab */}
          {activeTab === 'accountability' && (
            <motion.div
              key="accountability"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-light text-[#2C3E50] mb-2">Accountability Partners</h2>
                  <p className="text-[#2C3E50]/60">Stay motivated with mutual support and shared goals</p>
                </div>
                <MagneticElement>
                  <button className="flex items-center px-4 py-2 bg-[#D4B996] text-white rounded-lg hover:bg-[#D4B996]/90 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Find Partner
                  </button>
                </MagneticElement>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {accountabilityPartners.map((partner, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl p-6 border border-[#2C3E50]/5 hover:border-[#D4B996]/20 transition-colors"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <img 
                            src={partner.avatar} 
                            alt={partner.name} 
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            partner.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-[#2C3E50]">{partner.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              partner.status === 'online' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {partner.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center p-3 bg-[#D4B996]/10 rounded-lg">
                              <div className="text-xl font-light text-[#D4B996]">{partner.sharedGoals}</div>
                              <div className="text-xs text-[#2C3E50]/60">Shared Goals</div>
                            </div>
                            <div className="text-center p-3 bg-[#2C3E50]/10 rounded-lg">
                              <div className="text-xl font-light text-[#2C3E50]">{partner.streak}</div>
                              <div className="text-xs text-[#2C3E50]/60">Day Streak</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <MagneticElement>
                              <button className="flex items-center px-3 py-2 bg-[#D4B996] text-white rounded-lg hover:bg-[#D4B996]/90 transition-colors text-sm">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Message
                              </button>
                            </MagneticElement>
                            <MagneticElement>
                              <button className="flex items-center px-3 py-2 border border-[#2C3E50]/20 text-[#2C3E50] rounded-lg hover:bg-[#2C3E50]/5 transition-colors text-sm">
                                <Calendar className="w-4 h-4 mr-2" />
                                Check-in
                              </button>
                            </MagneticElement>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-6">
                  {/* Weekly Challenge */}
                  <div className="bg-gradient-to-br from-[#D4B996]/10 to-[#D4B996]/5 rounded-xl p-6 border border-[#D4B996]/20">
                    <h3 className="text-lg font-light text-[#2C3E50] mb-4">Weekly Challenge</h3>
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-[#D4B996] rounded-full flex items-center justify-center mx-auto mb-3">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-medium text-[#2C3E50] mb-2">Mindful Moments</h4>
                      <p className="text-sm text-[#2C3E50]/60">Practice 5 minutes of mindfulness daily this week</p>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-[#2C3E50]/60 mb-2">
                        <span>Progress</span>
                        <span>4/7 days</span>
                      </div>
                      <div className="w-full bg-[#2C3E50]/10 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "57%" }}
                          transition={{ duration: 1 }}
                          className="h-2 bg-[#D4B996] rounded-full"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-[#2C3E50]/60 text-center">12 partners participating</p>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-xl p-6 border border-[#2C3E50]/5">
                    <h3 className="text-lg font-light text-[#2C3E50] mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <MagneticElement>
                        <button className="w-full flex items-center p-3 rounded-lg hover:bg-[#2C3E50]/5 transition-colors text-left">
                          <Send className="w-5 h-5 text-[#D4B996] mr-3" />
                          <span className="text-[#2C3E50]">Send Check-in Update</span>
                        </button>
                      </MagneticElement>
                      <MagneticElement>
                        <button className="w-full flex items-center p-3 rounded-lg hover:bg-[#2C3E50]/5 transition-colors text-left">
                          <Calendar className="w-5 h-5 text-[#D4B996] mr-3" />
                          <span className="text-[#2C3E50]">Schedule Group Session</span>
                        </button>
                      </MagneticElement>
                      <MagneticElement>
                        <button className="w-full flex items-center p-3 rounded-lg hover:bg-[#2C3E50]/5 transition-colors text-left">
                          <Users className="w-5 h-5 text-[#D4B996] mr-3" />
                          <span className="text-[#2C3E50]">Browse Partner Matches</span>
                        </button>
                      </MagneticElement>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other tabs would go here with similar structure */}
          {/* For brevity, I'm including the key tabs - you can expand others similarly */}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InnerCompassDashboard;