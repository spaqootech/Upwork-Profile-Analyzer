import { Metadata } from 'next'
import ProfileAnalyzer from '@/components/ProfileAnalyzer'

export const metadata: Metadata = {
  title: 'Upwork Profile Analyzer | Optimize Your Freelancer Profile',
  description: 'Analyze and optimize your Upwork profile for better visibility and success. Get detailed insights and recommendations to improve your freelancer profile.',
  keywords: 'upwork profile analyzer, freelancer profile optimization, upwork profile tips, freelancer success',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        
        <ProfileAnalyzer />
      </div>
    </main>
  )
}
