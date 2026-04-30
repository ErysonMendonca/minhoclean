'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Lock, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useApp();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(password);
    if (success) {
      router.push('/admin/crm');
    } else {
      setError('Palavra-passe incorreta. Tente novamente.');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--bg-alt)'
    }}>
      <div className="glass" style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '3rem', 
        borderRadius: 'var(--radius-lg)', 
        boxShadow: 'var(--shadow-lg)',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '1rem' }}>
            <Sparkles size={32} />
          </div>
        </div>
        
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>MinhoClean Admin</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Entre com a sua palavra-passe para aceder ao painel.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
            <input 
              type="password" 
              placeholder="Palavra-passe" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '1rem 1rem 1rem 3rem', 
                borderRadius: '0.75rem', 
                border: '1px solid var(--border)', 
                outline: 'none',
                fontSize: '1rem'
              }}
            />
          </div>

          {error && <p style={{ color: 'red', fontSize: '0.9rem' }}>{error}</p>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '3.5rem' }}>
            Aceder ao Painel
          </button>
        </form>
        
        <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Palavra-passe padrão: <strong>admin123</strong>
        </p>
      </div>
    </div>
  );
}
