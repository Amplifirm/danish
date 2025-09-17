import { useState } from 'react';
import { 
  Phone, Mail, MapPin, Linkedin,  Youtube, Play, Pause, 
  Volume2, VolumeX, Maximize, Calendar, Users,  ArrowRight, 
 Star, CheckCircle, Globe
} from 'lucide-react';

const ProfessionalFooter = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handlePlayPause = () => {
    const video = document.getElementById('aspire-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    const video = document.getElementById('aspire-video') as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    const video = document.getElementById('aspire-video') as HTMLVideoElement;
    if (video && video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Video Section - White Background */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full">
                  <Star className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-700 font-medium text-sm">ASPIRE 2024 HIGHLIGHTS</span>
                </div>
                
                <h3 className="text-6xl font-light text-gray-900 leading-tight">
                  23 Years of
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-normal">
                    Learning
                  </span>
                </h3>
                
                <p className="text-xl text-gray-700 leading-relaxed">
                  Witness the transformative moments from ASPIRE 2024 where 400+ business leaders 
                  discovered breakthrough strategies. Experience the energy, insights, and connections 
                  that drive real business transformation.
                </p>
              </div>
              
             
            </div>

            {/* Right Video Player */}
            <div className="relative">
              <div className="relative bg-black/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-300/50 shadow-2xl">
                <video
                  id="aspire-video"
                  className="w-full aspect-video object-cover"
                  muted={isMuted}
                  onLoadedData={() => setVideoLoaded(true)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23764ba2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='450' fill='url(%23grad)'/%3E%3Ctext x='400' y='200' text-anchor='middle' fill='white' font-family='Arial' font-size='32' font-weight='300'%3EASPIRE 2024%3C/text%3E%3Ctext x='400' y='250' text-anchor='middle' fill='white' font-family='Arial' font-size='18' opacity='0.8'%3EEvent Highlights%3C/text%3E%3C/svg%3E"
                >
                  <source src="/videos/23 years of learning.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={handlePlayPause}
                    className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-2xl"
                    disabled={!videoLoaded}
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-gray-900" />
                    ) : (
                      <Play className="w-8 h-8 text-gray-900 ml-1" />
                    )}
                  </button>
                </div>

                {/* Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handlePlayPause}
                        className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                        disabled={!videoLoaded}
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={handleMute}
                        className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                        disabled={!videoLoaded}
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                    </div>
                    <button
                      onClick={handleFullscreen}
                      className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                      disabled={!videoLoaded}
                    >
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Loading */}
                {!videoLoaded && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white/80">Loading video...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content - Dark Background */}
      <div className="bg-slate-900" style={{backgroundColor: '#0E172A'}}>
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
            
            {/* Company Section */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <img 
                  src="/aspirehorizontal.png" 
                  alt="ASPIRE 2025" 
                  className="h-12 w-auto "
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const textLogo = e.currentTarget.nextElementSibling as HTMLElement;
                    if (textLogo) textLogo.style.display = 'block';
                  }}
                />
                <div className="text-3xl font-light text-white hidden">ASPIRE 2025</div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                eMazzanti Technologies' flagship conference bringing together 400+ SMB leaders 
                for actionable insights and breakthrough innovation.
              </p>

              <button className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105">
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Event Details */}
            <div className="space-y-8">
              <h4 className="text-xl font-semibold text-white">Event Details</h4>
              <div className="space-y-6">
                <div className="group cursor-pointer">
                  <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-blue-400/50 hover:bg-white/15 transition-all duration-300">
                    <Calendar className="w-6 h-6 text-blue-400 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">October 15, 2025</div>
                      <div className="text-gray-300 text-sm">9:00 AM - 7:30 PM EST</div>
                      <div className="text-gray-400 text-xs mt-1">Full day + networking reception</div>
                    </div>
                  </div>
                </div>
                
                <div className="group cursor-pointer">
                  <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-purple-400/50 hover:bg-white/15 transition-all duration-300">
                    <MapPin className="w-6 h-6 text-purple-400 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">Microsoft Technology Center</div>
                      <div className="text-gray-300 text-sm">11 Times Square, 8th Floor</div>
                      <div className="text-gray-400 text-xs mt-1">New York, NY 10036</div>
                    </div>
                  </div>
                </div>
                
                <div className="group cursor-pointer">
                  <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-green-400/50 hover:bg-white/15 transition-all duration-300">
                    <Users className="w-6 h-6 text-green-400 mt-0.5" />
                    <div>
                      <div className="text-white font-medium">400+ Business Leaders</div>
                      <div className="text-gray-300 text-sm">SMB executives & entrepreneurs</div>
                      <div className="text-gray-400 text-xs mt-1">Exclusive networking environment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Support */}
            <div className="space-y-8">
              <h4 className="text-xl font-semibold text-white">Contact & Support</h4>
              <div className="space-y-4">
                <a href="mailto:aspire@emazzanti.net" className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-xl flex items-center justify-center group-hover:bg-blue-500/50 transition-colors">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium">aspire@emazzanti.net</div>
                    <div className="text-sm text-gray-400">Registration & inquiries</div>
                  </div>
                </a>
                
                <a href="tel:+18443604400" className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <div className="w-10 h-10 bg-purple-500/30 rounded-xl flex items-center justify-center group-hover:bg-purple-500/50 transition-colors">
                    <Phone className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="font-medium">+1 (844) 360-4400</div>
                    <div className="text-sm text-gray-400">Mon-Fri 9AM-6PM EST</div>
                  </div>
                </a>
                
                <div className="group flex items-center space-x-3 text-gray-300">
                  <div className="w-10 h-10 bg-green-500/30 rounded-xl flex items-center justify-center">
                    <Globe className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium">eMazzanti Technologies</div>
                    <div className="text-sm text-gray-400">Hoboken, NJ</div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h5 className="text-white font-semibold mb-4">Follow ASPIRE</h5>
                <div className="flex space-x-3">
                  <a href="#" className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center hover:bg-blue-500/50 transition-all duration-300 transform hover:scale-110">
                    <Linkedin className="w-6 h-6 text-white" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-400/30 rounded-xl flex items-center justify-center hover:bg-blue-400/50 transition-all duration-300 transform hover:scale-110">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-red-500/30 rounded-xl flex items-center justify-center hover:bg-red-500/50 transition-all duration-300 transform hover:scale-110">
                    <Youtube className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-8">
              <h4 className="text-xl font-semibold text-white">Conference</h4>
              <nav className="space-y-3">
                {[
                  'Conference Agenda',
                  'Speaker Lineup',
                  'Session Tracks',
                  'Venue & Travel',
                  'Networking Reception',
                  'Past Events'
                ].map((link) => (
                  <a 
                    key={link}
                    href="#"
                    className="group flex items-center justify-between text-gray-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-lg hover:bg-white/10"
                  >
                    <span>{link}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-white/20">
                <h5 className="text-white font-semibold mb-4">Why Attend?</h5>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>24 expert-led sessions</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>Premium networking opportunities</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>Actionable business strategies</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>Complimentary admission</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="text-gray-300">
                <p>© 2025 eMazzanti Technologies. All rights reserved.</p>
                <p className="text-sm mt-1">Celebrating 24 years of technology innovation and business leadership.</p>
              </div>
              <div className="flex items-center space-x-8 text-sm">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;