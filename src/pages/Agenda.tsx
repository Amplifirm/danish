import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, TrendingUp, DollarSign, Zap, Shield, Users, X, Calendar, MapPin, 
  Coffee, CheckCircle 
} from 'lucide-react';
import { authService } from '../lib/supabase';

// Type definitions
interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  registeredSessions?: RegisteredSession[];
}

interface RegisteredSession {
  sessionId: string;
  sessionTitle?: string;
  track?: string;
  time?: string;
}

interface Track {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  bgColor: string;
}

interface Session {
  id: string;
  track: string;
  title: string;
  speaker: string;
  description: string;
}

interface TimeSlot {
  time: string;
  type: 'special' | 'keynote' | 'break' | 'session';
  title?: string;
  speaker?: string;
  description?: string;
  sessions?: Session[];
}

// Extended AuthService interface
interface ExtendedAuthService {
  getUserRegistrations?: (userId: string) => Promise<{
    success: boolean;
    registeredSessions?: RegisteredSession[];
    error?: string;
  }>;
  registerSession?: (sessionData: {
    sessionId: string;
    sessionTitle: string;
    track: string;
    time: string;
  }) => Promise<{
    success: boolean;
    registeredSessions?: RegisteredSession[];
    error?: string;
  }>;
  unregisterSession?: (sessionId: string) => Promise<{
    success: boolean;
    registeredSessions?: RegisteredSession[];
    error?: string;
  }>;
}

