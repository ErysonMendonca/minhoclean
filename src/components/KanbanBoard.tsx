'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Lead } from '@/lib/types';
import { Clock, Phone, Mail, MapPin, X, ExternalLink, User, MessageCircle } from 'lucide-react';

export default function KanbanBoard() {
  const { leads, updateLeadStatus, services } = useApp();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const columns: { id: Lead['status']; title: string; color: string }[] = [
    { id: 'new', title: 'Novos Pedidos', color: '#3b82f6' },
    { id: 'contacted', title: 'Contactados', color: '#f59e0b' },
    { id: 'in-progress', title: 'Em Negociação', color: '#8b5cf6' },
    { id: 'scheduled', title: 'Agendados', color: '#10b981' },
    { id: 'completed', title: 'Concluídos', color: '#64748b' },
  ];

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDrop = (e: React.DragEvent, status: Lead['status']) => {
    const leadId = e.dataTransfer.getData('leadId');
    updateLeadStatus(leadId, status);
    setDragOverColumn(null);
  };

  return (
    <div style={{ display: 'flex', gap: '1.5rem', minWidth: 'max-content', paddingBottom: '2rem' }}>
      {columns.map((column) => (
        <div 
          key={column.id} 
          onDragOver={(e) => handleDragOver(e, column.id)}
          onDragLeave={() => setDragOverColumn(null)}
          onDrop={(e) => handleDrop(e, column.id)}
          style={{ 
            width: '320px', 
            minHeight: '600px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary)' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: column.color }}></span>
              {column.title}
            </h3>
            <span style={{ fontSize: '0.8rem', background: '#e2e8f0', padding: '0.2rem 0.75rem', borderRadius: '2rem', fontWeight: 700 }}>
              {leads.filter(l => l.status === column.id).length}
            </span>
          </div>

          <div style={{ 
            flex: 1, 
            backgroundColor: dragOverColumn === column.id ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.4)', 
            backdropFilter: 'blur(10px)', 
            borderRadius: '1.25rem', 
            padding: '1rem', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem', 
            border: dragOverColumn === column.id ? '2px dashed var(--accent)' : '2px solid var(--border)',
            transition: 'all 0.2s ease'
          }}>
            {leads
              .filter((lead) => lead.status === column.id)
              .map((lead) => (
                <KanbanCard 
                  key={lead.id} 
                  lead={lead} 
                  serviceName={services.find(s => s.id === lead.serviceType)?.title || 'Serviço'}
                  onClick={() => setSelectedLead(lead)} 
                />
              ))}
          </div>
        </div>
      ))}

      {/* Detail Modal */}
      {selectedLead && (
        <LeadDetailModal 
          lead={selectedLead} 
          service={services.find(s => s.id === selectedLead.serviceType)}
          onClose={() => setSelectedLead(null)} 
        />
      )}
    </div>
  );
}

function KanbanCard({ lead, serviceName, onClick }: { lead: Lead, serviceName: string, onClick: () => void }) {
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

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
      style={{ 
        backgroundColor: 'white', 
        padding: '1.5rem', 
        borderRadius: '1rem', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', 
        cursor: 'pointer',
        border: '1px solid #e2e8f0',
        transition: 'all 0.2s ease'
      }}
      className="kanban-card"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.25rem' }}>
        <span style={{ 
          fontSize: '0.7rem', 
          fontWeight: 800, 
          textTransform: 'uppercase', 
          padding: '0.25rem 0.6rem', 
          background: 'rgba(30, 41, 59, 0.05)', 
          borderRadius: '0.5rem', 
          color: 'var(--primary)',
          letterSpacing: '0.02em'
        }}>
          {serviceName}
        </span>
        <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
          <Clock size={12} /> {formatDate(lead.createdAt)}
        </span>
      </div>

      <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 800, color: 'var(--primary)' }}>
        {lead.data.customer_name || 'Sem Nome'}
      </h4>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#64748b' }}>
        {lead.data.customer_phone && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Phone size={14} style={{ color: 'var(--accent)' }} /> <span style={{ fontWeight: 700 }}>{lead.data.customer_phone}</span>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <MessageCircle size={14} style={{ color: '#10b981' }} /> Ver detalhes
        </div>
      </div>

      <style jsx>{`
        .kanban-card:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border-color: var(--accent);
          transform: translateY(-3px);
        }
        .kanban-card:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
}

function LeadDetailModal({ lead, service, onClose }: { lead: Lead, service?: any, onClose: () => void }) {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(15, 23, 42, 0.6)', 
      backdropFilter: 'blur(8px)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      zIndex: 1000,
      padding: '2rem'
    }} onClick={onClose}>
      <div style={{ 
        backgroundColor: 'white', 
        width: '100%', 
        maxWidth: '700px', 
        maxHeight: '90vh', 
        borderRadius: '2rem', 
        display: 'flex', 
        flexDirection: 'column', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: '2rem 2.5rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>Detalhes do Pedido</h2>
              <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', background: 'var(--accent)', color: 'white', fontSize: '0.75rem', fontWeight: 800 }}>
                {service?.title || 'Serviço'}
              </span>
            </div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Recebido em {new Date(lead.createdAt).toLocaleString('pt-PT')}</p>
          </div>
          <button onClick={onClose} style={{ background: '#f1f5f9', border: 'none', padding: '0.75rem', borderRadius: '1rem', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '2.5rem', overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', padding: '0.75rem', borderRadius: '1rem', height: 'fit-content' }}>
                <User size={24} />
              </div>
              <div>
                <p style={{ margin: '0 0 0.25rem', fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Cliente</p>
                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>{lead.data.customer_name || 'Não informado'}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.1)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '1rem', height: 'fit-content' }}>
                <Phone size={24} />
              </div>
              <div>
                <p style={{ margin: '0 0 0.25rem', fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Contacto</p>
                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>{lead.data.customer_phone || 'Não informado'}</p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>{lead.data.customer_email || 'E-mail não informado'}</p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '2px solid #f1f5f9', paddingTop: '2.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ExternalLink size={18} /> Respostas do Formulário
            </h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {Object.entries(lead.data).map(([key, value]) => {
                if (['customer_name', 'customer_phone', 'customer_email'].includes(key)) return null;
                const field = service?.form_config?.fields.find((f: any) => f.id === key);
                const label = field?.label || key;
                return (
                  <div key={key} style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>{label}</p>
                    <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--primary)' }}>
                      {Array.isArray(value) ? value.join(', ') : value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '1.5rem 2.5rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button 
            onClick={onClose}
            className="btn"
            style={{ padding: '0.75rem 2rem', borderRadius: '0.75rem', fontWeight: 700, border: '1px solid #e2e8f0', background: 'white' }}
          >
            Fechar
          </button>
          <a 
            href={`https://wa.me/${lead.data.customer_phone?.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '0.75rem 2rem', borderRadius: '0.75rem', fontWeight: 700, background: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Phone size={18} /> Contactar via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
