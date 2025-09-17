import { useState, useEffect } from 'react';
import { 
  TrendingUp, DollarSign, Zap, Shield, Users, ArrowRight, 
  CheckCircle, Clock, Calendar, MapPin, Play, Star, ChevronRight, X, Menu
} from 'lucide-react';

// Mock navigate function
const navigate = (path: string) => console.log(`Navigate to: ${path}`);

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
  bgGradient: string;
  description: string;
  fullDescription: string;
  keyTopics: string[];
  sessions: Session[];
  outcomes: string[];
}

const TracksPage2 = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [registeredSessions, setRegisteredSessions] = useState<RegisteredSession[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const tracks: Track[] = [
    {
      id: 1,
      title: "Drive Revenue",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "#3C1AF9",
      bgGradient: "from-blue-500 via-purple-500 to-blue-600",
      description: "AI integration, customer success strategies, and growth optimization",
      fullDescription: "Discover innovative strategies to accelerate business growth through cutting-edge technology and customer-centric approaches. Learn how AI can transform your sales processes, how to build exceptional customer success programs, and implement growth optimization techniques that deliver measurable results.",
      keyTopics: ["AI Integration", "Customer Success", "E365 Implementation", "Growth Optimization"],
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
          speaker: "Brinda Vani",
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
      color: "#1DC5AC",
      bgGradient: "from-teal-400 via-green-500 to-emerald-600",
      description: "Cost optimization through modern cloud platforms and AI tools",
      fullDescription: "Master intelligent cost reduction without sacrificing quality or growth potential. Explore how modern cloud technologies and AI-powered tools can streamline operations, reduce overhead, and optimize resource allocation for maximum efficiency.",
      keyTopics: ["Cloud Migration", "AI Cost Reduction", "Compliance Optimization", "Vendor Management"],
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
      color: "#B61BFD", 
      bgGradient: "from-purple-500 via-pink-500 to-purple-600",
      description: "Workflow automation and operational efficiency solutions",
      fullDescription: "Transform your business operations with advanced automation technologies and productivity optimization strategies. Learn how to eliminate bottlenecks, streamline workflows, and empower your team to focus on high-value activities that drive business growth.",
      keyTopics: ["Task Automation", "Remote Workflows", "Team Efficiency", "Digital Transformation"],
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
          speaker: "Dr. Oya Tukel", 
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
      color: "#2EA1ED",
      bgGradient: "from-blue-400 via-cyan-500 to-blue-600", 
      description: "Advanced threat protection and data security strategies",
      fullDescription: "Build a robust cybersecurity framework that protects your business from evolving threats while enabling growth and innovation. Learn cutting-edge security strategies, threat intelligence, and risk management approaches tailored for small and medium businesses.",
      keyTopics: ["Ransomware Prevention", "Data Protection", "Security Innovation", "Threat Intelligence"],
      sessions: [
        {
          id: 'ai-security-threats',
          title: "Latest AI Security Threats",
          speaker: "Scott Williamson",
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
          speaker: "John Logan & Scott Bennett", 
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-light mb-8 animate-fade-in-up">
              <span>Presented in Honor of Our 24th Anniversary</span>
            </div>
            
            <h1 className="text-6xl sm:text-8xl font-light mb-8 leading-tight animate-fade-in-up animation-delay-200">
              Four Strategic
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
                Tracks
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-up animation-delay-400">
              Choose your learning path with 24 expert-led sessions designed for immediate business impact. 
              Each track offers 6 focused sessions led by industry experts and practitioners.
            </p>
            
            {/* Session Registration Status */}
            {user && (
              <div className="inline-flex items-center space-x-4 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-fade-in-up animation-delay-600">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white font-light">
                  {registeredSessions.length} sessions in your schedule
                </span>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-green-400 hover:text-green-300 text-sm font-light transition-colors"
                >
                  View Dashboard →
                </button>
              </div>
            )}

            {/* Track Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {tracks.map((track, index) => (
                <div 
                  key={track.id}
                  className="group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${800 + index * 200}ms` }}
                  onClick={() => setSelectedTrack(track)}
                >
                  <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 h-full">
                    <div className="text-center">
                      <div 
                        className={`w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br ${track.bgGradient}`}
                      >
                        {track.icon}
                      </div>
                      <h3 className="text-2xl font-light mb-4">{track.title}</h3>
                      <p className="text-white/70 text-sm mb-6 leading-relaxed">{track.description}</p>
                      <div className="flex items-center justify-center space-x-2 text-white/60 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{track.sessions.length} Sessions</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40 mx-auto mt-4 group-hover:translate-x-2 group-hover:text-white/80 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Track Sections */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full text-sm font-light mb-8">
              DEEP DIVE
            </div>
            <h2 className="text-6xl font-light mb-8">
              Immerse yourself in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                expert knowledge
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-light">
              Every session is strategically designed to deliver immediate business value. 
              Mix and match across tracks to build your perfect learning experience.
            </p>
          </div>

          <div className="space-y-32">
            {tracks.map((track, index) => (
              <div key={track.id} className="relative">
                
                {/* Track Header */}
                <div className="text-center mb-16">
                  <div className="inline-flex items-center space-x-6 mb-8">
                    <div 
                      className={`w-24 h-24 rounded-3xl flex items-center justify-center text-white shadow-2xl bg-gradient-to-br ${track.bgGradient}`}
                    >
                      {track.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="text-4xl font-light">{track.title}</h3>
                      <p className="text-white/60 font-light">{track.sessions.length} Expert Sessions</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed mb-8 font-light">
                    {track.fullDescription}
                  </p>

                  {/* Key Topics */}
                  <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {track.keyTopics.map((topic, i) => (
                      <span 
                        key={i} 
                        className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm font-light border border-white/20 hover:bg-white/20 transition-colors"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sessions Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
                  {track.sessions.map((session, i) => (
                    <div 
                      key={i} 
                      className="group hover:-translate-y-2 transition-all duration-500"
                    >
                      <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-full">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <h4 className="font-light text-white text-xl leading-tight mb-4 group-hover:text-white/90 transition-colors">
                              {session.title}
                            </h4>
                            <div className="flex items-center space-x-3 mb-4">
                              <Star className={`w-5 h-5 text-gradient-to-r ${track.bgGradient}`} />
                              <span className="text-sm font-light text-white/80">
                                {session.speaker}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-white/70 text-sm leading-relaxed mb-6 font-light">
                          {session.description}
                        </p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-white/40" />
                            <span className="text-xs text-white/60 font-light">
                              {session.time}
                            </span>
                          </div>
                          <button 
                            className={`text-xs font-light px-4 py-2 rounded-full transition-all hover:scale-105 bg-gradient-to-r ${track.bgGradient} text-white shadow-lg`}
                          >
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Track Outcomes */}
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10 relative overflow-hidden">
                  <div className="absolute top-8 right-8 w-32 h-32 bg-white/5 rounded-full"></div>
                  <div className="absolute bottom-8 left-8 w-24 h-24 bg-white/5 rounded-full"></div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                      <h4 className="text-3xl font-light mb-8">What You'll Achieve</h4>
                      <div className="space-y-6">
                        {track.outcomes.map((outcome, i) => (
                          <div key={i} className="flex items-start space-x-4">
                            <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0 text-green-400" />
                            <span className="text-white/90 font-light text-lg">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-center lg:text-right">
                      <div className="inline-block">
                        <button
                          onClick={() => navigate('/agenda')}
                          className={`px-10 py-5 text-white font-light rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center space-x-3 bg-gradient-to-r ${track.bgGradient}`}
                        >
                          <span className="text-lg">View All Sessions</span>
                          <ArrowRight className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Separator */}
                {index < tracks.length - 1 && (
                  <div className="mt-32 mb-0">
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl font-light mb-8">
            Ready to transform your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              business future?
            </span>
          </h2>
          <p className="text-xl text-white/80 mb-12 font-light">
            {user ? (
              `You have ${registeredSessions.length} sessions in your schedule. Explore the full agenda to add more sessions.`
            ) : (
              'Mix and match sessions across multiple tracks that align with your business priorities. Register now to start building your personalized agenda.'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-10 py-5 bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg rounded-2xl font-light shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center space-x-3"
                >
                  <span>View My Schedule</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/agenda')}
                  className="px-10 py-5 border border-white/30 text-white text-lg rounded-2xl font-light hover:bg-white/10 transition-all duration-300 backdrop-blur-md transform hover:scale-105"
                >
                  Full Agenda
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/register')}
                  className="px-10 py-5 bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg rounded-2xl font-light shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center space-x-3"
                >
                  <span>Register Now - It's Free</span>
                  <CheckCircle className="w-6 h-6" />
                </button>
                <button
                  onClick={() => navigate('/agenda')}
                  className="px-10 py-5 border border-white/30 text-white text-lg rounded-2xl font-light hover:bg-white/10 transition-all duration-300 backdrop-blur-md transform hover:scale-105"
                >
                  View Full Agenda
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Track Detail Modal */}
      {selectedTrack && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/20 animate-modal-slide-in">
            <div className="flex justify-between items-start mb-10">
              <div className="flex items-center space-x-8">
                <div 
                  className={`w-24 h-24 rounded-3xl flex items-center justify-center text-white shadow-2xl bg-gradient-to-br ${selectedTrack.bgGradient}`}
                >
                  {selectedTrack.icon}
                </div>
                <div>
                  <h3 className="text-5xl font-light mb-2">{selectedTrack.title}</h3>
                  <p className="text-white/60 font-light text-lg">{selectedTrack.sessions?.length || 0} Expert Sessions</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTrack(null)}
                className="text-white/60 hover:text-white p-4 hover:bg-white/10 rounded-2xl transition-all duration-300"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
              {/* Left Column */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-2xl font-light mb-6">Track Overview</h4>
                  <p className="text-white/80 leading-relaxed text-lg font-light">{selectedTrack.fullDescription}</p>
                </div>

                <div>
                  <h4 className="text-2xl font-light mb-6">What You'll Achieve</h4>
                  <div className="space-y-4">
                    {selectedTrack.outcomes?.map((outcome, i) => (
                      <div key={i} className="flex items-start space-x-4 bg-white/5 rounded-2xl p-4 border border-white/10">
                        <CheckCircle className="w-6 h-6 mt-0.5 flex-shrink-0 text-green-400" />
                        <span className="text-white/90 font-light">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl font-light mb-6">Key Topics Covered</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedTrack.keyTopics?.map((topic, i) => (
                      <span 
                        key={i} 
                        className="px-4 py-2 bg-white/10 text-white/90 rounded-full font-light border border-white/20"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Sessions */}
              <div>
                <h4 className="text-2xl font-light mb-6">Session Schedule</h4>
                <div className="space-y-4">
                  {selectedTrack.sessions?.map((session, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <h5 className="font-light text-white text-lg leading-tight">{session.title}</h5>
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-light">
                          {session.time}
                        </span>
                      </div>
                      <p className="text-sm font-light mb-3 text-white/80">
                        Speaker: {session.speaker}
                      </p>
                      <p className="text-white/70 text-sm leading-relaxed font-light">
                        {session.description}
                      </p>
                    </div>
                  )) || <p className="text-white/50 font-light">No sessions available</p>}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-6 pt-8 border-t border-white/10">
              <button 
                className={`flex-1 py-5 text-white font-light rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg transform hover:scale-105 bg-gradient-to-r ${selectedTrack.bgGradient}`}
                onClick={() => navigate('/register')}
              >
                Register for This Track
              </button>
              <button 
                className="px-10 py-5 border border-white/30 text-white font-light rounded-2xl hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
                onClick={() => setSelectedTrack(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-20 bg-black/30 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-3xl font-light mb-6">ASPIRE 2025</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Transforming businesses through technology innovation. Presented by eMazzanti Technologies.
              </p>
            </div>
            
            <div>
              <h4 className="font-light mb-6 text-lg">Contact</h4>
              <div className="space-y-3 text-white/60 font-light">
                <p>aspire@emazzanti.net</p>
                <p>+1 (844) 360-4400</p>
                <p>New York, NY</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-light mb-6 text-lg">Quick Links</h4>
              <div className="space-y-3">
                {['Home', 'Agenda', 'Speakers', 'Venue'].map((link) => (
                  <p key={link}>
                    <button className="text-white/60 hover:text-white transition-colors font-light">
                      {link}
                    </button>
                  </p>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-light mb-6 text-lg">Follow Us</h4>
              <div className="flex space-x-4">
                {['LinkedIn', 'Twitter'].map((social) => (
                  <button key={social} className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm">
                    <span className="text-sm font-light">{social[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-white/50 font-light">
            <p>&copy; 2025 eMazzanti Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
          .font-roboto { font-family: 'Roboto', sans-serif; }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(1deg); }
            66% { transform: translateY(5px) rotate(-1deg); }
          }
          
          @keyframes float-reverse {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(10px) rotate(-1deg); }
            66% { transform: translateY(-5px) rotate(1deg); }
          }
          
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
          }
          
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes modal-slide-in {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          
          .animate-float-reverse {
            animation: float-reverse 10s ease-in-out infinite;
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 6s ease-in-out infinite;
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
            opacity: 0;
          }
          
          .animate-modal-slide-in {
            animation: modal-slide-in 0.3s ease-out forwards;
          }
          
          .animation-delay-200 { animation-delay: 200ms; }
          .animation-delay-400 { animation-delay: 400ms; }
          .animation-delay-600 { animation-delay: 600ms; }
          .animation-delay-800 { animation-delay: 800ms; }
        `}
      </style>
    </div>
  );
};

export default TracksPage2;