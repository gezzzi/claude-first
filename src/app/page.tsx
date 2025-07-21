import dynamic from 'next/dynamic'
import AnimatedProfileCard from '@/components/AnimatedProfileCard'

const HologramBackground = dynamic(() => import('@/components/HologramBackground'), {
  ssr: false,
})

export default function Home() {
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
      <AnimatedProfileCard {...profileData} />
    </main>
  )
}