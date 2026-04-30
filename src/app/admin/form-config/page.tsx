'use client';

import { useApp } from '@/lib/store';
import { FormField } from '@/lib/types';
import { Eye, EyeOff, CheckSquare, Square, Trash2, Plus } from 'lucide-react';

export default function FormConfigPage() {
  const { formConfig, setFormConfig } = useApp();

  const toggleEnabled = (id: string) => {
    const newFields = formConfig.fields.map(f => 
      f.id === id ? { ...f, enabled: !f.enabled } : f
    );
    setFormConfig({ ...formConfig, fields: newFields });
  };

  const toggleRequired = (id: string) => {
    const newFields = formConfig.fields.map(f => 
      f.id === id ? { ...f, required: !f.required } : f
    );
    setFormConfig({ ...formConfig, fields: newFields });
  };

  const updateLabel = (id: string, label: string) => {
    const newFields = formConfig.fields.map(f => 
      f.id === id ? { ...f, label } : f
    );
    setFormConfig({ ...formConfig, fields: newFields });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="heading-lg" style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Configuração do Formulário</h1>
          <p style={{ color: 'var(--text-muted)' }}>Defina quais campos aparecem no seu site e quais são obrigatórios.</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: 'var(--bg-alt)', borderBottom: '1px solid var(--border)' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Nome do Campo</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Tipo</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'center' }}>Ativo</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'center' }}>Obrigatório</th>
            </tr>
          </thead>
          <tbody>
            {formConfig.fields.map((field) => (
              <tr key={field.id} style={{ borderBottom: '1px solid var(--border)', transition: 'var(--transition)' }} className="table-row">
                <td style={{ padding: '1rem 1.5rem' }}>
                  <input 
                    type="text" 
                    value={field.label} 
                    onChange={(e) => updateLabel(field.id, e.target.value)}
                    style={{ 
                      border: 'none', 
                      background: 'transparent', 
                      fontSize: '1rem', 
                      fontWeight: 500, 
                      width: '100%',
                      outline: 'none',
                      color: field.enabled ? 'var(--primary)' : 'var(--text-muted)'
                    }}
                  />
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'capitalize' }}>
                  {field.type}
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                  <button 
                    onClick={() => toggleEnabled(field.id)}
                    style={{ color: field.enabled ? 'var(--accent)' : 'var(--text-muted)' }}
                  >
                    {field.enabled ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                  <button 
                    onClick={() => toggleRequired(field.id)}
                    style={{ color: field.required ? 'var(--accent)' : 'var(--text-muted)' }}
                    disabled={!field.enabled}
                  >
                    {field.required ? <CheckSquare size={20} /> : <Square size={20} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: 'var(--radius)', border: '1px dashed var(--accent)' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--accent-dark)', fontWeight: 500 }}>
          💡 Dica: Os campos "E-mail" e "Telefone" são recomendados para garantir que consiga contactar o cliente.
        </p>
      </div>

      <style jsx>{`
        .table-row:hover {
          background-color: #fafafa;
        }
      `}</style>
    </div>
  );
}
