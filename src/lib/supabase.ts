// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pvweddnxybjvhagylwtq.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2d2VkZG54eWJqdmhhZ3lsd3RxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzc5NDkzOSwiZXhwIjoyMDczMzcwOTM5fQ.PXm_5XkB2xslm3ZX01rJS6A4aGefIZoay-lCcYLmtEQ'

// Use service role for all operations since we're bypassing auth
export const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Simple password hashing function (for demo - in production use proper bcrypt)
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'aspire2025_salt')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

// Types
interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  company?: string
  jobTitle?: string
  phone?: string
}

// Custom table-based authentication
export const authService = {
  async register(userData: RegisterData) {
    try {
      const { firstName, lastName, email, password, company = '', jobTitle = '', phone = '' } = userData

      if (!firstName || !lastName || !email || !password) {
        throw new Error('Please provide first name, last name, email, and password')
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long')
      }

      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('email', email.toLowerCase())
        .single()

      if (existingUser) {
        throw new Error('User with this email already exists')
      }

      // Hash password
      const passwordHash = await hashPassword(password)

      // Create user in user_profiles table
      const { data: user, error } = await supabase
        .from('user_profiles')
        .insert([{
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.toLowerCase().trim(),
          password_hash: passwordHash,
          company: company.trim(),
          job_title: jobTitle.trim(),
          phone: phone.trim()
        }])
        .select()
        .single()

      if (error) throw error

      return {
        success: true,
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          company: user.company,
          jobTitle: user.job_title,
          phone: user.phone,
          registeredSessions: []
        }
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  async login(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new Error('Please provide email and password')
      }

      // Get user from user_profiles table
      const { data: user, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('email', email.toLowerCase())
        .single()

      if (error || !user) {
        throw new Error('Invalid email or password')
      }

      // Verify password
      const isValidPassword = await verifyPassword(password, user.password_hash)
      if (!isValidPassword) {
        throw new Error('Invalid email or password')
      }

      // Get registered sessions
      const { data: sessions } = await supabase
        .from('registered_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('registered_at', { ascending: false })

      const registeredSessions = sessions?.map(session => ({
        sessionId: session.session_id,
        sessionTitle: session.session_title,
        track: session.track,
        time: session.time
      })) || []

      return {
        success: true,
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          company: user.company,
          jobTitle: user.job_title,
          phone: user.phone,
          registeredSessions
        }
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Invalid email or password'
      }
    }
  },

  async getCurrentUser() {
    try {
      // Get user ID from localStorage
      const userData = localStorage.getItem('user')
      if (!userData) {
        return { success: false, error: 'No authenticated user' }
      }

      const user = JSON.parse(userData)
      
      // Refresh user data from database
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) {
        return { success: false, error: 'Failed to load user profile' }
      }

      // Get registered sessions
      const { data: sessions } = await supabase
        .from('registered_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('registered_at', { ascending: false })

      const registeredSessions = sessions?.map(session => ({
        sessionId: session.session_id,
        sessionTitle: session.session_title,
        track: session.track,
        time: session.time
      })) || []

      return {
        success: true,
        user: {
          id: profile.id,
          firstName: profile.first_name,
          lastName: profile.last_name,
          email: profile.email,
          company: profile.company,
          jobTitle: profile.job_title,
          phone: profile.phone,
          registeredSessions
        }
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  async registerSession(sessionData: {sessionId: string, sessionTitle: string, track?: string, time?: string}) {
    try {
      // Get user ID from localStorage
      const userData = localStorage.getItem('user')
      if (!userData) {
        throw new Error('Not authenticated')
      }

      const user = JSON.parse(userData)
      const { sessionId, sessionTitle, track, time } = sessionData

      if (!sessionId || !sessionTitle) {
        throw new Error('Session ID and title are required')
      }

      // Check if already registered
      const { data: existing } = await supabase
        .from('registered_sessions')
        .select('id')
        .eq('user_id', user.id)
        .eq('session_id', sessionId)
        .single()

      if (existing) {
        throw new Error('Already registered for this session')
      }

      // Insert new registration
      const { error } = await supabase
        .from('registered_sessions')
        .insert([{
          user_id: user.id,
          session_id: sessionId,
          session_title: sessionTitle,
          track: track || '',
          time: time || ''
        }])

      if (error) throw error

      // Get updated sessions
      const { data: sessions } = await supabase
        .from('registered_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('registered_at', { ascending: false })

      const registeredSessions = sessions?.map(session => ({
        sessionId: session.session_id,
        sessionTitle: session.session_title,
        track: session.track,
        time: session.time
      })) || []

      return {
        success: true,
        registeredSessions
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  async unregisterSession(sessionId: string) {
    try {
      // Get user ID from localStorage
      const userData = localStorage.getItem('user')
      if (!userData) {
        throw new Error('Not authenticated')
      }

      const user = JSON.parse(userData)

      const { error } = await supabase
        .from('registered_sessions')
        .delete()
        .eq('user_id', user.id)
        .eq('session_id', sessionId)

      if (error) throw error

      // Get updated sessions
      const { data: sessions } = await supabase
        .from('registered_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('registered_at', { ascending: false })

      const registeredSessions = sessions?.map(session => ({
        sessionId: session.session_id,
        sessionTitle: session.session_title,
        track: session.track,
        time: session.time
      })) || []

      return {
        success: true,
        registeredSessions
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}