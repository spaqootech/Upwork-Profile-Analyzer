'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import ProposalGenerator from './ProposalGenerator'
import ProfileViewer from './ProfileViewer'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface ProfileSection {
  title: string
  content: string
  score: number
  improvements: string[]
  tips: string[]
  visualGuide?: {
    image: string
    highlights: {
      x: number
      y: number
      text: string
      type: 'improvement' | 'good' | 'warning'
    }[]
  }
}

interface CompetitorProfile {
  name: string
  title: string
  hourlyRate: number
  jobSuccess: number
  totalEarnings: number
  skills: string[]
  profileUrl: string
}

interface KeywordAnalysis {
  keyword: string
  relevance: number
  competition: number
  usage: number
  suggestions: string[]
}

interface ProfileMetrics {
  visibility: number
  completeness: number
  optimization: number
  engagement: number
  conversion: number
}

type DeviceType = 'mobile' | 'tablet' | 'desktop'

interface DeviceCompatibility {
  [key: string]: boolean | string[]
  mobile: boolean
  tablet: boolean
  desktop: boolean
  issues: string[]
}

interface Analysis {
  overview: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  niche: string;
  competitors: Competitor[];
  metrics: {
    visibility: number;
    completeness: number;
    optimization: number;
    engagement: number;
    conversion: number;
  };
  deviceCompatibility: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
    issues: string[];
  };
  sections: ProfileSection[];
  nicheSpecific: {
    marketDemand: number;
    competition: number;
    keywords: string[];
  };
  stats: {
    profileViews: number;
    clientInvites: number;
    searchRanking: number;
  };
  score: number;
}

interface Competitor {
  name: string;
  hourlyRate: number;
  successRate: number;
  skills: string[];
}

interface AnalysisResponse {
  success: boolean;
  data?: Analysis;
  error?: string;
}

const mockProfileData = {
  name: "John Developer",
  title: "Full Stack Developer | React & Node.js Expert",
  hourlyRate: 85,
  totalEarnings: 150000,
  jobSuccess: 98,
  location: "United States",
  overview: `Experienced Full Stack Developer with 8+ years of expertise in building scalable web applications. Specialized in React.js, Node.js, and cloud technologies.

Key Achievements:
• Delivered 50+ successful projects with 100% client satisfaction
• Maintained 98% job success rate across 100+ contracts
• Expert in performance optimization and modern web technologies`,
  skills: [
    "React.js",
    "Node.js",
    "TypeScript",
    "AWS",
    "MongoDB",
    "GraphQL",
    "Next.js",
    "Docker"
  ],
  portfolioItems: [
    {
      title: "E-commerce Platform",
      description: "Built a full-featured e-commerce platform with React, Node.js, and AWS",
      imageUrl: "/images/portfolio/ecommerce.png"
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "Developed a real-time analytics dashboard using React and WebSocket",
      imageUrl: "/images/portfolio/dashboard.png"
    }
  ],
  workHistory: [
    {
      title: "Full Stack Development for SaaS Platform",
      rating: 5,
      feedback: "John is an exceptional developer. Delivered high-quality work ahead of schedule.",
      earnings: 15000,
      duration: "3 months"
    },
    {
      title: "E-commerce Website Development",
      rating: 5,
      feedback: "Outstanding work! John exceeded all expectations.",
      earnings: 12000,
      duration: "2 months"
    }
  ],
  badges: [
    "Top Rated Plus",
    "Rising Talent",
    "100% Job Success",
    "Expert Vetted"
  ]
}

