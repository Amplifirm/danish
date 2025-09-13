import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users,  Award, Building, X, ChevronRight, CheckCircle
} from 'lucide-react';

// Type definitions
interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  company?: string;
  registeredSessions?: any[];
}

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  fullBio: string;
  expertise: string[];
  sessions: string[];
  achievements: string[];
  quote: string;
  image: string;
  track?: string;
}

interface Category {
  id: string;
  label: string;
  count: number;
}

const SpeakersPage = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      const parsedUser: UserType = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  const keynoteSpeeakers: Speaker[] = [
    {
      id: 'jack-alexy',
      name: 'Jack Alexy',
      title: 'Business Leader & Entrepreneur',
      company: 'Technology Executive',
      bio: 'Accomplished business leader with extensive experience in scaling technology companies and driving digital transformation initiatives.',
      fullBio: 'Jack Alexy is a seasoned technology executive with over 20 years of experience leading digital transformation initiatives at Fortune 500 companies. His expertise spans strategic planning, operational excellence, and technology adoption. Jack has been instrumental in helping organizations navigate complex business challenges while maintaining sustainable growth.',
      expertise: ['Digital Transformation', 'Strategic Leadership', 'Technology Adoption', 'Business Strategy'],
      sessions: ['Keynote: Business Leadership Conversation'],
      achievements: [
        'Led digital transformation for 3 Fortune 500 companies',
        'Reduced operational costs by 35% through technology optimization',
        'Managed technology budgets exceeding $50M annually',
        'Speaker at 25+ industry conferences'
      ],
      quote: "Technology isn't just about tools—it's about transforming how we think about business.",
      image: '/jack.jpeg'
    },
    {
      id: 'paul-centenari',
      name: 'Paul Centenari',
      title: 'Serial Entrepreneur',
      company: '3 Successful Exits',
      bio: 'Serial entrepreneur who has built, scaled, and successfully sold three companies. Expert in resilience, decision-making, and leveraging technology for rapid business growth.',
      fullBio: 'Paul Centenari is a proven serial entrepreneur with a track record of building and scaling technology companies from startup to successful exit. Having founded and sold three companies, Paul brings unique insights into the challenges and opportunities facing growing businesses. His experience spans software development, digital marketing, and business strategy, with a particular focus on helping SMBs leverage technology for competitive advantage.',
      expertise: ['Entrepreneurship', 'Business Growth', 'Technology Strategy', 'Exit Planning'],
      sessions: ['Keynote: Business Leadership Conversation'],
      achievements: [
        'Founded and sold 3 companies for $200M+ combined',
        'Raised over $75M in venture capital funding',
        'Created 500+ jobs across portfolio companies',
        'Mentored 50+ startup founders'
      ],
      quote: "Every business challenge is an opportunity in disguise—technology just helps you see it faster.",
      image: 'https://media.licdn.com/dms/image/v2/C5603AQEF7yxiQdlGOA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1517695752385?e=1760572800&v=beta&t=mH-XOX2Zjk_EtrSESJUppn8udbvVJJr95mwXxGFxxzk'
    }
  ];

  const trackSpeakers: Speaker[] = [
    {
      id: 'dan-karosen',
      name: 'Dan Karosen',
      title: 'Owner, FC Motown',
      company: 'FC Motown',
      bio: 'Owner of FC Motown, leading the team from local play to NPSL National Championship through bold leadership and vision.',
      fullBio: 'Dan Karosen transformed FC Motown from a local semi-professional club into a national championship team, demonstrating how strategic leadership and bold decision-making can help the "little guy" compete with better-funded organizations. His story provides valuable insights for business leaders facing resource constraints.',
      expertise: ['Leadership', 'Strategic Planning', 'Team Building', 'Competitive Strategy'],
      sessions: ['FC Motown: How the little guy can succeed in business and sport'],
      track: 'revenue',
      achievements: [
        'Led FC Motown to NPSL National Championship',
        'Grew team from local to national recognition',
        'Built successful sports franchise from ground up',
        'Expert in underdog competitive strategies'
      ],
      quote: "Success isn't about having the biggest budget—it's about having the biggest vision.",
      image: 'https://media.licdn.com/dms/image/v2/C4D03AQGENuCZQ6fL0w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1646250919423?e=2147483647&v=beta&t=8RItBrD0VmJFn0LIAmxSmggQV2-6zMEMoEO1QisrfvM'
    },
    {
      id: 'bryan-antepara',
      name: 'Bryan Antepara',
      title: 'Technology Strategist',
      company: 'eMazzanti Technologies',
      bio: 'Expert in AI implementation, Microsoft technologies, and business process optimization with extensive experience in digital transformation.',
      fullBio: 'Bryan Antepara is a technology strategist specializing in AI implementation and Microsoft ecosystem solutions. With over 15 years of experience helping SMBs optimize their technology infrastructure, Bryan focuses on practical, ROI-driven approaches to digital transformation.',
      expertise: ['AI Implementation', 'Microsoft 365', 'Process Optimization', 'Digital Transformation'],
      sessions: [
        'AI Readiness Assessment',
        'Reduce your Telephone Operating Costs with Microsoft Teams',
        'The e365 Advantage: Streamlined Services for Small Business Growth'
      ],
      track: 'mixed',
      achievements: [
        'Implemented AI solutions for 200+ SMBs',
        'Microsoft certified technology specialist',
        'Reduced client IT costs by average 40%',
        'Expert in business process automation'
      ],
      quote: "The best technology solutions are the ones that work seamlessly behind the scenes.",
      image: 'https://media.licdn.com/dms/image/v2/D5605AQFl0h5bBQLp_w/videocover-high/B56ZjObCaCHACQ-/0/1755809860779?e=2147483647&v=beta&t=cnFwAaHVAklf11qKmrj2tWvhoXLuTx6ghRPk56hiD6A'
    },
    {
      id: 'carl-mazzanti',
      name: 'Carl Mazzanti',
      title: 'CEO, eMazzanti Technologies',
      company: 'eMazzanti Technologies',
      bio: 'Technology leader with expertise in cybersecurity, network management, and business growth strategies.',
      fullBio: 'Carl Mazzanti is the CEO of eMazzanti Technologies, a leading Microsoft Managed Services provider. With over 25 years in the technology industry, Carl has built his company into a recognized leader in cybersecurity and cloud solutions for SMBs. His insights into scalable business operations and technology strategy have helped hundreds of organizations achieve sustainable growth.',
      expertise: ['Cybersecurity', 'Cloud Solutions', 'Business Scaling', 'Technology Leadership'],
      sessions: [
        'eCare Network Management',
        'Top 10 Cyber Security recommendations for Businesses Large and Small',
        'The Scalability Playbook: Maximize Growth, Minimize Overhead'
      ],
      track: 'mixed',
      achievements: [
        'Built eMazzanti into leading MSP provider',
        'Protected 1000+ organizations from cyber threats',
        '25+ years technology industry experience',
        'Recognized Microsoft Gold Partner'
      ],
      quote: "Cybersecurity isn't just about protection—it's about enabling confident growth.",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLyRaTwwjy78B0r_rwwueKK0KxJyEHAE-EWg&s'
    },
    {
      id: 'deep-ranipa',
      name: 'Deep Ranipa',
      title: 'Microsoft Solutions Expert',
      company: 'Technology Consultant',
      bio: 'Specialist in Microsoft Dynamics 365, AI adoption, and digital transformation strategies for growing businesses.',
      fullBio: 'Deep Ranipa is a Microsoft Solutions Expert with deep expertise in Dynamics 365 implementations and AI adoption strategies. He has helped over 200 organizations streamline their operations and achieve digital transformation goals through strategic technology adoption.',
      expertise: ['Microsoft Dynamics 365', 'AI Strategy', 'Business Process Improvement', 'Change Management'],
      sessions: [
        'Creating an IT Strategy with Microsoft that Works for your Business',
        'How to Embrace AI without Growing Pains'
      ],
      track: 'mixed',
      achievements: [
        'Implemented Dynamics 365 for 200+ organizations',
        'Microsoft MVP and certified expert',
        'Specialist in AI integration strategies',
        'Author of digital transformation best practices'
      ],
      quote: "The right technology strategy turns complexity into competitive advantage.",
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQF1p4_u-lAOJw/profile-displayphoto-shrink_200_200/B4EZbB4d7CHkAc-/0/1747009528033?e=2147483647&v=beta&t=suDvM_scvS4P78KuGy3E88JDjXwnN2-9Wz4B9mhcxyM'
    },
    {
      id: 'nirvan-ramoutar',
      name: 'Nirvan Ramoutar',
      title: 'Technology Efficiency Expert',
      company: 'IT Optimization Specialist',
      bio: 'Expert in cost reduction technologies and operational efficiency through strategic IT implementations.',
      fullBio: 'Nirvan Ramoutar specializes in helping organizations do more with less through strategic technology implementations. His expertise in cloud migration, process automation, and IT optimization has helped numerous SMBs reduce operational costs while improving productivity.',
      expertise: ['Cost Optimization', 'Cloud Migration', 'Process Automation', 'IT Efficiency'],
      sessions: [
        'Do More with Less - How Technology is the Best Anti-Inflation Tool',
        'Eliminating IT Bottlenecks: How 24/7 Monitoring Supercharges Productivity'
      ],
      track: 'mixed',
      achievements: [
        'Reduced client operational costs by 30% average',
        'Cloud migration specialist with 500+ projects',
        'Expert in business process optimization',
        'Leader in IT efficiency consulting'
      ],
      quote: "True efficiency isn't about doing more—it's about doing what matters most, better.",
      image: 'https://media.licdn.com/dms/image/v2/D4E10AQGi7uwLRRho2g/image-shrink_800/B4EZf3o9m3HwAw-/0/1752206400258?e=2147483647&v=beta&t=BgOsBy8ive2bMv2CGbOXo4hbUROkJgiyMIkDdl37W7k'
    },
    {
      id: 'paul-muir',
      name: 'Paul Muir',
      title: 'Mayor & Business Leader',
      company: 'Municipal Government',
      bio: 'Mayor and business leader with extensive experience in public-private partnerships and government procurement.',
      fullBio: 'Mayor Paul Muir brings unique insights into the intersection of business and government. With experience in both municipal leadership and private sector operations, Paul understands the opportunities and challenges of doing business with public sector organizations.',
      expertise: ['Public Sector', 'Government Relations', 'Procurement', 'Public-Private Partnerships'],
      sessions: ['Doing Business with the Public Sector'],
      track: 'revenue',
      achievements: [
        'Serving mayor with proven business background',
        'Expert in government procurement processes',
        'Leader in public-private partnerships',
        'Advocate for business-friendly municipal policies'
      ],
      quote: "Government and business succeed together when we build bridges, not barriers.",
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQFCVN8FLB2MlQ/profile-displayphoto-scale_200_200/B4DZg6YrV8HAAY-/0/1753326205002?e=2147483647&v=beta&t=Zu7ZwJrvRnL-PbuHdsR_T7gZXtAv4rL4H1KzKPzQUlI'
    },
    {
      id: 'scott-williamson',
      name: 'Scott Williamson',
      title: 'Head of Managed Services',
      company: 'WatchGuard Technologies',
      bio: 'Head of Managed Services at WatchGuard with deep expertise in cybersecurity trends and threat intelligence.',
      fullBio: 'Scott Williamson leads managed services at WatchGuard Technologies, bringing frontline insights into emerging cybersecurity threats and defense strategies. His experience protecting thousands of SMBs provides valuable perspective on the evolving threat landscape.',
      expertise: ['Cybersecurity', 'Threat Intelligence', 'Managed Services', 'Risk Management'],
      sessions: ['What is the Cybersecurity Outlook for 2025/26'],
      track: 'cybersecurity',
      achievements: [
        'Leads cybersecurity for thousands of SMBs',
        'Expert in emerging threat intelligence',
        'WatchGuard Technologies senior executive',
        'Recognized cybersecurity thought leader'
      ],
      quote: "The best cybersecurity strategy is the one that evolves faster than the threats.",
      image: 'https://www.magd.ox.ac.uk/wp-content/uploads/2024/03/Williamson.jpg'
    },
    {
      id: 'maria-scarmardo',
      name: 'Maria Scarmardo',
      title: 'Supply Chain Expert',
      company: 'Procurement Specialist',
      bio: 'Expert in supplier management, cost optimization, and compliance strategies for growing businesses.',
      fullBio: 'Maria Scarmardo specializes in supplier management and procurement optimization for growing businesses. Her systematic approach to vendor relationships has helped organizations reduce costs while maintaining quality and compliance standards.',
      expertise: ['Supply Chain', 'Vendor Management', 'Cost Optimization', 'Compliance'],
      sessions: ['How to create an effective supplier audit to Keep Your Costs Under control and Within Compliance'],
      track: 'expenses',
      achievements: [
        'Supply chain optimization expert',
        'Reduced client procurement costs by 25% average',
        'Compliance and audit specialist',
        'Vendor relationship management leader'
      ],
      quote: "Smart procurement isn't about spending less—it's about spending smarter.",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE05K5l-BLzabZvalLmwIhccdlMGd1hWSJUw&s'
    }
  ];

  const allSpeakers: Speaker[] = [...keynoteSpeeakers, ...trackSpeakers];

  const categories: Category[] = [
    { id: 'all', label: 'All Speakers', count: allSpeakers.length },
    { id: 'keynote', label: 'Keynote Speakers', count: keynoteSpeeakers.length },
    { id: 'revenue', label: 'Drive Revenue', count: trackSpeakers.filter(s => s.track === 'revenue').length },
    { id: 'expenses', label: 'Reduce Expenses', count: trackSpeakers.filter(s => s.track === 'expenses').length },
    { id: 'productivity', label: 'Increase Productivity', count: trackSpeakers.filter(s => s.track === 'productivity').length },
    { id: 'cybersecurity', label: 'Enhance Cybersecurity', count: trackSpeakers.filter(s => s.track === 'cybersecurity').length }
  ];

  const getFilteredSpeakers = (): Speaker[] => {
    if (selectedCategory === 'all') return allSpeakers;
    if (selectedCategory === 'keynote') return keynoteSpeeakers;
    return trackSpeakers.filter(speaker => speaker.track === selectedCategory || speaker.track === 'mixed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white font-roboto">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Expert Speakers
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Learn from industry leaders, successful entrepreneurs, and technology experts 
            who will share actionable insights you can implement immediately.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-light text-gray-900">{allSpeakers.length}+</div>
              <div className="text-gray-600 text-sm">Expert Speakers</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <Award className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-light text-gray-900">2</div>
              <div className="text-gray-600 text-sm">Keynote Speakers</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <Building className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-light text-gray-900">15+</div>
              <div className="text-gray-600 text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex bg-white rounded-2xl p-2 shadow-sm border border-gray-100 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl transition-all duration-200 font-medium whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Keynote Speakers - Featured Section */}
      {(selectedCategory === 'all' || selectedCategory === 'keynote') && (
        <section className="pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-medium shadow-md">
                  KEYNOTE SPEAKERS
                </span>
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-4">Featured Keynote</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {keynoteSpeeakers.map((speaker) => (
                <div 
                  key={speaker.id} 
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                  onClick={() => setSelectedSpeaker(speaker)}
                >
                  <div className="flex items-start space-x-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-blue-200 shadow-lg flex-shrink-0">
                      <img 
                        src={speaker.image} 
                        alt={speaker.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{speaker.name}</h3>
                      <p className="text-blue-600 font-medium mb-1">{speaker.title}</p>
                      <p className="text-gray-600 text-sm mb-4">{speaker.company}</p>
                      <p className="text-gray-700 mb-4 leading-relaxed">{speaker.bio}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {speaker.expertise.slice(0, 4).map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-sm">{speaker.sessions.length} Session</span>
                        <ChevronRight className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Track Speakers */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {selectedCategory === 'all' && (
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4">Track Speakers</h2>
              <p className="text-gray-600">Industry experts leading sessions across our four strategic tracks</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFilteredSpeakers().filter(speaker => !keynoteSpeeakers.includes(speaker)).map((speaker) => (
              <div 
                key={speaker.id} 
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
                onClick={() => setSelectedSpeaker(speaker)}
              >
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl mx-auto mb-4 overflow-hidden border-4 border-gray-200 shadow-md">
                    <img 
                      src={speaker.image} 
                      alt={speaker.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{speaker.name}</h3>
                  <p className="text-blue-600 font-medium mb-1">{speaker.title}</p>
                  <p className="text-gray-600 text-sm mb-4">{speaker.company}</p>
                  
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">{speaker.bio}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4 justify-center">
                    {speaker.expertise.slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <span className="text-gray-600 text-sm">{speaker.sessions.length} Session{speaker.sessions.length > 1 ? 's' : ''}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-auto mt-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6">Learn from the Best</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join these industry experts for a day of actionable insights, practical strategies, 
            and networking opportunities that will transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-md"
                >
                  View My Schedule
                </button>
                <button
                  onClick={() => navigate('/agenda')}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  View Full Agenda
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md"
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

      {/* Speaker Detail Modal - Matching Homepage Style */}
      {selectedSpeaker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modalSlideIn">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-start space-x-6">
                <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 shadow-xl border-blue-200 flex-shrink-0">
                  <img 
                    src={selectedSpeaker.image} 
                    alt={selectedSpeaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-light text-gray-900 mb-2">{selectedSpeaker.name}</h3>
                  <p className="text-xl font-medium mb-2 text-blue-600">{selectedSpeaker.title}</p>
                  <p className="text-gray-600 text-lg mb-4">{selectedSpeaker.company}</p>
                  <div className="bg-gray-50 rounded-2xl p-4 border-l-4 border-blue-600">
                    <p className="text-gray-700 italic text-lg">"{selectedSpeaker.quote}"</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="text-gray-400 hover:text-gray-600 p-3 hover:bg-gray-100 rounded-2xl transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Biography</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedSpeaker.fullBio}</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Conference Sessions</h4>
                  <div className="space-y-3">
                    {selectedSpeaker.sessions?.map((session, i) => (
                      <div key={i} className="flex items-start space-x-3 bg-blue-50 rounded-2xl p-4 border border-blue-200">
                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-blue-600"></div>
                        <span className="text-gray-800 font-medium">{session}</span>
                      </div>
                    )) || <p className="text-gray-500">No sessions available</p>}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Areas of Expertise</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedSpeaker.expertise?.map((skill, i) => (
                      <div key={i} className="bg-gray-100 rounded-xl p-3 text-center">
                        <span className="text-gray-700 font-medium text-sm">{skill}</span>
                      </div>
                    )) || <p className="text-gray-500">No expertise available</p>}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Achievements</h4>
                  <div className="space-y-3">
                    {selectedSpeaker.achievements?.map((achievement, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-500" />
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    )) || <p className="text-gray-500">No achievements available</p>}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-8 pt-8 border-t border-gray-200">
              <button 
                onClick={() => {
                  setSelectedSpeaker(null);
                  navigate('/agenda');
                }}
                className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-2xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                View Sessions
              </button>
              <button 
                onClick={() => setSelectedSpeaker(null)}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-16 px-6 bg-gray-900 text-white">
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
                {['Home', 'Tracks', 'Agenda', 'Venue'].map((link) => (
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
          
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          .animate-modalSlideIn {
            animation: modalSlideIn 0.3s ease-out forwards;
          }
          
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default SpeakersPage;