export default function AboutUs({ onBookClick }) {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-container-max mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <div className="text-label-md text-primary mb-2">About Care One</div>
            <h1 className="text-5xl md:text-6xl font-bold text-on-surface mb-6 font-headline-xl">
              Your Trusted Partner in Clinical Excellence
            </h1>
            <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
              Since 2015, Care One has been pioneering advanced dermatological treatments with a commitment to excellence, safety, and patient transformation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-surface rounded-2xl p-8 shadow-sm border border-outline-variant/20">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-on-surface-variant">Successful Treatments Monthly</p>
            </div>
            <div className="bg-surface rounded-2xl p-8 shadow-sm border border-outline-variant/20">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-on-surface-variant">Patient Satisfaction Rate</p>
            </div>
            <div className="bg-surface rounded-2xl p-8 shadow-sm border border-outline-variant/20">
              <div className="text-4xl font-bold text-primary mb-2">2000+</div>
              <p className="text-on-surface-variant">Happy Patients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-on-surface mb-6 font-headline-xl">Our Story</h2>
            <p className="text-on-surface-variant mb-4 leading-relaxed">
              Founded in 2015, Care One emerged from a vision to bring world-class dermatological treatments to our community. Our founder, Dr. Rajesh Kumar, spent years in advanced training with leading clinics internationally before establishing this center of excellence.
            </p>
            <p className="text-on-surface-variant mb-4 leading-relaxed">
              What started as a single clinic with 3 staff members has grown into a comprehensive aesthetic and dermatological center with cutting-edge technology and a team of 15+ specialists.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              Today, we're proud to serve over 2,000 satisfied patients and maintain the highest standards of clinical care, patient safety, and aesthetic outcomes.
            </p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1576091160695-112396e5fc4f?auto=format&fit=crop&w=500&q=80" 
            alt="Our Clinic" 
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-on-surface mb-4 font-headline-xl">Meet Our Expert Team</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Our dermatologists and aestheticians bring decades of combined experience and passion for transforming lives.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Rajesh Kumar',
                title: 'Founder & Chief Dermatologist',
                expertise: 'Advanced Hair Restoration, Laser Therapy',
                image: 'https://images.unsplash.com/photo-1537368310025-700d6d9b22d3?auto=format&fit=crop&w=400&q=80'
              },
              {
                name: 'Dr. Priya Sharma',
                title: 'Senior Aesthetician',
                expertise: 'Chemical Peels, Skin Rejuvenation',
                image: 'https://images.unsplash.com/photo-1527529482379-91f2883627e9?auto=format&fit=crop&w=400&q=80'
              },
              {
                name: 'Dr. Amit Patel',
                title: 'Laser Specialist',
                expertise: 'Fractional Resurfacing, Hair Removal',
                image: 'https://images.unsplash.com/photo-1535713566543-ab7e9c2b5908?auto=format&fit=crop&w=400&q=80'
              }
            ].map((member, idx) => (
              <div key={idx} className="bg-surface rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-md transition">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-on-surface mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-semibold mb-3">{member.title}</p>
                  <p className="text-on-surface-variant text-sm">{member.expertise}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-6 md:px-8">
          <h2 className="text-4xl font-bold text-on-surface mb-12 text-center font-headline-xl">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '✓', title: 'Excellence', desc: 'Highest standards in every treatment' },
              { icon: '❤', title: 'Compassion', desc: 'Patient-centered care always' },
              { icon: '🔬', title: 'Innovation', desc: 'Latest technologies and techniques' },
              { icon: '🛡️', title: 'Safety', desc: 'Rigorous protocols and certification' }
            ].map((value, idx) => (
              <div key={idx} className="text-center p-6 rounded-xl hover:bg-primary/5 transition">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-on-surface mb-2">{value.title}</h3>
                <p className="text-on-surface-variant">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-container-max mx-auto px-6 md:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-headline-xl">Ready to Experience Care One?</h2>
          <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
            Schedule your consultation with one of our experts and discover how we can help you look and feel your best.
          </p>
          <button 
            onClick={onBookClick}
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Book Your Consultation
          </button>
        </div>
      </section>
    </main>
  )
}
