'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Rings() {
  const groupRef = useRef<THREE.Group>(null)
  
  const rings = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      radius: 15 + i * 5,
      color: new THREE.Color().setHSL(0.6 + i * 0.05, 0.8, 0.5),
      opacity: 0.3 - i * 0.05,
      rotationSpeed: {
        x: 0.003 * (i + 1) * 0.3,
        y: 0.003 * (i + 1) * 0.2,
        z: 0.001 * (i + 1) * 0.1,
      },
    }))
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((ring, index) => {
        ring.rotation.x += rings[index].rotationSpeed.x
        ring.rotation.y += rings[index].rotationSpeed.y
        ring.rotation.z += rings[index].rotationSpeed.z
      })
    }
  })

  return (
    <group ref={groupRef}>
      {rings.map((ring, index) => (
        <mesh key={index} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
          <torusGeometry args={[ring.radius, 0.2, 16, 100]} />
          <meshBasicMaterial
            color={ring.color}
            wireframe
            transparent
            opacity={ring.opacity}
          />
        </mesh>
      ))}
    </group>
  )
}

function Particles() {
  const ref = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const particleCount = 500
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const radius = 30 + Math.random() * 50
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      colors[i3] = 0.5 + Math.random() * 0.5
      colors[i3 + 1] = 0.8 + Math.random() * 0.2
      colors[i3 + 2] = 1
    }

    return [positions, colors]
  }, [])

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0005
    }
  })

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        size={0.6}
        vertexColors
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </Points>
  )
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={['#000000', 1, 1500]} />
      <Rings />
      <Particles />
    </>
  )
}

export default function HologramBackground() {
  const [stableSize, setStableSize] = useState({ width: 0, height: 0 })
  
  useEffect(() => {
    // 初回のサイズを記録し、一定時間内の変更は無視する
    const setInitialSize = () => {
      setStableSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    // 初回サイズ設定
    setInitialSize()
    
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      // 大きなサイズ変更（画面回転など）の場合のみ更新
      resizeTimer = setTimeout(() => {
        const widthDiff = Math.abs(window.innerWidth - stableSize.width)
        const heightDiff = Math.abs(window.innerHeight - stableSize.height)
        
        // 幅の変更が大きい場合、または高さの変更が20%以上の場合のみ更新
        if (widthDiff > 100 || heightDiff > stableSize.height * 0.2) {
          setStableSize({
            width: window.innerWidth,
            height: window.innerHeight
          })
        }
      }, 300)
    }
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [stableSize.width, stableSize.height])
  
  if (stableSize.width === 0 || stableSize.height === 0) {
    return null
  }
  
  return (
    <div className="fixed inset-0 -z-10">
      <div 
        style={{ 
          width: `${stableSize.width}px`, 
          height: `${stableSize.height}px`,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
          <Scene />
        </Canvas>
      </div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/60 pointer-events-none" />
    </div>
  )
}