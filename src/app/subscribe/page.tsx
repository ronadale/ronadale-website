'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div style={{
      padding: '60px 30px',
      maxWidth: '400px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <Link href="/" style={{
        textDecoration: 'none',
        color: 'inherit',
        fontSize: '14px',
        marginBottom: '40px',
        display: 'block'
      }}>
        ← Back to RONADALE
      </Link>

      <h1 style={{
        fontSize: '18px',
        marginBottom: '20px',
        fontWeight: 'normal'
      }}>
        Join our mailing list
      </h1>

      <p style={{
        fontSize: '14px',
        marginBottom: '30px',
        lineHeight: '1.4'
      }}>
        Stay updated with exhibition announcements and events.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            fontSize: '14px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '0',
            width: '100%',
            marginBottom: '15px',
            outline: 'none'
          }}
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            fontSize: '14px',
            padding: '10px 20px',
            border: '1px solid #000',
            backgroundColor: '#fff',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            width: '100%'
          }}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {message && (
        <p style={{
          marginTop: '20px',
          fontSize: '14px',
          color: status === 'error' ? '#d00' : '#080'
        }}>
          {message}
        </p>
      )}
    </div>
  );
}