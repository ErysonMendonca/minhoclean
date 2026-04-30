'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Lock, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useApp();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const success = await login(email, password);
    if (success) {
      router.push('/admin/crm');
    } else {
      setError('Credenciais incorretas. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--bg-main)'
    }}>
      <div className="glass" style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '3rem', 
        borderRadius: 'var(--radius-lg)', 
        border: '3px solid var(--border)',
        boxShadow: 'var(--shadow-lg)',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--accent)', color: 'white', padding: '1rem', borderRadius: '1rem' }}>
            <Sparkles size={32} />
          </div>
        </div>
        
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', fontWeight: 700 }}>Painel Admin</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Entre com os seus dados de acesso.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>E-mail</label>
            <input 
              type="email" 
              placeholder="exemplo@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '1rem', 
                borderRadius: '0.75rem', 
                border: '1px solid var(--border)', 
                outline: 'none',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>Palavra-passe</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '1rem', 
                borderRadius: '0.75rem', 
                border: '1px solid var(--border)', 
                outline: 'none',
                fontSize: '1rem'
              }}
            />
          </div>

          {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', fontWeight: 500 }}>{error}</p>}

          <button 
            type="submit" 
            className="btn btn-accent" 
            disabled={isLoading}
            style={{ width: '100%', height: '3.5rem', marginTop: '1rem' }}
          >
            {isLoading ? 'A autenticar...' : 'Entrar no Sistema'}
          </button>
        </form>
      </div>
    </div>
  );
}
