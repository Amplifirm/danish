import { useState } from 'react';
import { Calendar, MapPin, Users, ArrowRight, Play, CheckCircle, TrendingUp, DollarSign, Zap, Shield, ChevronRight, X } from 'lucide-react';

import ProfessionalFooter from '../components/Footer';

// Type definitions
interface Session {
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
  bgColor: string;
  description: string;
  fullDescription: string;
  keyTopics: string[];
  sessions: Session[];
  outcomes: string[];
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
}

const HomePage = () => {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  

  const tracks: Track[] = [
    {
      id: 1,
      title: "Drive Revenue",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "#D514FF",
      bgColor: "bg-gray-100",
      description: "AI integration, customer success strategies, and growth optimization",
      fullDescription: "Discover innovative strategies to accelerate business growth through cutting-edge technology and customer-centric approaches. Learn how AI can transform your sales processes, how to build exceptional customer success programs, and implement growth optimization techniques that deliver measurable results.",
      keyTopics: ["AI Integration", "Customer Success", "E365 Implementation", "Growth Optimization"],
      sessions: [
        {
          title: "FC Motown: How the little guy can succeed in business and sport",
          speaker: "Dan Karosen",
          time: "10:25 AM - 10:50 AM",
          description: "Discover how FC Motown rose from local play to NPSL National Championship through bold leadership and vision."
        },
        {
          title: "AI Readiness Assessment",
          speaker: "Bryan Antepara", 
          time: "11:00 AM - 11:25 AM",
          description: "Essential concepts and processes to implement AI successfully in your organization."
        },
        {
          title: "How Customer Success Can Supercharge Your Revenue",
          speaker: "Brindavani Pathuri",
          time: "11:30 AM - 11:55 AM",
          description: "How building stronger customer relationships directly fuels growth and retention."
        },
        {
          title: "Doing Business with the Public Sector",
          speaker: "Paul Muir",
          time: "1:00 PM - 1:50 PM", 
          description: "Navigate government procurement processes and build relationships with municipalities."
        },
        {
          title: "The e365 Advantage: Streamlined Services for Small Business Growth",
          speaker: "Bryan Antepara",
          time: "2:00 PM - 2:50 PM",
          description: "How e365 simplifies technology management and creates room for businesses to thrive."
        },
        {
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
      icon: <DollarSign className="w-6 h-6" />,
      color: "#00C6AC",
      bgColor: "bg-gray-100",
      description: "Cost optimization through modern cloud platforms and AI tools",
      fullDescription: "Master intelligent cost reduction without sacrificing quality or growth potential. Explore how modern cloud technologies and AI-powered tools can streamline operations, reduce overhead, and optimize resource allocation for maximum efficiency.",
      keyTopics: ["Cloud Migration", "AI Cost Reduction", "Compliance Optimization", "Vendor Management"],
      sessions: [
        {
          title: "Do More with Less - How Technology is the Best Anti-Inflation Tool",
          speaker: "Nirvan Ramoutar",
          time: "10:25 AM - 10:50 AM", 
          description: "Technologies and systems that deliver immediate impact—helping you cut costs, protect margins, and stay competitive."
        },
        {
          title: "Creating an IT Strategy with Microsoft that Works for your Business",
          speaker: "Deep Ranipa",
          time: "11:00 AM - 11:25 AM",
          description: "How Microsoft Dynamics 365 can streamline operations while keeping Excel integration seamless."
        },
        {
          title: "Reduce your Telephone Operating Costs with Microsoft Teams", 
          speaker: "Bryan Antepara",
          time: "11:30 AM - 11:55 AM",
          description: "Cut phone system expenses by moving to Microsoft Teams with smooth migration strategies."
        },
        {
          title: "How to create an effective supplier audit to Keep Your Costs Under control",
          speaker: "Maria Scarmardo",
          time: "1:00 PM - 1:50 PM",
          description: "Structured audits to uncover inefficiencies, mitigate risks, and strengthen supplier relationships."
        },
        {
          title: "Smart Savings: A Practical Framework for Cutting Costs Without Cutting Corners",
          speaker: "Emory Edwards",
          time: "2:00 PM - 2:50 PM",
          description: "Practical strategies for reducing expenses while maintaining quality and performance."
        },
        {
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
      icon: <Zap className="w-6 h-6" />,
      color: "#00A1EF", 
      bgColor: "bg-gray-100",
      description: "Workflow automation and operational efficiency solutions",
      fullDescription: "Transform your business operations with advanced automation technologies and productivity optimization strategies. Learn how to eliminate bottlenecks, streamline workflows, and empower your team to focus on high-value activities that drive business growth.",
      keyTopics: ["Task Automation", "Remote Workflows", "Team Efficiency", "Digital Transformation"],
      sessions: [
        {
          title: "Navigating a Cloud Migration",
          speaker: "John Logan",
          time: "10:25 AM - 10:50 AM",
          description: "Break down the cloud migration process into clear, actionable steps for small businesses."
        },
        {
          title: "Unlocking Exceptional Profitability: How Firms Are Achieving Higher EBITDA Growth",
          speaker: "Shiva Kumar",
          time: "11:00 AM - 11:25 AM", 
          description: "Dynamics 365 solutions for Finance, Accounting, and Supply Chain Management challenges."
        },
        {
          title: "Digital Labor and Process Automation",
          speaker: "Deepanshu Negi",
          time: "11:30 AM - 11:55 AM",
          description: "How automation technologies reshape workflows and boost efficiency across industries."
        },
        {
          title: "The Productivity Paradox: When Technology Helps—and When It Doesn't",
          speaker: "Oya Tukel", 
          time: "1:00 PM - 1:50 PM",
          description: "Why new tools don't always translate into efficiency and when tech truly drives performance."
        },
        {
          title: "How Capital Can Improve Productivity",
          speaker: "Ryan Silvestre",
          time: "2:00 PM - 2:50 PM",
          description: "Strategic investment in resources, technology, and people to drive measurable efficiency gains."
        },
        {
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
      icon: <Shield className="w-6 h-6" />,
      color: "#4113FD",
      bgColor: "bg-gray-100", 
      description: "Advanced threat protection and data security strategies",
      fullDescription: "Build a robust cybersecurity framework that protects your business from evolving threats while enabling growth and innovation. Learn cutting-edge security strategies, threat intelligence, and risk management approaches tailored for small and medium businesses.",
      keyTopics: ["Ransomware Prevention", "Data Protection", "Security Innovation", "Threat Intelligence"],
      sessions: [
        {
          title: "Latest AI Security Threats",
          speaker: "John Williamson",
          time: "10:25 AM - 10:50 AM",
          description: "Latest update on evolving AI-based threats and how to protect SMBs successfully."
        },
        {
          title: "eCare Network Management",
          speaker: "Carl Mazzanti",
          time: "11:00 AM - 11:25 AM",
          description: "Proactive monitoring, rapid response, and expert support to reduce downtime and tighten security."
        },
        {
          title: "How to Keep Your Company Safe",
          speaker: "John Logan & Scott Bennet", 
          time: "11:30 AM - 11:55 AM",
          description: "Comprehensive disaster recovery planning including all departments and customer communications."
        },
        {
          title: "What is the Cybersecurity Outlook for 2025/26",
          speaker: "Scott Williamson",
          time: "1:00 PM - 1:50 PM",
          description: "Emerging threats, regulatory shifts, and defense strategies shaping the next two years."
        },
        {
          title: "Top 10 Cyber Security recommendations for Businesses Large and Small",
          speaker: "Carl Mazzanti",
          time: "2:00 PM - 2:50 PM",
          description: "Essential guidance for protecting organizations against today's evolving digital threats."
        },
        {
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

  const keynoteSpeeakers: Speaker[] = [
    {
      id: 'jack-alexy',
      name: 'Jack Alexy',
      title: 'Business Leader & Entrepreneur',
      company: 'Technology Executive',
      bio: 'Accomplished business leader with extensive experience in scaling technology companies.',
      fullBio: 'Jack Alexy is a seasoned technology executive with over 20 years of experience leading digital transformation initiatives at Fortune 500 companies. His expertise spans strategic planning, operational excellence, and technology adoption. Jack has successfully led multiple organizations through complex technology implementations, resulting in improved efficiency and significant cost savings. He specializes in helping SMBs navigate the rapidly evolving technology landscape.',
      expertise: ['Digital Transformation', 'Strategic Leadership', 'Technology Adoption', 'Business Strategy', 'Operational Excellence', 'Change Management'],
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
      bio: 'Serial entrepreneur who has built, scaled, and successfully sold three companies.',
      fullBio: 'Paul Centenari is a proven serial entrepreneur with a track record of building and scaling technology companies from startup to successful exit. Having founded and sold three companies with combined valuations exceeding $200M, Paul brings unique insights into the challenges and opportunities facing growing businesses. His experience spans software development, digital marketing, and business strategy, with a particular focus on helping SMBs leverage technology for competitive advantage.',
      expertise: ['Entrepreneurship', 'Business Growth', 'Technology Strategy', 'Exit Planning', 'Venture Capital', 'Scaling Operations'],
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

  return (
    <div className="min-h-screen bg-white font-roboto">
      
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-5">
              {/* Logo Section */}
              <div className="flex items-center space-x-14">
                <img 
                  src="/Screenshot_2025-09-12_at_23.22.22-removebg-preview.png" 
                  alt="ASPIRE 2025" 
                  className="h-24 w-auto"
                />
              </div>

             

              {/* Headline */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-6 font-roboto">
                  Transform Your Business Through Technology
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed font-roboto">
                  One-day conference for SMB leaders featuring <strong>24 expert sessions</strong> across 
                  <strong> four strategic tracks</strong>. Join <strong>150+ business executives</strong> at 
                  Microsoft Technology Center, NYC.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { num: '24', label: 'Sessions', color: '#B61BFD' },
                  { num: '4', label: 'Tracks', color: '#3C1AF9' },
                  { num: '150+', label: 'Attendees', color: '#2EA1ED' }
                ].map((stat, i) => (
                  <div key={i} className={`text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 animate-fadeInUp delay-${(i + 1) * 100}`}>
                    <div className="text-3xl font-bold mb-2 font-roboto" style={{color: stat.color}}>
                      {stat.num}
                    </div>
                    <div className="text-gray-600 font-medium font-roboto">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className="px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeInUp delay-400 transform hover:scale-105 font-roboto"
                  style={{background: 'linear-gradient(135deg, #3C1AF9, #B61BFD)'}}
                  onClick={() => window.location.href = '/register'}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>Register Now</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
                
                <button 
                  className="px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeInUp delay-500 transform hover:scale-105 font-roboto"
                  style={{background: 'linear-gradient(135deg, #1DC5AC, #2EA1ED)'}}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Watch Preview</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right - Event Details */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 animate-float mt-8">
              <div className="text-center mb-6">
                <span className="bg-white-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold animate-bounce-slow font-roboto">
                  LIMITED SEATING
                </span>
              </div>

              <div className="space-y-6 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-xl animate-fadeInUp delay-100">
                  <Calendar className="w-5 h-5" style={{color: '#2EA1ED'}} />
                  <div>
                    <div className="font-bold text-gray-900 font-roboto">October 15, 2025</div>
                    <div className="text-gray-600 text-sm font-roboto">9:00 AM - 5:00 PM EST</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-xl animate-fadeInUp delay-200">
                  <MapPin className="w-5 h-5" style={{color: '#2EA1ED'}} />
                  <div>
                    <div className="font-bold text-gray-900 font-roboto">Microsoft Technology Center</div>
                    <div className="text-gray-600 text-sm font-roboto">Times Square, NYC</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-xl animate-fadeInUp delay-300">
                  <Users className="w-5 h-5" style={{color: '#2EA1ED'}} />
                  <div>
                    <div className="font-bold text-gray-900 font-roboto">Networking Reception</div>
                    <div className="text-gray-600 text-sm font-roboto">5:30 PM - 7:30 PM</div>
                  </div>
                </div>
              </div>

              {/* Keynote Speakers - Side by Side Layout */}
              <div className="border-t border-gray-200 pt-6">
                <div className="text-center mb-6">
                  <span 
                    className="px-4 py-2 rounded-full text-sm font-bold animate-fadeInUp delay-400 font-roboto"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#3C1AF9'
                    }}
                  >
                    KEYNOTE SPEAKERS
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {keynoteSpeeakers.map((speaker, index) => (
                    <div 
                      key={speaker.id}
                      className={`bg-gray-100 rounded-xl p-4 cursor-pointer hover:bg-gray-200 transition-all duration-300 animate-fadeInUp delay-${500 + (index * 100)} transform hover:scale-105 shadow-lg hover:shadow-xl`}
                      onClick={() => setSelectedSpeaker(speaker)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border-2 shadow-md flex-shrink-0" style={{borderColor: '#3C1AF9'}}>
                          <img 
                            src={speaker.image} 
                            alt={speaker.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-bold text-gray-900 text-sm leading-tight font-roboto">{speaker.name}</h4>
                          <p className="text-sm font-medium mt-1 font-roboto" style={{color: '#3C1AF9'}}>{speaker.title}</p>
                          <p className="text-xs text-gray-600 font-roboto">{speaker.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <button 
                    className="w-full py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeInUp delay-700 transform hover:scale-105 font-roboto"
                    style={{background: 'linear-gradient(135deg, #3C1AF9, #B61BFD)'}}
                    onClick={() => window.location.href = '/register'}
                  >
                    Reserve Your Seat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's In It For You Section - Updated Content */}
<section className="py-20 px-6 bg-white">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-8 font-roboto">
      What is in it for you? <span 
        className="font-light bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        style={{
          background: 'linear-gradient(135deg, #3C1AF9, #B61BFD)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        Actionable Insights.
      </span>
    </h2>
    
    <div className="space-y-8 text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-5xl mx-auto font-roboto">
      <p>
        We will deliver ROI strategies, expert networking opportunities, a competitive 
        technology edge, and proven solutions you can implement Monday morning to 
        transform your business.
      </p>
      
      <p>
        Aspire 2025 is more than a conference—it's a launchpad for innovation, 
        collaboration, and transformation. This year's program is organized into four 
        dynamic tracks, each designed to empower attendees with actionable insights 
        and forward-thinking strategies.
      </p>
      
      <p>
        Today the roadmap for success is not clear. The economic landscape is changing 
        from tariffs to AI to Human Capital. Making the right decisions is harder now 
        than ever before.
      </p>
      
      <p className="text-2xl lg:text-3xl font-medium text-gray-900">
        Technology is the great equalizer.
      </p>
    </div>
  </div>
</section>

      {/* Our Proven 4-Track Approach - Updated with Black Line and No Numbers */}
<section className="py-20 px-6 bg-gradient-to-br from-gray-100 to-white">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-5xl font-light text-gray-900 mb-6 font-roboto">
        Our Proven <span 
          className="font-light bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-roboto"
          style={{
            background: 'linear-gradient(135deg, #3C1AF9, #B61BFD)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          4-track
        </span> Learning Approach
      </h2>
      <p className="text-xl text-gray-600 max-w-4xl mx-auto font-roboto">
        Whether you are looking to drive revenue, reduce expenses, increase operational efficiency or solidify your cybersecurity posture, you will find concrete information to help you and your organization take the next right step.
        
        We will not waste your time. Every session is strategically designed, expertly delivered, and continuously optimized for maximum business impact.
      </p>
    </div>

          {/* Visual Process Flow - Black Line */}
          <div className="relative mb-16">
            <div 
              className="absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 hidden lg:block bg-black"
            />
            
            <div className="grid lg:grid-cols-4 gap-8 relative">
              {tracks.map((track, index) => (
                <div 
                  key={track.id}
                  className="relative animate-fadeInUp cursor-pointer"
                  style={{animationDelay: `${index * 200}ms`}}
                  onClick={() => setSelectedTrack(track)}
                >
                  {/* Phase Circle - No Numbers, More Prominent Icons */}
                  <div className="relative mb-8 mx-auto w-20 h-20 lg:w-24 lg:h-24">
                    <div 
                      className="w-full h-full rounded-full flex items-center justify-center shadow-2xl relative z-10 text-white hover:scale-110 transition-all duration-300"
                      style={{backgroundColor: track.color}}
                    >
                      {track.icon}
                    </div>
                  </div>
                  
                  <div className={`${track.bgColor} rounded-3xl p-6 shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-roboto">
  {track.title}
</h3>
                    <p className="text-gray-600 leading-relaxed mb-4 font-roboto">
                      {track.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="text-sm font-light mb-2 font-roboto" style={{ color: track.color }}>
                        Key Focus: {track.keyTopics[0]} & {track.keyTopics[1]}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {track.keyTopics.slice(0, 3).map((topic, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4" style={{color: track.color}} />
                          <span className="text-sm text-gray-600 font-roboto">{topic}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
                      <span className="text-gray-600 font-light text-sm font-roboto">{track.sessions?.length || 0} Expert Sessions</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-gray-600 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100">
              <Users className="w-5 h-5" />
              <span className="font-light font-roboto">Mix and match sessions across all tracks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Updated Attendee Number */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-100 to-white rounded-3xl p-16 shadow-xl border border-gray-100">
            <h2 className="text-5xl font-light text-gray-900 mb-8 font-roboto">Ready to Transform Your Business?</h2>
            <p className="text-xl text-gray-700 mb-12 font-roboto">
              Join 150+ business leaders for a day of learning, networking, and growth 
              at Microsoft Technology Center.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {[
                '✓ Complimentary Admission',
                '✓ Lunch Included',
                '✓ Networking Reception', 
                
              ].map((feature, i) => (
                <div key={i} className="bg-green-50 rounded-2xl p-4 border border-green-200">
                  <span className="text-emerald-700 font-light text-sm font-roboto">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                className="px-12 py-4 text-white text-xl font-light rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-roboto"
                style={{background: 'linear-gradient(135deg, #3C1AF9, #B61BFD)'}}
                onClick={() => window.location.href = '/register'}
              >
                <div className="flex items-center justify-center space-x-3">
                  <span>Register Now - It's Free</span>
                  <CheckCircle className="w-6 h-6" />
                </div>
              </button>
              
              <button 
                className="px-12 py-4 text-white text-xl font-light rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-roboto"
                style={{background: 'linear-gradient(135deg, #1DC5AC, #2EA1ED)'}}
              >
                <div className="flex items-center justify-center space-x-3">
                  <span>View Agenda</span>
                  <Calendar className="w-6 h-6" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

    

      {/* Modals - Updated with Bold Titles */}
      {selectedTrack && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center space-x-4">
                <div 
                  className="p-4 rounded-xl text-white shadow-lg"
                  style={{backgroundColor: selectedTrack.color}}
                >
                  {selectedTrack.icon}
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-gray-900 font-roboto">{selectedTrack.title}</h3>
                  <p className="text-gray-600 font-roboto">{selectedTrack.sessions?.length || 0} Expert Sessions</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTrack(null)}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-light text-gray-900 mb-4 font-roboto">Track Overview</h4>
                  <p className="text-gray-700 leading-relaxed font-roboto text-lg">{selectedTrack.fullDescription}</p>
                </div>

                <div>
                  <h4 className="text-2xl font-light text-gray-900 mb-4 font-roboto">What You'll Achieve</h4>
                  <div className="space-y-3">
                    {selectedTrack.outcomes?.map((outcome, i) => (
                      <div key={i} className="flex items-start space-x-3 bg-green-50 rounded-2xl p-4 border border-green-200">
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{color: '#1DC5AC'}} />
                        <span className="text-gray-700 font-roboto">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl font-light text-gray-900 mb-4 font-roboto">Key Topics Covered</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedTrack.keyTopics?.map((topic, i) => (
                      <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-roboto font-light">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Sessions */}
              <div>
                <h4 className="text-2xl font-light text-gray-900 mb-4 font-roboto">Session Schedule</h4>
                <div className="space-y-4">
                  {selectedTrack.sessions?.map((session, i) => (
                    <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <h5 className="font-bold text-gray-900 font-roboto text-lg leading-tight">{session.title}</h5>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-roboto font-light">
                          {session.time}
                        </span>
                      </div>
                      <p className="text-sm font-light mb-2 font-roboto" style={{color: selectedTrack.color}}>
                        Speaker: {session.speaker}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed font-roboto">
                        {session.description}
                      </p>
                    </div>
                  )) || <p className="text-gray-500 font-roboto">No sessions available</p>}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 pt-6 border-t border-gray-200">
              <button 
                className="flex-1 py-4 text-white font-light rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-roboto text-lg"
                style={{background: `linear-gradient(135deg, ${selectedTrack.color}, #B61BFD)`}}
                onClick={() => window.location.href = '/register'}
              >
                Register for This Track
              </button>
              <button 
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-light rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-roboto"
                onClick={() => setSelectedTrack(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedSpeaker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modalSlideIn">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-start space-x-6">
                <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 shadow-xl" style={{borderColor: '#3C1AF9'}}>
                  <img 
                    src={selectedSpeaker.image} 
                    alt={selectedSpeaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-light text-gray-900 mb-2 font-roboto">{selectedSpeaker.name}</h3>
                  <p className="text-xl font-light mb-2 font-roboto" style={{color: '#3C1AF9'}}>{selectedSpeaker.title}</p>
                  <p className="text-gray-600 text-lg mb-4 font-roboto">{selectedSpeaker.company}</p>
                  <div className="bg-gray-50 rounded-2xl p-4 border-l-4" style={{borderColor: '#3C1AF9'}}>
                    <p className="text-gray-700 italic text-lg font-roboto">"{selectedSpeaker.quote}"</p>
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
                  <h4 className="text-xl font-light text-gray-900 mb-4 font-roboto">Biography</h4>
                  <p className="text-gray-700 leading-relaxed font-roboto">{selectedSpeaker.fullBio}</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-light text-gray-900 mb-4 font-roboto">Conference Sessions</h4>
                  <div className="space-y-3">
                    {selectedSpeaker.sessions?.map((session, i) => (
                      <div key={i} className="flex items-start space-x-3 bg-blue-50 rounded-2xl p-4 border border-blue-200">
                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#3C1AF9'}}></div>
                        <span className="text-gray-800 font-light font-roboto">{session}</span>
                      </div>
                    )) || <p className="text-gray-500 font-roboto">No sessions available</p>}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-light text-gray-900 mb-4 font-roboto">Areas of Expertise</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedSpeaker.expertise?.map((skill, i) => (
                      <div key={i} className="bg-gray-100 rounded-xl p-3 text-center">
                        <span className="text-gray-700 font-light text-sm font-roboto">{skill}</span>
                      </div>
                    )) || <p className="text-gray-500 font-roboto">No expertise available</p>}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-light text-gray-900 mb-4 font-roboto">Key Achievements</h4>
                  <div className="space-y-3">
                    {selectedSpeaker.achievements?.map((achievement, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{color: '#1DC5AC'}} />
                        <span className="text-gray-700 font-roboto">{achievement}</span>
                      </div>
                    )) || <p className="text-gray-500 font-roboto">No achievements available</p>}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-8 pt-8 border-t border-gray-200">
              <button 
                className="flex-1 py-4 text-white font-light rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-roboto"
                style={{background: 'linear-gradient(135deg, #3C1AF9, #B61BFD)'}}
                onClick={() => window.location.href = '/register'}
              >
                Register to See This Speaker
              </button>
              <button 
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-light rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-roboto"
                onClick={() => setSelectedSpeaker(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

<ProfessionalFooter/>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
          .font-roboto { font-family: 'Roboto', sans-serif; }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
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
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
              transform: translateY(0);
            }
            40%, 43% {
              transform: translateY(-10px);
            }
            70% {
              transform: translateY(-5px);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
          }
          
          .animate-slideInUp {
            animation: slideInUp 0.8s ease-out forwards;
            opacity: 0;
          }
          
          .animate-modalSlideIn {
            animation: modalSlideIn 0.3s ease-out forwards;
          }
          
          .animate-bounce-slow {
            animation: bounce 2s infinite;
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          /* Stagger animation delays */
          .delay-100 { animation-delay: 100ms; }
          .delay-200 { animation-delay: 200ms; }
          .delay-300 { animation-delay: 300ms; }
          .delay-400 { animation-delay: 400ms; }
          .delay-500 { animation-delay: 500ms; }
          .delay-600 { animation-delay: 600ms; }
          .delay-700 { animation-delay: 700ms; }
        `}
      </style>
    </div>
  );
};

export default HomePage;