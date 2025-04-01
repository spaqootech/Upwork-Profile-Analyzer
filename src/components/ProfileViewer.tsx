'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProfileData {
  name: string
  title: string
  hourlyRate: number
  totalEarnings: number
  jobSuccess: number
  location: string
  overview: string
  skills: string[]
  portfolioItems: {
    title: string
    description: string
    imageUrl: string
  }[]
  workHistory: {
    title: string
    rating: number
    feedback: string
    earnings: number
    duration: string
  }[]
  badges: string[]
}

export default function ProfileViewer({ profileData }: { profileData: ProfileData }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'history'>('overview')

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Profile Header */}
      <div className="bg-gray-50 p-6 border-b">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 relative rounded-full overflow-hidden bg-gray-200">
            <Image
              src="/images/profile-placeholder.png"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
            <p className="text-lg text-gray-600 mb-2">{profileData.title}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{profileData.location}</span>
              <span>•</span>
              <span>${profileData.hourlyRate}/hr</span>
              <span>•</span>
              <span>{profileData.jobSuccess}% Job Success</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              ${profileData.totalEarnings.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Earnings</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'overview'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'portfolio'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'history'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Work History
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{profileData.overview}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Badges</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-1"
                  >
                    <span>🏆</span>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="grid md:grid-cols-2 gap-6">
            {profileData.portfolioItems.map((item, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            {profileData.workHistory.map((job, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{job.title}</h4>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-gray-600">{job.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{job.feedback}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>${job.earnings.toLocaleString()} earned</span>
                  <span>•</span>
                  <span>{job.duration}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 