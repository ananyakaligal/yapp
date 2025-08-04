'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createClient } from '@supabase/supabase-js'
import { User } from '@supabase/supabase-js'
import { PrismaClient } from '@prisma/client'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const prisma = new PrismaClient()

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signInWithGoogle: () => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setIsLoading(false)

      if (user) addUserToDB(user) // 🔥 Add user on initial load
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null
      setUser(user)
      if (user) addUserToDB(user) // 🔥 Add user on login
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const addUserToDB = async (user: User) => {
    try {
      await fetch('/api/add-user', {
        method: 'POST',
        body: JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name,
          avatarUrl: user.user_metadata?.avatar_url,
        }),
      })
    } catch (error) {
      console.error('Error adding user to DB:', error)
    }
  }

  const signInWithGoogle = () => supabase.auth.signInWithOAuth({ provider: 'google' })
  const signOut = () => supabase.auth.signOut()

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
