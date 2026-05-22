import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [userType, setUserType] = useState('user')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // Check role matches userType selection (optional but good for UX)
      if (userType === 'admin' && data.role !== 'admin') {
        throw new Error('Not authorized as admin')
      }

      // Save token and user info via auth context
      login({
        token: data.token,
        type: data.role,
        email: data.email,
        name: data.name,
        loginTime: new Date().toISOString()
      })

      if (data.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/')
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-2">Care One</h1>
          <p className="text-on-surface-variant">Clinical Excellence in Skin & Hair</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface rounded-2xl shadow-lg border border-outline-variant/20 p-8">
          {/* User Type Selector */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setUserType('user')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                userType === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => setUserType('admin')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                userType === 'admin'
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={userType === 'admin' ? 'admin@careone.com' : 'your@email.com'}
                className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {userType === 'admin' && (
                <p className="text-xs text-on-surface-variant mt-2"></p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-error/10 border border-error/30 rounded-lg text-error text-sm">
                {error}
              </div>
            )}

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-on-surface-variant">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline">Forgot password?</a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-outline-variant"></div>
            <span className="text-on-surface-variant text-sm">or</span>
            <div className="flex-1 h-px bg-outline-variant"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-on-surface-variant text-sm">
            Don't have an account?{' '}
            <a href="#" className="text-primary font-semibold hover:underline">
              Create one
            </a>
          </p>
        </div>

       
      </div>
    </div>
  )
}
