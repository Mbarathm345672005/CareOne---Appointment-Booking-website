import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  
  const [appointments, setAppointments] = useState([])
  const [pages, setPages] = useState([])
  const [settings, setSettings] = useState({
    clinicName: '',
    email: '',
    phone: '',
    city: ''
  })
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const getAuthToken = () => {
    const data = localStorage.getItem('authToken')
    if (data) {
      try {
        return JSON.parse(data).token
      } catch (e) { return null }
    }
    return null
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const headers = {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
      
      const [aptRes, pagesRes, setRes] = await Promise.all([
        fetch('/api/appointments', { headers }),
        fetch('/api/content', { headers }),
        fetch('/api/settings', { headers }).catch(() => ({ json: () => ({ success: false }) })) // Settings might not exist yet
      ])
      
      const aptData = await aptRes.json()
      const pagesData = await pagesRes.json()
      const setData = await setRes.json()
      
      if (aptData.success) setAppointments(aptData.appointments || [])
      if (pagesData.success) setPages(pagesData.pages || [])
      if (setData.success) setSettings(setData.settings || {})
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  const updateAppointmentStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({ status })
      })
      const data = await res.json()
      if (data.success) {
        setAppointments(prev => prev.map(apt => apt.id === id ? data.appointment : apt))
      }
    } catch (error) {
      console.error('Error updating appointment:', error)
    }
  }

  const handleSettingsChange = (e) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const saveSettings = async () => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(settings)
      })
      const data = await res.json()
      if (data.success) {
        alert('Settings saved successfully!')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Failed to save settings.')
    }
  }

  const adminName = 'Admin User'

  const pendingAppointments = appointments.filter(a => a.status === 'Pending').length
  const totalAppointments = appointments.length

  return (
    <div className="min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-surface-container-low border-r border-outline-variant p-6 flex flex-col">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-primary mb-1">Care One</h1>
          <p className="text-sm text-on-surface-variant">Clinic Administration</p>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard Overview', icon: 'dashboard' },
            { id: 'appointments', label: 'Patient Appointments', icon: 'calendar_month' },
            { id: 'content', label: 'Content Management', icon: 'edit_note' },
            { id: 'settings', label: 'Settings', icon: 'settings' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id
                  ? 'bg-primary/10 text-primary font-semibold border-r-4 border-primary'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 bg-primary text-white py-3 px-4 rounded-lg hover:opacity-90 transition"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b border-outline-variant sticky top-0 z-40 h-16 flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-2xl font-bold text-primary">Care One Admin</h2>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-1.5 rounded-full border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-3 border-l border-outline-variant pl-6">
              <div className="text-right">
                <p className="text-sm font-semibold text-on-surface">{adminName}</p>
                <p className="text-xs text-on-surface-variant">Super Admin</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1537368310025-700d6d9b22d3?auto=format&fit=crop&w=40&q=80"
                alt="Admin"
                className="w-10 h-10 rounded-full border-2 border-primary object-cover"
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-on-surface-variant">Loading...</p>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-on-surface mb-2">Dashboard Overview</h3>
                    <p className="text-on-surface-variant">Welcome back! Here's your clinic overview.</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid md:grid-cols-4 gap-6 mb-10">
                    {[
                      { label: 'Total Appointments', value: totalAppointments.toString(), icon: '📅', color: 'primary' },
                      { label: 'This Month', value: totalAppointments.toString(), icon: '📊', color: 'secondary' },
                      { label: 'Pending', value: pendingAppointments.toString(), icon: '⏳', color: 'tertiary' },
                      { label: 'Conversion Rate', value: '85%', icon: '✨', color: 'primary' },
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm hover:shadow-md transition">
                        <p className="text-on-surface-variant text-sm font-semibold mb-2">{stat.label}</p>
                        <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                        <p className="text-xs text-green-600">↑ Trending up</p>
                      </div>
                    ))}
                  </div>

                  {/* Upcoming Appointments */}
                  <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-outline-variant flex items-center justify-between">
                      <h4 className="text-xl font-bold text-on-surface">Recent Appointments</h4>
                      <button className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
                        <span className="material-symbols-outlined text-sm">add</span>
                        New Appointment
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-surface-container-low">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">Patient Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">Service</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">Date</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                          {appointments.slice(0, 5).map(apt => (
                            <tr key={apt.id} className="hover:bg-surface-container-low transition">
                              <td className="px-6 py-4">
                                <div>
                                  <p className="font-semibold text-on-surface">{apt.name}</p>
                                  <p className="text-xs text-on-surface-variant">{apt.phone}</p>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-on-surface-variant">{apt.service}</td>
                              <td className="px-6 py-4 text-on-surface">{apt.date}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                  apt.status === 'Confirmed'
                                    ? 'bg-green-100 text-green-800'
                                    : apt.status === 'Rejected' 
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {apt.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {appointments.length === 0 && (
                        <div className="p-6 text-center text-on-surface-variant">No appointments found.</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appointments' && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-on-surface mb-2">Patient Appointments</h3>
                    <p className="text-on-surface-variant">Manage and track all patient appointments.</p>
                  </div>

                  <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-outline-variant flex items-center justify-between">
                      <h4 className="text-xl font-bold text-on-surface">All Appointments</h4>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-surface-container-low rounded transition">
                          <span className="material-symbols-outlined">filter_list</span>
                        </button>
                        <button className="p-2 hover:bg-surface-container-low rounded transition">
                          <span className="material-symbols-outlined">download</span>
                        </button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-surface-container-low">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">Patient</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">Service</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">Date & Time</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">Status</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-on-surface-variant">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                          {appointments.map(apt => (
                            <tr key={apt.id} className="hover:bg-surface-container-low transition">
                              <td className="px-6 py-4">
                                <p className="font-semibold text-on-surface">{apt.name}</p>
                                <p className="text-xs text-on-surface-variant">{apt.email}</p>
                              </td>
                              <td className="px-6 py-4 text-on-surface-variant">{apt.service}</td>
                              <td className="px-6 py-4">{apt.date}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                  apt.status === 'Confirmed'
                                    ? 'bg-green-100 text-green-800'
                                    : apt.status === 'Rejected' 
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {apt.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right space-x-2">
                                {apt.status === 'Pending' && (
                                  <>
                                    <button onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')} className="text-green-600 hover:underline text-sm font-semibold">Confirm</button>
                                    <button onClick={() => updateAppointmentStatus(apt.id, 'Rejected')} className="text-red-600 hover:underline text-sm font-semibold">Reject</button>
                                  </>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {appointments.length === 0 && (
                        <div className="p-6 text-center text-on-surface-variant">No appointments found.</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-on-surface mb-2">Content Management</h3>
                    <p className="text-on-surface-variant">Manage your clinic's website pages and content.</p>
                  </div>

                  {/* Content Stats */}
                  <div className="grid md:grid-cols-4 gap-6 mb-10">
                    {[
                      { label: 'Total Pages', value: pages.length.toString(), change: '+0 this month' },
                      { label: 'Live Content', value: pages.filter(p => p.status === 'Published').length.toString(), change: 'Active' },
                      { label: 'Drafts', value: pages.filter(p => p.status !== 'Published').length.toString(), change: 'In progress' },
                      { label: 'Avg. Load Time', value: '1.2s', change: '⚡ Fast' },
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm">
                        <p className="text-on-surface-variant text-xs font-semibold mb-2 uppercase">{stat.label}</p>
                        <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                        <p className="text-xs text-on-surface-variant">{stat.change}</p>
                      </div>
                    ))}
                  </div>

                  {/* Pages Directory */}
                  <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-outline-variant">
                      <h4 className="text-xl font-bold text-on-surface">Website Directory</h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-surface-container-low">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">Page Title</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">URL Path</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-on-surface-variant">Last Updated</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-on-surface-variant">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant">
                          {pages.map((page, idx) => (
                            <tr key={idx} className="hover:bg-surface-container-low transition">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <span className="material-symbols-outlined text-primary">description</span>
                                  <div>
                                    <p className="font-semibold text-on-surface">{page.title}</p>
                                    <p className="text-xs text-on-surface-variant">Published page</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-on-surface-variant font-mono text-sm">{page.path}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                  page.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {page.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-on-surface-variant">{page.date}</td>
                              <td className="px-6 py-4 text-right space-x-2">
                                <button className="text-primary hover:underline text-sm">Edit</button>
                                <button className="text-on-surface-variant hover:text-on-surface text-sm">Preview</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {pages.length === 0 && (
                        <div className="p-6 text-center text-on-surface-variant">No pages found.</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-on-surface mb-2">Settings</h3>
                    <p className="text-on-surface-variant">Manage clinic configuration and preferences.</p>
                  </div>

                  <div className="space-y-6">
                    {/* Clinic Info */}
                    <div className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm">
                      <h4 className="text-lg font-bold text-on-surface mb-4">Clinic Information</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-on-surface mb-2">Clinic Name</label>
                          <input type="text" name="clinicName" value={settings.clinicName || ''} onChange={handleSettingsChange} className="w-full px-4 py-2 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-on-surface mb-2">Email</label>
                          <input type="email" name="email" value={settings.email || ''} onChange={handleSettingsChange} className="w-full px-4 py-2 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-on-surface mb-2">Phone</label>
                          <input type="tel" name="phone" value={settings.phone || ''} onChange={handleSettingsChange} className="w-full px-4 py-2 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-on-surface mb-2">City</label>
                          <input type="text" name="city" value={settings.city || ''} onChange={handleSettingsChange} className="w-full px-4 py-2 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                      </div>
                      <button onClick={saveSettings} className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition">Save Changes</button>
                    </div>

                    {/* Security */}
                    <div className="bg-white rounded-xl border border-outline-variant p-6 shadow-sm">
                      <h5 className="font-bold text-on-surface mb-2">Admin Security</h5>
                      <p className="text-on-surface-variant text-sm mb-4">Last login: Today at 10:45 AM. Two-factor authentication is active.</p>
                      <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition">Change Password</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
