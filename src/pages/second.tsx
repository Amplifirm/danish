import { useState, useEffect } from 'react';
import { ChevronRight, Calendar, MapPin,  Users,  Shield, TrendingUp, DollarSign, Zap, Lock, Play, Menu, X, CheckCircle, ArrowRight, Target,  Building } from 'lucide-react';

const Second = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tracks');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tracks = [
    {
      id: 1,
      title: "Drive Revenue",
      icon: <TrendingUp className="w-6 h-6" />,
      description: "AI integration, customer success strategies, and growth optimization",
      topics: ["AI Integration", "Customer Success", "E365 Implementation", "Growth Strategies"],
      sessions: 6
    },
    {
      id: 2,
      title: "Reduce Expenses",
      icon: <DollarSign className="w-6 h-6" />,
      description: "Cost optimization through modern cloud platforms and AI tools",
      topics: ["Cloud Migration", "AI Cost Reduction", "Compliance Optimization", "Budget Management"],
      sessions: 6
    },
    {
      id: 3,
      title: "Increase Productivity",
      icon: <Zap className="w-6 h-6" />,
      description: "Workflow automation and operational efficiency solutions",
      topics: ["Task Automation", "Remote Workflows", "Team Efficiency", "Digital Transformation"],
      sessions: 6
    },
    {
      id: 4,
      title: "Cybersecurity",
      icon: <Shield className="w-6 h-6" />,
      description: "Advanced threat protection and data security strategies",
      topics: ["Ransomware Prevention", "Data Protection", "Security Innovation", "Threat Intelligence"],
      sessions: 6
    }
  ];

  const tabs = [
    { id: 'tracks', label: 'Tracks', icon: <Target className="w-4 h-4" /> },
    { id: 'speakers', label: 'Speakers', icon: <Users className="w-4 h-4" /> },
    { id: 'venue', label: 'Venue', icon: <MapPin className="w-4 h-4" /> },
    { id: 'sponsors', label: 'Sponsors', icon: <Building className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-light">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gray-800/20 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gray-700/20 rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-sm border-b border-gray-700' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <img src="https://naspnet.org/wp-content/uploads/2022/09/eMazzanti-logo.png" alt="eMazzanti Technologies" className="h-8 brightness-0 invert" />
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span>Formerly 23 Years of Learning</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              {['Tracks', 'Speakers', 'Venue', 'Sponsors'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item.toLowerCase())}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  {item}
                </button>
              ))}
              <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium">
                Register Now
              </button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Section 1: Hero with Event Details */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-40 left-10 w-32 h-32 border border-gray-700 rotate-45 opacity-20"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 border border-gray-600 rotate-12 opacity-30"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gray-800 rotate-45 opacity-40"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Main Content */}
            <div>
              {/* Year Badge */}
              <div className="inline-flex items-center space-x-4 mb-8 px-6 py-3 bg-gray-800 rounded-xl border border-gray-700">
                <span className="text-4xl font-thin text-white">2025</span>
                <div className="h-8 w-px bg-gray-600"></div>
                <div>
                  <div className="text-gray-300 font-semibold text-lg">ASPIRE</div>
                  <div className="text-gray-400 text-sm">Conference & Workshops</div>
                </div>
              </div>

              <h1 className="mb-6">
                <span className="block text-6xl sm:text-7xl font-thin text-white mb-2 tracking-tight">
                  ASPIRE
                </span>
                <span className="block text-2xl font-light text-gray-300 tracking-wide">
                  Transform Your Business Through Technology
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                One-day conference for SMB leaders featuring 24 expert sessions across four strategic tracks. 
                Join 400+ business executives at Microsoft Technology Center, NYC.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { num: '24', label: 'Sessions' },
                  { num: '4', label: 'Tracks' },
                  { num: '400', label: 'Leaders' }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="text-3xl font-thin text-white mb-1">{stat.num}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium flex items-center justify-center">
                  Register Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                
                <button className="px-8 py-3 border-2 border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 transition-colors duration-200 font-medium flex items-center justify-center">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Preview
                </button>
              </div>
            </div>

            {/* Right: Event Details Card */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
              <div className="text-center mb-6">
                <span className="px-4 py-2 bg-gray-700 text-gray-300 rounded-full text-sm font-medium">
                  LIMITED SEATING AVAILABLE
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
                  <Calendar className="w-6 h-6 text-gray-400" />
                  <div>
                    <div className="font-semibold text-white">October 15, 2025</div>
                    <div className="text-gray-400 text-sm">9:00 AM - 5:00 PM EST</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
                  <MapPin className="w-6 h-6 text-gray-400" />
                  <div>
                    <div className="font-semibold text-white">Microsoft Technology Center</div>
                    <div className="text-gray-400 text-sm">Times Square, New York City</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
                  <Users className="w-6 h-6 text-gray-400" />
                  <div>
                    <div className="font-semibold text-white">Networking Reception</div>
                    <div className="text-gray-400 text-sm">5:30 PM - 7:30 PM (Following conference)</div>
                  </div>
                </div>
              </div>

              {/* Keynote Speaker */}
              <div className="border-t border-gray-700 pt-6">
                <div className="text-center mb-4">
                  <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-medium">
                    KEYNOTE SPEAKER
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">Paul Centenari</h3>
                  <p className="text-gray-400 text-sm">Serial entrepreneur with 3 successful exits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Tabbed Content */}
      <section className="py-20 px-6 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-gray-800 rounded-xl p-2 border border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
                    activeTab === tab.id
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {/* Tracks Tab */}
            {activeTab === 'tracks' && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-thin text-white mb-4">Four Strategic Tracks</h2>
                  <p className="text-xl text-gray-300">Tailored learning paths for immediate business impact</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tracks.map((track) => (
                    <div key={track.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="p-3 rounded-lg bg-gray-700 text-gray-300">
                          {track.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">{track.title}</h3>
                          <p className="text-gray-400 text-sm">{track.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {track.topics.map((topic, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm">{track.sessions} Sessions</span>
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Speakers Tab */}
            {activeTab === 'speakers' && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-thin text-white mb-4">Expert Speakers</h2>
                  <p className="text-xl text-gray-300">Industry leaders and technology experts</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Keynote Speaker - Featured */}
                  <div className="md:col-span-2 lg:col-span-3 bg-gray-800 border border-gray-700 rounded-xl p-8">
                    <div className="flex items-center space-x-6">
                      <div className="w-24 h-24 bg-gray-700 rounded-xl flex items-center justify-center">
                        <Users className="w-12 h-12 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="inline-block mb-2">
                          <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-medium">
                            KEYNOTE SPEAKER
                          </span>
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-2">Paul Centenari</h3>
                        <p className="text-gray-300 mb-4">
                          Serial entrepreneur who has built, scaled, and successfully sold three companies. 
                          Paul will share insights on resilience, strategic decision-making, and leveraging technology for rapid business growth.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">3 Successful Exits</span>
                          <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Technology Expert</span>
                          <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Growth Strategist</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Speakers Placeholder */}
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center">
                      <div className="w-16 h-16 bg-gray-700 rounded-xl mx-auto mb-4 flex items-center justify-center">
                        <Users className="w-8 h-8 text-gray-400" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">Track {Math.ceil(i/1.5)} Speaker</h4>
                      <p className="text-gray-400 text-sm">Industry Expert</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Venue Tab */}
            {activeTab === 'venue' && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-thin text-white mb-4">Microsoft Technology Center</h2>
                  <p className="text-xl text-gray-300">Prime location in the heart of Times Square</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                      <div className="flex items-start space-x-4">
                        <Building className="w-6 h-6 text-gray-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-white mb-2">Conference Venue</h4>
                          <p className="text-gray-300 mb-1">Microsoft Technology Center</p>
                          <p className="text-gray-300 mb-1">11 Times Square, New York, NY 10036</p>
                          <p className="text-gray-300">9:00 AM - 5:00 PM EST</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                      <div className="flex items-start space-x-4">
                        <Users className="w-6 h-6 text-gray-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-white mb-2">Networking Reception</h4>
                          <p className="text-gray-300 mb-1">Immediately following conference</p>
                          <p className="text-gray-300">5:30 PM - 7:30 PM</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                      <div className="flex items-start space-x-4">
                        <MapPin className="w-6 h-6 text-gray-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-white mb-2">Transportation</h4>
                          <p className="text-gray-300 mb-1">Subway: Times Sq-42 St Station</p>
                          <p className="text-gray-300">Multiple parking options nearby</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                    <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                      <MapPin className="w-12 h-12 text-gray-400" />
                    </div>
                    <div className="text-center">
                      <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium">
                        Get Directions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sponsors Tab */}
            {activeTab === 'sponsors' && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-thin text-white mb-4">Event Partners</h2>
                  <p className="text-xl text-gray-300">Industry leaders supporting SMB innovation</p>
                </div>
                
                <div className="space-y-12">
                  {/* Platinum */}
                  <div className="text-center">
                    <div className="inline-block mb-6">
                      <span className="px-6 py-2 bg-gray-700 text-white rounded-full text-sm font-medium tracking-wide">
                        PLATINUM PARTNER
                      </span>
                    </div>
                    <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 max-w-md mx-auto">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png"
                        alt="Microsoft"
                        className="h-16 mx-auto brightness-0 invert" 
                      />
                    </div>
                  </div>

                  {/* Gold */}
                  <div className="text-center">
                    <div className="inline-block mb-6">
                      <span className="px-4 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-medium">
                        GOLD SPONSORS
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 h-32 flex items-center justify-center">
                        <span className="text-gray-300 font-medium">WatchGuard Technologies</span>
                      </div>
                      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 h-32 flex items-center justify-center">
                        <span className="text-gray-300 font-medium">EOS Worldwide</span>
                      </div>
                    </div>
                  </div>

                  {/* Partnership CTA */}
                  <div className="text-center">
                    <div className="inline-block bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md mx-auto">
                      <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-4">Partner With Us</h3>
                      <p className="text-gray-300 mb-6">Join industry leaders supporting SMB technology advancement</p>
                      <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium">
                        Partnership Information
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 3: Registration */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-thin text-white mb-4">Secure Your Spot</h2>
            <p className="text-xl text-gray-300 mb-6">Join 400+ business leaders transforming their organizations</p>
            <div className="inline-block">
              <span className="px-4 py-2 bg-gray-700 text-gray-300 rounded-full text-sm font-medium">
                ✓ Complimentary Admission  ✓ Lunch Included  ✓ Networking Reception  ✓ Certificate
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Registration Form */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-gray-500 focus:outline-none transition-colors duration-200 text-white placeholder-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-gray-500 focus:outline-none transition-colors duration-200 text-white placeholder-gray-400"
                  />
                </div>
                
                <input
                  type="email"
                  placeholder="Business Email"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-gray-500 focus:outline-none transition-colors duration-200 text-white placeholder-gray-400"
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Company"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-gray-500 focus:outline-none transition-colors duration-200 text-white placeholder-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Job Title"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-gray-500 focus:outline-none transition-colors duration-200 text-white placeholder-gray-400"
                  />
                </div>

                <button className="w-full bg-gray-700 text-white rounded-lg px-8 py-4 hover:bg-gray-600 transition-colors duration-200 font-medium text-lg flex items-center justify-center">
                  Complete Registration
                  <CheckCircle className="ml-3 w-5 h-5" />
                </button>

                <p className="text-center text-gray-400 text-sm flex items-center justify-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Secure registration powered by eMazzanti Technologies
                </p>
              </div>
            </div>

            {/* Registration Benefits */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">What's Included</h3>
                <div className="space-y-3">
                  {[
                    'Access to all 24 expert sessions',
                    'Keynote presentation by Paul Centenari',
                    'Networking reception with industry leaders',
                    'Lunch and refreshments throughout the day',
                    'Digital resource library and materials',
                    'Certificate of attendance'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-2">Perfect For:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Small and midsize business owners</li>
                  <li>• CEOs, COOs, and CFOs</li>
                  <li>• IT directors and technology decision-makers</li>
                  <li>• Business leaders focused on growth and efficiency</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="https://naspnet.org/wp-content/uploads/2022/09/eMazzanti-logo.png" alt="eMazzanti Technologies" className="h-8 brightness-0 invert mb-4" />
              <p className="text-gray-400 text-sm">
                Transforming businesses through technology innovation since 2001.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-white">Contact</h4>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li>aspire@emazzanti.net</li>
                <li>+1 (844) 360-4400</li>
                <li>New York, NY</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-white">Quick Links</h4>
              <ul className="space-y-1">
                {['Agenda', 'Speakers', 'Venue', 'Sponsors'].map((link) => (
                  <li key={link}>
                    <button onClick={() => setActiveTab(link.toLowerCase())} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-white">Follow Us</h4>
              <div className="flex space-x-3">
                {['LinkedIn', 'Twitter'].map((social) => (
                  <button key={social} className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                    <span className="text-xs font-semibold">{social[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; 2025 eMazzanti Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Second;