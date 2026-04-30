import { SERVICES, ServiceType } from '@/lib/types';
import LeadForm from '@/components/LeadForm';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.id,
  }));
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find(s => s.id === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="section" style={{ background: 'var(--bg-alt)', minHeight: 'calc(100vh - 160px)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'start' }}>
        <div>
          <h1 className="heading-lg" style={{ marginBottom: '1.5rem' }}>{service.title}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--primary-light)', marginBottom: '2.5rem' }}>
            {service.description}
          </p>
          
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <h4 style={{ marginBottom: '1.5rem' }}>O que está incluído:</h4>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {service.features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle2 className="text-accent" size={20} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <LeadForm serviceType={service.id as ServiceType} />
        </div>
      </div>
    </div>
  );
}
