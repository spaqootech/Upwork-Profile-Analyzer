'use client'

import { useState } from 'react'

interface ProposalTemplate {
  jobType: string
  template: string
}

export default function ProposalGenerator() {
  const [jobDescription, setJobDescription] = useState('')
  const [generatedProposal, setGeneratedProposal] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    // Simulate proposal generation (replace with actual API call)
    setTimeout(() => {
      setGeneratedProposal(`Dear [Client Name],

I noticed your project requirements for [Project Type] and I'm confident I can deliver exceptional results. With [X] years of experience in similar projects, I've successfully completed [relevant achievement].

[Job-specific value proposition based on requirements]

Key highlights of my expertise:
• [Relevant skill/experience 1]
• [Relevant skill/experience 2]
• [Relevant achievement/metric]

I'd love to discuss how I can help you achieve your project goals. Let's schedule a call to discuss the details.

Best regards,
[Your Name]`)
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Proposal Generator</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
          <form onSubmit={handleGenerate}>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-black"
              required
            />
            <button
              type="submit"
              disabled={isGenerating}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate Proposal'}
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Generated Proposal</h3>
          {generatedProposal ? (
            <div className="bg-gray-50 p-4 rounded-lg h-48 overflow-auto">
              <pre className="whitespace-pre-wrap text-gray-700 font-sans">{generatedProposal}</pre>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg h-48 flex items-center justify-center text-gray-500">
              Generated proposal will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 