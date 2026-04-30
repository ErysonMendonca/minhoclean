'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import Reveal from '@/components/Reveal';
import { Save, Phone, MapPin, Mail, AlignLeft } from 'lucide-react';

export default function SettingsPage() {
  const { settings, updateSettings, loading } = useApp();
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSettings(formData);
    } catch (error) {
      // Error handled by store
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div style={{ maxWidth: '800px' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Configurações do Sistema</h1>
        <p style={{ color: 'var(--text-muted)' }}>Gerencie os contactos globais e as informações do rodapé.</p>
      </header>

      <div style={{ display: 'grid', gap: '2rem' }}>
        <Reveal>
          <section className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', border: '2px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: 'var(--accent)', color: 'white', padding: '0.75rem', borderRadius: '1rem' }}>
                <Phone size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Contacto Principal</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>Número de redirecionamento para o WhatsApp.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#64748b', marginBottom: '0.75rem' }}>WHATSAPP (Ex: 351912345678)</label>
                <input 
                  type="text" 
                  value={formData.whatsapp} 
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  style={{ 
                    width: '100%', 
                    padding: '1rem 1.5rem', 
                    borderRadius: '1.25rem', 
                    border: '2px solid #e2e8f0', 
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.2}>
          <section className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', border: '2px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: '#3b82f6', color: 'white', padding: '0.75rem', borderRadius: '1rem' }}>
                <AlignLeft size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Informações do Rodapé</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>Textos que aparecem na parte inferior do site.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#64748b', marginBottom: '0.75rem' }}>TEXTO INSTITUCIONAL</label>
                <textarea 
                  value={formData.footer_text} 
                  onChange={(e) => setFormData({ ...formData, footer_text: e.target.value })}
                  rows={3}
                  style={{ 
                    width: '100%', 
                    padding: '1rem 1.5rem', 
                    borderRadius: '1.25rem', 
                    border: '2px solid #e2e8f0', 
                    fontSize: '1rem',
                    fontWeight: 500,
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#64748b', marginBottom: '0.75rem' }}>ENDEREÇO</label>
                  <input 
                    type="text" 
                    value={formData.footer_address} 
                    onChange={(e) => setFormData({ ...formData, footer_address: e.target.value })}
                    style={{ width: '100%', padding: '1rem 1.5rem', borderRadius: '1.25rem', border: '2px solid #e2e8f0', fontWeight: 600 }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#64748b', marginBottom: '0.75rem' }}>E-MAIL</label>
                  <input 
                    type="email" 
                    value={formData.footer_email} 
                    onChange={(e) => setFormData({ ...formData, footer_email: e.target.value })}
                    style={{ width: '100%', padding: '1rem 1.5rem', borderRadius: '1.25rem', border: '2px solid #e2e8f0', fontWeight: 600 }}
                  />
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="btn btn-primary"
            style={{ 
              padding: '1.25rem 3rem', 
              borderRadius: '1.5rem', 
              fontSize: '1.1rem', 
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 10px 20px -5px rgba(30, 41, 59, 0.3)'
            }}
          >
            <Save size={20} />
            {isSaving ? 'A Guardar...' : 'Guardar Alterações'}
          </button>
        </div>
      </div>
    </div>
  );
}
