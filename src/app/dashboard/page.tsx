'use client'

import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Dashboard = () => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.push('/')
  }, [user, router])

  if (!user) return null

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-2xl font-bold">Dashboard</h2>
    </div>
  )
}

export default Dashboard
