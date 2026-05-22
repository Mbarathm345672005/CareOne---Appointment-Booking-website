import React from 'react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Priya S.',
      service: 'Hair Restoration Patient',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNAGk_c1OL-nig2hxqmmAnc8-Uxj12oTEUtrBqvW3f2_eVxRLFdAypfbLC2IIT_0sUnsBUywpJPQyy1f3Y6O0n1nKQIRcCU0wT6Qlh_pIFiUZEpIRa73eAvZt7vdY4gnNWT4MXPB5ussq2u-yFPG2aOmLmCHArVUYvVaj4JW8CKgboFoviq3J_6JGQB1Bjf9Ao6_EobkQg1Vh6EXclMC_MmtUU1mcCQWKjFy-SZtsZsrAfDAS_QwQ12LeC5hfRQZ1ia3c6UGsLGQ',
      rating: 5,
      text: 'I struggled with hair thinning for years. The personalized PRP sessions have restored my confidence. The clinical team is truly exceptional.'
    },
    {
      name: 'Arun K.',
      service: 'Laser Therapy Patient',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCujbwwjTAaFcnfNymgUsxh_InkxkFHMFaOVo2Q801Au9E7lsyDcdh9fD9sz-q1DDXdY1qU9Ub735QCWd76z3S7TqDTAO1dTidGBzWKAbxWtbEzKrfajFpsfLk2UHxxVmVcgvlPUOjCIT7uKcBF39OQcLILNw__BXa5J1T7tKt501c7avVsyyQyXI66BYT5_qkqtIHN1qSXc9XgKluAanLF6YOCOixxdninnkzHocZzgenACAHuqUZ0qsrphGLsYsfiwSNlnM8_bA',
      rating: 5,
      text: 'Professional and precise. The laser hair removal treatment was surprisingly comfortable and incredibly effective. Highly recommended.'
    },
    {
      name: 'Divya M.',
      service: 'Skin Rejuvenation Patient',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfwNg4R0nsiftP7a7k6l-cTSiDBz6U7MivV9QDSh-Ph5fjAWOGOpNOH9UGikCRMQXxaPWuawk-fyM45Cw9-ZFvlRWbUn9hbtdEHH9avFHB89SUcGQogZlK1LU2SBPC5THYTxYT-6jNUfXhHJOeLlz3owj4UMYYb8X1YyHlt1t93_P1kxQPHbFWewg3BWi-q-tZbam71om3mh2NIEAbFdQYWFe6nzjw3fq_PuBNRTQrcCcyW7uVB-_Rt8PdFa6KvfAkMu1PAXwPYw',
      rating: 5,
      text: 'The chemical peels transformed my skin texture. I leave feeling completely refreshed and empowered after every single visit.'
    }
  ]

  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <span className="text-secondary font-semibold uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl font-bold mt-2">Real results from real patients</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-4 mb-6">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h5 className="font-semibold text-on-surface">{t.name}</h5>
                  <p className="text-xs text-on-surface-variant">{t.service}</p>
                </div>
              </div>
              <div className="flex gap-1 text-secondary mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <span key={j} className="text-sm">★</span>
                ))}
              </div>
              <p className="text-on-surface-variant italic">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
