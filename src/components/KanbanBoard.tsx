'use client';

import { useApp } from '@/lib/store';
import { Lead } from '@/lib/types';
import { Clock, Phone, Mail, MapPin, Calendar } from 'lucide-react';

export default function KanbanBoard() {
  const { leads, updateLeadStatus } = useApp();

  const columns: { id: Lead['status']; title: string; color: string }[] = [
    { id: 'new', title: 'Novos Pedidos', color: '#3b82f6' },
    { id: 'contacted', title: 'Contactados', color: '#f59e0b' },
    { id: 'in-progress', title: 'Em Negociação', color: '#8b5cf6' },
    { id: 'scheduled', title: 'Agendados', color: '#10b981' },
    { id: 'completed', title: 'Concluídos', color: '#64748b' },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Lead['status']) => {
    const leadId = e.dataTransfer.getData('leadId');
    updateLeadStatus(leadId, status);
  };

  return (
    <div style={{ display: 'flex', gap: '1.5rem', minWidth: 'max-content', paddingBottom: '2rem' }}>
      {columns.map((column) => (
        <div 
          key={column.id} 
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
          style={{ width: '320px', minHeight: '500px', display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: column.color }}></span>
              {column.title}
            </h3>
            <span style={{ fontSize: '0.8rem', background: '#e2e8f0', padding: '0.1rem 0.6rem', borderRadius: '1rem', fontWeight: 600 }}>
              {leads.filter(l => l.status === column.id).length}
            </span>
          </div>

          <div style={{ flex: 1, backgroundColor: 'rgba(226, 232, 240, 0.4)', borderRadius: '0.75rem', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {leads
              .filter((lead) => lead.status === column.id)
              .map((lead) => (
                <KanbanCard key={lead.id} lead={lead} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function KanbanCard({ lead }: { lead: Lead }) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('leadId', lead.id);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-PT', { 
      day: '2-digit', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const serviceLabels: Record<string, string> = {
    'domestic': 'Doméstica',
    'business': 'Empresarial',
    'post-construction': 'Pós-Obra'
  };

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      style={{ 
        backgroundColor: 'white', 
        padding: '1.25rem', 
        borderRadius: '0.6rem', 
        boxShadow: 'var(--shadow-sm)', 
        cursor: 'grab',
        border: '1px solid var(--border)',
        transition: 'var(--transition)'
      }}
      className="kanban-card"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', padding: '0.2rem 0.5rem', background: '#f1f5f9', borderRadius: '0.3rem', color: 'var(--primary)' }}>
          {serviceLabels[lead.serviceType]}
        </span>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Clock size={12} /> {formatDate(lead.createdAt)}
        </span>
      </div>

      <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 600 }}>{lead.data.name || 'Sem Nome'}</h4>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--primary-light)' }}>
        {lead.data.phone && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Phone size={14} className="text-muted" /> {lead.data.phone}
          </div>
        )}
        {lead.data.email && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mail size={14} className="text-muted" /> {lead.data.email}
          </div>
        )}
        {lead.data.address && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={14} className="text-muted" /> <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lead.data.address}</span>
          </div>
        )}
      </div>

      <style jsx>{`
        .kanban-card:hover {
          box-shadow: var(--shadow);
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .kanban-card:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
}
