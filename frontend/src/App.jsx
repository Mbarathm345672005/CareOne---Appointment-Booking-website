import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Treatments from './pages/Treatments'
import AboutUs from './pages/AboutUs'
import PatientResults from './pages/PatientResults'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import BookingModal from './components/BookingModal'

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

function AppContent() {
  const [showBooking, setShowBooking] = useState(false)
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // Don't show header/footer on login and admin pages
  const isAdminPage = location.pathname.startsWith('/admin')
  const isLoginPage = location.pathname === '/login'

  if (isLoginPage) {
    return <Login />
  }

  if (isAdminPage) {
    return (
      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen bg-mesh text-on-surface font-body-md flex flex-col">
      <Header onBookClick={() => setShowBooking(true)} navigate={navigate} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onBookClick={() => setShowBooking(true)} />} />
          <Route path="/treatments" element={<Treatments onBookClick={() => setShowBooking(true)} />} />
          <Route path="/about" element={<AboutUs onBookClick={() => setShowBooking(true)} />} />
          <Route path="/patient-results" element={<PatientResults onBookClick={() => setShowBooking(true)} />} />
        </Routes>
      </main>
      <Footer />
      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
    </div>
  )
}

function Header({ onBookClick, navigate }) {
  const { user } = useAuth()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/')
    window.location.reload()
  }

  return (
    <header className="bg-surface/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-outline-variant/20">
      <nav className="flex justify-between items-center max-w-container-max mx-auto px-6 md:px-8 py-4">
        <Link to="/" className="text-2xl font-bold text-primary">Care One</Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-primary border-b-2 border-primary pb-1 font-semibold">Home</Link>
          <Link to="/treatments" className="text-on-surface-variant hover:text-primary transition">Treatments</Link>
          <Link to="/about" className="text-on-surface-variant hover:text-primary transition">About Us</Link>
          <Link to="/patient-results" className="text-on-surface-variant hover:text-primary transition">Patient Results</Link>
        </div>
        <div className="flex items-center gap-4">
          {user && user.type === 'admin' && (
            <Link to="/admin/dashboard" className="text-primary font-semibold hover:underline">
              Admin Panel
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-on-surface-variant hidden sm:inline">Hi, {user.name.split(' ')[0]}</span>
              <button
                onClick={handleLogout}
                className="bg-error/10 text-error px-4 py-2 rounded-lg hover:bg-error/20 transition text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onBookClick}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
              >
                Book Appointment
              </button>
              <Link
                to="/login"
                className="text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary/5 transition"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-container-max mx-auto px-6 md:px-8 py-16">
        <div className="space-y-6">
          <div className="text-2xl font-bold text-primary">Care One</div>
          <p className="text-on-surface-variant text-sm">Providing world-class clinical excellence in skin and hair care.</p>
        </div>
        <div>
          <h4 className="font-bold text-on-surface mb-6">Treatments</h4>
          <ul className="space-y-3 text-sm text-on-surface-variant">
            <li><a href="#" className="hover:text-primary">Hair Restoration</a></li>
            <li><a href="#" className="hover:text-primary">Skin Rejuvenation</a></li>
            <li><a href="#" className="hover:text-primary">Laser Therapy</a></li>
            <li><a href="#" className="hover:text-primary">Advanced Aesthetics</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-on-surface mb-6">Support</h4>
          <ul className="space-y-3 text-sm text-on-surface-variant">
            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary">FAQs</a></li>
            <li><a href="#" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-on-surface mb-6">Location</h4>
          <p className="text-xs text-on-surface-variant">123 Clinical Way, Wellness District<br/>City Center, SC 56789</p>
        </div>
      </div>
      <div className="border-t border-outline-variant/10 py-6 text-center">
        <p className="text-xs text-on-surface-variant">© 2024 Care One Clinical Excellence. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default App
