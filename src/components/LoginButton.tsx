'use client'

import { useAuth } from '../context/AuthContext'

const LoginButton = () => {
  const { signInWithGoogle } = useAuth()
  return (
    <button onClick={signInWithGoogle} className="bg-blue-600 text-white px-4 py-2 rounded">
      Sign in with Google
    </button>
  )
}

export default LoginButton
