'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import LeadForm from '@/components/LeadForm';
import { notFound } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import Reveal from '@/components/Reveal';

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const { services, loading } = useApp();
  
  // Find service after unwrap
  const service = services.find(s => s.id === slug);

  if (loading) return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loader"></div>
    </div>
  );

  if (!service) {
    notFound();
  }

  return (
    <div className="section" style={{ background: 'transparent', minHeight: 'calc(100vh - 160px)', paddingTop: '5rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'start' }}>
        <Reveal>
          <div>
            <h1 className="heading-lg text-gradient" style={{ marginBottom: '1.5rem', fontSize: '3.5rem' }}>{service.title}</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              {service.description}
            </p>
            
            <div className="glass" style={{ padding: '2.5rem', borderRadius: '2.5rem', border: '1px solid var(--border)', background: 'white' }}>
              <h4 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 700 }}>O que está incluído:</h4>
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                {service.features.map((feature, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <CheckCircle style={{ color: '#0fb981' }} size={22} />
                    <span style={{ fontSize: '1.1rem', fontWeight: 500, color: '#334155' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div>
            <LeadForm 
              serviceType={service.title} 
              fields={service.form_config?.fields || []} 
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
