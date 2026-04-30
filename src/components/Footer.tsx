'use client';

import Link from 'next/link';
import { Sparkles, Phone, Mail, MapPin } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function Footer() {
  const { settings } = useApp();

  return (
    <footer style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.5rem', color: 'white', marginBottom: '1.5rem' }}>
              <Sparkles className="text-accent" />
              <span>MinhoClean</span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '300px', lineHeight: 1.6 }}>
              {settings?.footer_text || 'Excelência em serviços de limpeza no Minho.'}
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 700 }}>Menu</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link href="/servicos" style={{ color: 'rgba(255,255,255,0.6)' }}>Serviços</Link></li>
              <li><Link href="/#sobre" style={{ color: 'rgba(255,255,255,0.6)' }}>Sobre Nós</Link></li>
              <li><Link href="/#contacto" style={{ color: 'rgba(255,255,255,0.6)' }}>Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 700 }}>Contacto</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                <Phone size={18} className="text-accent" />
                <span>+{settings?.whatsapp}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                <Mail size={18} className="text-accent" />
                <span>{settings?.footer_email}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                <MapPin size={18} className="text-accent" />
                <span>{settings?.footer_address}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <p>© {new Date().getFullYear()} MinhoClean. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
