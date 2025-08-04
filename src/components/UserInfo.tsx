'use client'

import { useAuth } from '../context/AuthContext'
import { User } from '@supabase/supabase-js'

const UserInfo = () => {
  const { user, signOut } = useAuth()

  if (!user) return null

  return (
    <div className="flex items-center gap-4">
      <img
        src={user.user_metadata?.avatar_url}
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="text-sm font-medium">
          {user.user_metadata?.name || user.email}
        </p>
        <button
          onClick={signOut}
          className="text-red-500 text-sm hover:underline"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}

export default UserInfo
