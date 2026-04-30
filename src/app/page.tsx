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
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <Reveal>
            <div>
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
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link href="#servicos" className="btn btn-primary">
                  Ver Serviços <ArrowRight size={20} />
                </Link>
                <Link href="#sobre" className="btn" style={{ border: '1px solid var(--border)' }}>
                  Sobre Nós
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ position: 'relative' }}>
              <div style={{ 
              width: '100%', 
              height: '550px', 
              background: 'linear-gradient(rgba(15, 23, 42, 0.6), rgba(16, 185, 129, 0.4)), url("https://images.unsplash.com/photo-1581578731548-c64695cc6958?q=80&w=2070&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '3rem', 
              overflow: 'hidden', 
              boxShadow: '0 30px 60px -12px rgba(15, 23, 42, 0.25)',
              position: 'relative'
            }}>
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
                  <Sparkles size={120} style={{ marginBottom: '2rem', opacity: 0.8 }} />
                  <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Brilho Profissional</h3>
                  <p style={{ opacity: 0.8, maxWidth: '300px' }}>Equipamentos de ponta e produtos ecológicos para o melhor resultado.</p>
                </div>
              </div>
              
              {/* Floating Stats Card */}
              <div style={{ 
                position: 'absolute', 
                bottom: '3rem', 
                left: '-3rem', 
                background: 'rgba(255,255,255,0.9)', 
                backdropFilter: 'blur(10px)',
                padding: '1.5rem 2rem', 
                borderRadius: '1.5rem', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.5rem',
                border: '1px solid rgba(255,255,255,0.5)'
              }}>
                <div style={{ background: 'var(--accent)', color: 'white', padding: '0.75rem', borderRadius: '1rem' }}>
                  <CheckCircle size={28} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.5rem', lineHeight: 1 }}>100%</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Satisfação Garantida</div>
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
              <h2 className="heading-lg" style={{ fontSize: '3rem' }}>Nossos <span className="text-gradient">Serviços</span></h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0.5rem auto 0', fontSize: '1.1rem' }}>
                Soluções completas de limpeza para qualquer situação. Escolha a que melhor se adapta a si.
              </p>
            </div>
          </Reveal>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '2.5rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 100}>
                <div style={{ 
                  backgroundColor: 'white',
                  borderRadius: '2.5rem',
                  padding: '3rem 2rem 2.5rem', 
                  border: '2px solid #cbd5e1', // Darker border
                  boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.04)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  position: 'relative',
                  overflow: 'hidden',
                  maxWidth: '380px',
                  margin: '0 auto',
                  cursor: 'pointer'
                }}
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
                      width: 'fit-content',
                      margin: '0 auto',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
              <h2 className="heading-lg" style={{ fontSize: '3rem' }}>O que <span className="text-gradient">Oferecemos</span></h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0.5rem auto 0', fontSize: '1.1rem' }}>
                Garantimos excelência em cada serviço prestado, focando no bem-estar e na satisfação máxima dos nossos clientes através de processos rigorosos e atendimento personalizado.
              </p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            <Reveal delay={100}>
              <div style={{ 
                textAlign: 'center', 
                padding: '3rem 2rem', 
                background: 'white', 
                borderRadius: 'var(--radius-lg)', 
                border: '3px solid var(--border)',
                boxShadow: 'var(--shadow)',
                height: '100%',
                transition: 'var(--transition)'
              }} className="hover-lift">
                <div style={{ width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'var(--accent)' }}>
                  <ShieldCheck size={40} />
                </div>
                <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>Confiança Total</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>Equipa rigorosamente selecionada e treinada para garantir a sua total segurança e tranquilidade.</p>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <div style={{ 
                textAlign: 'center', 
                padding: '3rem 2rem', 
                background: 'white', 
                borderRadius: 'var(--radius-lg)', 
                border: '3px solid var(--border)',
                boxShadow: 'var(--shadow)',
                height: '100%',
                transition: 'var(--transition)'
              }} className="hover-lift">
                <div style={{ width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'var(--accent)' }}>
                  <Clock size={40} />
                </div>
                <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>Flexibilidade</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>Agendamento simples e adaptável que se molda perfeitamente à sua rotina e horários ocupados.</p>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div style={{ 
                textAlign: 'center', 
                padding: '3rem 2rem', 
                background: 'white', 
                borderRadius: 'var(--radius-lg)', 
                border: '3px solid var(--border)',
                boxShadow: 'var(--shadow)',
                height: '100%',
                transition: 'var(--transition)'
              }} className="hover-lift">
                <div style={{ width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'var(--accent)' }}>
                  <Sparkles size={40} />
                </div>
                <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700 }}>Qualidade Premium</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>Utilizamos apenas os melhores produtos e técnicas para garantir um resultado final impecável e brilhante.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
