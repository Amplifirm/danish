import  { useState } from 'react';
import { Calendar, MapPin, Clock, Play, Menu, X, CheckCircle, Globe, Target, Rocket,  Home, BookOpen, Mic,  Video, Download} from 'lucide-react';

const Third = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(1);
  const [selectedSessions] = useState<number[]>([]);
  const [showVideoPreview, setShowVideoPreview] = useState<number | null>(null);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <Home className="w-5 h-5" /> },
    { id: 'tracks', label: 'Select Sessions', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'speakers', label: 'Speakers', icon: <Mic className="w-5 h-5" /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar className="w-5 h-5" /> },
    { id: 'recordings', label: 'Session Recordings', icon: <Video className="w-5 h-5" /> },
    { id: 'register', label: 'Register Free', icon: <Target className="w-5 h-5" /> }
  ];

  const tracks = [
    {
      id: 1,
      title: "Drive Revenue",
      icon: "📈",
      color: "bg-blue-500",
      description: "AI integration, customer success strategies, and growth optimization techniques",
      sessions: [
        {
          id: 101,
          title: "AI-Powered Customer Success Strategies",
          speaker: "Dr. Sarah Chen",
          company: "Microsoft",
          time: "10:30 AM",
          duration: "45 min",
          description: "Learn how to implement AI tools to predict customer churn, automate success workflows, and increase retention rates by 40%.",
          headshot: "👩‍💼",
          hasVideo: true,
          isRecorded: true
        },
        {
          id: 102,
          title: "Revenue Growth Through E365 Integration",
          speaker: "Marcus Rodriguez",
          company: "HubSpot",
          time: "11:30 AM", 
          duration: "45 min",
          description: "Discover proven strategies to leverage Microsoft 365 ecosystem for sales automation and revenue acceleration.",
          headshot: "👨‍💼",
          hasVideo: true,
          isRecorded: false
        },
        {
          id: 103,
          title: "Data-Driven Sales Optimization",
          speaker: "Jennifer Park",
          company: "Salesforce",
          time: "12:30 PM",
          duration: "45 min", 
          description: "Transform your sales process with advanced analytics, predictive modeling, and performance optimization techniques.",
          headshot: "👩‍💻",
          hasVideo: true,
          isRecorded: true
        },
        {
          id: 104,
          title: "Customer Success Metrics That Matter",
          speaker: "David Kim",
          company: "AWS",
          time: "2:00 PM",
          duration: "45 min",
          description: "Identify and track the KPIs that directly impact revenue growth and customer lifetime value.",
          headshot: "👨‍💻",
          hasVideo: false,
          isRecorded: false
        },
        {
          id: 105,
          title: "Scaling Revenue with Automation",
          speaker: "Lisa Thompson",
          company: "Zoom",
          time: "3:00 PM",
          duration: "45 min",
          description: "Build scalable revenue systems using workflow automation and intelligent lead scoring.",
          headshot: "👩‍🔬",
          hasVideo: true,
          isRecorded: false
        },
        {
          id: 106,
          title: "Market Expansion Strategies for SMBs",
          speaker: "Alex Johnson",
          company: "Shopify",
          time: "4:00 PM",
          duration: "45 min",
          description: "Proven frameworks for expanding into new markets while maintaining operational efficiency.",
          headshot: "👨‍🎯",
          hasVideo: true,
          isRecorded: true
        }
      ]
    },
    {
      id: 2,
      title: "Reduce Expenses",
      icon: "💰",
      color: "bg-green-500",
      description: "Cost optimization through modern cloud platforms and AI-powered tools",
      sessions: [
        {
          id: 201,
          title: "Cloud Cost Optimization Strategies",
          speaker: "Rachel Martinez",
          company: "AWS",
          time: "10:30 AM",
          duration: "45 min",
          description: "Reduce cloud spending by 30-50% through intelligent resource management and cost monitoring.",
          headshot: "👩‍💼",
          hasVideo: true,
          isRecorded: true
        },
        {
          id: 202,
          title: "Automated Process Optimization",
          speaker: "Tom Wilson",
          company: "Microsoft",
          time: "11:30 AM",
          duration: "45 min", 
          description: "Eliminate manual processes and reduce operational costs through intelligent automation.",
          headshot: "👨‍🔧",
          hasVideo: true,
          isRecorded: false
        },
        {
          id: 203,
          title: "Vendor Management & Negotiation",
          speaker: "Emma Davis",
          company: "Procurement Pro",
          time: "12:30 PM",
          duration: "45 min",
          description: "Master vendor negotiations and contract optimization to reduce technology spending.",
          headshot: "👩‍💼",
          hasVideo: false,
          isRecorded: true
        },
        {
          id: 204,
          title: "ROI Analysis for Technology Investments",
          speaker: "Carlos Lopez",
          company: "Deloitte",
          time: "2:00 PM",
          duration: "45 min",
          description: "Calculate and optimize return on investment for all technology initiatives and purchases.",
          headshot: "👨‍📊",
          hasVideo: true,
          isRecorded: false
        },
        {
          id: 205,
          title: "Energy & Infrastructure Cost Reduction",
          speaker: "Nina Patel",
          company: "GreenTech Solutions",
          time: "3:00 PM", 
          duration: "45 min",
          description: "Sustainable approaches to reducing operational costs while improving environmental impact.",
          headshot: "👩‍🌱",
          hasVideo: true,
          isRecorded: true
        },
        {
          id: 206,
          title: "Budget Planning & Forecasting",
          speaker: "James Brown",
          company: "CFO Advisors",
          time: "4:00 PM",
          duration: "45 min",
          description: "Advanced budgeting techniques and forecasting models for better financial control.",
          headshot: "👨‍💼",
          hasVideo: true,
          isRecorded: false
        }
      ]
    },
    {
      id: 3,
      title: "Increase Productivity",
      icon: "⚡",
      color: "bg-purple-500",
      description: "Workflow automation and operational efficiency solutions",
      sessions: [
        {
          id: 301,
          title: "Workflow Automation Masterclass",
          speaker: "Kelly Chang",
          company: "Zapier",
          time: "10:30 AM",
          duration: "45 min",
          description: "Design and implement automated workflows that save 20+ hours per week per employee.",
          headshot: "👩‍💻",
          hasVideo: true,
          isRecorded: true
        },
        {
          id: 302,
          title: "Team Collaboration Excellence",
          speaker: "Mike Turner",
          company: "Slack",
          time: "11:30 AM",
          duration: "45 min",
          description: "Build high-performing teams through effective communication tools and collaboration strategies.",
          headshot: "👨‍👥",
          hasVideo: true,
          isRecorded: false
        },
        {
          id: 303,
          title: "Digital Transformation for SMBs",
          speaker: "Priya Sharma",
          company: "Digital First",
          time: "12:30 PM", 
          duration: "45 min",
          description: "Step-by-step guide to digitizing operations and eliminating paper-based processes.",
          headshot: "👩‍🚀",
          hasVideo: true,
          isRecorded: true
        },
        {
          id: 304,
          title: "Performance Metrics & KPI Tracking",
          speaker: "Robert Garcia",
          company: "Analytics Pro",
          time: "2:00 PM",
          duration: "45 min",
          description: "Implement data-driven performance management and real-time productivity monitoring.",
          headshot: "👨‍📈",
          hasVideo: false,
          isRecorded: false
        },
        {
          id: 305,
          title: "Remote Team Productivity",
          speaker: "Amanda Foster",
          company: "Remote Works",
          time: "3:00 PM",
          duration: "45 min",
          description: "Maximize productivity and engagement for distributed and hybrid teams.",
          headshot: "👩‍💼",
          hasVideo: true,
          isRecorded: true
        },
        {
          id: 306,
          title: "Time Management & Focus Strategies",
          speaker: "Daniel Lee",
          company: "Productivity Institute",
          time: "4:00 PM",
          duration: "45 min",
          description: "Evidence-based techniques for eliminating distractions and maximizing focused work time.",
          headshot: "👨‍⏰",
          hasVideo: true,
          isRecorded: false
        }
      ]
    },
    {
      id: 4,
      title: "Cybersecurity",
      icon: "🛡️",
      color: "bg-red-500",
      description: "Advanced threat protection and comprehensive data security strategies",
      sessions: [
        {
          id: 401,
          title: "Ransomware Prevention & Response",
          speaker: "Chris Anderson",
          company: "CrowdStrike",
          time: "10:30 AM",
          duration: "45 min",
          description: "Comprehensive strategies to prevent, detect, and respond to ransomware attacks.",
          headshot: "👨‍🔒",
          hasVideo: true,
          isRecorded: true
        },
        {
          id: 402,
          title: "Zero Trust Security Implementation",
          speaker: "Sarah Mitchell",
          company: "Palo Alto Networks",
          time: "11:30 AM",
          duration: "45 min",
          description: "Build a zero-trust security model that protects against modern threats and breaches.",
          headshot: "👩‍🛡️",
          hasVideo: true,
          isRecorded: false
        },
        {
          id: 403,
          title: "Data Protection & Privacy Compliance",
          speaker: "Kevin O'Brien",
          company: "Privacy Corp",
          time: "12:30 PM",
          duration: "45 min",
          description: "Navigate GDPR, CCPA, and other regulations while maintaining operational efficiency.",
          headshot: "👨‍⚖️",
          hasVideo: false,
          isRecorded: true
        },
        {
          id: 404,
          title: "Security Awareness Training",
          speaker: "Michelle Taylor",
          company: "Security Education",
          time: "2:00 PM",
          duration: "45 min",
          description: "Build a security-conscious culture and reduce human error-based security incidents.",
          headshot: "👩‍🎓",
          hasVideo: true,
          isRecorded: false
        },
        {
          id: 405,
          title: "Incident Response Planning",
          speaker: "John Harris",
          company: "Cyber Response",
          time: "3:00 PM",
          duration: "45 min",
          description: "Develop and test incident response plans that minimize damage and recovery time.",
          headshot: "👨‍🚨",
          hasVideo: true,
          isRecorded: true
        },
        {
          id: 406,
          title: "Emerging Security Threats 2025",
          speaker: "Dr. Lisa Wang",
          company: "Threat Intelligence",
          time: "4:00 PM",
          duration: "45 min",
          description: "Stay ahead of the latest threats including AI-powered attacks and social engineering.",
          headshot: "👩‍🔬",
          hasVideo: true,
          isRecorded: false
        }
      ]
    }
  ];



  const getSelectedSessionsCount = () => selectedSessions.length;

  return (
    <div className="h-screen bg-gray-800 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
          <img src="https://naspnet.org/wp-content/uploads/2022/09/eMazzanti-logo.png" alt="eMazzanti" className="h-6 brightness-0 invert" />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-thin text-white mb-1">ASPIRE</h2>
            <p className="text-slate-400 text-sm">2025 Conference</p>
          </div>

          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Session Counter */}
          <div className="mt-8 p-4 bg-slate-800 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">{getSelectedSessionsCount()}</div>
              <div className="text-slate-400 text-sm mb-2">Sessions Selected</div>
              <div className="text-xs text-slate-500">Choose sessions that interest you</div>
            </div>
          </div>

          <div className="mt-6">
            <button 
              onClick={() => setActiveSection('register')}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Register Free
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button onClick={() => setSidebarOpen(true)} className="bg-slate-900 text-white p-2 rounded-lg">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-y-auto">
          
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="p-4 md:p-8">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                  
                  {/* Hero Card */}
                  <div className="lg:col-span-2 bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-2xl p-6 md:p-8">
                    <div className="mb-6">
                      <div className="inline-block px-3 py-1 bg-green-500 text-black rounded-full text-sm font-medium mb-4">
                        FREE Registration • Select Your Sessions
                      </div>
                      <h1 className="text-4xl md:text-5xl font-thin mb-4">ASPIRE 2025</h1>
                      <p className="text-xl text-slate-300 mb-6">
                        Choose Your Learning Path - 24 Expert Sessions
                      </p>
                      <p className="text-slate-300 leading-relaxed">
                        Select the sessions that matter most to your business. Each track offers 6 expert-led sessions 
                        with preview videos, detailed descriptions, and post-event recordings for registered attendees.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 md:p-4 bg-slate-800 rounded-lg">
                        <div className="text-xl md:text-2xl font-bold text-blue-400">24</div>
                        <div className="text-xs text-slate-400">Expert Sessions</div>
                      </div>
                      <div className="text-center p-3 md:p-4 bg-slate-800 rounded-lg">
                        <div className="text-xl md:text-2xl font-bold text-green-400">4</div>
                        <div className="text-xs text-slate-400">Learning Tracks</div>
                      </div>
                      <div className="text-center p-3 md:p-4 bg-slate-800 rounded-lg">
                        <div className="text-xl md:text-2xl font-bold text-purple-400">FREE</div>
                        <div className="text-xs text-slate-400">Registration</div>
                      </div>
                      <div className="text-center p-3 md:p-4 bg-slate-800 rounded-lg">
                        <div className="text-xl md:text-2xl font-bold text-amber-400">NYC</div>
                        <div className="text-xs text-slate-400">Microsoft Center</div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setActiveSection('tracks')}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Select Sessions
                    </button>
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-4 md:space-y-6">
                    <div className="bg-gray-700 border border-gray-600 rounded-xl p-4 md:p-6 shadow-lg">
                      <h3 className="font-semibold text-gray-200 mb-4">Event Details</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300">October 15, 2025</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">9:00 AM - 5:00 PM EST</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-purple-400" />
                          <span className="text-gray-300">Microsoft Technology Center, NYC</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Video className="w-4 h-4 text-amber-400" />
                          <span className="text-gray-300">Recorded & Available Post-Event</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-900/40 border border-blue-700 rounded-xl p-4 md:p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Rocket className="w-5 h-5 text-blue-400" />
                        <h3 className="font-semibold text-blue-200">Keynote Speaker</h3>
                      </div>
                      <h4 className="font-semibold text-gray-200 mb-1">Paul Centenari</h4>
                      <p className="text-sm text-gray-400">Serial entrepreneur with 3 successful company exits</p>
                    </div>

                    <div className="bg-green-900/40 border border-green-700 rounded-xl p-4 md:p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <h3 className="font-semibold text-green-200">What's Included</h3>
                      </div>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Choose sessions you want</li>
                        <li>• Preview videos from speakers</li>
                        <li>• Access to all recordings</li>
                        <li>• Lunch & networking</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Session Selection (Tracks) */}
          {activeSection === 'tracks' && (
            <div className="p-4 md:p-8">
              <div className="max-w-6xl mx-auto">
                <div className="mb-6 md:mb-8">
                  <h1 className="text-3xl md:text-4xl font-thin text-gray-200 mb-2">Select Your Sessions</h1>
                  <p className="text-gray-400">Choose the sessions that interest you most • {getSelectedSessionsCount()} selected</p>
                </div>

                {/* Track Navigation */}
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  {tracks.map((track) => (
                    <button
                      key={track.id}
                      onClick={() => setSelectedTrack(track.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        selectedTrack === track.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <span className="text-lg">{track.icon}</span>
                      <span className="font-medium text-sm md:text-base">{track.title}</span>
                    </button>
                  ))}
                </div>

                {/* Sessions List */}
                <div className="space-y-4">
                  {tracks.find(t => t.id === selectedTrack)?.sessions.map((session) => (
                    <div key={session.id} className="bg-gray-700 border border-gray-600 rounded-xl p-4 md:p-6 shadow-lg">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        {/* Speaker Avatar & Info */}
                        <div className="flex items-start space-x-4 md:min-w-0 md:flex-1">
                          <div className="text-4xl md:text-5xl">{session.headshot}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 mb-3">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-1">{session.title}</h3>
                                <p className="text-gray-300 font-medium">{session.speaker}</p>
                                <p className="text-sm text-gray-400">{session.company}</p>
                              </div>
                              <div className="flex flex-row md:flex-col items-start gap-2 md:gap-1 text-right">
                                <span className="text-sm text-gray-400">{session.time}</span>
                                <span className="text-sm text-gray-500">{session.duration}</span>
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">{session.description}</p>
                            
                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-3">
                              <button
                               
                              >
                                {selectedSessions.includes(session.id) ? 'Selected ✓' : 'Select Session'}
                              </button>
                              
                              {session.hasVideo && (
                                <button
                                  onClick={() => setShowVideoPreview(session.id)}
                                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                  <Play className="w-4 h-4" />
                                  <span className="text-sm">Preview (5s)</span>
                                </button>
                              )}
                              
                              {session.isRecorded && (
                                <div className="flex items-center space-x-1 text-amber-400">
                                  <Video className="w-4 h-4" />
                                  <span className="text-xs">Will be recorded</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selection Summary */}
                {getSelectedSessionsCount() > 0 && (
                  <div className="mt-8 p-6 bg-blue-900/40 border border-blue-700 rounded-xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-200 mb-1">
                          {getSelectedSessionsCount()} Sessions Selected
                        </h3>
                        <p className="text-blue-300 text-sm">Ready to register for your personalized agenda</p>
                      </div>
                      <button
                        onClick={() => setActiveSection('register')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Register for Selected Sessions
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Session Recordings */}
          {activeSection === 'recordings' && (
            <div className="p-4 md:p-8">
              <div className="max-w-6xl mx-auto">
                <div className="mb-6 md:mb-8">
                  <h1 className="text-3xl md:text-4xl font-thin text-gray-200 mb-2">Session Recordings</h1>
                  <p className="text-gray-400">Access recorded sessions after the event (registration required)</p>
                </div>

                <div className="bg-amber-900/40 border border-amber-700 rounded-xl p-6 mb-8">
                  <div className="flex items-center space-x-3 mb-3">
                    <Video className="w-6 h-6 text-amber-400" />
                    <h3 className="text-lg font-semibold text-amber-200">Post-Event Access</h3>
                  </div>
                  <p className="text-amber-300 mb-4">
                    All sessions will be recorded and made available to registered attendees within 48 hours after the event.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-300">
                    <div>• HD video quality</div>
                    <div>• Downloadable for offline viewing</div>
                    <div>• Available for 90 days</div>
                    <div>• Mobile-friendly streaming</div>
                  </div>
                </div>

                {/* Recording Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tracks.flatMap(track => track.sessions.filter(s => s.isRecorded)).slice(0, 6).map((session) => (
                    <div key={session.id} className="bg-gray-700 border border-gray-600 rounded-xl p-6 shadow-lg">
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-3xl">{session.headshot}</span>
                        <div>
                          <h4 className="font-semibold text-gray-200">{session.speaker}</h4>
                          <p className="text-sm text-gray-400">{session.company}</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-200 mb-2">{session.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">{session.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{session.duration}</span>
                        <div className="flex items-center space-x-1 text-green-400">
                          <Download className="w-4 h-4" />
                          <span className="text-xs">Available post-event</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Register Section */}
          {activeSection === 'register' && (
            <div className="p-4 md:p-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-thin text-gray-200 mb-2">Register for ASPIRE 2025</h1>
                  <p className="text-gray-400 mb-4">Completely free registration • Access to all selected sessions</p>
                  <div className="inline-block px-4 py-2 bg-green-900/40 border border-green-700 text-green-200 rounded-full text-sm font-medium">
                    ✓ FREE Event  ✓ Choose Your Sessions  ✓ Access Recordings  ✓ Networking
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Registration Form */}
                  <div className="bg-gray-700 border border-gray-600 rounded-xl p-6 md:p-8 shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-200 mb-6">Registration Details</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-gray-200 placeholder-gray-400"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-gray-200 placeholder-gray-400"
                        />
                      </div>
                      
                      <input
                        type="email"
                        placeholder="Business Email"
                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-gray-200 placeholder-gray-400"
                      />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Company"
                          className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-gray-200 placeholder-gray-400"
                        />
                        <input
                          type="text"
                          placeholder="Job Title"
                          className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-gray-200 placeholder-gray-400"
                        />
                      </div>

                      {/* Selected Sessions Summary */}
                      {getSelectedSessionsCount() > 0 && (
                        <div className="p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
                          <h3 className="text-sm font-semibold text-blue-200 mb-2">
                            Selected Sessions ({getSelectedSessionsCount()})
                          </h3>
                          <p className="text-xs text-blue-300">
                            You'll receive confirmation and calendar invites for your selected sessions
                          </p>
                        </div>
                      )}

                      <button className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg">
                        Complete Free Registration
                      </button>

                      <p className="text-center text-gray-400 text-sm">
                        🔒 Powered by Gravity Forms • BigMarker Integration
                      </p>
                    </div>
                  </div>

                  {/* Registration Benefits */}
                  <div className="space-y-6">
                    <div className="bg-gray-700 border border-gray-600 rounded-xl p-6 shadow-lg">
                      <h3 className="font-semibold text-gray-200 mb-4">What You Get</h3>
                      <div className="space-y-3">
                        {[
                          'Access to all 24 expert sessions',
                          'Keynote by Paul Centenari',
                          'Speaker preview videos (5 seconds each)',
                          'Session recordings for 90 days',
                          'Networking reception & lunch',
                          'Digital resource downloads',
                          'Mobile-friendly event platform'
                        ].map((item, i) => (
                          <div key={i} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-900/40 border border-blue-700 rounded-xl p-6">
                      <h3 className="font-semibold text-blue-200 mb-3">Perfect For:</h3>
                      <ul className="text-blue-300 space-y-2 text-sm">
                        <li>• Small and midsize business owners</li>
                        <li>• C-level executives (CEO, COO, CFO)</li>
                        <li>• IT directors and technology leaders</li>
                        <li>• Business leaders driving growth</li>
                      </ul>
                    </div>

                    <div className="bg-purple-900/40 border border-purple-700 rounded-xl p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Globe className="w-5 h-5 text-purple-400" />
                        <h3 className="font-semibold text-purple-200">Platform Integration</h3>
                      </div>
                      <p className="text-purple-300 text-sm">
                        Built on WordPress with Elementor • Gravity Forms registration • 
                        BigMarker event platform for seamless experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other sections (speakers, schedule) would go here with similar mobile-first responsive design */}
          
        </main>
      </div>

      {/* Video Preview Modal */}
      {showVideoPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-200">Speaker Preview</h3>
              <button onClick={() => setShowVideoPreview(null)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center mb-4">
              <Play className="w-16 h-16 text-white" />
            </div>
            <p className="text-gray-300 text-sm">5-second preview video would play here</p>
          </div>
        </div>
      )}

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
};

export default Third;