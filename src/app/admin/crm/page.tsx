'use client';

import KanbanBoard from '@/components/KanbanBoard';
import { Search, Filter, Plus } from 'lucide-react';

export default function CRMPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="heading-lg" style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>CRM / Kanban</h1>
          <p style={{ color: 'var(--text-muted)' }}>Gerencie seus pedidos e o status de cada atendimento.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar pedidos..." 
              style={{ padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: '0.5rem', border: '1px solid var(--border)', outline: 'none', width: '250px' }}
            />
          </div>
          <button className="btn" style={{ border: '1px solid var(--border)', background: 'white' }}>
            <Filter size={18} /> Filtrar
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowX: 'auto', paddingBottom: '1rem' }}>
        <KanbanBoard />
      </div>
    </div>
  );
}
