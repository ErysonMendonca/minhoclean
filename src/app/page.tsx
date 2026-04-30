'use client';

import { useApp } from '@/lib/store';
import { Service } from '@/lib/types';
import Link from 'next/link';
import { ArrowRight, CheckCircle, ShieldCheck, Clock, Star, Sparkles } from 'lucide-react';
import Reveal from '@/components/Reveal';

export default function Home() {
  const { services } = useApp();
  return (
    <div>
      {/* Hero Section */}
      <section className="section" style={{ background: 'transparent', overflow: 'hidden' }}>
        <div className="container hero-grid">
          <Reveal>
            <div className="hero-content">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'white', borderRadius: '2rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)', fontSize: '0.9rem', fontWeight: 600 }}>
                <Star className="text-accent" size={16} fill="currentColor" />
                <span>A escolha Nº1 no Minho</span>
              </div>
              <h1 className="heading-xl">
                Sua casa <span className="text-gradient">brilhante</span>, sua vida mais leve.
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'var(--primary-light)', opacity: 0.8, marginBottom: '2.5rem', maxWidth: '500px' }}>
                Serviços de limpeza profissional adaptados às suas necessidades. Confiança, qualidade e brilho em cada detalhe.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="#servicos" className="btn btn-primary" style={{ minWidth: '180px' }}>
                  Ver Serviços <ArrowRight size={20} />
                </Link>
                <Link href="#sobre" className="btn" style={{ border: '1px solid var(--border)', minWidth: '180px', background: 'white' }}>
                  Sobre Nós
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ position: 'relative' }} className="hero-image-container">
              <div className="hero-card">
                {/* Abstract decorative elements */}
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(40px)' }} />
                <div style={{ position: 'absolute', bottom: '20%', left: '-5%', width: '200px', height: '200px', background: 'rgba(16, 185, 129, 0.3)', borderRadius: '50%', filter: 'blur(30px)' }} />
                
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'white',
                  textAlign: 'center',
                  padding: '2rem'
                }}>
                  <Sparkles size={80} className="mobile-hide" style={{ marginBottom: '2rem', opacity: 0.8 }} />
                  <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Brilho Profissional</h3>
                  <p style={{ opacity: 0.8, maxWidth: '300px' }}>Equipamentos de ponta e produtos ecológicos para o melhor resultado.</p>
                </div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="stats-card">
                <div style={{ background: 'var(--accent)', color: 'white', padding: '0.75rem', borderRadius: '1rem' }}>
                  <CheckCircle size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem', lineHeight: 1 }}>100%</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Satisfação Garantida</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="section">
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 className="heading-lg">Nossos <span className="text-gradient">Serviços</span></h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0.5rem auto 0', fontSize: '1.1rem' }}>
                Soluções completas de limpeza para qualquer situação. Escolha a que melhor se adapta a si.
              </p>
            </div>
          </Reveal>

          <div className="services-grid">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 100}>
                <div className="service-card-main"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }}
                >
                  <h3 className="text-gradient" style={{ 
                    fontSize: '1.65rem', 
                    fontWeight: 800, 
                    marginBottom: '1.25rem', 
                    textAlign: 'center',
                    lineHeight: 1.2
                  }}>
                    {service.title}
                  </h3>
                  
                  <p style={{ 
                    color: '#64748b', 
                    marginBottom: '2rem', 
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    textAlign: 'center',
                    padding: '0 0.5rem'
                  }}>
                    {service.description}
                  </p>

                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: '0 0 2.5rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem'
                  }}>
                    {service.features.map((feature, idx) => (
                      <li key={idx} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.75rem',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        color: '#334155'
                      }}>
                        <CheckCircle size={18} style={{ color: '#0fb981', flexShrink: 0 }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href={`/servicos/${service.id}`}
                    style={{ 
                      marginTop: 'auto',
                      backgroundColor: '#0f172a',
                      color: 'white',
                      borderRadius: '1.5rem',
                      padding: '1rem 1.5rem',
                      fontSize: '1rem',
                      fontWeight: 700,
                      textAlign: 'center',
                      border: 'none',
                      display: 'inline-block',
                      width: '100%',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    Solicitar Orçamento
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="sobre" className="section" style={{ backgroundColor: 'transparent' }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 className="heading-lg">O que <span className="text-gradient">Oferecemos</span></h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0.5rem auto 0', fontSize: '1.1rem' }}>
                Garantimos excelência em cada serviço prestado, focando no bem-estar e na satisfação máxima dos nossos clientes.
              </p>
            </div>
          </Reveal>
          <div className="features-grid">
            <Reveal delay={100}>
              <div className="feature-card hover-lift">
                <div className="feature-icon">
                  <ShieldCheck size={32} />
                </div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 800 }}>Confiança Total</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>Equipa rigorosamente selecionada para sua segurança.</p>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="feature-card hover-lift">
                <div className="feature-icon">
                  <Clock size={32} />
                </div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 800 }}>Flexibilidade</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>Agendamento que se molda à sua rotina.</p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="feature-card hover-lift">
                <div className="feature-icon">
                  <Sparkles size={32} />
                </div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 800 }}>Qualidade Premium</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>Produtos e técnicas de ponta para um brilho impecável.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .hero-card {
          width: 100%; 
          height: 500px; 
          background: linear-gradient(rgba(15, 23, 42, 0.4), rgba(16, 185, 129, 0.2)), url("/images/hero_illustration.png");
          background-size: cover;
          background-position: center;
          border-radius: 3rem; 
          overflow: hidden; 
          box-shadow: 0 30px 60px -12px rgba(15, 23, 42, 0.25);
          position: relative;
        }
        .stats-card {
          position: absolute; 
          bottom: 2rem; 
          left: -2rem; 
          background: rgba(255,255,255,0.9); 
          backdrop-filter: blur(10px);
          padding: 1.25rem 1.5rem; 
          border-radius: 1.25rem; 
          box-shadow: 0 20px 40px rgba(0,0,0,0.1); 
          display: flex; 
          align-items: center; 
          gap: 1rem;
          border: 1px solid rgba(255,255,255,0.5);
        }
        .services-grid {
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
          gap: 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .service-card-main {
          background-color: white;
          border-radius: 2rem;
          padding: 2.5rem 1.5rem; 
          border: 2px solid #cbd5e1;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04);
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all 0.4s ease;
          max-width: 400px;
          margin: 0 auto;
        }
        .features-grid {
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
          gap: 2rem;
        }
        .feature-card {
          text-align: center; 
          padding: 2.5rem 2rem; 
          background: white; 
          border-radius: 1.5rem; 
          border: 2px solid var(--border);
          box-shadow: var(--shadow-sm);
          height: 100%;
        }
        .feature-icon {
          width: 64px; 
          height: 64px; 
          background: rgba(16, 185, 129, 0.1); 
          border-radius: 1.25rem; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          margin: 0 auto 1.5rem; 
          color: var(--accent);
        }
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .stats-card {
            left: 50%;
            transform: translateX(-50%);
            bottom: -1rem;
            white-space: nowrap;
          }
          .hero-card {
            height: 350px;
            border-radius: 2rem;
          }
        }
        @media (max-width: 640px) {
          .service-card-main {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
