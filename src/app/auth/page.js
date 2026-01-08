'use client'

import { useState } from 'react'
// Make sure this path matches where you put your supabaseClient.js file
import { supabase } from '@/lib/supabaseClient' 

export default function AuthPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // 1. Google Login Handler
  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          // Supabase handles the redirect to this URL automatically
          redirectTo: `${window.location.origin}/auth/callback`, 
        },
      })
      if (error) throw error
    } catch (error) {
      alert('Error logging in with Google: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // 2. Email Login Handler
  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      alert(error.message)
    } else {
      // ✅ UPDATED: Automatically redirect to dashboard on success
      window.location.href = '/dashboard' 
    }
    setLoading(false)
  }

  // 3. Email Sign Up Handler
  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Redirect here after they click the email confirmation link
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    })
    
    if (error) {
      alert(error.message)
    } else {
      alert('Success! Check your email for the confirmation link.')
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen bg-[#0f0e17] text-white font-sans">
      {/* Left Side: Branding */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 p-12 bg-[#0f0e17]">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Transform Your <br />
          <span className="text-[#a78bfa]">Career Journey</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-md">
          Join thousands of students who've landed their dream jobs.
        </p>
      </div>

      {/* Right Side: Auth Card */}
      <div className="flex items-center justify-center w-full lg:w-1/2 bg-[#0f0e17] p-4">
        <div className="bg-[#16161e] p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">
          
          <h2 className="text-3xl font-bold mb-2 text-white">Ready to Start?</h2>
          <p className="text-gray-400 mb-8">Sign in to continue your journey</p>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black font-semibold py-3 rounded-xl transition-all duration-200 mb-6"
          >
            {/* Google Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="px-4 text-gray-500 text-sm font-medium">OR EMAIL</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          {/* Email Form */}
          <form className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1f1f2e] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a78bfa] focus:border-transparent text-white placeholder-gray-500 transition-all"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#1f1f2e] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a78bfa] focus:border-transparent text-white placeholder-gray-500 transition-all"
                required
              />
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleEmailLogin}
                disabled={loading}
                className="flex-1 bg-[#6d28d9] hover:bg-[#5b21b6] text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(109,40,217,0.3)] hover:shadow-[0_0_30px_rgba(109,40,217,0.5)]"
              >
                {loading ? 'Processing...' : 'Sign In'}
              </button>
              
              <button
                onClick={handleSignUp}
                disabled={loading}
                className="flex-1 bg-transparent border border-[#6d28d9] text-[#a78bfa] hover:bg-[#6d28d9] hover:text-white font-semibold py-3 rounded-xl transition-all duration-200"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center text-gray-500 text-xs mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>

        </div>
      </div>
    </div>
  )
}