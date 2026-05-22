import React from 'react'

export default function Home({ onBookClick }) {
  const services = [
    {
      icon: 'content_cut',
      title: 'Hair Restoration',
      desc: 'Advanced follicular treatments and regenerative therapies for natural hair growth.'
    },
    {
      icon: 'flare',
      title: 'Laser Therapy',
      desc: 'Targeted FDA-approved laser solutions for skin tightening and blemish removal.'
    },
    {
      icon: 'face_6',
      title: 'Skin Rejuvenation',
      desc: 'Deep hydration, chemical peels, and non-surgical anti-aging procedures.'
    }
  ]

  const steps = ['Book Appointment', 'Expert Consultation', 'Tailored Treatment', 'Glowing Results']

  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-secondary font-semibold uppercase tracking-wider">Redefining Aesthetics</span>
            <h1 className="text-5xl md:text-6xl font-bold">Expert Skin & Hair <span className="text-primary">Care You Can Trust</span></h1>
            <p className="text-lg text-on-surface-variant max-w-xl">
              Experience the perfect blend of clinical precision and aesthetic luxury. Our expert-led treatments are tailored to your unique journey.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={onBookClick} className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:-translate-y-1 transition">
                Start Your Journey
              </button>
              <a href="#services" className="border-2 border-outline text-on-surface px-8 py-4 rounded-lg hover:bg-surface-container transition">
                View Treatments
              </a>
            </div>
          </div>
          <div>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjnO3uC-FfZyaEEJXGXSzK6vHlgDY6f6tf1FuwLUuMADRuwP9WHwuj7qYxODS7LCBn7vQD67_iOSrZ_mXdvW3-PchasnWJOuyt7qa7lQ95tvIdXtnDxqSFaDNzLicEfc9H1TZ30oCrapvu7DB72n50JZN87LSpdk2dTRIOAV_NIA_SFrdOL8kpKJAQUnA7CtTFSUrDfS8AIxb9UAM8gFx9HnvBsN4zR0cFa2HYlGiZCUXMuWYDpoPvN7tqo95aLTldWj-3AogarA" alt="Care One" className="rounded-xl shadow-2xl w-full" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Your trusted partner for <span className="text-primary">transformative care.</span></h2>
            <p className="text-on-surface-variant mb-8">We blend cutting-edge technology with expert dermatology to ensure you leave feeling rejuvenated and empowered.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span className="font-semibold">FDA-Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span className="font-semibold">Custom Plans</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span className="font-semibold">Expert Staff</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span className="font-semibold">Post-Care</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWopbgodzo31C0vS93ZTpWwmR3CuQNUg_7DjYmgYPk_WyO__AB9ECXXYg1px_kJl8vYct0MXuDODaqzGN2FA9vaaMZSpZU0D7czEoB_UrHS3Fg-a3dgRNnVofTUHa60xGlZD6N8qD8j7hus6tZUL4JjKTuTyUBgfU4O4E9igai1n1v6P9JxAYJiq5DVtFLYjfqBq2sCeYRoGfbCSRlLrZJfKmR_xbbBEymrNlM6rDj4NQOTEB8591FX_7xLKvqu7qLtYjeMO49dQ" alt="Clinic" className="rounded-xl w-full h-64 object-cover" />
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_-8LJ54u7vn5LYdwg64DJVDtBw1XSzm6lHSNNhTLcpEK9xcrssn2lK5Kwo6dcR3yHSOx7xXOymysFzPPqw4huTAA4l93z4daceiw0cP37h4bRzI28FNynyBKagDHsMfZJGj8ZUu-mq49SZyXpNNQem0Qgyvocc6TUDoKjs7NoL6fvtH8WYXSpHDSgmcfc_bxMtEMx4LdZ9ApMpPJrz5cBK_PTzACYlverAZ-llcqB7_uXQOx1wrG3OJz-yOj8Lx12SX8lJ_WKzA" alt="Treatment" className="rounded-xl w-full h-64 object-cover" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-primary text-white">
        <div className="max-w-container-max mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Transformative Solutions for Your Best Self</h2>
            <div className="h-1 w-20 bg-secondary mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="bg-white p-8 rounded-xl group hover:bg-secondary transition-all transform hover:-translate-y-2 text-on-surface hover:text-white">
                <span className="material-symbols-outlined text-primary text-5xl group-hover:text-white mb-4 block">
                  {service.icon}
                </span>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-on-surface-variant group-hover:text-white/90 mb-6">{service.desc}</p>
                <a href={`/treatments#${service.title.toLowerCase().replace(' ', '-')}`} className="text-primary group-hover:text-white font-bold flex items-center gap-2">
                  Explore Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <span className="text-secondary font-semibold uppercase tracking-wider">Our Process</span>
            <h2 className="text-4xl font-bold mt-2">Your path to renewed confidence</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-surface-container rounded-full mx-auto flex items-center justify-center mb-6 hover:border-2 hover:border-primary transition">
                  <span className="text-2xl font-bold text-primary">0{i + 1}</span>
                </div>
                <h4 className="font-bold text-lg mb-2">{step}</h4>
                <p className="text-on-surface-variant text-sm">
                  {i === 0 && 'Schedule your visit easily online or by phone.'}
                  {i === 1 && 'Discuss your unique goals with our dermatology experts.'}
                  {i === 2 && 'Experience bespoke care designed for your specific skin type.'}
                  {i === 3 && 'Leave with radiant skin and newfound confidence.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <span className="text-secondary font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl font-bold mt-2">Real results from real patients</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-outline-variant/10">
                <div className="flex gap-1 text-secondary mb-4">
                  {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                </div>
                <p className="text-on-surface-variant italic mb-6">
                  {i === 0 && "The hair restoration therapy was life-changing. My confidence has skyrocketed."}
                  {i === 1 && "Professional and precise. The laser treatment was surprisingly comfortable."}
                  {i === 2 && "The chemical peels transformed my skin texture completely."}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-container/20 rounded-full"></div>
                  <div>
                    <h5 className="font-bold">{['Arun K.', 'Priya S.', 'Divya M.'][i]}</h5>
                    <p className="text-xs text-on-surface-variant">{['Hair Restoration', 'Laser Therapy', 'Skin Rejuvenation'][i]} Patient</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'What makes Care One different?', a: 'We combine board-certified expertise with FDA-approved technologies.' },
              { q: 'Are treatments permanent?', a: 'Many of our treatments are designed for long-term permanence.' },
              { q: 'What\'s the recovery time?', a: 'Most procedures have minimal downtime, returning to daily routine immediately.' }
            ].map((faq, i) => (
              <details key={i} className="group bg-surface-container-low rounded-xl border border-outline-variant/20 p-6 cursor-pointer">
                <summary className="flex justify-between font-semibold">
                  <span>{faq.q}</span>
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-4 text-on-surface-variant border-t border-outline-variant/10 pt-4">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
