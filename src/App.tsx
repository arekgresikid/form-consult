import React from 'react';
import ConsultationForm from './components/ConsultationForm';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-20 overflow-x-hidden">
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-4 text-black">Digital Project <span className="font-medium">Brief</span></h1>
          <p className="text-gray-500 tracking-wide text-lg max-w-2xl">
            Ceritakan website impian Anda. Kami menggunakan bahasa yang mudah dipahami untuk membantu mewujudkannya, tanpa istilah teknis yang rumit.
          </p>
        </header>

        <ConsultationForm />
      </main>
    </div>
  );
}
