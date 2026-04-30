'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lead, FormConfig, Service, DEFAULT_FORM_CONFIG } from './types';
import { supabase } from './supabase';
import bcrypt from 'bcryptjs';

interface AppContextType {
  leads: Lead[];
  services: Service[];
  formConfig: FormConfig;
  settings: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateFormConfig: (config: FormConfig) => Promise<void>;
  submitLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => Promise<Lead | null>;
  updateLeadStatus: (id: string, status: Lead['status']) => Promise<void>;
  updateServices: (services: Service[]) => Promise<void>;
  updateServiceFormConfig: (serviceId: string, config: FormConfig) => Promise<void>;
  updateSettings: (newSettings: any) => Promise<void>;
  showToast: (message: string, type?: 'success' | 'error') => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [formConfig, setFormConfig] = useState<FormConfig>(DEFAULT_FORM_CONFIG);
  const [settings, setSettings] = useState<any>({
    whatsapp: '351912345678',
    footer_text: 'MinhoClean - Serviços Profissionais de Limpeza.',
    footer_address: 'Braga, Portugal',
    footer_email: 'geral@minhoclean.pt'
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Initial Load
  useEffect(() => {
    const auth = localStorage.getItem('minhoclean_auth');
    if (auth === 'true') setIsAuthenticated(true);
    
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      // Fetch Form Config
      const { data: configData } = await supabase
        .from('form_config')
        .select('config')
        .eq('id', 'default')
        .maybeSingle();
      
      if (configData) setFormConfig(configData.config);

      // Fetch Services
      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (servicesData) setServices(servicesData);

      // Fetch Leads
      const { data: leadsData } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (leadsData) {
        setLeads(leadsData.map(l => ({
          id: l.id,
          serviceType: l.service_type,
          data: l.data,
          status: l.status as Lead['status'],
          createdAt: l.created_at
        })));
      }

      // Fetch Settings
      const { data: settingsData } = await supabase
        .from('settings')
        .select('*')
        .single();
      
      if (settingsData) setSettings(settingsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data: user, error } = await supabase
        .from('admin_users')
        .select('password_hash')
        .eq('email', email)
        .maybeSingle();

      if (error || !user) return false;

      // Compare Hash
      const isValid = bcrypt.compareSync(password, user.password_hash);
      
      if (isValid) {
        setIsAuthenticated(true);
        localStorage.setItem('minhoclean_auth', 'true');
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('minhoclean_auth');
  };

  const updateFormConfig = async (config: FormConfig) => {
    const { error } = await supabase
      .from('form_config')
      .upsert({ id: 'default', config, updated_at: new Date().toISOString() });
    
    if (!error) setFormConfig(config);
  };

  const submitLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const { data, error } = await supabase
      .from('leads')
      .insert({
        service_type: leadData.serviceType,
        data: leadData.data,
        status: 'new'
      })
      .select()
      .maybeSingle();

    if (!error && data) {
      const newLead: Lead = {
        id: data.id,
        serviceType: data.service_type,
        data: data.data,
        status: data.status,
        createdAt: data.created_at
      };
      setLeads([newLead, ...leads]);
      return newLead;
    }
    return null;
  };

  const updateLeadStatus = async (id: string, status: Lead['status']) => {
    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id);

    if (!error) {
      setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
    }
  };

  const updateServices = async (newServices: Service[]) => {
    // Local update
    setServices(newServices);
  };

  const updateServiceFormConfig = async (serviceId: string, config: FormConfig) => {
    const { error } = await supabase
      .from('services')
      .update({ form_config: config })
      .eq('id', serviceId);
    
    if (!error) {
      setServices(services.map(s => s.id === serviceId ? { ...s, form_config: config } : s));
    }
  };

  const updateSettings = async (newSettings: any) => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .upsert({ id: 1, ...newSettings })
        .select()
        .single();

      if (!error && data) {
        setSettings(data);
        showToast('Configurações guardadas com sucesso!', 'success');
      } else if (error) {
        throw error;
      }
    } catch (error) {
      showToast('Erro ao guardar configurações.', 'error');
      console.error('Error updating settings:', error);
      throw error;
    }
  };

  return (
    <AppContext.Provider value={{ 
      leads, 
      services, 
      formConfig,
      settings,
      isAuthenticated, 
      login, 
      logout, 
      updateFormConfig,
      submitLead, 
      updateLeadStatus,
      updateServices,
      updateServiceFormConfig,
      updateSettings,
      showToast,
      loading 
    }}>
      {children}

      {/* Global Toast Component */}
      {toast && (
        <div style={{ 
          position: 'fixed', 
          top: '2rem', 
          right: '2rem', 
          zIndex: 9999,
          animation: 'slideIn 0.3s ease-out forwards'
        }}>
          <div style={{ 
            padding: '1rem 2rem', 
            borderRadius: '1rem', 
            background: toast.type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            fontWeight: 700,
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem', borderRadius: '50%', display: 'flex' }}>
              {toast.type === 'success' ? <span style={{ fontSize: '1rem' }}>✓</span> : <span style={{ fontSize: '1rem' }}>✕</span>}
            </div>
            {toast.message}
          </div>
          <style>{`
            @keyframes slideIn {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
