import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, LogIn, UserPlus, Calendar } from 'lucide-react';

// Define the User type
interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  registeredSessions?: any[];
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [registeredSessions, setRegisteredSessions] = useState<any[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check authentication status - only need user data now (no token for table auth)
    const userData = localStorage.getItem('user');
    
    if (userData) {
      try {
        const parsedUser: UserType = JSON.parse(userData);
        setUser(parsedUser);
        setRegisteredSessions(parsedUser.registeredSessions || []);
        console.log('Navbar loaded user:', parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    } else {
      setUser(null);
      setRegisteredSessions([]);
    }
  }, [location.pathname]); // Re-check when route changes

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Tracks', path: '/tracks' },
    { name: 'Agenda', path: '/agenda' },
    { name: 'Speakers', path: '/speakers' },
    { name: 'Venue', path: '/venue' }
  ];

  const isActivePage = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setRegisteredSessions([]);
    navigate('/');
  };

  return (
    <nav className="fixed w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Island Container */}
        <div className={`transition-all duration-300 rounded-2xl border ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-sm shadow-lg border-gray-200' 
            : 'bg-white/90 backdrop-blur-sm shadow-md border-gray-100'
        }`}>
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo Section */}
              <div className="flex items-center space-x-6">
                <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
                  <img 
                    src="/eMazzanti_logo_441x120px_LightBkgrnd.png" 
                    alt="ASPIRE 2025" 
                    className="h-10 w-auto"
                  />
                  <div className="hidden sm:block">
                    <div className="text-xl font-light text-gray-900">ASPIRE 2025</div>
                    <div className="text-xs text-gray-500">Oct 15 • NYC</div>
                  </div>
                </Link>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`transition-colors duration-200 font-medium ${
                      isActivePage(item.path) 
                        ? 'text-blue-600' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Desktop Auth Section */}
              <div className="hidden lg:flex items-center space-x-4">
                {user ? (
                  <>
                    {/* User Session Count */}
                    {registeredSessions.length > 0 && (
                      <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-200">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-700 text-sm font-medium">
                          {registeredSessions.length} sessions
                        </span>
                      </div>
                    )}
                    
                    {/* User Menu */}
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-600 text-sm">
                        Welcome, {user.firstName}
                      </span>
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Logout"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Register</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200">
              <div className="px-6 py-4 space-y-3">
                {/* Navigation Links */}
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block py-3 px-4 rounded-xl transition-colors duration-200 font-medium ${
                      isActivePage(item.path)
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Auth Section */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  {user ? (
                    <>
                      {/* User Info */}
                      <div className="px-4 py-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-gray-600 text-sm">{user.email}</div>
                          </div>
                        </div>
                        
                        {registeredSessions.length > 0 && (
                          <div className="mt-3 flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-700 text-sm font-medium">
                              {registeredSessions.length} sessions registered
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* User Actions */}
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                      >
                        <User className="w-5 h-5" />
                        <span>View Dashboard</span>
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 py-3 px-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full font-medium"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center space-x-3 py-3 px-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                      >
                        <LogIn className="w-5 h-5" />
                        <span>Login</span>
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center space-x-3 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md"
                      >
                        <UserPlus className="w-5 h-5" />
                        <span>Register for ASPIRE 2025</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;