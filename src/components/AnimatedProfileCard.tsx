'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

interface Achievement {
  title: string
  description: string
  year: string
  link?: string
}

interface ProfileCardProps {
  name: string
  title: string
  bio: string
  skills: string[]
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  imageUrl?: string
  achievements?: Achievement[]
  contactEmail?: string
}

export default function AnimatedProfileCard({
  name,
  title,
  bio,
  skills,
  socialLinks,
  imageUrl,
  achievements,
  contactEmail
}: ProfileCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleSections, setVisibleSections] = useState({
    achievements: false,
    contact: false
  })
  const [visibleAchievements, setVisibleAchievements] = useState<boolean[]>([])
  
  const achievementsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (achievements) {
      setVisibleAchievements(new Array(achievements.length).fill(false))
    }
  }, [achievements])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'achievements') {
              setVisibleSections(prev => ({ ...prev, achievements: true }))
            } else if (entry.target.id === 'contact') {
              setVisibleSections(prev => ({ ...prev, contact: true }))
            } else if (entry.target.id.startsWith('achievement-')) {
              const index = parseInt(entry.target.id.split('-')[1])
              setVisibleAchievements(prev => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    if (achievementsRef.current) observer.observe(achievementsRef.current)
    if (contactRef.current) observer.observe(contactRef.current)
    
    // Observe each achievement item
    achievements?.forEach((_, index) => {
      const element = document.getElementById(`achievement-${index}`)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [achievements, contactEmail])

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="p-10 md:p-16 max-w-2xl w-full">
        <div className="flex flex-col items-center">
          
          <h1 
            className={`text-4xl md:text-5xl font-light text-white/80 mb-3 tracking-wider text-center transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ textShadow: '0 0 15px rgba(100, 200, 255, 0.4), 0 0 30px rgba(100, 200, 255, 0.2), 0 2px 4px rgba(0, 0, 0, 0.8)' }}
          >
            {name}
          </h1>
          
          <p 
            className={`text-lg md:text-xl text-white/70 mb-8 tracking-wide text-center transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ textShadow: '0 0 10px rgba(100, 200, 255, 0.3), 0 2px 4px rgba(0, 0, 0, 0.8)' }}
          >
            {title}
          </p>
          
          <p 
            className={`text-base md:text-lg leading-relaxed text-white/75 text-center mb-10 max-w-lg transition-all duration-1000 delay-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'}`}
            style={{ textShadow: '0 0 8px rgba(100, 200, 255, 0.3), 0 2px 4px rgba(0, 0, 0, 0.8)' }}
          >
            {bio}
          </p>
          
          <div className={`flex flex-wrap gap-3 justify-center mb-10 transition-all duration-1000 delay-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {skills.map((skill, index) => (
              <span
                key={skill}
                className={`bg-cyan-400/15 backdrop-blur-sm border border-cyan-400/30 px-5 py-2 rounded-full text-sm text-white/80 hover:bg-cyan-400/25 hover:border-cyan-400/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300`}
                style={{ 
                  textShadow: '0 0 6px rgba(100, 200, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.8)',
                  animationDelay: `${1200 + index * 100}ms`
                }}
              >
                {skill}
              </span>
            ))}
          </div>
          
          <div className={`flex gap-5 transition-all duration-1000 delay-[1500ms] ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white/80 hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 bg-white/5 hover:scale-110"
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white/80 hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 bg-white/5 hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white/80 hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 bg-white/5 hover:scale-110"
                aria-label="Twitter"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
            )}
          </div>
          
          {/* 実績セクション */}
          {achievements && achievements.length > 0 && (
            <div 
              ref={achievementsRef}
              id="achievements"
              className="mt-16 w-full"
            >
              <h2 className={`text-2xl font-light text-white/80 mb-8 text-center tracking-wider transition-all duration-700 ${visibleSections.achievements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ textShadow: '0 0 12px rgba(100, 200, 255, 0.4), 0 2px 4px rgba(0, 0, 0, 0.8)' }}>実績</h2>
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    id={`achievement-${index}`}
                    className={`p-6 transition-all duration-700 hover:scale-[1.02] ${visibleAchievements[index] ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-white/85" style={{ textShadow: '0 0 8px rgba(100, 200, 255, 0.3), 0 2px 3px rgba(0, 0, 0, 0.8)' }}>{achievement.title}</h3>
                      <span className="text-sm text-cyan-300/70" style={{ textShadow: '0 0 6px rgba(100, 200, 255, 0.4), 0 1px 2px rgba(0, 0, 0, 0.8)' }}>{achievement.year}</span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed" style={{ textShadow: '0 0 6px rgba(100, 200, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.8)' }}>{achievement.description}</p>
                    {achievement.link && (
                      <a
                        href={achievement.link}
                        className="inline-flex items-center gap-2 mt-3 text-cyan-400/80 hover:text-cyan-300/80 text-sm transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        詳細を見る
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 依頼・コンタクトセクション */}
          {contactEmail && (
            <div 
              ref={contactRef}
              id="contact"
              className="mt-16 w-full text-center"
            >
              <h2 className={`text-2xl font-light text-white/80 mb-6 tracking-wider transition-all duration-700 ${visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ textShadow: '0 0 12px rgba(100, 200, 255, 0.4), 0 2px 4px rgba(0, 0, 0, 0.8)' }}>お仕事のご依頼</h2>
              <p className={`text-white/70 mb-6 transition-all duration-700 delay-200 ${visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ textShadow: '0 0 8px rgba(100, 200, 255, 0.3), 0 2px 3px rgba(0, 0, 0, 0.8)' }}>
                プロジェクトのご相談・ご依頼は下記よりお気軽にお問い合わせください
              </p>
              <a
                href={`mailto:${contactEmail}`}
                className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:from-cyan-400 hover:to-blue-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-400/30 hover:scale-105 transition-all duration-700 ${
                  visibleSections.contact ? 'animate-bounce-in opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                style={{
                  animationDelay: '0.5s',
                  animationFillMode: 'both'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
                メールでお問い合わせ
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}