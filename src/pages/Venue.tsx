import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Building, Car, Train, Plane, Coffee, Wifi, Users, 
  Calendar, Clock, ArrowRight, CheckCircle,  Star, 
  User, Shield, Monitor, Utensils
} from 'lucide-react';

const VenuePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  const venueFeatures = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "State-of-the-Art Technology",
      description: "Latest Microsoft technologies and high-end presentation equipment"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Flexible Meeting Spaces",
      description: "Multiple breakout rooms and collaborative spaces for networking"
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "High-Speed Internet",
      description: "Enterprise-grade WiFi throughout the entire facility"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Catering Services",
      description: "Full lunch service and networking reception included"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Professional Security",
      description: "Secure facility with professional building management"
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "Convenient Parking",
      description: "Multiple parking garages within walking distance"
    }
  ];

  const transportationOptions = [
    {
      icon: <Train className="w-5 h-5" />,
      title: "Subway",
      description: "Times Square-42nd Street station (Multiple lines: 1,2,3,7,N,Q,R,W,S)",
      walkTime: "2 min walk"
    },
    {
      icon: <Car className="w-5 h-5" />,
      title: "Driving",
      description: "Multiple parking garages available in Times Square area",
      walkTime: "5 min walk"
    },
    {
      icon: <Plane className="w-5 h-5" />,
      title: "Airports",
      description: "JFK (45 min), LGA (30 min), EWR (35 min) via taxi/rideshare",
      walkTime: "Various"
    }
  ];

  const pastEventHighlights = [
    "400+ business leaders attended",
    "95% attendee satisfaction rate",
    "50+ new business partnerships formed",
    "Average ROI: 300% within 6 months"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white font-roboto">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl sm:text-6xl font-light text-gray-900 mb-6 tracking-tight">
                  Microsoft Technology Center
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Join us in the heart of <strong>Times Square, NYC</strong> at Microsoft's flagship 
                  technology center. A world-class venue designed for innovation, collaboration, 
                  and transformative business experiences.
                </p>
              </div>

              {/* Key Venue Stats */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: '30,000', label: 'Sq Ft', color: '#3C1AF9' },
                  { num: '400+', label: 'Capacity', color: '#B61BFD' },
                  { num: '2', label: 'Min Walk', color: '#2EA1ED' },
                  { num: '15+', label: 'Meeting Rooms', color: '#1DC5AC' }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
                    <div className="text-2xl font-bold mb-1" style={{color: stat.color}}>
                      {stat.num}
                    </div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Address & Quick Info */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Venue Address</h3>
                    <p className="text-gray-700 mb-2">
                      Microsoft Technology Center<br/>
                      11 Times Square, 8th Floor<br/>
                      New York, NY 10036
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Train className="w-4 h-4" />
                        <span>2 min to subway</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Car className="w-4 h-4" />
                        <span>5 min to parking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>View My Schedule</span>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/register')}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>Reserve Your Seat</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>
                )}
                
                <button 
                  onClick={() => window.open('https://maps.google.com/maps?q=Microsoft+Technology+Center+11+Times+Square+New+York', '_blank')}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Get Directions</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right - Venue Image/Video */}
            <div className="space-y-6">
              {/* Main Venue Image */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Building className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Microsoft Technology Center</h3>
                    <p className="text-gray-600">Times Square, NYC</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <Monitor className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <span className="text-sm text-gray-700">Latest Tech</span>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <span className="text-sm text-gray-700">400 Capacity</span>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <Coffee className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <span className="text-sm text-gray-700">Full Catering</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Last Year's Event Video */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Experience from Last Year's Event
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See highlights from our previous conference and get a feel for the energy, 
              networking, and learning that happens at Microsoft Technology Center.
            </p>
          </div>

          {/* Video Embed */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-8">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe 
                src="https://emazzanti-my.sharepoint.com/personal/schait_emazzanti_net/_layouts/15/embed.aspx?UniqueId=6b8050bb-e9e4-48eb-aefa-e8914db21821&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                allowFullScreen 
                title="23 years of learning.mp4"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Past Event Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {pastEventHighlights.map((highlight, i) => (
              <div key={i} className="text-center p-6 bg-green-50 rounded-2xl border border-green-200">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <p className="text-green-800 font-medium text-sm">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Features */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              World-Class Venue Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Microsoft Technology Center provides everything needed for a premium conference experience, 
              from cutting-edge technology to professional catering services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venueFeatures.map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Getting to the Venue
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Located in the heart of Times Square, Microsoft Technology Center is easily accessible 
              by subway, car, or taxi from anywhere in the NYC area.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Transportation Options */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Transportation Options</h3>
              <div className="space-y-4">
                {transportationOptions.map((option, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{option.title}</h4>
                          <span className="text-sm text-blue-600 font-medium">{option.walkTime}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{option.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map/Directions */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Location & Directions</h3>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-700">Interactive Map</p>
                    <p className="text-sm text-gray-600">Times Square Location</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                    <Building className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">11 Times Square, 8th Floor</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-white rounded-xl">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">October 15, 2025 • 9:00 AM - 5:00 PM</span>
                  </div>
                  
                  <button 
                    onClick={() => window.open('https://maps.google.com/maps?q=Microsoft+Technology+Center+11+Times+Square+New+York', '_blank')}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Open in Google Maps
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Amenities */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Nearby Amenities
            </h2>
            <p className="text-xl text-gray-600">
              Times Square offers world-class dining, hotels, and entertainment within walking distance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <Utensils className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Dining</h3>
              <p className="text-gray-600 mb-4">World-class restaurants and cafes within 2 blocks</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Fine dining options</p>
                <p>• Quick lunch spots</p>
                <p>• Coffee shops</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <Building className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Hotels</h3>
              <p className="text-gray-600 mb-4">Premium hotels for out-of-town attendees</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Times Square hotels</p>
                <p>• Business-class accommodations</p>
                <p>• Walking distance</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <Star className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Entertainment</h3>
              <p className="text-gray-600 mb-4">Broadway shows and attractions nearby</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Broadway theaters</p>
                <p>• Tourist attractions</p>
                <p>• Shopping destinations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-16 shadow-xl border border-gray-100">
            <h2 className="text-5xl font-light text-gray-900 mb-8">
              Ready to Experience Innovation?
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Join us at Microsoft Technology Center for a day of learning, networking, 
              and transformation in the heart of New York City.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                '✓ Premium Venue',
                '✓ Full Catering',
                '✓ Latest Technology', 
                '✓ Times Square Location'
              ].map((feature, i) => (
                <div key={i} className="bg-green-50 rounded-2xl p-4 border border-green-200">
                  <span className="text-emerald-700 font-medium text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {user ? (
                <>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="px-12 py-4 bg-blue-600 text-white text-xl font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <User className="w-6 h-6" />
                      <span>View My Schedule</span>
                    </div>
                  </button>
                  <button
                    onClick={() => navigate('/agenda')}
                    className="px-12 py-4 border-2 border-gray-300 text-gray-700 text-xl font-medium rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <Calendar className="w-6 h-6" />
                      <span>View Agenda</span>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/register')}
                    className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <span>Register Now - It's Free</span>
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  </button>
                  
                  <button
                    onClick={() => window.open('https://maps.google.com/maps?q=Microsoft+Technology+Center+11+Times+Square+New+York', '_blank')}
                    className="px-12 py-4 border-2 border-gray-300 text-gray-700 text-xl font-medium rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <MapPin className="w-6 h-6" />
                      <span>Get Directions</span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-gray-900 text-white">
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
                {['Home', 'Tracks', 'Agenda', 'Speakers'].map((link) => (
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

export default VenuePage;