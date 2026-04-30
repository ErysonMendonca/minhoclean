'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Plus, Trash2, Save, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Service, FormField } from '@/lib/types';

export default function ServicesAdminPage() {
  const { services, updateServices, updateServiceFormConfig } = useApp();
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [configuringForm, setConfiguringForm] = useState<Service | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveForm = async (config: any) => {
    if (!configuringForm) return;
    setIsSaving(true);
    await updateServiceFormConfig(configuringForm.id, config);
    setConfiguringForm(null);
    setIsSaving(false);
  };

  const handleSave = async () => {
    if (!editingService?.title) return;
    setIsSaving(true);

    const serviceData = {
      title: editingService.title,
      description: editingService.description || '',
      features: editingService.features || [],
    };

    let error;
    if (editingService.id) {
      // Update
      const { error: err } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', editingService.id);
      error = err;
    } else {
      // Create
      const { error: err } = await supabase
        .from('services')
        .insert([serviceData]);
      error = err;
    }

    if (!error) {
      // Refresh local state
      const { data } = await supabase.from('services').select('*').order('created_at', { ascending: true });
      if (data) updateServices(data);
      setEditingService(null);
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem a certeza que deseja apagar este serviço?')) return;
    
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (!error) {
      updateServices(services.filter(s => s.id !== id));
    }
  };

  const addFeature = () => {
    if (!editingService) return;
    const features = [...(editingService.features || []), ''];
    setEditingService({ ...editingService, features });
  };

  const updateFeature = (index: number, value: string) => {
    if (!editingService) return;
    const features = [...(editingService.features || [])];
    features[index] = value;
    setEditingService({ ...editingService, features });
  };

  const removeFeature = (index: number) => {
    if (!editingService) return;
    const features = editingService.features?.filter((_, i) => i !== index);
    setEditingService({ ...editingService, features });
  };

  return (
    <div style={{ maxWidth: '1000px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>Gerir Serviços</h1>
          <p style={{ color: 'var(--text-muted)' }}>Crie e edite os cards de serviço que aparecem na página inicial.</p>
        </div>
        <button 
          className="btn btn-accent" 
          onClick={() => setEditingService({ title: '', description: '', features: [''] })}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={20} /> Novo Serviço
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2.5rem' }}>
        {services.map((service) => (
          <div key={service.id} className="glass" style={{ 
            padding: '2.5rem', 
            borderRadius: '2.5rem', 
            border: '2px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '320px'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>{service.title}</h3>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1, lineHeight: 1.6 }}>
              {service.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}
                onClick={() => setEditingService(service)}
              >
                Editar Texto
              </button>
              <button 
                className="btn btn-accent" 
                style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }}
                onClick={() => setConfiguringForm(service)}
              >
                Config. Form
              </button>
              <button 
                className="btn" 
                style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '0.5rem', width: '40px' }}
                onClick={() => handleDelete(service.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingService && (
        <div style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(15, 23, 42, 0.4)', // Darker, slightly tinted background
          backdropFilter: 'blur(8px)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}>
          <div className="glass" style={{ 
            width: '100%', 
            maxWidth: '650px', 
            maxHeight: '90vh', 
            overflowY: 'auto', 
            padding: '2.5rem',
            background: 'white',
            borderRadius: '2.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: 'var(--accent)', color: 'white', padding: '0.75rem', borderRadius: '1rem' }}>
                <Plus size={24} />
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>
                {editingService.id ? 'Editar Serviço' : 'Novo Serviço'}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary)' }}>Título do Serviço</label>
                <input 
                  type="text" 
                  value={editingService.title} 
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  placeholder="Ex: Limpeza Doméstica"
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    borderRadius: '1rem', 
                    border: '2px solid var(--border)', 
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary)' }}>Descrição Curta</label>
                <textarea 
                  rows={3}
                  value={editingService.description} 
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  placeholder="Descreva brevemente o serviço para atrair o cliente..."
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    borderRadius: '1rem', 
                    border: '2px solid var(--border)', 
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary)' }}>O que será feito (Itens do Card)</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {editingService.features?.map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <div style={{ flex: 1, position: 'relative' }}>
                        <CheckCircle size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent)' }} />
                        <input 
                          type="text" 
                          value={feature} 
                          onChange={(e) => updateFeature(idx, e.target.value)}
                          placeholder="Ex: Limpeza profunda"
                          style={{ 
                            width: '100%', 
                            padding: '0.85rem 1rem 0.85rem 2.75rem', 
                            borderRadius: '0.75rem', 
                            border: '1px solid var(--border)', 
                            fontSize: '0.95rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <button 
                        onClick={() => removeFeature(idx)} 
                        style={{ 
                          color: '#ef4444', 
                          background: '#fee2e2', 
                          border: 'none', 
                          padding: '0.6rem', 
                          borderRadius: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={addFeature}
                    style={{ 
                      padding: '1rem', 
                      border: '2px dashed var(--border)', 
                      borderRadius: '1rem', 
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      background: 'rgba(0,0,0,0.02)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                      e.currentTarget.style.borderColor = 'var(--accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0,0,0,0.02)';
                      e.currentTarget.style.borderColor = 'var(--border)';
                    }}
                  >
                    + Adicionar Nova Característica
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                <button 
                  className="btn btn-accent" 
                  style={{ flex: 2, height: '3.75rem', borderRadius: '1.25rem', fontSize: '1.1rem', fontWeight: 700 }}
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Save size={20} style={{ marginRight: '0.75rem' }} />
                  {isSaving ? 'A Guardar...' : 'Guardar Alterações'}
                </button>
                <button 
                  className="btn" 
                  style={{ flex: 1, height: '3.75rem', borderRadius: '1.25rem', fontSize: '1rem', fontWeight: 600, background: '#f1f5f9', color: 'var(--primary)' }}
                  onClick={() => setEditingService(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {configuringForm && (
        <ServiceFormBuilder 
          service={configuringForm} 
          onSave={handleSaveForm} 
          onCancel={() => setConfiguringForm(null)} 
        />
      )}
    </div>
  );
}

function ServiceFormBuilder({ service, onSave, onCancel }: { service: Service, onSave: (config: any) => void, onCancel: () => void }) {
  const [fields, setFields] = useState(service.form_config?.fields || []);

  const addField = () => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      label: 'Nova Pergunta',
      type: 'text',
      required: false,
      enabled: true,
      options: []
    };
    setFields([...fields, newField]);
  };

  const updateField = (index: number, updates: any) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...updates };
    setFields(newFields);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const addOption = (fieldIndex: number) => {
    const newFields = [...fields];
    const field = newFields[fieldIndex];
    field.options = [...(field.options || []), `Opção ${(field.options?.length || 0) + 1}`];
    setFields(newFields);
  };

  const updateOption = (fieldIndex: number, optionIndex: number, value: string) => {
    const newFields = [...fields];
    newFields[fieldIndex].options![optionIndex] = value;
    setFields(newFields);
  };

  const removeOption = (fieldIndex: number, optionIndex: number) => {
    const newFields = [...fields];
    newFields[fieldIndex].options = newFields[fieldIndex].options!.filter((_, i) => i !== optionIndex);
    setFields(newFields);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, left: 0, right: 0, bottom: 0, 
      background: 'rgba(15, 23, 42, 0.6)', 
      backdropFilter: 'blur(10px)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      zIndex: 1100,
      padding: '2rem'
    }}>
      <div className="glass" style={{ 
        width: '100%', 
        maxWidth: '800px', 
        maxHeight: '90vh', 
        overflowY: 'auto', 
        padding: '2.5rem',
        background: 'white',
        borderRadius: '2.5rem',
        boxShadow: 'var(--shadow-2xl)',
        border: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>Configurar Formulário</h2>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Personalize as perguntas para <strong>{service.title}</strong></p>
          </div>
          <button onClick={onCancel} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <Trash2 size={24} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {fields.map((field, idx) => (
            <div key={field.id} style={{ 
              padding: '2rem', 
              borderRadius: '2rem', 
              border: '2px solid #cbd5e1', // Darker border for the card
              background: '#ffffff',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)',
              position: 'relative'
            }}>
              {/* Toolbar: Type and Required */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '1.5rem',
                background: '#f8fafc',
                padding: '0.75rem 1.25rem',
                borderRadius: '1rem',
                border: '1px solid #cbd5e1' // Matching darker border
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>TIPO:</span>
                  <select 
                    value={field.type} 
                    onChange={(e) => updateField(idx, { type: e.target.value, options: (e.target.value === 'select' || e.target.value === 'checkbox' || e.target.value === 'radio') ? (field.options?.length ? field.options : ['Opção 1']) : [] })}
                    style={{ 
                      border: 'none', 
                      background: 'white', 
                      fontSize: '0.85rem', 
                      fontWeight: 700, 
                      color: 'var(--accent)',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '0.6rem',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="text">TEXTO CURTO</option>
                    <option value="textarea">TEXTO LONGO</option>
                    <option value="number">NÚMERO</option>
                    <option value="select">DROPDOWN</option>
                    <option value="radio">ESCOLHA ÚNICA</option>
                    <option value="checkbox">ESCOLHA MÚLTIPLA</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <div 
                      onClick={() => updateField(idx, { required: !field.required })}
                      style={{ 
                        width: '36px', 
                        height: '20px', 
                        background: field.required ? 'var(--accent)' : '#94a3b8', 
                        borderRadius: '10px', 
                        position: 'relative',
                        transition: 'all 0.3s'
                      }}
                    >
                      <div style={{ 
                        width: '14px', 
                        height: '14px', 
                        background: 'white', 
                        borderRadius: '50%', 
                        position: 'absolute', 
                        top: '3px', 
                        left: field.required ? '19px' : '3px',
                        transition: 'all 0.3s'
                      }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: field.required ? 'var(--accent)' : '#94a3b8' }}>OBRIGATÓRIO</span>
                  </label>
                  
                  <button 
                    onClick={() => removeField(idx)} 
                    style={{ 
                      color: '#ef4444', 
                      background: '#fee2e2', 
                      border: 'none', 
                      padding: '0.5rem', 
                      borderRadius: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Main Label Input */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.6rem', color: '#64748b' }}>PERGUNTA / LABEL</label>
                <input 
                  type="text" 
                  value={field.label} 
                  onChange={(e) => updateField(idx, { label: e.target.value })}
                  placeholder="Escreva a pergunta aqui..."
                  style={{ 
                    width: '100%', 
                    padding: '1.1rem', 
                    borderRadius: '1.25rem', 
                    border: '2px solid #e2e8f0', // Darker input border
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--primary)',
                    background: '#ffffff',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Dynamic Answer Options */}
              {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
                <div style={{ 
                  padding: '1.5rem', 
                  background: '#fcfdfd', 
                  borderRadius: '1.5rem', 
                  border: '1px solid #eef2f6' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ width: '4px', height: '16px', background: 'var(--accent)', borderRadius: '2px' }} />
                    <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent)' }}>OPÇÕES DE RESPOSTA</label>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {field.options?.map((opt, optIdx) => (
                      <div key={optIdx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800 }}>{optIdx + 1}</span>
                        </div>
                        <input 
                          type="text" 
                          value={opt} 
                          onChange={(e) => updateOption(idx, optIdx, e.target.value)}
                          style={{ 
                            flex: 1,
                            background: 'white', 
                            padding: '0.75rem 1.25rem', 
                            border: '1px solid #cbd5e1', // Darker option input border
                            borderRadius: '1rem',
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            outline: 'none'
                          }}
                        />
                        <button onClick={() => removeOption(idx, optIdx)} style={{ color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => addOption(idx)}
                      style={{ 
                        padding: '1rem',
                        border: '2px dashed #cbd5e1', // Darker dashed border
                        borderRadius: '1rem',
                        color: 'var(--accent)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        background: 'transparent',
                        marginTop: '0.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      + ADICIONAR OPÇÃO
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          <button 
            onClick={addField} 
            className="btn"
            style={{ 
              padding: '1.5rem', 
              borderRadius: '2rem', 
              border: '2px dashed #0fb981', // Much darker green border
              background: 'rgba(16, 185, 129, 0.08)', // Slightly darker background
              color: '#065f46', // Darker emerald text
              fontWeight: 800,
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(16, 185, 129, 0.12)';
              e.currentTarget.style.transform = 'scale(1.01)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(16, 185, 129, 0.08)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Plus size={20} /> ADICIONAR NOVA PERGUNTA
          </button>

          {fields.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', border: '2px dashed #cbd5e1', borderRadius: '2.5rem', color: '#94a3b8' }}>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Sem perguntas ainda</h4>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>Clique no botão acima para começar a construir o seu formulário.</p>
            </div>
          )}

          <div style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            marginTop: '2rem', 
            paddingTop: '2rem', 
            borderTop: '2px solid #f1f5f9',
            position: 'sticky',
            bottom: '-2.5rem',
            background: 'white',
            paddingBottom: '1rem'
          }}>
            <button 
              className="btn btn-primary" 
              style={{ flex: 1.5, height: '4rem', borderRadius: '1.25rem', fontSize: '1.1rem', boxShadow: '0 10px 15px -3px rgba(30, 41, 59, 0.2)' }}
              onClick={() => onSave({ fields })}
            >
              GUARDAR CONFIGURAÇÃO
            </button>
            <button 
              className="btn" 
              style={{ flex: 1, height: '4rem', borderRadius: '1.25rem', background: '#f1f5f9', color: '#64748b' }}
              onClick={onCancel}
            >
              CANCELAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
