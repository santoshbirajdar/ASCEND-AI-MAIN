'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [full_name, setFullName] = useState('')
  const [target_role, setTargetRole] = useState('')
  const router = useRouter()

  useEffect(() => {
    // 1. Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) getProfile(session.user.id)
      else router.push('/auth')
    })
  }, [router])

  // 2. Fetch User Data
  async function getProfile(userId) {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, target_role')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setFullName(data.full_name || '')
        setTargetRole(data.target_role || '')
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }

  // 3. Update User Data
  async function updateProfile() {
    try {
      setLoading(true)
      const { error } = await supabase.from('profiles').upsert({
        id: session.user.id,
        full_name,
        target_role,
        updated_at: new Date(),
      })

      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  if (!session) return <div className="p-10 text-white">Loading...</div>

  return (
    <div className="min-h-screen bg-[#0f0e17] text-white p-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        <div className="bg-[#16161e] p-8 rounded-xl border border-gray-800 space-y-6">
          
          <div>
            <label className="block text-gray-400 mb-2">Email</label>
            <input 
              type="text" 
              value={session.user.email} 
              disabled 
              className="w-full p-3 rounded bg-[#0f0e17] text-gray-500 border border-gray-700 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Full Name</label>
            <input 
              type="text" 
              value={full_name} 
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 rounded bg-[#2a2a35] text-white border border-gray-600 focus:border-[#a78bfa] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Target Job Role</label>
            <input 
              type="text" 
              value={target_role} 
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Software Engineer"
              className="w-full p-3 rounded bg-[#2a2a35] text-white border border-gray-600 focus:border-[#a78bfa] focus:outline-none"
            />
          </div>

          <button 
            onClick={updateProfile} 
            disabled={loading}
            className="w-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white py-3 rounded font-semibold transition"
          >
            {loading ? 'Saving...' : 'Update Profile'}
          </button>

          <button onClick={() => supabase.auth.signOut()} className="w-full text-sm text-gray-500 hover:text-white mt-4">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}