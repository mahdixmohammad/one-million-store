"use client"

import { useState } from 'react';

export default function SubscribeForm({
  translations
}: {
  translations: {
    subscribeForm: { heading: string; description: string; form: string; button: string }
  }
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (data.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

  const { subscribeForm } = translations

  return (
    <div className="bg-white px-6 py-8 rounded-md shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2 text-center">{subscribeForm.heading}</h2>
      <p className="text-gray-600 mb-4">{subscribeForm.description}</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={subscribeForm.form}
          className="border px-4 py-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-[#E5C887] hover:bg-yellow-600 text-black py-2 px-4 rounded"
        >
          {subscribeForm.button}
        </button>
      </form>
      {status === 'success' && <p className="text-green-600 mt-2">Thank you for subscribing!</p>}
      {status === 'error' && <p className="text-red-600 mt-2">Subscription failed. Try again.</p>}
    </div>
  );
}
