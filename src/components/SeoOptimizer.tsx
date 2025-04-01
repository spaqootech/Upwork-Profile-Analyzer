'use client'

import { useState } from 'react'

interface SeoSuggestion {
  type: 'keyword' | 'title' | 'overview' | 'skill'
  suggestion: string
  impact: 'high' | 'medium' | 'low'
  currentValue?: string
  recommendedValue?: string
}

export default function SeoOptimizer() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [suggestions, setSuggestions] = useState<SeoSuggestion[]>([])

  const handleOptimize = () => {
    setIsOptimizing(true)
    // Simulate API call
    setTimeout(() => {
      setSuggestions([
        {
          type: 'keyword',
          suggestion: 'Add more relevant keywords to increase visibility',
          impact: 'high',
          currentValue: 'React, Node.js',
          recommendedValue: 'React.js, Node.js, TypeScript, Full Stack Development, API Development'
        },
        {
          type: 'title',
          suggestion: 'Optimize your profile title for better search ranking',
          impact: 'high',
          currentValue: 'Full Stack Developer',
          recommendedValue: 'Senior Full Stack Developer | React.js & Node.js Expert | API Specialist'
        },
        {
          type: 'overview',
          suggestion: 'Enhance your overview with more searchable terms',
          impact: 'medium',
          currentValue: 'Experienced developer...',
          recommendedValue: 'Expert Full Stack Developer with 8+ years of experience...'
        }
      ])
      setIsOptimizing(false)
    }, 2000)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">AI SEO Optimization</h2>
          <p className="text-gray-600">
            Our AI analyzes your profile and suggests optimizations to improve your visibility in Upwork search results
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleOptimize}
            disabled={isOptimizing}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isOptimizing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Optimizing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Optimize SEO
              </>
            )}
          </button>
        </div>

        {suggestions.length > 0 && (
          <div className="space-y-6">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)} Optimization
                    </h3>
                    <p className="text-gray-600">{suggestion.suggestion}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    suggestion.impact === 'high' 
                      ? 'bg-red-100 text-red-700'
                      : suggestion.impact === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                  }`}>
                    {suggestion.impact.toUpperCase()} Impact
                  </span>
                </div>

                {suggestion.currentValue && suggestion.recommendedValue && (
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Current Value:</div>
                      <div className="p-2 bg-gray-50 rounded text-gray-700">{suggestion.currentValue}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Recommended Value:</div>
                      <div className="p-2 bg-green-50 rounded text-green-700">{suggestion.recommendedValue}</div>
                    </div>
                  </div>
                )}

                <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Apply Optimization →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 