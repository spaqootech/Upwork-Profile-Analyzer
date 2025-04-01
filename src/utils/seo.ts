export const SEO_CONFIG = {
  defaultTitle: 'Upwork Profile Analyzer | AI-Powered Profile Optimization',
  titleTemplate: '%s | Upwork Profile Analyzer',
  description: 'Transform your Upwork profile with AI-powered analysis. Get detailed insights, SEO recommendations, and competitor analysis to boost your freelancing success.',
  canonical: 'https://upwork-profile-analyzer.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://upwork-profile-analyzer.vercel.app',
    site_name: 'Upwork Profile Analyzer',
    title: 'AI-Powered Upwork Profile Analyzer',
    description: 'Transform your Upwork profile from invisible to irresistible with AI-powered analysis and optimization.',
    images: [
      {
        url: 'https://upwork-profile-analyzer.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Upwork Profile Analyzer',
      }
    ]
  },
  twitter: {
    handle: '@spaqoo_tech',
    site: '@spaqoo_tech',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'upwork profile analyzer, freelancer profile optimization, upwork seo, freelancer success, ai profile analysis, upwork tips, freelance optimization, upwork success, profile improvement, freelancer analytics'
    },
    {
      name: 'author',
      content: 'Spaqoo Tech'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5'
    }
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico'
    },
    {
      rel: 'manifest',
      href: '/manifest.json'
    }
  ]
} 