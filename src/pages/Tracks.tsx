import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, DollarSign, Zap, Shield, ChevronRight, Users, ArrowRight, 
CheckCircle,  Clock
} from 'lucide-react';
import axios from 'axios';

// Type definitions
interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  company?: string;
  registeredSessions?: RegisteredSession[];
}

interface RegisteredSession {
  sessionId: string;
  sessionTitle?: string;
  track?: string;
  time?: string;
}

interface Session {
  id: string;
  title: string;
  speaker: string;
  time: string;
  description: string;
}

interface Track {
  id: number;
  title: string;
  icon: JSX.Element;
  color: string;
  gradient: string;
  description: string;
  fullDescription: string;
  topics: string[];
  sessions: Session[];
  outcomes: string[];
}

const TracksPage = () => {
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [registeredSessions, setRegisteredSessions] = useState<RegisteredSession[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();


  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      const parsedUser: UserType = JSON.parse(userData);
      setUser(parsedUser);
      setRegisteredSessions(parsedUser.registeredSessions || []);
    }
  }, []);

  const isSessionRegistered = (sessionId: string): boolean => {
    return registeredSessions.some(session => session.sessionId === sessionId);
  };

  const handleSessionRegister = async (
    sessionId: string, 
    sessionTitle: string, 
    track: string, 
    time: string
  ): Promise<void> => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isSessionRegistered(sessionId)) {
      // Unregister session
      const updatedSessions = registeredSessions.filter(s => s.sessionId !== sessionId);
      setRegisteredSessions(updatedSessions);
      
      const updatedUser = { ...user, registeredSessions: updatedSessions };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post('http://localhost:8000/api/auth/register-session', {
        sessionId,
        sessionTitle,
        track,
        time
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setRegisteredSessions(response.data.registeredSessions);
      
      const updatedUser = { ...user, registeredSessions: response.data.registeredSessions };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const tracks: Track[] = [
    {
      id: 1,
      title: "Drive Revenue",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-blue-600 to-blue-700",
      gradient: "from-blue-900/20 to-blue-800/30",
      description: "AI integration, customer success strategies, and growth optimization",
      fullDescription: "Discover innovative strategies to accelerate business growth through cutting-edge technology and customer-centric approaches. Learn how AI can transform your sales processes, how to build exceptional customer success programs, and implement growth optimization techniques that deliver measurable results.",
      topics: [
        "AI Integration for Sales",
        "Customer Success Strategies", 
        "E365 Implementation",
        "Growth Optimization",
        "Revenue Analytics",
        "Market Expansion"
      ],
      sessions: [
        {
          id: 'fc-motown',
          title: "FC Motown: How the little guy can succeed in business and sport",
          speaker: "Dan Karosen",
          time: "10:25 AM - 10:50 AM",
          description: "Discover how FC Motown rose from local play to NPSL National Championship through bold leadership and vision."
        },
        {
          id: 'ai-readiness',
          title: "AI Readiness Assessment",
          speaker: "Bryan Antepara", 
          time: "11:00 AM - 11:25 AM",
          description: "Essential concepts and processes to implement AI successfully in your organization."
        },
        {
          id: 'customer-success',
          title: "How Customer Success Can Supercharge Your Revenue",
          speaker: "Brindavani Pathuri",
          time: "11:30 AM - 11:55 AM",
          description: "How building stronger customer relationships directly fuels growth and retention."
        },
        {
          id: 'public-sector',
          title: "Doing Business with the Public Sector",
          speaker: "Paul Muir",
          time: "1:00 PM - 1:50 PM", 
          description: "Navigate government procurement processes and build relationships with municipalities."
        },
        {
          id: 'e365-advantage',
          title: "The e365 Advantage: Streamlined Services for Small Business Growth",
          speaker: "Bryan Antepara",
          time: "2:00 PM - 2:50 PM",
          description: "How e365 simplifies technology management and creates room for businesses to thrive."
        },
        {
          id: 'ai-without-pains',
          title: "How to Embrace AI without Growing Pains",
          speaker: "Deep Ranipa", 
          time: "3:00 PM - 3:50 PM",
          description: "Leverage AI to accelerate business growth while avoiding operational disruptions."
        }
      ],
      outcomes: [
        "Implement AI-driven sales strategies",
        "Build customer success programs that retain and grow accounts", 
        "Identify new revenue opportunities",
        "Leverage data analytics for growth decisions"
      ]
    },
    {
      id: 2,
      title: "Reduce Expenses",
      icon: <DollarSign className="w-8 h-8" />,
      color: "from-emerald-600 to-emerald-700",
      gradient: "from-emerald-900/20 to-emerald-800/30",
      description: "Cost optimization through modern cloud platforms and AI tools",
      fullDescription: "Master intelligent cost reduction without sacrificing quality or growth potential. Explore how modern cloud technologies and AI-powered tools can streamline operations, reduce overhead, and optimize resource allocation for maximum efficiency.",
      topics: [
        "Cloud Migration Strategies",
        "AI-Powered Cost Reduction", 
        "Compliance Optimization",
        "Budget Management",
        "Vendor Optimization",
        "Process Automation"
      ],
      sessions: [
        {
          id: 'anti-inflation-tech',
          title: "Do More with Less - How Technology is the Best Anti-Inflation Tool",
          speaker: "Nirvan Ramoutar",
          time: "10:25 AM - 10:50 AM", 
          description: "Technologies and systems that deliver immediate impact—helping you cut costs, protect margins, and stay competitive."
        },
        {
          id: 'microsoft-strategy',
          title: "Creating an IT Strategy with Microsoft that Works for your Business",
          speaker: "Deep Ranipa",
          time: "11:00 AM - 11:25 AM",
          description: "How Microsoft Dynamics 365 can streamline operations while keeping Excel integration seamless."
        },
        {
          id: 'teams-telephone',
          title: "Reduce your Telephone Operating Costs with Microsoft Teams", 
          speaker: "Bryan Antepara",
          time: "11:30 AM - 11:55 AM",
          description: "Cut phone system expenses by moving to Microsoft Teams with smooth migration strategies."
        },
        {
          id: 'supplier-audit',
          title: "How to create an effective supplier audit to Keep Your Costs Under control",
          speaker: "Maria Scarmardo",
          time: "1:00 PM - 1:50 PM",
          description: "Structured audits to uncover inefficiencies, mitigate risks, and strengthen supplier relationships."
        },
        {
          id: 'smart-savings',
          title: "Smart Savings: A Practical Framework for Cutting Costs Without Cutting Corners",
          speaker: "Emory Edwards",
          time: "2:00 PM - 2:50 PM",
          description: "Practical strategies for reducing expenses while maintaining quality and performance."
        },
        {
          id: 'scalability-playbook',
          title: "The Scalability Playbook: Maximize Growth, Minimize Overhead",
          speaker: "Carl Mazzanti",
          time: "3:00 PM - 3:50 PM",
          description: "Proven strategies for expanding operations efficiently while keeping costs under control."
        }
      ],
      outcomes: [
        "Reduce operational costs by 15-30%",
        "Optimize cloud spending and resources", 
        "Streamline vendor relationships",
        "Implement cost-effective automation solutions"
      ]
    },
    {
      id: 3,
      title: "Increase Productivity",
      icon: <Zap className="w-8 h-8" />,
      color: "from-purple-600 to-purple-700", 
      gradient: "from-purple-900/20 to-purple-800/30",
      description: "Workflow automation and operational efficiency solutions",
      fullDescription: "Transform your business operations with advanced automation technologies and productivity optimization strategies. Learn how to eliminate bottlenecks, streamline workflows, and empower your team to focus on high-value activities that drive business growth.",
      topics: [
        "Task Automation",
        "Remote Workflow Optimization", 
        "Team Efficiency Strategies",
        "Digital Transformation",
        "Process Improvement",
        "Performance Analytics"
      ],
      sessions: [
        {
          id: 'cloud-migration',
          title: "Navigating a Cloud Migration",
          speaker: "John Logan",
          time: "10:25 AM - 10:50 AM",
          description: "Break down the cloud migration process into clear, actionable steps for small businesses."
        },
        {
          id: 'ebitda-growth',
          title: "Unlocking Exceptional Profitability: How Firms Are Achieving Higher EBITDA Growth",
          speaker: "Shiva Kumar",
          time: "11:00 AM - 11:25 AM", 
          description: "Dynamics 365 solutions for Finance, Accounting, and Supply Chain Management challenges."
        },
        {
          id: 'digital-labor',
          title: "Digital Labor and Process Automation",
          speaker: "Deepanshu Negi",
          time: "11:30 AM - 11:55 AM",
          description: "How automation technologies reshape workflows and boost efficiency across industries."
        },
        {
          id: 'productivity-paradox',
          title: "The Productivity Paradox: When Technology Helps—and When It Doesn't",
          speaker: "Oya Tukel", 
          time: "1:00 PM - 1:50 PM",
          description: "Why new tools don't always translate into efficiency and when tech truly drives performance."
        },
        {
          id: 'capital-productivity',
          title: "How Capital Can Improve Productivity",
          speaker: "Ryan Silvestre",
          time: "2:00 PM - 2:50 PM",
          description: "Strategic investment in resources, technology, and people to drive measurable efficiency gains."
        },
        {
          id: 'it-bottlenecks',
          title: "Eliminating IT Bottlenecks: How 24/7 Monitoring Supercharges Productivity",
          speaker: "Nirvan Ramoutar",
          time: "3:00 PM - 3:50 PM",
          description: "Round-the-clock network monitoring to eliminate IT slowdowns and reduce downtime."
        }
      ],
      outcomes: [
        "Automate repetitive tasks and workflows",
        "Increase team productivity by 25-40%",
        "Optimize remote and hybrid work environments", 
        "Implement data-driven performance improvements"
      ]
    },
    {
      id: 4,
      title: "Enhance Cybersecurity",
      icon: <Shield className="w-8 h-8" />,
      color: "from-red-600 to-red-700",
      gradient: "from-red-900/20 to-red-800/30", 
      description: "Advanced threat protection and data security strategies",
      fullDescription: "Build a robust cybersecurity framework that protects your business from evolving threats while enabling growth and innovation. Learn cutting-edge security strategies, threat intelligence, and risk management approaches tailored for small and medium businesses.",
      topics: [
        "Ransomware Prevention",
        "Data Protection Strategies", 
        "Security Innovation",
        "Threat Intelligence",
        "Compliance Management",
        "Incident Response"
      ],
      sessions: [
        {
          id: 'ai-security-threats',
          title: "Latest AI Security Threats",
          speaker: "John Williamson",
          time: "10:25 AM - 10:50 AM",
          description: "Latest update on evolving AI-based threats and how to protect SMBs successfully."
        },
        {
          id: 'ecare-network',
          title: "eCare Network Management",
          speaker: "Carl Mazzanti",
          time: "11:00 AM - 11:25 AM",
          description: "Proactive monitoring, rapid response, and expert support to reduce downtime and tighten security."
        },
        {
          id: 'company-safety',
          title: "How to Keep Your Company Safe",
          speaker: "John Logan & Scott Bennet", 
          time: "11:30 AM - 11:55 AM",
          description: "Comprehensive disaster recovery planning including all departments and customer communications."
        },
        {
          id: 'cyber-outlook',
          title: "What is the Cybersecurity Outlook for 2025/26",
          speaker: "Scott Williamson",
          time: "1:00 PM - 1:50 PM",
          description: "Emerging threats, regulatory shifts, and defense strategies shaping the next two years."
        },
        {
          id: 'cyber-recommendations',
          title: "Top 10 Cyber Security recommendations for Businesses Large and Small",
          speaker: "Carl Mazzanti",
          time: "2:00 PM - 2:50 PM",
          description: "Essential guidance for protecting organizations against today's evolving digital threats."
        },
        {
          id: 'video-ai',
          title: "From Surveillance to Strategy: Unlocking Hidden Profits with Intelligent Video AI",
          speaker: "George Karaolis", 
          time: "3:00 PM - 3:50 PM",
          description: "How modern surveillance technologies transform loss prevention and incident recovery."
        }
      ],
      outcomes: [
        "Implement comprehensive security frameworks",
        "Reduce security incidents by 80%",
        "Ensure regulatory compliance",
        "Build incident response capabilities"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Four Strategic Tracks
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Choose your learning path with 24 expert-led sessions designed for immediate business impact. 
            Each track offers 6 focused sessions led by industry experts and practitioners.
          </p>
          
          {/* Session Registration Status */}
          {user && (
            <div className="inline-flex items-center space-x-4 px-6 py-3 bg-blue-50 rounded-lg border border-blue-200 mb-8">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium">
                {registeredSessions.length} sessions in your schedule
              </span>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Dashboard →
              </button>
            </div>
          )}
          
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-gray-100 rounded-lg">
            <Users className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Can't decide? Attend sessions across multiple tracks</span>
          </div>
        </div>
      </section>

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Tracks Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tracks.map((track) => (
              <div 
                key={track.id} 
                className={`relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                  selectedTrack === track.id ? 'ring-2 ring-blue-500/50' : ''
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${track.gradient} rounded-3xl opacity-30`}></div>
                
                <div className="relative z-10">
                  {/* Track Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-4 rounded-2xl bg-gradient-to-r ${track.color} text-white shadow-lg`}>
                        {track.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{track.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{track.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedTrack(selectedTrack === track.id ? null : track.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className={`w-6 h-6 transition-transform duration-200 ${
                        selectedTrack === track.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                  </div>

                  {/* Topics Preview */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {track.topics.slice(0, 4).map((topic, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                    {track.topics.length > 4 && (
                      <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm">
                        +{track.topics.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Session Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{track.sessions.length} Expert Sessions</span>
                    <button 
                      onClick={() => setSelectedTrack(selectedTrack === track.id ? null : track.id)}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      {selectedTrack === track.id ? 'Show Less' : 'View Sessions'}
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {selectedTrack === track.id && (
                    <div className="mt-8 pt-8 border-t border-gray-200 space-y-6">
                      {/* Full Description */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Track Overview</h4>
                        <p className="text-gray-600 leading-relaxed">{track.fullDescription}</p>
                      </div>

                      {/* All Topics */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Topics Covered</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {track.topics.map((topic, i) => (
                            <div key={i} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-600 text-sm">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Learning Outcomes */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">What You'll Achieve</h4>
                        <div className="space-y-2">
                          {track.outcomes.map((outcome, i) => (
                            <div key={i} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600 text-sm">{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sessions with Registration */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Sessions in This Track</h4>
                        <div className="space-y-3">
                          {track.sessions.map((session, i) => {
                            const isRegistered = isSessionRegistered(session.id);
                            
                            return (
                              <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <div className="flex items-start justify-between mb-2">
                                  <h5 className="font-medium text-gray-900 text-sm leading-tight flex-1 pr-4">
                                    {session.title}
                                  </h5>
                                  <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                      {session.time}
                                    </span>
                                  </div>
                                </div>
                                
                                <p className="text-blue-600 text-xs mb-2 font-medium">{session.speaker}</p>
                                <p className="text-gray-600 text-xs mb-3 leading-relaxed">{session.description}</p>
                                
                                <button
                                  onClick={() => handleSessionRegister(
                                    session.id, 
                                    session.title, 
                                    track.title, 
                                    session.time
                                  )}
                                  disabled={loading}
                                  className={`text-xs px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                                    isRegistered
                                      ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200'
                                      : user
                                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }`}
                                >
                                  {loading ? (
                                    'Loading...'
                                  ) : isRegistered ? (
                                    'Registered ✓'
                                  ) : user ? (
                                    'Add to Schedule'
                                  ) : (
                                    'Login to Register'
                                  )}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <button
                            onClick={() => navigate('/agenda')}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                          >
                            <span>View Full Agenda</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6">Mix and Match Your Learning</h2>
          <p className="text-xl text-gray-600 mb-8">
            {user ? (
              `You have ${registeredSessions.length} sessions in your schedule. Explore more tracks or view your complete agenda.`
            ) : (
              'You\'re not limited to one track. Create your personalized agenda by selecting sessions across multiple tracks that align with your business priorities.'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium"
                >
                  View My Schedule
                </button>
                <button
                  onClick={() => navigate('/agenda')}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Full Agenda
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium"
                >
                  Register for Conference
                </button>
                <button
                  onClick={() => navigate('/agenda')}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  View Full Agenda
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-light mb-4">ASPIRE 2025</h3>
              <p className="text-gray-400">
                Transforming businesses through technology innovation. Presented by eMazzanti Technologies.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>aspire@emazzanti.net</p>
                <p>+1 (844) 360-4400</p>
                <p>New York, NY</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['Home', 'Agenda', 'Speakers', 'Venue'].map((link) => (
                  <p key={link}>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </button>
                  </p>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                {['LinkedIn', 'Twitter'].map((social) => (
                  <button key={social} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <span className="text-sm">{social[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 eMazzanti Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TracksPage;