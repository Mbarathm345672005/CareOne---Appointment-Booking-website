export default function PatientResults({ onBookClick }) {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-container-max mx-auto px-6 md:px-8 text-center">
          <div className="text-label-md text-primary mb-2">Real Transformations</div>
          <h1 className="text-5xl md:text-6xl font-bold text-on-surface mb-6 font-headline-xl">
            See the Difference Care One Makes
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
            Real patients, real results. These transformative outcomes speak to our commitment to excellence and your trust in us.
          </p>
        </div>
      </section>

      {/* Before & After Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-6 md:px-8">
          <h2 className="text-4xl font-bold text-on-surface mb-12 text-center font-headline-xl">Hair Restoration Results</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                before: 'https://images.unsplash.com/photo-1599599810694-f3f415eaf82f?auto=format&fit=crop&w=400&q=80',
                after: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                name: 'Rahul M.',
                treatment: 'PRP Hair Therapy - 6 months',
                result: 'Significant hair density improvement'
              },
              {
                before: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
                after: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                name: 'Arjun K.',
                treatment: 'Follicular Restoration - 8 months',
                result: 'Natural hair regrowth pattern'
              },
              {
                before: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                after: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
                name: 'Vikram S.',
                treatment: 'Scalp Micro-needling - 4 months',
                result: 'Visible follicle rejuvenation'
              }
            ].map((result, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <p className="text-xs text-on-surface-variant px-3 py-2 bg-surface-container-low">Before</p>
                      <img src={result.before} alt="Before" className="w-full h-64 object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-on-surface-variant px-3 py-2 bg-surface-container-low">After</p>
                      <img src={result.after} alt="After" className="w-full h-64 object-cover" />
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-surface">
                  <h3 className="font-bold text-on-surface mb-1">{result.name}</h3>
                  <p className="text-sm text-primary mb-2">{result.treatment}</p>
                  <p className="text-sm text-on-surface-variant">{result.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skin Rejuvenation Results */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-6 md:px-8">
          <h2 className="text-4xl font-bold text-on-surface mb-12 text-center font-headline-xl">Skin Rejuvenation & Chemical Peels</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                before: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
                after: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                name: 'Sneha P.',
                treatment: 'Medical Grade Chemical Peels - 3 months',
                description: 'Dramatic improvement in skin texture and pigmentation. Patient reported noticeable glow and refined pores.'
              },
              {
                before: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
                after: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                name: 'Kavya R.',
                treatment: 'Advanced Mesotherapy - 6 sessions',
                description: 'Skin hydration levels increased dramatically. Fine lines softened and overall radiance enhanced.'
              },
              {
                before: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                after: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
                name: 'Deepti M.',
                treatment: 'Combination Protocol - 4 months',
                description: 'Multi-modality approach resulted in comprehensive skin rejuvenation and natural-looking results.'
              },
              {
                before: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
                after: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
                name: 'Neha S.',
                treatment: 'Anti-Aging Protocol - 6 months',
                description: 'Significant reduction in fine lines and age spots. Patient regained youthful glow and skin elasticity.'
              }
            ].map((result, idx) => (
              <div key={idx} className="bg-surface rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-md transition">
                <div className="flex gap-3 p-3 bg-surface-container-highest">
                  <img src={result.before} alt="Before" className="w-32 h-32 object-cover rounded-lg" />
                  <img src={result.after} alt="After" className="w-32 h-32 object-cover rounded-lg" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-on-surface mb-1">{result.name}</h3>
                  <p className="text-primary text-sm font-semibold mb-3">{result.treatment}</p>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{result.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Therapy Results */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-6 md:px-8">
          <h2 className="text-4xl font-bold text-on-surface mb-12 text-center font-headline-xl">Laser Hair Removal & Resurfacing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: '✨',
                title: 'Laser Hair Removal',
                results: [
                  '95% hair reduction after 6 sessions',
                  'Permanent results in all body areas',
                  'Works on all skin tones',
                  'Fast sessions (15-45 min)',
                  'No scarring or burns'
                ]
              },
              {
                icon: '🌟',
                title: 'Fractional Resurfacing',
                results: [
                  'Significant acne scar improvement',
                  'Smoother skin texture',
                  'Reduced fine lines and wrinkles',
                  'Improved skin tone uniformity',
                  'Collagen remodeling continues for months'
                ]
              }
            ].map((treatment, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10">
                <div className="text-4xl mb-4">{treatment.icon}</div>
                <h3 className="text-2xl font-bold text-on-surface mb-6">{treatment.title}</h3>
                <ul className="space-y-3">
                  {treatment.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">✓</span>
                      <span className="text-on-surface-variant">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Testimonials */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-6 md:px-8">
          <h2 className="text-4xl font-bold text-on-surface mb-12 text-center font-headline-xl">What Our Patients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I was skeptical about hair restoration, but the results have been incredible. My confidence is back!",
                name: "Arun K.",
                service: "Hair Restoration",
                rating: 5
              },
              {
                quote: "The laser treatment was completely painless and the results exceeded my expectations. Highly recommended!",
                name: "Priya S.",
                service: "Laser Therapy",
                rating: 5
              },
              {
                quote: "My skin has never looked better. The chemical peels were transformative and the staff was so professional.",
                name: "Divya M.",
                service: "Skin Rejuvenation",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-surface rounded-2xl p-6 shadow-sm border border-outline-variant/20">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-on-surface-variant mb-6 italic">"{testimonial.quote}"</p>
                <h4 className="font-bold text-on-surface mb-1">{testimonial.name}</h4>
                <p className="text-sm text-primary">{testimonial.service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-container-max mx-auto px-6 md:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-headline-xl">Ready for Your Transformation?</h2>
          <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
            Book your consultation today and discover how Care One can help you achieve your aesthetic goals.
          </p>
          <button 
            onClick={onBookClick}
            className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Schedule Your Consultation
          </button>
        </div>
      </section>
    </main>
  )
}
