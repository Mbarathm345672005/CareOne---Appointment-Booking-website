import React from 'react'
import { useState } from 'react'

export default function BookingModal({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Hair Restoration',
    date: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const services = ['Hair Restoration', 'Laser Therapy', 'Skin Rejuvenation', 'Chemical Peels', 'Micro-needling']

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const payload = {
        fullName: form.name,
        email: form.email,
        phone: form.phone,
        treatment: form.service,
        preferredDate: form.date,
        notes: form.message
      }
      
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')).token : ''}`
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()

      if (!response.ok) throw new Error(data.message || 'Failed to book')

      setStatus({ type: 'success', message: '✅ Appointment booked! We\'ll contact you soon.' })
      setTimeout(() => onClose(), 2000)
    } catch (error) {
      setStatus({ type: 'error', message: `❌ ${error.message}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-on-surface">Book Appointment</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required
              className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required
              className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
              className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Service</label>
            <select name="service" value={form.service} onChange={handleChange}
              className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary">
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Preferred Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange}
              className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Message (optional)</label>
            <textarea name="message" value={form.message} onChange={handleChange}
              className="w-full border border-outline p-3 rounded-lg focus:outline-none focus:border-primary h-24"></textarea>
          </div>

          {status && (
            <div className={`p-3 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>
              {status.message}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50">
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  )
}
