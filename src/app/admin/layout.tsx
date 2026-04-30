'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Settings, ListTodo, LogOut, Menu, X } from 'lucide-react';
import { useApp } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, pathname, router]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (!isAuthenticated && pathname !== '/admin/login') {
    return null;
  }

  const menuItems = [
    { name: 'CRM / Kanban', href: '/admin/crm', icon: LayoutDashboard },
    { name: 'Gerir Serviços', href: '/admin/services', icon: ListTodo },
    { name: 'Configurações Sistema', href: '/admin/settings', icon: Settings },
  ];

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'transparent' }}>
      {/* Mobile Header */}
      <header className="glass mobile-header" style={{ 
        display: 'none', 
        padding: '0.75rem 1.5rem', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100,
        borderBottom: '1px solid var(--border)',
        borderRadius: 0
      }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--primary)' }}>MinhoClean Admin</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => {
              logout();
              router.push('/admin/login');
            }}
            style={{ color: '#ef4444', display: 'flex', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <LogOut size={22} />
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            style={{ color: 'var(--primary)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Sidebar */}
        <aside className={`glass ${isMobileMenuOpen ? 'active' : ''}`} style={{ 
          width: '280px', 
          borderRight: '1px solid var(--border)', 
          padding: '2rem 1.5rem', 
          display: 'flex', 
          flexDirection: 'column', 
          borderRadius: 0, 
          position: 'relative', 
          zIndex: 90,
          transition: 'transform 0.3s ease'
        }} id="admin-sidebar">
          <div style={{ marginBottom: '1.5rem' }} className="sidebar-logo">
            <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              MinhoClean
            </h2>
            <h2 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '1rem' }}>Painel Admin</h2>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.85rem 1.25rem',
                      borderRadius: '1rem',
                      fontWeight: 700,
                      transition: 'var(--transition)',
                      backgroundColor: isActive ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                      color: isActive ? 'var(--accent)' : 'var(--primary-light)',
                      border: isActive ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid transparent'
                    }}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            <button 
              onClick={() => {
                logout();
                router.push('/admin/login');
              }} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                padding: '1rem 1.25rem', 
                color: '#ef4444', 
                fontWeight: 700,
                width: '100%',
                textAlign: 'left',
                borderRadius: '1rem',
                transition: 'var(--transition)'
              }}
              className="logout-btn"
            >
              <LogOut size={20} />
              <span>Sair do Sistema</span>
            </button>
          </div>
        </aside>

        {/* Content */}
        <main style={{ flex: 1, padding: '1.5rem 2rem', overflowY: 'auto', backgroundColor: 'rgba(248, 250, 252, 0.4)' }} id="admin-main">
          {children}
        </main>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .mobile-header {
            display: flex !important;
          }
          #admin-sidebar {
            position: fixed !important;
            top: 64px !important;
            left: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            transform: translateX(-100%);
          }
          #admin-sidebar.active {
            transform: translateX(0);
          }
          #admin-main {
            padding: 1.5rem !important;
          }
          .sidebar-logo h2:first-child {
            display: none !important;
          }
        }
        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.05);
        }
      `}</style>
    </div>
  );
}
