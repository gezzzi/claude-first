'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import AnimatedProfileCard from '@/components/AnimatedProfileCard'

const HologramBackground = dynamic(() => import('@/components/HologramBackground'), {
  ssr: false,
})

export default function Home() {
  const [showContentOnly, setShowContentOnly] = useState(false)
  
  const profileData = {
    name: '山田 太郎',
    title: 'フルスタックエンジニア',
    bio: 'テクノロジーとクリエイティビティの融合に情熱を注ぐエンジニア。ユーザー体験を重視した革新的なWebアプリケーションの開発を得意としています。',
    skills: ['JavaScript', 'React', 'Node.js', 'Three.js', 'Python', 'AWS'],
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    achievements: [
      {
        title: 'オープンソースプロジェクト「ReactFlow」へのコントリビュート',
        description: 'ノードベースのUIライブラリにドラッグ&ドロップ機能を実装し、プロジェクトのコア機能改善に貢献。',
        year: '2023',
        link: 'https://github.com/reactflow/reactflow'
      },
      {
        title: 'Tech Conference 2023 登壇',
        description: '「マイクロフロントエンドアーキテクチャの実践」について講演。300名以上の参加者に技術知見を共有。',
        year: '2023'
      },
      {
        title: 'ECサイトリニューアルプロジェクト',
        description: '大手アパレル企業のECサイトをNext.jsで全面リニューアル。パフォーマンスを40%改善し、売上向上に貢献。',
        year: '2022'
      }
    ],
    contactEmail: 'contact@example.com'
  }

  return (
    <main className="relative min-h-screen">
      <HologramBackground />
      
      {/* Toggle Button */}
      <button
        onClick={() => setShowContentOnly(!showContentOnly)}
        className={`fixed top-6 right-6 z-20 px-4 py-2 rounded-full border transition-all duration-500 ${
          showContentOnly 
            ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-400 hover:bg-cyan-500/30' 
            : 'bg-black/30 border-white/20 text-white/80 hover:bg-black/40'
        } backdrop-blur-sm hover:scale-105`}
        aria-label={showContentOnly ? '3D背景のみ表示' : 'コンテンツを表示'}
      >
        <div className="flex items-center gap-2">
          {showContentOnly ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="text-sm hidden sm:inline">3D背景を見る</span>
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
              <span className="text-sm hidden sm:inline">コンテンツを隠す</span>
            </>
          )}
        </div>
      </button>
      
      {/* Content Layer */}
      <div className={`transition-all duration-700 ${
        showContentOnly ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'
      }`}>
        <AnimatedProfileCard {...profileData} />
      </div>
    </main>
  )
}