'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import { ServiceType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Send } from 'lucide-react';

interface LeadFormProps {
  serviceType: string;
  fields: any[];
}

export default function LeadForm({ serviceType, fields }: LeadFormProps) {
  const { submitLead, settings } = useApp();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newLead = await submitLead({
        serviceType: serviceType as any,
        data: formData,
      });

      if (newLead) {
        // Format WhatsApp message
        let message = `*Novo Pedido de Orçamento - MinhoClean*\n\n`;
        message += `*CLIENTE:* ${formData.customer_name}\n`;
        message += `*TELEMÓVEL:* ${formData.customer_phone}\n`;
        message += `*EMAIL:* ${formData.customer_email}\n\n`;
        message += `*Serviço:* ${serviceType}\n\n`;
        message += `*DETALHES DO PEDIDO:*\n`;
        
        fields.forEach(field => {
          const value = formData[field.id];
          if (value && !['customer_name', 'customer_phone', 'customer_email'].includes(field.id)) {
            const displayValue = Array.isArray(value) ? value.join(', ') : value;
            message += `• ${field.label}: ${displayValue}\n`;
          }
        });

        const whatsappUrl = `https://wa.me/${settings?.whatsapp || ''}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        router.push(`/obrigado?id=${newLead.id}`);
      } else {
        alert('Erro ao enviar pedido.');
      }
    } catch (error) {
      alert('Erro ao enviar pedido.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (id: string, value: any) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (id: string, option: string, checked: boolean) => {
    const currentOptions = (formData[id] as string[]) || [];
    let nextOptions;
    if (checked) {
      nextOptions = [...currentOptions, option];
    } else {
      nextOptions = currentOptions.filter(o => o !== option);
    }
    setFormData(prev => ({ ...prev, [id]: nextOptions }));
  };

  return (
    <form onSubmit={handleSubmit} className="glass" style={{ 
      padding: '3rem', 
      borderRadius: '2.5rem', 
      border: '2px solid #cbd5e1', 
      boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.12)',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)'
    }}>
      <h3 style={{ marginBottom: '2.5rem', fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', textAlign: 'center' }}>
        Configurar Pedido
      </h3>

      {/* Mandatory Contact Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: '2px solid #f1f5f9' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>Nome Completo <span style={{ color: '#ef4444' }}>*</span></label>
          <input 
            type="text" 
            required 
            placeholder="Ex: João Silva"
            onChange={(e) => handleChange('customer_name', e.target.value)}
            style={{ height: '3.5rem', padding: '0 1.5rem', borderRadius: '1rem', border: '2px solid #e2e8f0', outline: 'none', fontSize: '1rem', fontWeight: 600 }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>Telemóvel <span style={{ color: '#ef4444' }}>*</span></label>
            <input 
              type="tel" 
              required 
              placeholder="Ex: 912345678"
              onChange={(e) => handleChange('customer_phone', e.target.value)}
              style={{ height: '3.5rem', padding: '0 1.5rem', borderRadius: '1rem', border: '2px solid #e2e8f0', outline: 'none', fontSize: '1rem', fontWeight: 600 }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>E-mail <span style={{ color: '#ef4444' }}>*</span></label>
            <input 
              type="email" 
              required 
              placeholder="Ex: joao@email.com"
              onChange={(e) => handleChange('customer_email', e.target.value)}
              style={{ height: '3.5rem', padding: '0 1.5rem', borderRadius: '1rem', border: '2px solid #e2e8f0', outline: 'none', fontSize: '1rem', fontWeight: 600 }}
            />
          </div>
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem',
        maxHeight: '500px',
        overflowY: 'auto',
        paddingRight: '1rem',
        marginBottom: '1.5rem',
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--accent) transparent'
      }}>
        {fields.map((field) => (
          <div key={field.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.025em', textTransform: 'uppercase' }}>
              {field.label} {field.required && <span style={{ color: '#ef4444' }}>*</span>}
            </label>
            
            {field.type === 'select' ? (
              <div style={{ position: 'relative' }}>
                <select
                  required={field.required}
                  className="input"
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  style={{ 
                    width: '100%',
                    height: '3.75rem', 
                    padding: '0 1.5rem', 
                    appearance: 'none',
                    borderRadius: '1.25rem',
                    border: '2px solid #e2e8f0',
                    fontSize: '1rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    background: 'white'
                  }}
                >
                  <option value="">Selecione uma opção...</option>
                  {field.options?.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <div style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--accent)' }}>
                  ▼
                </div>
              </div>
            ) : field.type === 'checkbox' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginTop: '0.25rem' }}>
                {field.options?.map((opt: string) => {
                  const isChecked = (formData[field.id] as string[])?.includes(opt);
                  return (
                    <label key={opt} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      fontSize: '0.9rem', 
                      fontWeight: 600,
                      padding: '0.85rem 1rem',
                      borderRadius: '1.25rem',
                      border: `2px solid ${isChecked ? 'var(--accent)' : '#e2e8f0'}`,
                      background: isChecked ? 'rgba(16, 185, 129, 0.05)' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                      <div style={{ 
                        width: '20px', 
                        height: '20px', 
                        borderRadius: '6px', 
                        border: `2px solid ${isChecked ? 'var(--accent)' : '#cbd5e1'}`,
                        background: isChecked ? 'var(--accent)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        transition: 'all 0.2s',
                        flexShrink: 0
                      }}>
                        {isChecked && <Send size={12} style={{ transform: 'rotate(-45deg)' }} />}
                      </div>
                      <input 
                        type="checkbox" 
                        style={{ display: 'none' }}
                        onChange={(e) => handleCheckboxChange(field.id, opt, e.target.checked)}
                      />
                      <span style={{ color: isChecked ? 'var(--primary)' : '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{opt}</span>
                    </label>
                  );
                })}
              </div>
            ) : field.type === 'radio' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginTop: '0.25rem' }}>
                {field.options?.map((opt: string) => {
                  const isSelected = formData[field.id] === opt;
                  return (
                    <label key={opt} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      fontSize: '0.9rem', 
                      fontWeight: 600,
                      padding: '0.85rem 1rem',
                      borderRadius: '1.25rem',
                      border: `2px solid ${isSelected ? 'var(--accent)' : '#e2e8f0'}`,
                      background: isSelected ? 'rgba(16, 185, 129, 0.05)' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                      <div style={{ 
                        width: '20px', 
                        height: '20px', 
                        borderRadius: '50%', 
                        border: `2px solid ${isSelected ? 'var(--accent)' : '#cbd5e1'}`,
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        flexShrink: 0
                      }}>
                        {isSelected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)' }} />}
                      </div>
                      <input 
                        type="radio" 
                        name={field.id} 
                        style={{ display: 'none' }}
                        required={field.required}
                        onChange={() => handleChange(field.id, opt)}
                      />
                      <span style={{ color: isSelected ? 'var(--primary)' : '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{opt}</span>
                    </label>
                  );
                })}
              </div>
            ) : field.type === 'textarea' ? (
              <textarea
                required={field.required}
                placeholder={`Escreva aqui...`}
                className="input"
                rows={4}
                onChange={(e) => handleChange(field.id, e.target.value)}
                style={{ 
                  padding: '1.25rem',
                  borderRadius: '1.25rem',
                  border: '2px solid #e2e8f0',
                  fontSize: '1rem',
                  fontWeight: 500,
                  outline: 'none',
                  minHeight: '100px',
                  background: 'white',
                  width: '100%'
                }}
              />
            ) : (
              <input
                type={field.type}
                required={field.required}
                placeholder={`Insira seu ${field.label.toLowerCase()}`}
                className="input"
                onChange={(e) => handleChange(field.id, e.target.value)}
                style={{ 
                  height: '3.75rem',
                  padding: '0 1.5rem',
                  borderRadius: '1.25rem',
                  border: '2px solid #e2e8f0',
                  fontSize: '1rem',
                  fontWeight: 500,
                  outline: 'none',
                  background: 'white',
                  width: '100%'
                }}
              />
            )}
          </div>
        ))}
      </div>

      <button 
        type="submit" 
        className="btn btn-accent" 
        disabled={isSubmitting}
        style={{ 
          width: '100%', 
          height: '4.5rem', 
          fontSize: '1.25rem', 
          fontWeight: 800,
          borderRadius: '1.5rem',
          boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(16, 185, 129, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.4)';
        }}
      >
        {isSubmitting ? 'A processar...' : 'Confirmar Pedido'}
      </button>
    </form>
  );
}