export default function ProfileAnalyzer() {
  const [profileUrl, setProfileUrl] = useState('')
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeFeature, setActiveFeature] = useState('analyzer')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showProposalGenerator, setShowProposalGenerator] = useState(false)
  const [showProfileViewer, setShowProfileViewer] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
      setIsScrolled(position > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const analyzeProfile = async () => {
    try {
      setIsAnalyzing(true)
      setError(null)
      // Simulate API call
      const response: AnalysisResponse = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              overview: "Experienced Full Stack Developer with expertise in modern web technologies...",
              strengths: [
                "Strong technical skills in React and Node.js",
                "Excellent communication and project management",
                "Proven track record of successful projects"
              ],
              weaknesses: [
                "Limited experience with cloud platforms",
                "Could improve documentation practices"
              ],
              recommendations: [
                "Add more cloud platform certifications",
                "Include more detailed project descriptions"
              ],
              niche: "Full Stack Development",
              competitors: [
                {
                  name: "John Doe",
                  hourlyRate: 45,
                  successRate: 98,
                  skills: ["React", "Node.js", "AWS"]
                }
              ],
              metrics: {
                visibility: 95,
                completeness: 85,
                optimization: 90,
                engagement: 80,
                conversion: 75
              },
              deviceCompatibility: {
                mobile: true,
                tablet: true,
                desktop: true,
                issues: []
              },
              sections: [],
              nicheSpecific: {
                marketDemand: 85,
                competition: 65,
                keywords: ["React", "Node.js", "TypeScript"]
              },
              stats: {
                profileViews: 150,
                clientInvites: 12,
                searchRanking: 8
              },
              score: 85
            }
          })
        }, 1500)
      })

      if (response.success && response.data) {
        setAnalysis(response.data)
      } else {
        setError(response.error || 'Failed to analyze profile')
      }
    } catch (err) {
      setError('An error occurred while analyzing the profile')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const navItems = [
    {
      id: 'analyzer',
      label: 'Profile Analyzer',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      description: 'AI-powered profile analysis and scoring'
    },
    {
      id: 'seo',
      label: 'SEO Optimizer',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      ),
      description: 'Optimize your profile visibility'
    },
    {
      id: 'proposal',
      label: 'AI Proposal Writer',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      description: 'Generate winning proposals instantly'
    },
    {
      id: 'preview',
      label: 'Profile Preview',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      description: 'See how clients view your profile'
    }
  ]

  return (
    <>
      <Head>
        <title>Upwork Profile Analyzer | AI-Powered Profile Optimization</title>
        <meta name="description" content="Optimize your Upwork profile with our AI-powered analyzer. Get detailed insights, SEO recommendations, and competitor analysis to boost your freelancing success." />
        <meta name="keywords" content="upwork profile analyzer, freelancer profile optimization, upwork seo, freelancer success, ai profile analysis" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Upwork Profile Analyzer | AI-Powered Profile Optimization" />
        <meta property="og:description" content="Transform your Upwork profile from invisible to irresistible with our AI-powered analyzer." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://your-domain.com/profile-analyzer" />
      </Head>

      {/* Modern Animated Navbar */}
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: scrollPosition > 50 ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
          backdropFilter: scrollPosition > 50 ? 'blur(10px)' : 'none',
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollPosition > 50 ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="cursor-pointer">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Profile Analyzer
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setActiveFeature(item.id as any)
                    if (item.id === 'proposal') setShowProposalGenerator(true)
                    if (item.id === 'preview') setShowProfileViewer(true)
                  }}
                  className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    activeFeature === item.id
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {activeFeature === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </motion.button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-4"
              >
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setActiveFeature(item.id as any)
                      setIsMenuOpen(false)
                      if (item.id === 'proposal') setShowProposalGenerator(true)
                      if (item.id === 'preview') setShowProfileViewer(true)
                    }}
                    className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 ${
                      activeFeature === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.icon}
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-16">
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-block p-2 px-4 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-4">
                Powered by Advanced AI
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Upwork Profile Analyzer
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Transform your Upwork profile from invisible to irresistible with our AI-powered analyzer. Get detailed insights and recommendations to improve your freelancer profile.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  98% Success Rate
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  5000+ Profiles Optimized
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  AI-Powered Analysis
                </div>
              </div>
            </div>

            {/* Main Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="url"
                      value={profileUrl}
                      onChange={(e) => setProfileUrl(e.target.value)}
                      placeholder="Enter your Upwork profile URL"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-black"
                      required
                    />
                  </div>
                  <button
                    onClick={analyzeProfile}
                    disabled={isAnalyzing}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Analyze Profile
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Content */}
            {activeFeature === 'proposal' && showProposalGenerator && <ProposalGenerator />}
            
            {activeFeature === 'preview' && showProfileViewer && (
              <div className="mb-8">
                <ProfileViewer profileData={mockProfileData} />
              </div>
            )}

            {/* New Quick Analysis Panel */}
            {analysis && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {Object.entries(analysis.metrics).map(([metric, value]) => (
                    <div key={metric} className="text-center p-4 rounded-lg bg-gray-50">
                      <div className="text-3xl font-bold text-blue-600">{value}%</div>
                      <div className="text-gray-600 capitalize">{metric}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Keyword Analysis Section */}
            {analysis && activeTab === 'keywords' && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Keyword Analysis</h2>
                <div className="grid gap-6">
                  {analysis.nicheSpecific.keywords.map((keyword: string, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-gray-900">{keyword}</span>
                      </div>
                      <div className="space-y-2">
                        {analysis.recommendations.map((suggestion: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-gray-600">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Device Compatibility Check */}
            {analysis && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Device Compatibility</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(['mobile', 'tablet', 'desktop'] as DeviceType[]).map((device) => (
                    <div key={device} className="text-center">
                      <div className={`text-4xl mb-2 ${analysis.deviceCompatibility[device] ? 'text-green-500' : 'text-red-500'}`}>
                        {analysis.deviceCompatibility[device] ? '✓' : '✗'}
                      </div>
                      <div className="text-gray-900 capitalize">{device}</div>
                    </div>
                  ))}
                </div>
                {analysis.deviceCompatibility.issues.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Issues to Address:</h3>
                    <ul className="space-y-2">
                      {analysis.deviceCompatibility.issues.map((issue, index) => (
                        <li key={index} className="flex items-center gap-2 text-red-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Analysis Results */}
            {analysis && (
              <div className="space-y-8 animate-fade-in">
                {/* Overall Score & Stats */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600">{analysis.score}</div>
                      <div className="text-gray-600">Overall Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600">{analysis.stats.profileViews}</div>
                      <div className="text-gray-600">Profile Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-600">{analysis.stats.clientInvites}</div>
                      <div className="text-gray-600">Client Invites</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-orange-600">{analysis.stats.searchRanking}</div>
                      <div className="text-gray-600">Search Ranking</div>
                    </div>
                  </div>
                </div>

                {/* Profile Sections */}
                <div className="space-y-6">
                  {analysis.sections.map((section, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div 
                        className="p-6 cursor-pointer hover:bg-gray-50"
                        onClick={() => setActiveSection(activeSection === section.title ? null : section.title)}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                          <div className="flex items-center gap-2">
                            <div className="text-2xl font-bold text-blue-600">{section.score}</div>
                            <div className="text-gray-600">/ 100</div>
                          </div>
                        </div>
                      </div>

                      {activeSection === section.title && (
                        <div className="border-t border-gray-200 p-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Current Content</h4>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-700">{section.content}</p>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Improvements Needed</h4>
                              <ul className="space-y-2">
                                {section.improvements.map((improvement, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-red-500">•</span>
                                    <span className="text-gray-700">{improvement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Pro Tips</h4>
                              <ul className="space-y-2">
                                {section.tips.map((tip, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="text-blue-500">•</span>
                                    <span className="text-gray-700">{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {section.visualGuide && (
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">Visual Guide</h4>
                                <div className="relative">
                                  <Image
                                    src={section.visualGuide.image}
                                    alt={`${section.title} visual guide`}
                                    width={400}
                                    height={300}
                                    className="rounded-lg"
                                  />
                                  {section.visualGuide.highlights.map((highlight, idx) => (
                                    <div
                                      key={idx}
                                      className={`absolute w-4 h-4 rounded-full ${
                                        highlight.type === 'improvement' ? 'bg-red-500' :
                                        highlight.type === 'good' ? 'bg-green-500' : 'bg-yellow-500'
                                      }`}
                                      style={{ left: `${highlight.x}%`, top: `${highlight.y}%` }}
                                    >
                                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow-lg text-sm">
                                        {highlight.text}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Niche Analysis */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Niche Analysis</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Market Insights</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-700">Market Demand</span>
                            <span className="text-gray-900">{analysis.nicheSpecific.marketDemand}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${analysis.nicheSpecific.marketDemand}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-700">Competition Level</span>
                            <span className="text-gray-900">{analysis.nicheSpecific.competition}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full"
                              style={{ width: `${analysis.nicheSpecific.competition}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.nicheSpecific.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Competitor Analysis */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Competitors in Your Niche</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {analysis.competitors.map((competitor, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{competitor.name}</h3>
                            <p className="text-gray-600">{competitor.title}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">${competitor.hourlyRate}/hr</div>
                            <div className="text-sm text-gray-500">
                              {competitor.successRate}% Success Rate
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="text-sm text-gray-600 mb-1">Total Earnings</div>
                          <div className="font-semibold">${competitor.totalEarnings.toLocaleString()}</div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {competitor.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <a
                          href={competitor.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 text-blue-600 hover:underline block text-sm"
                        >
                          View Profile →
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Freelancers Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Top Upwork Freelancers</h2>
                    <a
                      href="https://www.linkedin.com/in/spaqoo-tech/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#004182] transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      Connect on LinkedIn
                    </a>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Top Freelancer 1 */}
                    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                          JD
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">John Doe</h3>
                          <p className="text-gray-600">Full Stack Developer</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Success Rate</span>
                          <span className="font-semibold text-green-600">100%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Earnings</span>
                          <span className="font-semibold">$500k+</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Hourly Rate</span>
                          <span className="font-semibold">$150/hr</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Node.js</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">AWS</span>
                      </div>
                      <a href="#" className="text-blue-600 hover:underline text-sm">View Profile Analysis →</a>
                    </div>

                    {/* Top Freelancer 2 */}
                    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold">
                          AS
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Alice Smith</h3>
                          <p className="text-gray-600">UI/UX Designer</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Success Rate</span>
                          <span className="font-semibold text-green-600">98%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Earnings</span>
                          <span className="font-semibold">$300k+</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Hourly Rate</span>
                          <span className="font-semibold">$120/hr</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Figma</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">UI Design</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">UX Research</span>
                      </div>
                      <a href="#" className="text-blue-600 hover:underline text-sm">View Profile Analysis →</a>
                    </div>

                    {/* Top Freelancer 3 */}
                    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                          RJ
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Robert Johnson</h3>
                          <p className="text-gray-600">DevOps Engineer</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Success Rate</span>
                          <span className="font-semibold text-green-600">99%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Earnings</span>
                          <span className="font-semibold">$400k+</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Hourly Rate</span>
                          <span className="font-semibold">$135/hr</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Kubernetes</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Docker</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">AWS</span>
                      </div>
                      <a href="#" className="text-blue-600 hover:underline text-sm">View Profile Analysis →</a>
                    </div>
                  </div>

                  {/* LinkedIn CTA */}
                  <div className="mt-8 bg-gradient-to-r from-[#0A66C2] to-[#004182] rounded-xl p-8 text-white">
                    <div className="max-w-3xl mx-auto text-center">
                      <h3 className="text-2xl font-bold mb-4">Want Personalized Profile Analysis?</h3>
                      <p className="text-lg mb-6 opacity-90">
                        Connect with our experts on LinkedIn for a detailed analysis of your Upwork profile and personalized recommendations.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                          href="https://www.linkedin.com/in/spaqoo-tech/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0A66C2] rounded-lg hover:bg-gray-100 transition-all font-semibold"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          Connect with Us
                        </a>
                        <span className="text-sm opacity-75">
                          Average Response Time: <span className="font-semibold">24 hours</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
} 