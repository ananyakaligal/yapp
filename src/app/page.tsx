'use client'

import { useAuth } from '../context/AuthContext'
import LoginButton from '../components/LoginButton'
import UserInfo from '../components/UserInfo'
import Link from 'next/link'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Welcome to Yapp!</h1>
      {user ? (
        <>
          <UserInfo />
          <Link href="/dashboard" className="text-blue-600 underline">
            Go to Dashboard
          </Link>
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  )
}

export default Home
