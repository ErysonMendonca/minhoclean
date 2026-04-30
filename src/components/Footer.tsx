import Link from 'next/link';
import { Sparkles, Phone, MessageCircle, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.5rem', color: 'white', marginBottom: '1.5rem' }}>
              <Sparkles className="text-accent" />
              <span>MinhoClean</span>
            </Link>
            <p style={{ color: 'var(--text-muted)', maxWidth: '300px' }}>
              Excelência em serviços de limpeza no Minho. Compromisso com a qualidade e a sua satisfação.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Serviços</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link href="/servicos/domestic" style={{ color: 'var(--text-muted)' }}>Limpeza Doméstica</Link></li>
              <li><Link href="/servicos/business" style={{ color: 'var(--text-muted)' }}>Limpeza Empresarial</Link></li>
              <li><Link href="/servicos/post-construction" style={{ color: 'var(--text-muted)' }}>Limpeza Pós-Obra</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Contacto</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <Phone size={18} className="text-accent" />
                <span>+351 912 345 678</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                <Link href="#" className="text-accent" aria-label="WhatsApp"><MessageCircle size={24} /></Link>
                <Link href="#" className="text-accent" aria-label="Social"><Share2 size={24} /></Link>
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
