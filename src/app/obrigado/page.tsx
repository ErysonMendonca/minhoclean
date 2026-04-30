'use client';

import { useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/store';
import { CheckCircle, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useMemo } from 'react';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const { leads, services, settings, loading } = useApp();
  
  const leadId = searchParams.get('id');
  const lead = useMemo(() => leads.find(l => l.id === leadId), [leads, leadId]);
  const service = useMemo(() => services.find(s => s.id === lead?.serviceType), [services, lead]);

  if (loading) return (
    <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loader"></div>
    </div>
  );

  const generateWhatsAppLink = () => {
    const phoneNumber = settings?.whatsapp || '351912345678';
    let message = `*Olá MinhoClean! Gostaria de um atendimento imediato.*\n\n`;
    message += `*ID do Pedido:* ${leadId}\n`;
    message += `*Serviço:* ${service?.title || 'Limpeza'}\n\n`;
    
    if (lead?.data) {
      message += `*Detalhes:*\n`;
      Object.entries(lead.data).forEach(([key, value]) => {
        // Find field label if possible
        const field = service?.form_config?.fields.find(f => f.id === key);
        const label = field?.label || key;
        const displayValue = Array.isArray(value) ? value.join(', ') : value;
        message += `• ${label}: ${displayValue}\n`;
      });
    }

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="section" style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
        <div className="thank-you-icon">
          <CheckCircle size={56} />
        </div>
        
        <h1 className="heading-lg thank-you-title">
          Obrigado por escolher a <span className="text-gradient">MinhoClean</span>!
        </h1>
        
        <p className="thank-you-text">
          Recebemos o seu pedido de orçamento para <strong>{service?.title || 'o serviço selecionado'}</strong>. <br className="mobile-hide"/>
          Entraremos em contacto o mais rápido possível.
        </p>

        <div className="whatsapp-card">
          <p style={{ marginBottom: '2rem', fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>Deseja um atendimento imediato?</p>
          <a 
            href={generateWhatsAppLink()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-accent whatsapp-btn"
          >
            <MessageCircle size={24} /> Falar pelo WhatsApp Agora
          </a>
        </div>

        <Link href="/" className="back-link">
          ← Voltar para a Página Inicial
        </Link>
      </div>

      <style jsx>{`
        .thank-you-icon {
          width: 100px; 
          height: 100px; 
          background: var(--accent); 
          color: white; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          margin: 0 auto 2.5rem; 
          box-shadow: 0 20px 40px -10px rgba(16, 185, 129, 0.4);
          animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .thank-you-title {
          font-size: 3rem; 
          margin-bottom: 1.5rem;
        }
        .thank-you-text {
          font-size: 1.25rem; 
          color: var(--primary-light); 
          margin-bottom: 3.5rem; 
          line-height: 1.6;
        }
        .whatsapp-card {
          background-color: white; 
          padding: 3rem; 
          border-radius: 2.5rem; 
          border: 2px solid #cbd5e1;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05);
        }
        .whatsapp-btn {
          width: 100%; 
          height: 4.5rem; 
          font-size: 1.2rem; 
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          border-radius: 1.5rem;
          box-shadow: 0 10px 20px -5px rgba(16, 185, 129, 0.4);
        }
        .back-link {
          display: inline-block; 
          margin-top: 3rem; 
          color: #64748b; 
          fontWeight: 600; 
          fontSize: 1rem;
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @media (max-width: 768px) {
          .thank-you-title {
            font-size: 2rem !important;
          }
          .thank-you-text {
            font-size: 1.1rem !important;
            margin-bottom: 2.5rem !important;
          }
          .whatsapp-card {
            padding: 2rem 1.5rem !important;
            border-radius: 1.5rem !important;
          }
          .whatsapp-btn {
            height: 3.5rem !important;
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader"></div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
