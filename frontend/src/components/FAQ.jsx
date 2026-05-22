import React from 'react'
import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      q: 'What makes Care One different from other clinics?',
      a: 'We combine board-certified medical expertise with the latest FDA-approved aesthetic technologies. Our focus is on holistic patient outcomes rather than just temporary fixes.'
    },
    {
      q: 'Are the hair restoration treatments permanent?',
      a: 'Yes, many of our surgical and clinical hair restoration methods are designed for long-term permanence. During your consultation, we\'ll discuss the expected results based on your specific condition.'
    },
    {
      q: 'How long is the recovery time for laser treatments?',
      a: 'Most of our modern laser therapies have minimal downtime. Some patients experience slight redness for 24-48 hours, but most return to their daily routine immediately after the session.'
    },
    {
      q: 'Is the treatment suitable for all skin types?',
      a: 'Our advanced technology works safely on all skin tones and types. We customize each treatment plan to your specific needs during the initial consultation.'
    },
    {
      q: 'What should I expect during the first visit?',
      a: 'Your first visit includes a comprehensive skin analysis, discussion of your goals, and a personalized treatment plan. We\'ll answer all your questions in a relaxed environment.'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <span className="text-secondary font-semibold uppercase tracking-widest">FAQ</span>
          <h2 className="text-4xl font-bold mt-2">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-surface-container-low rounded-xl border border-outline-variant/20 overflow-hidden open:bg-white open:border-primary/30 p-6 cursor-pointer"
              open={i === openIndex} onClick={() => setOpenIndex(i === openIndex ? -1 : i)}>
              <summary className="flex justify-between items-center list-none font-semibold text-on-surface hover:text-primary transition">
                <span>{faq.q}</span>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <div className="mt-4 text-on-surface-variant border-t border-outline-variant/10 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