const AgendaPage = () => {
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [registeredSessions, setRegisteredSessions] = useState<RegisteredSession[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // Extended auth service with session management methods
  const extendedAuthService = authService as ExtendedAuthService;

  useEffect(() => {
    const loadUserAndRegistrations = async () => {
      // Check if user is logged in
      const userData = localStorage.getItem('user');
      
      if (userData) {
        try {
          const parsedUser: UserType = JSON.parse(userData);
          setUser(parsedUser);

          // Load existing registrations from localStorage first
          if (parsedUser.registeredSessions) {
            setRegisteredSessions(parsedUser.registeredSessions);
          }

          // Try to load from Supabase if method exists
          if (extendedAuthService.getUserRegistrations) {
            try {
              const result = await extendedAuthService.getUserRegistrations(parsedUser.id);
              if (result.success) {
                setRegisteredSessions(result.registeredSessions || []);
                
                // Update user object in localStorage with latest registrations
                const updatedUser = { ...parsedUser, registeredSessions: result.registeredSessions || [] };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
              }
            } catch (err) {
              console.error('Error loading registrations:', err);
              // Fallback to localStorage data
            }
          }

          console.log('AgendaPage loaded user:', parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
        }
      }
    };

    loadUserAndRegistrations();
  }, []);

  const tracks: Track[] = [
    { 
      id: 'revenue', 
      name: 'Drive Revenue', 
      icon: <TrendingUp className="w-4 h-4" />, 
      color: '#D514FF',
      bgColor: '#2EA1ED15'
    },
    { 
      id: 'expenses', 
      name: 'Reduce Expenses', 
      icon: <DollarSign className="w-4 h-4" />, 
      color: '#00C6AC',
      bgColor: '#2EA1ED15'
    },
    { 
      id: 'productivity', 
      name: 'Increase Productivity', 
      icon: <Zap className="w-4 h-4" />, 
      color: '#00A1EF',
      bgColor: '#2EA1ED15'
    },
    { 
      id: 'cybersecurity', 
      name: 'Enhance Cybersecurity', 
      icon: <Shield className="w-4 h-4" />, 
      color: '#4113FD',
      bgColor: '#2EA1ED15'
    }
  ];

  const timeSlots: TimeSlot[] = [
    {
      time: '9:00 AM - 9:30 AM',
      type: 'special',
      title: 'Registration & Welcome Coffee',
      description: 'Check-in, networking, and light refreshments'
    },
    {
      time: '9:30 AM - 10:15 AM',
      type: 'keynote',
      title: 'KEYNOTE: Business Leadership Conversation',
      speaker: 'Jack Alexy & Paul Centenari',
      description: 'Industry leaders discuss resilience, decision-making, and leveraging technology for rapid business growth'
    },
    {
      time: '10:15 AM - 10:25 AM',
      type: 'break',
      title: 'Networking Break',
      description: 'Coffee and networking opportunity'
    },
    {
      time: '10:25 AM - 10:50 AM',
      type: 'session',
      sessions: [
        {
          id: 'fc-motown',
          track: 'revenue',
          title: 'FC Motown: How the little guy can succeed in business and sport',
          speaker: 'Dan Karosen',
          description: 'Discover how FC Motown rose from local play to NPSL National Championship through bold leadership and vision.'
        },
        {
          id: 'anti-inflation-tech',
          track: 'expenses',
          title: 'Do More with Less - How Technology is the Best Anti-Inflation Tool',
          speaker: 'Nirvan Ramoutar',
          description: 'Technologies and systems that deliver immediate impact—helping you cut costs, protect margins, and stay competitive.'
        },
        {
          id: 'cloud-migration',
          track: 'productivity',
          title: 'Navigating a Cloud Migration',
          speaker: 'John Logan',
          description: 'Break down the cloud migration process into clear, actionable steps for small businesses.'
        },
        {
          id: 'ai-security-threats',
          track: 'cybersecurity',
          title: 'Latest AI Security Threats',
          speaker: 'John Williamson',
          description: 'Latest update on evolving AI-based threats and how to protect SMBs successfully.'
        }
      ]
    },
    {
      time: '11:00 AM - 11:25 AM',
      type: 'session',
      sessions: [
        {
          id: 'ai-readiness',
          track: 'revenue',
          title: 'AI Readiness Assessment',
          speaker: 'Bryan Antepara',
          description: 'Essential concepts and processes to implement AI successfully in your organization.'
        },
        {
          id: 'microsoft-strategy',
          track: 'expenses',
          title: 'Creating an IT Strategy with Microsoft that Works for your Business',
          speaker: 'Deep Ranipa',
          description: 'How Microsoft Dynamics 365 can streamline operations while keeping Excel integration seamless.'
        },
        {
          id: 'ebitda-growth',
          track: 'productivity',
          title: 'Unlocking Exceptional Profitability: How Firms Are Achieving Higher EBITDA Growth',
          speaker: 'Shiva Kumar',
          description: 'Dynamics 365 solutions for Finance, Accounting, and Supply Chain Management challenges.'
        },
        {
          id: 'ecare-network',
          track: 'cybersecurity',
          title: 'eCare Network Management',
          speaker: 'Carl Mazzanti',
          description: 'Proactive monitoring, rapid response, and expert support to reduce downtime and tighten security.'
        }
      ]
    },
    {
      time: '11:30 AM - 11:55 AM',
      type: 'session',
      sessions: [
        {
          id: 'customer-success',
          track: 'revenue',
          title: 'How Customer Success Can Supercharge Your Revenue',
          speaker: 'Brindavani Pathuri',
          description: 'How building stronger customer relationships directly fuels growth and retention.'
        },
        {
          id: 'teams-telephone',
          track: 'expenses',
          title: 'Reduce your Telephone Operating Costs with Microsoft Teams',
          speaker: 'Bryan Antepara',
          description: 'Cut phone system expenses by moving to Microsoft Teams with smooth migration strategies.'
        },
        {
          id: 'digital-labor',
          track: 'productivity',
          title: 'Digital Labor and Process Automation',
          speaker: 'Deepanshu Negi',
          description: 'How automation technologies reshape workflows and boost efficiency across industries.'
        },
        {
          id: 'company-safety',
          track: 'cybersecurity',
          title: 'How to Keep Your Company Safe',
          speaker: 'John Logan & Scott Bennet',
          description: 'Comprehensive disaster recovery planning including all departments and customer communications.'
        }
      ]
    },
    {
      time: '12:00 PM - 12:45 PM',
      type: 'special',
      title: 'Lunch Panel Discussion',
      description: 'Networking lunch with industry panel discussion'
    },
    {
      time: '1:00 PM - 1:50 PM',
      type: 'session',
      sessions: [
        {
          id: 'public-sector',
          track: 'revenue',
          title: 'Doing Business with the Public Sector',
          speaker: 'Paul Muir',
          description: 'Navigate government procurement processes and build relationships with municipalities.'
        },
        {
          id: 'supplier-audit',
          track: 'expenses',
          title: 'How to create an effective supplier audit to Keep Your Costs Under control',
          speaker: 'Maria Scarmardo',
          description: 'Structured audits to uncover inefficiencies, mitigate risks, and strengthen supplier relationships.'
        },
        {
          id: 'productivity-paradox',
          track: 'productivity',
          title: 'The Productivity Paradox: When Technology Helps—and When It Doesn\'t',
          speaker: 'Oya Tukel',
          description: 'Why new tools don\'t always translate into efficiency and when tech truly drives performance.'
        },
        {
          id: 'cyber-outlook',
          track: 'cybersecurity',
          title: 'What is the Cybersecurity Outlook for 2025/26',
          speaker: 'Scott Williamson',
          description: 'Emerging threats, regulatory shifts, and defense strategies shaping the next two years.'
        }
      ]
    },
    {
      time: '2:00 PM - 2:50 PM',
      type: 'session',
      sessions: [
        {
          id: 'e365-advantage',
          track: 'revenue',
          title: 'The e365 Advantage: Streamlined Services for Small Business Growth',
          speaker: 'Bryan Antepara',
          description: 'How e365 simplifies technology management and creates room for businesses to thrive.'
        },
        {
          id: 'smart-savings',
          track: 'expenses',
          title: 'Smart Savings: A Practical Framework for Cutting Costs Without Cutting Corners',
          speaker: 'Emory Edwards',
          description: 'Practical strategies for reducing expenses while maintaining quality and performance.'
        },
        {
          id: 'capital-productivity',
          track: 'productivity',
          title: 'How Capital Can Improve Productivity',
          speaker: 'Ryan Silvestre',
          description: 'Strategic investment in resources, technology, and people to drive measurable efficiency gains.'
        },
        {
          id: 'cyber-recommendations',
          track: 'cybersecurity',
          title: 'Top 10 Cyber Security recommendations for Businesses Large and Small',
          speaker: 'Carl Mazzanti',
          description: 'Essential guidance for protecting organizations against today\'s evolving digital threats.'
        }
      ]
    },
    {
      time: '3:00 PM - 3:50 PM',
      type: 'session',
      sessions: [
        {
          id: 'ai-without-pains',
          track: 'revenue',
          title: 'How to Embrace AI without Growing Pains',
          speaker: 'Deep Ranipa',
          description: 'Leverage AI to accelerate business growth while avoiding operational disruptions.'
        },
        {
          id: 'scalability-playbook',
          track: 'expenses',
          title: 'The Scalability Playbook: Maximize Growth, Minimize Overhead',
          speaker: 'Carl Mazzanti',
          description: 'Proven strategies for expanding operations efficiently while keeping costs under control.'
        },
        {
          id: 'it-bottlenecks',
          track: 'productivity',
          title: 'Eliminating IT Bottlenecks: How 24/7 Monitoring Supercharges Productivity',
          speaker: 'Nirvan Ramoutar',
          description: 'Round-the-clock network monitoring to eliminate IT slowdowns and reduce downtime.'
        },
        {
          id: 'video-ai',
          track: 'cybersecurity',
          title: 'From Surveillance to Strategy: Unlocking Hidden Profits with Intelligent Video AI',
          speaker: 'George Karaolis',
          description: 'How modern surveillance technologies transform loss prevention and incident recovery.'
        }
      ]
    },
    {
      time: '4:00 PM - 4:30 PM',
      type: 'special',
      title: 'Closing Remarks & Next Steps',
      description: 'Conference wrap-up and action planning'
    },
    {
      time: '5:30 PM - 7:30 PM',
      type: 'special',
      title: 'Networking Reception',
      description: 'Cocktails, appetizers, and continued networking'
    }
  ];

  // Local storage session management functions
  const updateLocalStorageSessions = (sessions: RegisteredSession[]) => {
    if (user) {
      const updatedUser = { ...user, registeredSessions: sessions };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setRegisteredSessions(sessions);
    }
  };

  const getTrackInfo = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    return track || { color: '#6B7280', bgColor: '#6B728015' };
  };

  const isSessionRegistered = (sessionId: string): boolean => {
    return registeredSessions.some(session => session.sessionId === sessionId);
  };

  const handleSessionRegister = async (session: Session, timeSlot: string): Promise<void> => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const isRegistered = isSessionRegistered(session.id);
      
      if (isRegistered) {
        // Unregister session
        if (extendedAuthService.unregisterSession) {
          try {
            const result = await extendedAuthService.unregisterSession(session.id);
            if (result.success) {
              updateLocalStorageSessions(result.registeredSessions || []);
              console.log('Session unregistered successfully:', session.id);
            } else {
              setError(result.error || 'Failed to unregister session');
            }
          } catch (err) {
            console.error('Error unregistering session:', err);
            // Fallback to local storage management
            const updatedSessions = registeredSessions.filter(s => s.sessionId !== session.id);
            updateLocalStorageSessions(updatedSessions);
          }
        } else {
          // Fallback to local storage management
          const updatedSessions = registeredSessions.filter(s => s.sessionId !== session.id);
          updateLocalStorageSessions(updatedSessions);
        }
      } else {
        // Register session
        const trackName = tracks.find(t => t.id === session.track)?.name || 'General';
        const sessionData = {
          sessionId: session.id,
          sessionTitle: session.title,
          track: trackName,
          time: timeSlot
        };
        
        if (extendedAuthService.registerSession) {
          try {
            const result = await extendedAuthService.registerSession(sessionData);
            if (result.success) {
              updateLocalStorageSessions(result.registeredSessions || []);
              console.log('Session registered successfully:', session.id);
            } else {
              setError(result.error || 'Registration failed');
            }
          } catch (err) {
            console.error('Error registering session:', err);
            // Fallback to local storage management
            const updatedSessions = [...registeredSessions, sessionData];
            updateLocalStorageSessions(updatedSessions);
          }
        } else {
          // Fallback to local storage management
          const updatedSessions = [...registeredSessions, sessionData];
          updateLocalStorageSessions(updatedSessions);
        }
      }
    } catch (err: any) {
      setError('Session operation failed');
      console.error('Session registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTimeSlots = timeSlots.map(slot => {
    if (slot.type === 'session' && selectedTrack !== 'all' && slot.sessions) {
      return {
        ...slot,
        sessions: slot.sessions.filter(session => session.track === selectedTrack)
      };
    }
    return slot;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white font-roboto">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Conference Agenda
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              24 expert sessions across 4 strategic tracks. Build your personalized agenda 
              by selecting sessions that align with your business goals.
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
            
            {/* Event Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <Calendar className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">October 15, 2025</div>
                <div className="text-gray-600 text-sm">9:00 AM - 5:00 PM EST</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <MapPin className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Microsoft Technology Center</div>
                <div className="text-gray-600 text-sm">Times Square, NYC</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">200+ Attendees</div>
                <div className="text-gray-600 text-sm">SMB Leaders & Executives</div>
              </div>
            </div>
          </div>

          {/* Track Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-white rounded-2xl p-2 shadow-sm border border-gray-100 overflow-x-auto">
              <button
                onClick={() => setSelectedTrack('all')}
                className={`px-6 py-3 rounded-xl transition-all duration-200 font-medium whitespace-nowrap ${
                  selectedTrack === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                All Tracks
              </button>
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 font-medium whitespace-nowrap ${
                    selectedTrack === track.id
                      ? 'text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: selectedTrack === track.id ? track.color : 'transparent'
                  }}
                >
                  {track.icon}
                  <span className="font-bold">{track.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-700 text-sm">{error}</p>
            <button 
              onClick={() => setError('')}
              className="text-blue-600 hover:text-blue-800 text-sm mt-2"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Schedule */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            {filteredTimeSlots.map((slot, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Time Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-gray-900">{slot.time}</span>
                    {slot.type === 'keynote' && (
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-xs font-medium">
                        KEYNOTE
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                {slot.type === 'special' || slot.type === 'keynote' || slot.type === 'break' ? (
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      {slot.type === 'break' ? (
                        <Coffee className="w-6 h-6 text-green-500 mt-1" />
                      ) : slot.type === 'keynote' ? (
                        <Users className="w-6 h-6 text-purple-500 mt-1" />
                      ) : (
                        <Calendar className="w-6 h-6 text-blue-500 mt-1" />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{slot.title}</h3>
                        {slot.speaker && (
                          <p className="text-blue-600 font-medium mb-2">{slot.speaker}</p>
                        )}
                        <p className="text-gray-600">{slot.description}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`p-6 ${
                    selectedTrack === 'all' 
                      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4' 
                      : 'grid grid-cols-1 gap-4'
                  }`}>
                    {slot.sessions?.map((session, sessionIndex) => {
                      const isRegistered = isSessionRegistered(session.id);
                      const trackInfo = getTrackInfo(session.track);
                      
                      return (
                        <div 
                          key={sessionIndex} 
                          className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
                        >
                          <div 
                            className="text-xs font-bold mb-3 px-3 py-1 rounded-full inline-block border"
                            style={{
                              backgroundColor: trackInfo.bgColor,
                              color: trackInfo.color,
                              borderColor: trackInfo.color + '40'
                            }}
                          >
                            {tracks.find(t => t.id === session.track)?.name}
                          </div>
                          
                          <h4 
                            className="font-bold text-gray-900 mb-2 text-sm leading-tight hover:text-blue-600 transition-colors"
                            onClick={() => setSelectedSession(session)}
                          >
                            {session.title}
                          </h4>
                          
                          <p className="text-blue-600 text-xs mb-2 font-bold">{session.speaker}</p>
                          <p className="text-gray-600 text-xs mb-4 leading-relaxed line-clamp-3">{session.description}</p>
                          
                          <button
                            onClick={() => handleSessionRegister(session, slot.time)}
                            disabled={loading}
                            className={`text-xs px-3 py-2 rounded-lg transition-all duration-200 w-full font-medium disabled:opacity-50 hover:scale-105 ${
                              isRegistered
                                ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200'
                                : user
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {loading ? (
                              'Processing...'
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
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Session Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900 pr-4">{selectedSession.title}</h3>
              <button
                onClick={() => setSelectedSession(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-3 mb-6">
              <p className="text-blue-600 font-medium">{selectedSession.speaker}</p>
              <div 
                className="text-xs font-medium px-3 py-1 rounded-full inline-block border"
                style={{
                  backgroundColor: getTrackInfo(selectedSession.track).bgColor,
                  color: getTrackInfo(selectedSession.track).color,
                  borderColor: getTrackInfo(selectedSession.track).color + '40'
                }}
              >
                {tracks.find(t => t.id === selectedSession.track)?.name}
              </div>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">{selectedSession.description}</p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  handleSessionRegister(selectedSession, '');
                  setSelectedSession(null);
                }}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
              >
                {isSessionRegistered(selectedSession.id) ? 'Remove from Schedule' : 'Add to Schedule'}
              </button>
              <button
                onClick={() => setSelectedSession(null)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6">Ready to Build Your Schedule?</h2>
          <p className="text-xl text-gray-600 mb-8">
            {user ? (
              `You have ${registeredSessions.length} sessions in your schedule. Add more or view your complete agenda.`
            ) : (
              'Register for ASPIRE 2025 to start building your personalized conference agenda.'
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
                  onClick={() => navigate('/tracks')}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Explore Tracks
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
                  onClick={() => navigate('/login')}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Sign In
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
                Transforming businesses through technology innovation.
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
                {['Home', 'Tracks', 'Speakers', 'Venue'].map((link) => (
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

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
          .font-roboto { font-family: 'Roboto', sans-serif; }
        `}
      </style>
    </div>
  );
};

export default AgendaPage;