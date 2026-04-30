'use client';

import { useSearchParams } from 'next/navigation';
import { SERVICES } from '@/lib/types';
import { CheckCircle, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');
  const service = SERVICES.find(s => s.id === serviceId);
  
  // Format data for WhatsApp
  const formData: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (key !== 'service' && key !== 'id') {
      formData[key] = value;
    }
  });

  const generateWhatsAppLink = () => {
    const phoneNumber = '+351912345678'; // Replace with real support number
    let message = `Olá MinhoClean! Gostaria de solicitar um orçamento para *${service?.title || 'Limpeza'}*.\n\n`;
    message += `*Dados do formulário:*\n`;
    
    Object.entries(formData).forEach(([key, value]) => {
      // Basic key formatting
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      message += `• ${label}: ${value}\n`;
    });

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="section" style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', background: 'var(--accent)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: 'var(--shadow-lg)' }}>
          <CheckCircle size={48} />
        </div>
        
        <h1 className="heading-lg">Obrigado por escolher a <span className="text-gradient">MinhoClean</span>!</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--primary-light)', marginBottom: '3rem' }}>
          Recebemos o seu pedido de orçamento para <strong>{service?.title}</strong>. Entraremos em contacto o mais rápido possível.
        </p>

        <div style={{ backgroundColor: 'var(--bg-alt)', padding: '2.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <p style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Deseja um atendimento imediato?</p>
          <a 
            href={generateWhatsAppLink()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-accent" 
            style={{ width: '100%', height: '3.5rem', fontSize: '1.1rem' }}
          >
            <MessageCircle /> Falar pelo WhatsApp Agora
          </a>
        </div>

        <Link href="/" style={{ display: 'inline-block', marginTop: '2rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
