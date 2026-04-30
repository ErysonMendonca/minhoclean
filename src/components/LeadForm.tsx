'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import { ServiceType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Send } from 'lucide-react';

interface LeadFormProps {
  serviceType: ServiceType;
}

export default function LeadForm({ serviceType }: LeadFormProps) {
  const { formConfig, submitLead } = useApp();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Add lead to Supabase
    const newLead = await submitLead({
      serviceType,
      data: formData,
    });

    if (newLead) {
      // Format data for thank you page
      const queryParams = new URLSearchParams({
        id: newLead.id,
        service: serviceType,
        ...formData
      });

      router.push(`/obrigado?${queryParams.toString()}`);
    } else {
      setIsSubmitting(false);
      alert('Ocorreu um erro ao enviar o seu pedido. Por favor, tente novamente.');
    }
  };

  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)' }}>
      <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Solicitar Orçamento</h3>
      
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {formConfig.fields.filter(f => f.enabled).map((field) => (
          <div key={field.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor={field.id} style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-light)' }}>
              {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
            </label>
            
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                required={field.required}
                placeholder={field.placeholder}
                value={formData[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                style={{ 
                  padding: '1rem', 
                  borderRadius: '0.5rem', 
                  border: '1px solid var(--border)', 
                  fontFamily: 'inherit',
                  minHeight: '100px',
                  outline: 'none',
                  transition: 'var(--transition)'
                }}
              />
            ) : (
              <input
                type={field.type}
                id={field.id}
                required={field.required}
                placeholder={field.placeholder}
                value={formData[field.id] || ''}
                onChange={(e) => handleChange(field.id, e.target.value)}
                style={{ 
                  padding: '1rem', 
                  borderRadius: '0.5rem', 
                  border: '1px solid var(--border)', 
                  outline: 'none',
                  transition: 'var(--transition)'
                }}
              />
            )}
          </div>
        ))}

        <button 
          type="submit" 
          className="btn btn-accent" 
          disabled={isSubmitting}
          style={{ width: '100%', marginTop: '1rem', height: '3.5rem' }}
        >
          {isSubmitting ? 'Enviando...' : (
            <>
              Solicitar Agora <Send size={18} />
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        input:focus, textarea:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }
      `}</style>
    </form>
  );
}
