import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Calendar, Clock, MapPin, TrendingUp, DollarSign, Zap, Shield, 
  LogOut,  CheckCircle, Plus, Trash2, Users, Coffee
} from 'lucide-react';

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

interface TrackInfo {
  icon: JSX.Element;
  color: string;
  name: string;
}

interface ScheduleSlot {
  time: string;
  session: RegisteredSession | undefined;
}

const Dashboard = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [registeredSessions, setRegisteredSessions] = useState<RegisteredSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  // Get track icon and color
  const getTrackInfo = (track: string): TrackInfo => {
    const trackMap: Record<string, TrackInfo> = {
      'revenue': { icon: <TrendingUp className="w-4 h-4" />, color: 'blue', name: 'Drive Revenue' },
      'expenses': { icon: <DollarSign className="w-4 h-4" />, color: 'emerald', name: 'Reduce Expenses' },
      'productivity': { icon: <Zap className="w-4 h-4" />, color: 'purple', name: 'Increase Productivity' },
      'cybersecurity': { icon: <Shield className="w-4 h-4" />, color: 'red', name: 'Enhance Cybersecurity' }
    };
    return trackMap[track] || { icon: <Calendar className="w-4 h-4" />, color: 'gray', name: track };
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userData || !token) {
      navigate('/login');
      return;
    }

    const parsedUser: UserType = JSON.parse(userData);
    setUser(parsedUser);
    setRegisteredSessions(parsedUser.registeredSessions || []);
    setLoading(false);
  }, [navigate]);

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const removeSession = async (sessionId: string): Promise<void> => {
    try {
      const updatedSessions = registeredSessions.filter(session => session.sessionId !== sessionId);
      
      // Update local state immediately
      setRegisteredSessions(updatedSessions);
      
      // Update localStorage
      if (user) {
        const updatedUser = { ...user, registeredSessions: updatedSessions };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      
      // Note: You might want to add a backend endpoint to remove sessions
      console.log('Session removed:', sessionId);
    } catch (err) {
      setError('Failed to remove session');
      console.error('Remove session error:', err);
    }
  };

  const organizeSessionsByTime = (): ScheduleSlot[] => {
    const timeSlots: string[] = [
      '10:25 AM - 10:50 AM',
      '11:00 AM - 11:25 AM', 
      '11:30 AM - 11:55 AM',
      '1:00 PM - 1:50 PM',
      '2:00 PM - 2:50 PM',
      '3:00 PM - 3:50 PM'
    ];

    return timeSlots.map(time => {
      const session = registeredSessions.find(s => s.time === time);
      return { time, session };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const scheduleSlots = organizeSessionsByTime();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/Screenshot_2025-09-12_at_13.09.03-removebg-preview.png" 
                alt="ASPIRE 2025" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-2xl font-light text-gray-900">My Dashboard</h1>
                <p className="text-gray-600 text-sm">ASPIRE 2025 Conference</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/agenda')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Sessions
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Event Info */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-gray-600">{user?.jobTitle}</p>
                  <p className="text-gray-500 text-sm">{user?.company}</p>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{registeredSessions.length}</div>
                    <div className="text-gray-600 text-sm">Sessions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {registeredSessions.length > 0 ? '✓' : '○'}
                    </div>
                    <div className="text-gray-600 text-sm">Registered</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium text-gray-900">October 15, 2025</div>
                    <div className="text-gray-600 text-sm">9:00 AM - 5:00 PM EST</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium text-gray-900">Microsoft Technology Center</div>
                    <div className="text-gray-600 text-sm">Times Square, NYC</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium text-gray-900">Networking Reception</div>
                    <div className="text-gray-600 text-sm">5:30 PM - 7:30 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/agenda')}
                  className="w-full flex items-center space-x-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-700 font-medium">Add More Sessions</span>
                </button>
                
                <button
                  onClick={() => navigate('/tracks')}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">View All Tracks</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">My Conference Schedule</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {registeredSessions.length} / 6 Sessions
                </span>
              </div>

              {registeredSessions.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Sessions Selected</h3>
                  <p className="text-gray-600 mb-6">
                    Browse our agenda and register for sessions that interest you
                  </p>
                  <button
                    onClick={() => navigate('/agenda')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Browse Sessions
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Fixed Schedule Slots */}
                  <div className="grid gap-4">
                    {/* Welcome */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Coffee className="w-5 h-5 text-green-600" />
                          <div>
                            <div className="font-medium text-gray-900">9:00 AM - 9:30 AM</div>
                            <div className="text-gray-700">Registration & Welcome Coffee</div>
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    </div>

                    {/* Keynote */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-purple-600" />
                          <div>
                            <div className="font-medium text-gray-900">9:30 AM - 10:15 AM</div>
                            <div className="text-gray-700">KEYNOTE: Business Leadership Conversation</div>
                            <div className="text-gray-600 text-sm">Jack Alexy & Paul Centenari</div>
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>

                    {/* Session Slots */}
                    {scheduleSlots.map((slot, index) => (
                      <div 
                        key={index}
                        className={`border rounded-xl p-4 ${
                          slot.session 
                            ? 'bg-blue-50 border-blue-200' 
                            : 'bg-gray-50 border-gray-200 border-dashed'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Clock className="w-5 h-5 text-gray-500" />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{slot.time}</div>
                              {slot.session ? (
                                <div>
                                  <div className="text-gray-700 font-medium">{slot.session.sessionTitle}</div>
                                  <div className="flex items-center space-x-2 mt-1">
                                    {getTrackInfo(slot.session.track?.toLowerCase() || '').icon}
                                    <span className="text-gray-600 text-sm">
                                      {getTrackInfo(slot.session.track?.toLowerCase() || '').name}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-gray-500">No session selected</div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {slot.session ? (
                              <>
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                                <button
                                  onClick={() => removeSession(slot.session!.sessionId)}
                                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => navigate('/agenda')}
                                className="px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                              >
                                Select Session
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Lunch */}
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Coffee className="w-5 h-5 text-orange-600" />
                          <div>
                            <div className="font-medium text-gray-900">12:00 PM - 12:45 PM</div>
                            <div className="text-gray-700">Lunch Panel Discussion</div>
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-orange-600" />
                      </div>
                    </div>

                    {/* Reception */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-purple-600" />
                          <div>
                            <div className="font-medium text-gray-900">5:30 PM - 7:30 PM</div>
                            <div className="text-gray-700">Networking Reception</div>
                          </div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  {/* Track Summary */}
                  {registeredSessions.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Track Distribution</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(
                          registeredSessions.reduce((acc: Record<string, number>, session) => {
                            const track = session.track?.toLowerCase() || 'other';
                            acc[track] = (acc[track] || 0) + 1;
                            return acc;
                          }, {})
                        ).map(([track, count]) => {
                          const trackInfo = getTrackInfo(track);
                          return (
                            <div key={track} className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
                              {trackInfo.icon}
                              <span className="text-sm text-gray-700">{trackInfo.name}: {count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;