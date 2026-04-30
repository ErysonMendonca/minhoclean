'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lead, FormConfig } from './types';
import { supabase } from './supabase';
import bcrypt from 'bcryptjs';

interface AppContextType {
  leads: Lead[];
  formConfig: FormConfig;
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  updateFormConfig: (config: FormConfig) => Promise<void>;
  submitLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateLeadStatus: (id: string, status: Lead['status']) => Promise<void>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_CONFIG: FormConfig = {
  fields: [
    { id: 'name', label: 'Nome Completo', type: 'text', required: true, enabled: true, placeholder: 'Seu nome' },
    { id: 'email', label: 'E-mail', type: 'email', required: true, enabled: true, placeholder: 'seu@email.com' },
    { id: 'phone', label: 'Telefone', type: 'tel', required: true, enabled: true, placeholder: '+351 XXX XXX XXX' },
    { id: 'address', label: 'Morada / Localização', type: 'text', required: true, enabled: true, placeholder: 'Rua, número, cidade' },
    { id: 'details', label: 'Detalhes Adicionais', type: 'textarea', required: false, enabled: true, placeholder: 'Conte-nos mais sobre a sua necessidade' },
  ]
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [formConfig, setFormConfig] = useState<FormConfig>(DEFAULT_CONFIG);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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
        .single();
      
      if (configData) setFormConfig(configData.config);

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
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (password: string): Promise<boolean> => {
    try {
      // Find admin user (using username 'admin' for now)
      const { data: user, error } = await supabase
        .from('admin_users')
        .select('password_hash')
        .eq('username', 'admin')
        .single();

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
      .single();

    if (!error && data) {
      const newLead: Lead = {
        id: data.id,
        serviceType: data.service_type,
        data: data.data,
        status: data.status,
        createdAt: data.created_at
      };
      setLeads([newLead, ...leads]);
    }
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

  return (
    <AppContext.Provider value={{ 
      leads, 
      formConfig, 
      isAuthenticated, 
      login, 
      logout, 
      updateFormConfig, 
      submitLead, 
      updateLeadStatus,
      loading
    }}>
      {children}
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
