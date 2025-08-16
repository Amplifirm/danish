import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Settings,
  Users,
  Crown,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ArrowRight,
  RotateCcw,
  MessageSquare,
  Heart,
  Share,
  Database,
  Shield,
  CheckCircle,
  Target,
  Scale,
  BarChart3,
  Globe,
  Award,
  User,
  Star,
  Lightbulb,
  Filter,
  Clock,
  X,
  Activity,
  Users2,
  Bookmark,
  Verified
} from 'lucide-react';

interface Target {
  id: string;
  name: string;
  category: string;
  avgA: number;
  avgO: number;
  votes: number;
  trending: boolean;
}

interface TimelineEvent {
  date: string;
  score: number;
  event: string;
  type: 'positive' | 'negative';
  description: string;
}

interface ActivityTab {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
}

const AOTPlatform = () => {
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [aScore, setAScore] = useState<number>(5.0);
  const [oScore, setOScore] = useState<number>(5.0);
  const [aExplanation, setAExplanation] = useState<string>('');
  const [oExplanation, setOExplanation] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [userType, setUserType] = useState<string>('anonymous');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [showGraphModal, setShowGraphModal] = useState<boolean>(false);
  const [selectedTimelineTarget, setSelectedTimelineTarget] = useState<TimelineEvent[] | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  const targets: Target[] = [
    { id: '1', name: 'George Washington', category: 'Individual', avgA: 8.7, avgO: 2.1, votes: 2847, trending: true },
    { id: '2', name: 'Adolf Hitler', category: 'Individual', avgA: 1.2, avgO: 9.8, votes: 5234, trending: false },
    { id: '3', name: 'Mahatma Gandhi', category: 'Individual', avgA: 9.1, avgO: 1.4, votes: 3421, trending: true },
    { id: '4', name: 'United States', category: 'Country', avgA: 7.2, avgO: 4.1, votes: 8934, trending: false },
    { id: '5', name: 'Winston Churchill', category: 'Individual', avgA: 7.8, avgO: 3.6, votes: 2156, trending: true },
    { id: '6', name: 'Will Smith', category: 'Individual', avgA: 6.8, avgO: 4.2, votes: 1892, trending: true },
  ];

  const activityTabs: ActivityTab[] = [
    { id: 'all', label: 'All Activity', icon: Users, color: '#917be7' },
    { id: 'recent', label: 'Recent', icon: Clock, color: '#3b82f6' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, color: '#f97316' },
    { id: 'following', label: 'Following', icon: Heart, color: '#ef4444' },
    { id: 'individual', label: 'Individual', icon: User, color: '#10b981' },
    { id: 'contributor', label: 'Contributor', icon: Star, color: '#8b5cf6' },
    { id: 'debates', label: 'Debates', icon: MessageSquare, color: '#f59e0b' }
  ];

  const willSmithTimeline: TimelineEvent[] = [
    { date: '1990', score: 3.2, event: 'Fresh Prince of Bel-Air', type: 'positive', description: 'Started acting career with beloved TV show' },
    { date: '1995', score: 5.8, event: 'Bad Boys Success', type: 'positive', description: 'Established as major movie star' },
    { date: '1997', score: 7.2, event: 'Men in Black', type: 'positive', description: 'Became global superstar' },
    { date: '2001', score: 8.1, event: 'Ali Performance', type: 'positive', description: 'Oscar-nominated dramatic performance' },
    { date: '2006', score: 7.8, event: 'Pursuit of Happyness', type: 'positive', description: 'Critical acclaim for inspiring role' },
    { date: '2012', score: 6.9, event: 'After Earth Flop', type: 'negative', description: 'Career setback with poorly received film' },
    { date: '2019', score: 7.4, event: 'Aladdin Success', type: 'positive', description: 'Successful return in Disney remake' },
    { date: '2022', score: 2.6, event: 'Oscar Slap Incident', type: 'negative', description: 'Slapped Chris Rock at Academy Awards' },
    { date: '2023', score: 3.8, event: 'Public Apology', type: 'positive', description: 'Issued heartfelt public apology' },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleVoteSubmit = () => {
    const target = targets.find(t => t.id === selectedTarget);
    alert(`Vote submitted!\nTarget: ${target?.name}\nA Score: ${aScore}\nO Score: ${oScore}\nTotal: ${(aScore - oScore).toFixed(1)}`);
  };

  const openEventModal = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const openGraphModal = (target: TimelineEvent[]) => {
    setSelectedTimelineTarget(target);
    setShowGraphModal(true);
  };

  const tScore = aScore - oScore;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f8fa' }}>
      <style>{`
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-in-left {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .fade-in-right {
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in-right.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .fade-in {
          opacity: 0;
          transition: opacity 0.6s ease-out;
        }
        
        .fade-in.visible {
          opacity: 1;
        }
        
        .scale-in {
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .scale-in.visible {
          opacity: 1;
          transform: scale(1);
        }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        
        .hover-scale {
          transition: transform 0.3s ease;
        }
        
        .hover-scale:hover {
          transform: scale(1.02);
        }
        
        [data-section] {
          transition-delay: 0.1s;
        }
        
        [data-section]:nth-child(2) {
          transition-delay: 0.2s;
        }
        
        [data-section]:nth-child(3) {
          transition-delay: 0.3s;
        }
      `}</style>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center hover-scale">
                <span className="text-white font-medium text-sm">AOT</span>
              </div>
              <span className="text-gray-600 font-normal">AOT Platform</span>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search targets, users, discussions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all duration-300 hover-lift"
                  style={{ backgroundColor: '#f9fafb' }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover-scale transition-all duration-300">
                <RotateCcw className="w-5 h-5" />
              </button>
              
              <button className="p-2 text-gray-500 hover:text-gray-700 hover-scale transition-all duration-300">
                <Settings className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 hover-lift">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Fig Nelson</div>
                  <div className="text-xs text-gray-500">CEO & Founder</div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>

              <button className="text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 hover-lift transition-all duration-300" style={{ background: '#917be7' }}>
                <span>Score Target</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className={`py-16 fade-in-up ${visibleSections.has('hero') ? 'visible' : ''}`}
        style={{ backgroundColor: '#f7f8fa' }}
        data-section
        id="hero"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-5 py-3 text-sm shadow-sm hover-lift" style={{ color: '#917be7' }}>
              <Users className="w-4 h-4" />
              <span>Join 125,847 active scorers worldwide</span>
            </div>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-6xl font-normal text-gray-900 mb-6 leading-tight">
              AOT - Social Platform for<br />
              Moral <span className="text-white px-3 py-1 rounded-full font-normal" style={{ background: '#917be7' }}>Evaluation</span>
            </h1>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed font-normal">
              Join the global community scoring historical figures, world leaders, and organizations.<br />
              Transparent. Democratic. Objective. Where every voice contributes to humanity's<br />
              moral ledger.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center hover-lift">
              <div className="text-5xl font-normal text-gray-900 mb-3">
                2.4M<span style={{ color: '#917be7' }}>+</span>
              </div>
              <div className="text-gray-600 font-normal mb-2">Total Scores</div>
              <div className="text-sm text-green-600">+1,247 today</div>
            </div>
            <div className="text-center hover-lift">
              <div className="text-5xl font-normal text-gray-900 mb-3">
                125K<span style={{ color: '#917be7' }}>+</span>
              </div>
              <div className="text-gray-600 font-normal mb-2">Active Users</div>
              <div className="text-sm text-green-600">+892 online</div>
            </div>
            <div className="text-center hover-lift">
              <div className="text-5xl font-normal text-gray-900 mb-3">94%</div>
              <div className="text-gray-600 font-normal mb-2">Accuracy Rate</div>
              <div className="text-sm text-green-600">+2% this month</div>
            </div>
            <div className="text-center hover-lift">
              <div className="text-5xl font-normal text-gray-900 mb-3">
                156K<span style={{ color: '#917be7' }}>+</span>
              </div>
              <div className="text-gray-600 font-normal mb-2">Discussions</div>
              <div className="text-sm text-green-600">+89 active now</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Dashboard */}
      <section 
        className={`py-16 bg-white fade-in-up ${visibleSections.has('dashboard') ? 'visible' : ''}`}
        data-section
        id="dashboard"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-medium text-gray-900 mb-4">Platform Analytics Dashboard</h2>
            <p className="text-gray-600 font-normal">Real-time insights into community behavior and scoring patterns</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* User Type Analytics */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover-lift">
              <h3 className="text-xl font-medium text-gray-900 mb-6">User Type Distribution</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-700">Anonymous Users</span>
                  </div>
                  <span className="font-medium">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-400 h-2 rounded-full transition-all duration-1000" style={{ width: '68%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#917be7' }}></div>
                    <span className="text-gray-700">Registered Users</span>
                  </div>
                  <span className="font-medium">24%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full transition-all duration-1000" style={{ backgroundColor: '#917be7', width: '24%' }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Verified Users</span>
                  </div>
                  <span className="font-medium">8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: '8%' }}></div>
                </div>
              </div>
            </div>

            {/* Voting Patterns */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover-lift">
              <h3 className="text-xl font-medium text-gray-900 mb-6">Daily Voting Activity</h3>
              <div className="relative h-40">
                <svg className="w-full h-full" viewBox="0 0 300 160">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#917be7', stopOpacity: 0.3 }} />
                      <stop offset="100%" style={{ stopColor: '#917be7', stopOpacity: 0 }} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,140 Q50,120 100,100 T200,80 T300,60"
                    fill="none"
                    stroke="#917be7"
                    strokeWidth="3"
                  />
                  <path
                    d="M0,140 Q50,120 100,100 T200,80 T300,60 L300,160 L0,160 Z"
                    fill="url(#gradient)"
                  />
                  {[0, 60, 120, 180, 240, 300].map((x, i) => (
                    <circle key={i} cx={x} cy={140 - i * 15} r="4" fill="#917be7" />
                  ))}
                </svg>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-4">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>
            </div>

            {/* Top Categories */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover-lift">
              <h3 className="text-xl font-medium text-gray-900 mb-6">Most Scored Categories</h3>
              <div className="space-y-4">
                {[
                  { category: 'Political Leaders', count: '12.4K', color: '#917be7' },
                  { category: 'Corporations', count: '8.7K', color: '#8a72e6' },
                  { category: 'Historical Figures', count: '6.2K', color: '#3b82f6' },
                  { category: 'Countries', count: '4.1K', color: '#10b981' },
                  { category: 'Organizations', count: '2.8K', color: '#f59e0b' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between hover-lift">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-700 text-sm">{item.category}</span>
                    </div>
                    <span className="font-medium text-gray-900">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Community Activity */}
      <section 
        className={`py-16 fade-in-up ${visibleSections.has('activity') ? 'visible' : ''}`}
        style={{ backgroundColor: '#f9fafb' }}
        data-section
        id="activity"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-block text-sm font-medium mb-4" style={{ color: '#917be7' }}>Powerful Features</div>
            <h2 className="text-4xl font-medium text-gray-900 mb-4">Live Community Activity</h2>
            <p className="text-gray-600 font-normal">Real-time scoring and discussions from our global community</p>
          </div>

          {/* Activity Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {activityTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium text-sm transition-all hover-lift ${
                  activeTab === tab.id 
                    ? 'text-white shadow-lg' 
                    : 'text-gray-600 bg-white hover:bg-gray-50'
                }`}
                style={activeTab === tab.id ? { backgroundColor: tab.color } : {}}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
            <button className="flex items-center space-x-2 px-4 py-2 rounded-full font-medium text-sm text-gray-600 bg-white hover:bg-gray-50 hover-lift">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Activity Feed */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 hover-lift">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-medium text-gray-900">Community Activity</h3>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {[
                    {
                      user: 'Sarah Chen',
                      userType: 'verified',
                      target: 'Marie Curie',
                      aScore: 9.7,
                      oScore: 0.2,
                      explanation: 'Revolutionary scientific contributions that changed our understanding of physics and chemistry. Her perseverance in a male-dominated field paved the way for countless women in science.',
                      time: '2 minutes ago',
                      likes: 23,
                      comments: 7,
                      category: 'Individual',
                      badge: 'Expert Contributor'
                    },
                    {
                      user: 'Dr. Jennifer Park',
                      userType: 'verified',
                      target: 'COVID-19 Response (WHO)',
                      aScore: 6.7,
                      oScore: 4.2,
                      explanation: 'Updated assessment based on recent transparency reports. While coordination efforts were significant, early communication failures had lasting impacts.',
                      time: '5 minutes ago',
                      likes: 18,
                      comments: 12,
                      category: 'Organization',
                      badge: 'Healthcare Expert'
                    },
                    {
                      user: 'EthicsScholar',
                      userType: 'registered',
                      target: 'Nelson Mandela',
                      aScore: 9.3,
                      oScore: 1.1,
                      explanation: 'Extraordinary leadership in peaceful transition from apartheid. His forgiveness and reconciliation approach transformed a nation.',
                      time: '8 minutes ago',
                      likes: 34,
                      comments: 15,
                      category: 'Individual',
                      badge: 'History Specialist'
                    }
                  ].map((activity, index) => (
                    <div key={index} className="p-6 hover-lift">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(45deg, #917be7, #8a72e6)' }}>
                          <User className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900">{activity.user}</span>
                            {activity.userType === 'verified' && <Verified className="w-4 h-4" style={{ color: '#917be7' }} />}
                            <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#f7f5ff', color: '#917be7' }}>
                              {activity.badge}
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{activity.time}</span>
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{activity.category}</span>
                          </div>
                          
                          <div className="mb-4">
                            <span className="text-gray-700">scored </span>
                            <span className="font-medium text-gray-900">{activity.target}</span>
                          </div>
                          
                          <div className="flex items-center space-x-6 mb-4 bg-gray-50 rounded-xl p-4 hover-lift">
                            <div className="text-center">
                              <div className="text-lg font-medium text-green-600">A: {activity.aScore}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-medium text-red-600">O: {activity.oScore}</div>
                            </div>
                            <div className="text-center">
                              <div className={`text-lg font-medium ${(activity.aScore - activity.oScore) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                T: {(activity.aScore - activity.oScore).toFixed(1)}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-4 leading-relaxed">{activity.explanation}</p>
                          
                          <div className="flex items-center space-x-6">
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors hover-scale">
                              <Heart className="w-4 h-4" />
                              <span className="text-sm">{activity.likes}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors hover-scale">
                              <MessageSquare className="w-4 h-4" />
                              <span className="text-sm">{activity.comments}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors hover-scale">
                              <Share className="w-4 h-4" />
                              <span className="text-sm">Share</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-yellow-500 transition-colors hover-scale">
                              <Bookmark className="w-4 h-4" />
                              <span className="text-sm">Save</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 text-center">
                  <button className="text-white px-6 py-3 rounded-xl font-medium hover-lift" style={{ background: '#917be7' }}>
                    View All Trending
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Trending Now */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover-lift">
                <h4 className="font-medium text-gray-900 mb-6">Trending Now</h4>
                <div className="space-y-4">
                  {[
                    { name: 'William Murdoch', change: '+6.8', votes: '45,231 votes', avatar: '👨‍🔬' },
                    { name: 'Jack Dawson', change: '+2.8', votes: '3,762 votes', avatar: '🚢' },
                    { name: 'Alina Miller', change: '+2.8', votes: '3,762 votes', avatar: '👩‍💼' },
                    { name: 'Fiverr Inc', change: '+2.6', votes: '3,762 votes', avatar: '💼' },
                    { name: 'William Murdoch', change: '-0.6', votes: '45,231 votes', avatar: '👨‍🔬' },
                    { name: 'Jack Dawson', change: '+2.8', votes: '3,762 votes', avatar: '🚢' },
                    { name: 'Alice Smith', change: '+2.6', votes: '3,762 votes', avatar: '👩‍🎓' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 hover-lift">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(45deg, #917be7, #8a72e6)' }}>
                        <span className="text-white text-sm">{item.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.votes}</div>
                      </div>
                      <div className={`text-sm font-medium ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button className="text-sm font-medium hover-scale" style={{ color: '#917be7' }}>
                    View All Trending
                  </button>
                </div>
              </div>

              {/* Top Contributors */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <h4 className="font-medium text-gray-900 mb-6">Top Contributors</h4>
                <div className="space-y-4">
                  {[
                    { name: 'Dr. Elena Rodriguez', scores: '1247 scores', accuracy: '94% accuracy', badge: 'Expert Contributor', level: 'expert' },
                    { name: 'Michael Chen', scores: '1098 scores', accuracy: '91% accuracy', badge: 'Historian', level: 'verified' },
                    { name: 'Professor James Wilson', scores: '967 scores', accuracy: '96% accuracy', badge: 'Ethics Scholar', level: 'expert' },
                    { name: 'Lisa Park', scores: '834 scores', accuracy: '89% accuracy', badge: 'Rising Star', level: 'rising' }
                  ].map((contributor, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ 
                        background: contributor.level === 'expert' ? 'linear-gradient(45deg, #f59e0b, #f97316)' : 
                                   contributor.level === 'verified' ? 'linear-gradient(45deg, #917be7, #8a72e6)' : 
                                   'linear-gradient(45deg, #10b981, #059669)'
                      }}>
                        <Crown className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{contributor.name}</span>
                          {contributor.level !== 'rising' && <Verified className="w-4 h-4" style={{ color: '#917be7' }} />}
                        </div>
                        <div className="text-xs text-gray-500">{contributor.scores} • {contributor.accuracy}</div>
                        <div className="text-xs px-2 py-1 rounded-full mt-1" style={{ 
                          backgroundColor: contributor.level === 'expert' ? '#fef3c7' : 
                                         contributor.level === 'verified' ? '#f7f5ff' : '#f0fdf4',
                          color: contributor.level === 'expert' ? '#f59e0b' : 
                                contributor.level === 'verified' ? '#917be7' : '#10b981'
                        }}>
                          {contributor.badge}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button className="text-sm font-medium" style={{ color: '#917be7' }}>
                    View All Contributors
                  </button>
                </div>
              </div>

              {/* Active Debates */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <h4 className="font-medium text-gray-900 mb-6">Active Debates</h4>
                <div className="space-y-4">
                  {[
                    {
                      topic: 'Revolutionary scientific contributions that changed our understanding of physics and chemistry.',
                      participants: 1247,
                      time: '3 minutes ago',
                      status: 'hot'
                    },
                    {
                      topic: 'The moral implications of AI development and its impact on society.',
                      participants: 892,
                      time: '15 minutes ago',
                      status: 'trending'
                    },
                    {
                      topic: 'Evaluating corporate responsibility in the digital age.',
                      participants: 654,
                      time: '1 hour ago',
                      status: 'active'
                    }
                  ].map((debate, index) => (
                    <div key={index} className="border border-gray-100 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                          debate.status === 'hot' ? 'bg-red-100 text-red-600' :
                          debate.status === 'trending' ? 'bg-orange-100 text-orange-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {debate.status.toUpperCase()}
                        </div>
                        <span className="text-xs text-gray-500">{debate.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{debate.topic}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Users2 className="w-3 h-3" />
                        <span>{debate.participants} participants</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button className="text-sm font-medium" style={{ color: '#917be7' }}>
                    View All Debates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline Charts */}
      <section 
        className={`py-16 bg-white fade-in-up ${visibleSections.has('timeline') ? 'visible' : ''}`}
        data-section
        id="timeline"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-medium text-gray-900 mb-4">Target Timeline Analysis</h2>
            <p className="text-gray-600 font-normal">Track moral scores over time with key events and milestones</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Will Smith Timeline */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover-lift">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(45deg, #917be7, #8a72e6)' }}>
                    <span className="text-white text-2xl">🎬</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Will Smith</h3>
                    <p className="text-gray-600">Actor, Producer, Musician</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-medium text-gray-700">Current Score:</span>
                      <span className="text-lg font-medium text-orange-600">+2.6</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => openGraphModal(willSmithTimeline)}
                  className="text-white px-4 py-2 rounded-lg font-medium text-sm hover-lift"
                  style={{ background: '#917be7' }}
                >
                  View Details
                </button>
              </div>

              <div className="relative h-48 mb-6">
                <svg className="w-full h-full" viewBox="0 0 600 200">
                  <defs>
                    <linearGradient id="willSmithGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#917be7', stopOpacity: 0.3 }} />
                      <stop offset="100%" style={{ stopColor: '#917be7', stopOpacity: 0 }} />
                    </linearGradient>
                  </defs>
                  
                  <path
                    d="M0,160 Q75,120 150,100 Q225,80 300,60 Q375,40 450,80 Q525,120 600,140"
                    fill="none"
                    stroke="#917be7"
                    strokeWidth="3"
                  />
                  
                  <path
                    d="M0,160 Q75,120 150,100 Q225,80 300,60 Q375,40 450,80 Q525,120 600,140 L600,200 L0,200 Z"
                    fill="url(#willSmithGradient)"
                  />
                  
                  {willSmithTimeline.map((event, index) => {
                    const x = (index / (willSmithTimeline.length - 1)) * 600;
                    const y = 200 - (event.score / 10) * 180;
                    return (
                      <g key={index}>
                        <circle 
                          cx={x} 
                          cy={y} 
                          r="6" 
                          fill={event.type === 'positive' ? '#10b981' : '#ef4444'}
                          className="cursor-pointer hover-scale transition-all"
                          onClick={() => openEventModal(event)}
                        />
                        {(index === 0 || index === willSmithTimeline.length - 1 || event.event === 'Oscar Slap Incident') && (
                          <text 
                            x={x} 
                            y={y - 15} 
                            textAnchor="middle" 
                            className="text-xs fill-gray-600 font-medium"
                          >
                            {event.date}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4 hover-lift">
                  <div className="text-2xl font-medium text-green-600 mb-1">8.1</div>
                  <div className="text-sm text-green-700">Peak Score (2001)</div>
                  <div className="text-xs text-gray-600">Ali Performance</div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 hover-lift">
                  <div className="text-2xl font-medium text-red-600 mb-1">2.6</div>
                  <div className="text-sm text-red-700">Lowest Score (2022)</div>
                  <div className="text-xs text-gray-600">Oscar Slap Incident</div>
                </div>
              </div>
            </div>

            {/* Nelson Mandela Timeline */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover-lift">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(45deg, #10b981, #059669)' }}>
                    <span className="text-white text-2xl">⚖️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">Nelson Mandela</h3>
                    <p className="text-gray-600">Political Leader, Activist</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-medium text-gray-700">Current Score:</span>
                      <span className="text-lg font-medium text-green-600">+8.2</span>
                    </div>
                  </div>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover-lift">
                  View Details
                </button>
              </div>

              <div className="relative h-48 mb-6">
                <svg className="w-full h-full" viewBox="0 0 600 200">
                  <defs>
                    <linearGradient id="mandelaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.3 }} />
                      <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0 }} />
                    </linearGradient>
                  </defs>
                  
                  <path
                    d="M0,180 Q150,160 300,100 Q450,40 600,50"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />
                  
                  <path
                    d="M0,180 Q150,160 300,100 Q450,40 600,50 L600,200 L0,200 Z"
                    fill="url(#mandelaGradient)"
                  />
                  
                  {[
                    { x: 0, y: 180, label: '1950s' },
                    { x: 200, y: 140, label: '1980s' },
                    { x: 400, y: 60, label: '1990s' },
                    { x: 600, y: 50, label: '2000s' }
                  ].map((point, index) => (
                    <circle key={index} cx={point.x} cy={point.y} r="6" fill="#10b981" className="hover-scale" />
                  ))}
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4 hover-lift">
                  <div className="text-2xl font-medium text-green-600 mb-1">9.1</div>
                  <div className="text-sm text-green-700">Peak Score (1994)</div>
                  <div className="text-xs text-gray-600">Nobel Peace Prize</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 hover-lift">
                  <div className="text-2xl font-medium text-blue-600 mb-1">3,421</div>
                  <div className="text-sm text-blue-700">Total Votes</div>
                  <div className="text-xs text-gray-600">High consensus</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Scoring Demo */}
      <section 
        className={`py-16 fade-in-up ${visibleSections.has('scoring') ? 'visible' : ''}`}
        style={{ backgroundColor: '#f9fafb' }}
        data-section
        id="scoring"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-medium text-gray-900 mb-4">Interactive Scoring Demo</h2>
            <p className="text-gray-600 font-normal">Experience our core functionality - rate any target using our A-O=T methodology</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover-lift">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Scoring Interface */}
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-8">Rate a Target</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Target</label>
                    <select
                      value={selectedTarget}
                      onChange={(e) => setSelectedTarget(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg hover-lift transition-all duration-300"
                    >
                      <option value="">Choose a target...</option>
                      {targets.map((target) => (
                        <option key={target.id} value={target.id}>
                          {target.name} ({target.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Your Account Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'anonymous', label: 'Anonymous', feature: 'Basic', desc: 'Essential features' },
                        { value: 'registered', label: 'Registered', feature: 'Enhanced', desc: 'Extended features' },
                        { value: 'authenticated', label: 'Verified', feature: 'Premium', desc: 'Full features' }
                      ].map((type) => (
                        <button
                          key={type.value}
                          onClick={() => setUserType(type.value)}
                          className={`p-4 rounded-xl text-center transition-all border-2 hover-lift ${
                            userType === type.value 
                              ? 'border-current text-white' 
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                          style={userType === type.value ? { background: '#917be7', borderColor: '#917be7' } : {}}
                        >
                          <div className="font-medium">{type.label}</div>
                          <div className="text-sm opacity-80">{type.feature}</div>
                          <div className="text-xs opacity-70">{type.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-3">
                        Accomplishments (A): <span className="text-2xl font-bold">{aScore.toFixed(1)}</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={aScore}
                        onChange={(e) => setAScore(parseFloat(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-400 rounded-lg appearance-none cursor-pointer hover-scale transition-all duration-300"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>No positive impact</span>
                        <span>Maximum positive impact</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-red-700 mb-3">
                        Offenses (O): <span className="text-2xl font-bold">{oScore.toFixed(1)}</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={oScore}
                        onChange={(e) => setOScore(parseFloat(e.target.value))}
                        className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-400 rounded-lg appearance-none cursor-pointer hover-scale transition-all duration-300"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>No harmful actions</span>
                        <span>Maximum harm caused</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="inline-block bg-gray-900 text-white px-8 py-6 rounded-2xl hover-lift">
                      <div className="text-lg font-medium mb-3">Total Score (A - O = T)</div>
                      <div className="text-4xl font-bold">
                        {aScore.toFixed(1)} - {oScore.toFixed(1)} = 
                        <span className={`ml-3 ${tScore >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {tScore > 0 ? '+' : ''}{tScore.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedTarget && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Explain Accomplishments ({userType === 'authenticated' ? 'Unlimited' : userType === 'registered' ? '500' : '140'} characters)
                        </label>
                        <textarea
                          value={aExplanation}
                          onChange={(e) => setAExplanation(e.target.value)}
                          placeholder="Why did you give this accomplishments score?"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none hover-lift transition-all duration-300"
                          rows={3}
                          maxLength={userType === 'authenticated' ? undefined : userType === 'registered' ? 500 : 140}
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {aExplanation.length}/{userType === 'authenticated' ? '∞' : userType === 'registered' ? '500' : '140'} characters
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Explain Offenses ({userType === 'authenticated' ? 'Unlimited' : userType === 'registered' ? '500' : '140'} characters)
                        </label>
                        <textarea
                          value={oExplanation}
                          onChange={(e) => setOExplanation(e.target.value)}
                          placeholder="Why did you give this offenses score?"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none hover-lift transition-all duration-300"
                          rows={3}
                          maxLength={userType === 'authenticated' ? undefined : userType === 'registered' ? 500 : 140}
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {oExplanation.length}/{userType === 'authenticated' ? '∞' : userType === 'registered' ? '500' : '140'} characters
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleVoteSubmit}
                    disabled={!selectedTarget}
                    className="w-full text-white py-4 px-6 rounded-xl font-medium text-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-all hover-lift"
                    style={selectedTarget ? { background: '#917be7' } : {}}
                  >
                    Submit Evaluation
                  </button>
                </div>
              </div>

              {/* Live Results */}
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-8">Live Rankings</h3>
                <div className="space-y-4">
                  {targets.map((target, index) => {
                    const tScore = target.avgA - target.avgO;
                    return (
                      <div key={target.id} className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all cursor-pointer hover-lift" style={{ backgroundColor: '#fefefe' }}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(45deg, #917be7, #8a72e6)' }}>
                              <span className="text-white font-bold">#{index + 1}</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{target.name}</div>
                              <div className="text-sm text-gray-500">{target.category}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${tScore >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {tScore > 0 ? '+' : ''}{tScore.toFixed(1)}
                            </div>
                            <div className="text-sm text-gray-500">{target.votes.toLocaleString()} votes</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                          <div className="bg-green-50 rounded-lg p-3 hover-lift">
                            <div className="text-lg font-bold text-green-600">{target.avgA}</div>
                            <div className="text-xs text-green-700">Accomplishments</div>
                          </div>
                          <div className="bg-red-50 rounded-lg p-3 hover-lift">
                            <div className="text-lg font-bold text-red-600">{target.avgO}</div>
                            <div className="text-xs text-red-700">Offenses</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 hover-lift">
                            <div className={`text-lg font-bold ${tScore >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {tScore > 0 ? '+' : ''}{tScore.toFixed(1)}
                            </div>
                            <div className="text-xs text-gray-700">Total</div>
                          </div>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min(Math.abs(tScore) * 10, 100)}%`,
                              backgroundColor: tScore >= 0 ? '#10b981' : '#ef4444'
                            }}
                          ></div>
                        </div>
                        
                        {target.trending && (
                          <div className="mt-3 flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-orange-600 font-medium">Trending</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section 
        className={`py-16 fade-in-up ${visibleSections.has('how-it-works') ? 'visible' : ''}`}
        style={{ backgroundColor: '#f9fafb' }}
        data-section
        id="how-it-works"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-medium text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 font-normal max-w-3xl mx-auto">
              Our simple yet powerful methodology transforms complex moral questions into quantifiable insights
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4 hover-lift">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: '#917be7' }}>
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Choose Your Target</h3>
                  <p className="text-gray-600">Select from thousands of historical figures, organizations, countries, or add new ones for evaluation.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 hover-lift">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: '#917be7' }}>
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Score Accomplishments & Offenses</h3>
                  <p className="text-gray-600">Rate positive contributions (A) and harmful actions (O) on a scale of 0-10, with detailed explanations.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 hover-lift">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: '#917be7' }}>
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Calculate Total Score</h3>
                  <p className="text-gray-600">Our algorithm automatically calculates T = A - O through community consensus and transparent methodology.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 hover-lift">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: '#917be7' }}>
                  <span className="text-white font-bold text-lg">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Join the Discussion</h3>
                  <p className="text-gray-600">Engage with community insights, debate perspectives, and refine your moral understanding.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover-lift">
              <h4 className="text-xl font-medium text-gray-900 mb-6 text-center">The AOT Formula</h4>
              
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-4">A - O = T</div>
                <p className="text-gray-600">Where every voice matters in building humanity's moral ledger</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl hover-lift">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">A</span>
                    </div>
                    <span className="font-medium text-green-800">Accomplishments</span>
                  </div>
                  <span className="text-green-600 text-sm">0 - 10 scale</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl hover-lift">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">O</span>
                    </div>
                    <span className="font-medium text-red-800">Offenses</span>
                  </div>
                  <span className="text-red-600 text-sm">0 - 10 scale</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl hover-lift" style={{ backgroundColor: '#f7f5ff' }}>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#917be7' }}>
                      <span className="text-white font-bold">T</span>
                    </div>
                    <span className="font-medium" style={{ color: '#917be7' }}>Total Score</span>
                  </div>
                  <span className="text-sm" style={{ color: '#917be7' }}>-10 to +10 range</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section 
        className={`py-16 bg-white fade-in-up ${visibleSections.has('market') ? 'visible' : ''}`}
        data-section
        id="market"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-medium text-gray-900 mb-4">Market Opportunity</h2>
            <p className="text-gray-600 font-normal max-w-3xl mx-auto">
              Addressing the growing need for structured moral discourse in an increasingly complex world
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center hover-lift">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#f7f5ff' }}>
                <Globe className="w-10 h-10" style={{ color: '#917be7' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Global Scale</h3>
              <p className="text-4xl font-bold mb-2" style={{ color: '#917be7' }}>8B+</p>
              <p className="text-gray-600">People worldwide seeking moral clarity in complex times</p>
            </div>

            <div className="text-center hover-lift">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#f7f5ff' }}>
                <BarChart3 className="w-10 h-10" style={{ color: '#917be7' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Market Size</h3>
              <p className="text-4xl font-bold mb-2" style={{ color: '#917be7' }}>$2.3B</p>
              <p className="text-gray-600">Social platform market growing 25% annually</p>
            </div>

            <div className="text-center hover-lift">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#f7f5ff' }}>
                <TrendingUp className="w-10 h-10" style={{ color: '#917be7' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Growth Rate</h3>
              <p className="text-4xl font-bold mb-2" style={{ color: '#917be7' }}>47%</p>
              <p className="text-gray-600">Year-over-year growth in moral discourse platforms</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 hover-lift">
            <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Now?</h4>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 hover-lift">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h5 className="font-medium text-gray-900">Political Polarization</h5>
                    <p className="text-gray-600 text-sm">Growing need for objective moral evaluation frameworks</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 hover-lift">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h5 className="font-medium text-gray-900">Corporate Accountability</h5>
                    <p className="text-gray-600 text-sm">Increased demand for transparent business ethics evaluation</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 hover-lift">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h5 className="font-medium text-gray-900">Digital Misinformation</h5>
                    <p className="text-gray-600 text-sm">Need for credible, community-driven truth verification</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 hover-lift">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h5 className="font-medium text-gray-900">Generational Values</h5>
                    <p className="text-gray-600 text-sm">Younger generations seek authentic moral leadership</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Security */}
      <section 
        className={`py-16 fade-in-up ${visibleSections.has('technology') ? 'visible' : ''}`}
        style={{ backgroundColor: '#f9fafb' }}
        data-section
        id="technology"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-medium text-gray-900 mb-4">Technology & Security</h2>
            <p className="text-gray-600 font-normal max-w-3xl mx-auto">
              Built on enterprise-grade infrastructure with advanced AI and blockchain verification
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-lift">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#f7f5ff' }}>
                    <Shield className="w-6 h-6" style={{ color: '#917be7' }} />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Advanced Security</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• End-to-end encryption for all user data</li>
                  <li>• Multi-factor authentication systems</li>
                  <li>• Regular security audits and penetration testing</li>
                  <li>• GDPR and CCPA compliant data handling</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-lift">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#f7f5ff' }}>
                    <Database className="w-6 h-6" style={{ color: '#917be7' }} />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">AI-Powered Insights</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Machine learning bias detection</li>
                  <li>• Natural language processing for sentiment analysis</li>
                  <li>• Automated spam and manipulation detection</li>
                  <li>• Predictive analytics for trending topics</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-lift">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#f7f5ff' }}>
                    <Activity className="w-6 h-6" style={{ color: '#917be7' }} />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Scalable Infrastructure</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Cloud-native architecture for global scale</li>
                  <li>• Real-time data processing capabilities</li>
                  <li>• 99.9% uptime service level agreement</li>
                  <li>• Auto-scaling for traffic spikes</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-lift">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#f7f5ff' }}>
                    <Verified className="w-6 h-6" style={{ color: '#917be7' }} />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Verification Systems</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Multi-level user verification process</li>
                  <li>• Blockchain-based vote integrity</li>
                  <li>• Social media identity linking</li>
                  <li>• Professional credential verification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Standards */}
      <section 
        className={`py-16 fade-in-up ${visibleSections.has('standards') ? 'visible' : ''}`}
        style={{ backgroundColor: '#f9fafb' }}
        data-section
        id="standards"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block text-sm font-medium mb-4" style={{ color: '#917be7' }}>Our Product</div>
            <h2 className="text-4xl font-medium text-gray-900 mb-4">
              Community <span style={{ color: '#917be7' }}>Standards</span>
            </h2>
            <p className="text-gray-600 font-normal max-w-3xl mx-auto">
              The only platform designed specifically for transparent, democratic moral evaluation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#f7f5ff' }}>
                <Award className="w-8 h-8" style={{ color: '#917be7' }} />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 text-center mb-6">Respectful Discourse</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#917be7' }}></div>
                  <span>Focus on actions and impacts, not personal attacks</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#917be7' }}></div>
                  <span>Provide evidence-based explanations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#917be7' }}></div>
                  <span>Acknowledge different moral frameworks</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#f7f5ff' }}>
                <Users2 className="w-8 h-8" style={{ color: '#917be7' }} />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 text-center mb-6">Objective Evaluation</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#917be7' }}></div>
                  <span>Consider historical context and available information</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#917be7' }}></div>
                  <span>Separate personal feelings from moral assessment</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#917be7' }}></div>
                  <span>Acknowledge uncertainty and complexity</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#f7f5ff' }}>
                <Lightbulb className="w-8 h-8" style={{ color: '#917be7' }} />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 text-center mb-6">Platform Integrity</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#917be7' }}></div>
                  <span>One person, one vote per target</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#917be7' }}></div>
                  <span>No coordinated manipulation attempts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#917be7' }}></div>
                  <span>Report suspicious activity</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#f7f5ff' }}>
                <Globe className="w-8 h-8" style={{ color: '#917be7' }} />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 text-center mb-6">Constructive Participation</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#917be7' }}></div>
                  <span>Provide thoughtful explanations for scores</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#917be7' }}></div>
                  <span>Engage with community discussions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#917be7' }}></div>
                  <span>Help new users understand the platform</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Tiers */}
      <section 
        className={`py-16 bg-white fade-in-up ${visibleSections.has('subscription') ? 'visible' : ''}`}
        data-section
        id="subscription"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-medium text-gray-900 mb-4">Choose Your Impact Level</h2>
            <p className="text-gray-600 font-normal max-w-3xl mx-auto">
              Select the subscription tier that matches your engagement level and unlock powerful features for moral evaluation
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* T1 - Free */}
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 relative hover-lift">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-700 mb-2">T1</div>
                <div className="text-2xl font-bold text-gray-900">Free</div>
                <div className="text-sm text-gray-500">Basic Access</div>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Vote on targets</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>140 character explanations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Join groups</span>
                </li>
              </ul>
              <button className="w-full mt-6 bg-gray-600 text-white py-3 rounded-xl font-medium hover-lift transition-all duration-300">
                Get Started
              </button>
            </div>

            {/* T2 - $1/Mo */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover-lift">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold" style={{ color: '#917be7' }}>T2</div>
                <div className="text-2xl font-bold text-gray-900">$1<span className="text-sm text-gray-500">/mo</span></div>
                <div className="text-sm text-gray-500">Community Builder</div>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>All T1 features</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Unlimited 140 char responses</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Create groups</span>
                </li>
              </ul>
              <button className="w-full mt-6 text-white py-3 rounded-xl font-medium hover-lift transition-all duration-300" style={{ background: '#917be7' }}>
                Choose T2
              </button>
            </div>

            {/* T3 - $5/Mo */}
            <div className="bg-white rounded-3xl p-6 border-2 shadow-lg relative transform scale-105 hover-lift" style={{ borderColor: '#917be7' }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="text-white px-4 py-1 rounded-full text-xs font-medium" style={{ background: '#917be7' }}>
                  Most Popular
                </div>
              </div>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold" style={{ color: '#917be7' }}>T3</div>
                <div className="text-2xl font-bold text-gray-900">$5<span className="text-sm text-gray-500">/mo</span></div>
                <div className="text-sm text-gray-500">Enhanced Features</div>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>All T2 features</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>500 character explanations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>500 character responses</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Insert hyperlinks</span>
                </li>
              </ul>
              <button className="w-full mt-6 text-white py-3 rounded-xl font-medium hover-lift transition-all duration-300" style={{ background: '#917be7' }}>
                Choose T3
              </button>
            </div>

            {/* T4 - $10/Mo */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover-lift">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold" style={{ color: '#917be7' }}>T4</div>
                <div className="text-2xl font-bold text-gray-900">$10<span className="text-sm text-gray-500">/mo</span></div>
                <div className="text-sm text-gray-500">Power User</div>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>All T3 features</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>50,000 char explanations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>50,000 char responses</span>
                </li>
              </ul>
              <button className="w-full mt-6 text-white py-3 rounded-xl font-medium hover-lift transition-all duration-300" style={{ background: '#917be7' }}>
                Choose T4
              </button>
            </div>

            {/* T5 - $50/Mo */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 border-2 border-yellow-300 shadow-lg relative hover-lift">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <Crown className="w-3 h-3" />
                  <span>Expert</span>
                </div>
              </div>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-orange-600">T5</div>
                <div className="text-2xl font-bold text-gray-900">$50<span className="text-sm text-gray-500">/mo</span></div>
                <div className="text-sm text-gray-500">Expert Level</div>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>All T4 features</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Unlimited explanations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Unlimited responses</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Upload documents</span>
                </li>
              </ul>
              <button className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-xl font-medium hover-lift transition-all duration-300">
                Choose T5
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 font-normal">
              All subscriptions include access to premium analytics, priority support, and exclusive community features.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#917be7' }}>
                  <Scale className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-xl">AOT</span>
              </div>
              <p className="text-gray-400 text-sm font-normal">
                Social Platform for Moral Evaluation
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400 font-normal">
                <li><a href="#" className="hover:text-white">How it Works</a></li>
                <li><a href="#" className="hover:text-white">Methodology</a></li>
                <li><a href="#" className="hover:text-white">Research</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400 font-normal">
                <li><a href="#" className="hover:text-white">Guidelines</a></li>
                <li><a href="#" className="hover:text-white">Leaderboards</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400 font-normal">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400 font-normal">
            © 2024 AOT Platform. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Event Detail Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    selectedEvent.type === 'positive' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {selectedEvent.type === 'positive' ? 
                      <TrendingUp className="w-8 h-8 text-green-600" /> : 
                      <TrendingDown className="w-8 h-8 text-red-600" />
                    }
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">{selectedEvent.event}</h3>
                    <p className="text-lg text-gray-600">{selectedEvent.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-3 hover:bg-gray-100 rounded-xl"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-8">
              {selectedEvent.event === 'Oscar Slap Incident' ? (
                <div className="space-y-8">
                  <div className="w-full h-64 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎭</div>
                      <div className="text-xl font-medium text-red-800">2022 Academy Awards Incident</div>
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">The Incident That Shocked Hollywood</h4>
                    
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      On March 27, 2022, during the 94th Academy Awards ceremony, Will Smith walked onto the stage and slapped presenter Chris Rock after Rock made a joke about Jada Pinkett Smith's shaved head. The joke referenced the 1997 film "G.I. Jane," unaware that Pinkett Smith suffers from alopecia, a condition that causes hair loss.
                    </p>

                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      The incident occurred when Rock, while presenting the award for Best Documentary Feature, looked at Pinkett Smith and said, "Jada, I love you. G.I. Jane 2, can't wait to see it." The camera showed Pinkett Smith rolling her eyes. Smith initially appeared to laugh at the joke, but after seeing his wife's reaction, he walked up to the stage.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 my-8">
                      <div className="bg-red-50 rounded-2xl p-6">
                        <h5 className="font-bold text-red-800 mb-3">Immediate Consequences</h5>
                        <ul className="text-red-700 space-y-2">
                          <li>• Shocked silence in the audience</li>
                          <li>• Global media coverage</li>
                          <li>• Viral social media reaction</li>
                          <li>• Academy investigation launched</li>
                        </ul>
                      </div>
                      <div className="bg-orange-50 rounded-2xl p-6">
                        <h5 className="font-bold text-orange-800 mb-3">Long-term Impact</h5>
                        <ul className="text-orange-700 space-y-2">
                          <li>• 10-year Academy ban</li>
                          <li>• Resignation from Academy membership</li>
                          <li>• Multiple film projects cancelled</li>
                          <li>• Public reputation severely damaged</li>
                        </ul>
                      </div>
                    </div>

                    <h5 className="text-xl font-bold text-gray-900 mb-4">The Aftermath</h5>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      After returning to his seat, Smith shouted, "Keep my wife's name out your f***ing mouth!" The Academy of Motion Picture Arts and Sciences later condemned Smith's actions and launched a formal review. Smith resigned his membership and was subsequently banned from attending the Oscars for 10 years.
                    </p>

                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      This single moment overshadowed Smith's Oscar win for Best Actor that same evening for his role in "King Richard," and fundamentally altered public perception of the beloved actor who had maintained a largely positive image throughout his decades-long career.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h5 className="text-xl font-bold text-gray-900 mb-4">Timeline of Events</h5>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <div>
                          <span className="font-medium">March 27, 2022 - 8:47 PM PT:</span>
                          <span className="text-gray-700"> The slap occurs during live broadcast</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                        <div>
                          <span className="font-medium">March 28, 2022:</span>
                          <span className="text-gray-700"> Smith issues public apology on Instagram</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <div>
                          <span className="font-medium">April 1, 2022:</span>
                          <span className="text-gray-700"> Smith resigns from Academy membership</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                        <div>
                          <span className="font-medium">April 8, 2022:</span>
                          <span className="text-gray-700"> Academy bans Smith for 10 years</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="w-full h-48 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl mb-4">🎬</div>
                      <div className="text-xl font-medium text-gray-800">{selectedEvent.event}</div>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
                  <h5 className="text-xl font-bold text-gray-900 mb-4">Score Impact Analysis</h5>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold mb-2" style={{ color: selectedEvent.type === 'positive' ? '#10b981' : '#ef4444' }}>
                      {selectedEvent.score.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Moral Score at this point</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Community Consensus:</span>
                      <span className="font-medium">
                        {selectedEvent.event === 'Oscar Slap Incident' ? '94%' : '87%'} agreement
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Score Change:</span>
                      <span className={`font-medium ${selectedEvent.type === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedEvent.event === 'Oscar Slap Incident' ? '-4.8' : '+1.2'} points
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Votes Cast:</span>
                      <span className="font-medium">
                        {selectedEvent.event === 'Oscar Slap Incident' ? '3,247' : '1,892'} votes
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6">
                  <h5 className="text-xl font-bold text-gray-900 mb-4">Community Response</h5>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        {selectedEvent.event === 'Oscar Slap Incident' ? '2,847' : '1,234'}
                      </div>
                      <div className="text-sm text-blue-700">Total Discussions</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-sm font-medium text-gray-900">Top Comment</div>
                        <div className="text-sm text-gray-700 mt-1">
                          {selectedEvent.event === 'Oscar Slap Incident' ? 
                            '"Violence is never the answer, regardless of the provocation. This moment overshadowed decades of positive work."' :
                            '"This performance showcased incredible range and dedication to the craft. A defining moment in cinema."'
                          }
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>👍 {selectedEvent.event === 'Oscar Slap Incident' ? '1,247' : '892'}</span>
                          <span>💬 {selectedEvent.event === 'Oscar Slap Incident' ? '234' : '156'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Graph Modal */}
      {showGraphModal && selectedTimelineTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-gray-900">Will Smith - Moral Score Timeline</h3>
              <button
                onClick={() => setShowGraphModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-8">
              <div className="relative h-80">
                <svg className="w-full h-full" viewBox="0 0 1000 320">
                  <defs>
                    <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#917be7', stopOpacity: 0.3 }} />
                      <stop offset="100%" style={{ stopColor: '#917be7', stopOpacity: 0 }} />
                    </linearGradient>
                  </defs>
                  
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(score => (
                    <line key={score} x1="50" y1={300 - score * 25} x2="950" y2={300 - score * 25} stroke="#f3f4f6" strokeWidth="1" />
                  ))}
                  
                  <path
                    d={`M${50},${300 - selectedTimelineTarget[0].score * 25} ${selectedTimelineTarget.map((event, index) => {
                      const x = 50 + (index / (selectedTimelineTarget.length - 1)) * 900;
                      const y = 300 - event.score * 25;
                      return `L${x},${y}`;
                    }).join(' ')}`}
                    fill="none"
                    stroke="#917be7"
                    strokeWidth="4"
                  />
                  
                  <path
                    d={`M${50},${300 - selectedTimelineTarget[0].score * 25} ${selectedTimelineTarget.map((event, index) => {
                      const x = 50 + (index / (selectedTimelineTarget.length - 1)) * 900;
                      const y = 300 - event.score * 25;
                      return `L${x},${y}`;
                    }).join(' ')} L950,300 L50,300 Z`}
                    fill="url(#timelineGradient)"
                  />
                  
                  {selectedTimelineTarget.map((event, index) => {
                    const x = 50 + (index / (selectedTimelineTarget.length - 1)) * 900;
                    const y = 300 - event.score * 25;
                    return (
                      <g key={index}>
                        <circle 
                          cx={x} 
                          cy={y} 
                          r="8" 
                          fill={event.type === 'positive' ? '#10b981' : '#ef4444'}
                          className="cursor-pointer"
                          onClick={() => openEventModal(event)}
                        />
                        <text 
                          x={x} 
                          y={330} 
                          textAnchor="middle" 
                          className="text-sm fill-gray-600 font-medium"
                        >
                          {event.date}
                        </text>
                        <text 
                          x={x} 
                          y={y - 15} 
                          textAnchor="middle" 
                          className="text-xs fill-gray-800 font-bold"
                        >
                          {event.score.toFixed(1)}
                        </text>
                      </g>
                    );
                  })}
                  
                  {[0, 2, 4, 6, 8, 10].map(score => (
                    <text key={score} x="30" y={305 - score * 25} className="text-xs fill-gray-600" textAnchor="middle">
                      {score}
                    </text>
                  ))}
                </svg>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Key Events</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {selectedTimelineTarget.map((event, index) => (
                    <div key={index} className={`p-4 rounded-xl border-l-4 cursor-pointer hover:bg-gray-50 ${
                      event.type === 'positive' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                    }`} onClick={() => openEventModal(event)}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{event.event}</span>
                        <span className="text-sm text-gray-500">{event.date}</span>
                      </div>
                      <p className="text-sm text-gray-700">{event.description}</p>
                      <div className={`text-lg font-bold mt-2 ${event.type === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                        Score: {event.score.toFixed(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Score Analysis</h4>
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-600 mb-1">8.1</div>
                    <div className="text-sm font-medium text-green-700">Highest Score</div>
                    <div className="text-xs text-gray-600">Ali Performance (2001)</div>
                  </div>
                  
                  <div className="bg-red-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-red-600 mb-1">2.6</div>
                    <div className="text-sm font-medium text-red-700">Lowest Score</div>
                    <div className="text-xs text-gray-600">Oscar Slap Incident (2022)</div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-600 mb-1">5.5</div>
                    <div className="text-sm font-medium text-blue-700">Score Range</div>
                    <div className="text-xs text-gray-600">High volatility</div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-600 mb-1">1,892</div>
                    <div className="text-sm font-medium text-purple-700">Total Votes</div>
                    <div className="text-xs text-gray-600">Strong engagement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AOTPlatform;