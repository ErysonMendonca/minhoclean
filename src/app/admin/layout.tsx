'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Settings, ListTodo, LogOut } from 'lucide-react';
import { useApp } from '@/lib/store';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout } = useApp();

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated && pathname !== '/admin/login') {
    return null; // Or a loading spinner
  }

  const menuItems = [
    { name: 'CRM / Kanban', href: '/admin/crm', icon: LayoutDashboard },
    { name: 'Gerir Serviços', href: '/admin/services', icon: ListTodo },
    { name: 'Configurações Sistema', href: '/admin/settings', icon: Settings },
  ];

  // If it's the login page, don't show the sidebar or the flex container
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', backgroundColor: 'transparent', position: 'relative' }}>
      {/* Overlay to soften background distraction */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        backgroundColor: 'rgba(224, 242, 254, 0.7)', // Light blue tint
        backdropFilter: 'blur(3px)', // Subtle blur to soften bubbles
        zIndex: -1,
        pointerEvents: 'none'
      }} />
      
      {/* Sidebar */}
      <aside className="glass" style={{ width: '280px', borderRight: '1px solid var(--border)', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', borderRadius: 0, borderTop: 'none', borderBottom: 'none', borderLeft: 'none', position: 'relative', zIndex: 10 }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>Menu Administrativo</h2>
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
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    fontWeight: 600,
                    transition: 'var(--transition)',
                    backgroundColor: isActive ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                    color: isActive ? 'var(--accent)' : 'var(--primary-light)'
                  }}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <button 
            onClick={() => {
              logout();
              router.push('/admin/login');
            }} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              padding: '0.75rem 1rem', 
              color: 'var(--text-muted)', 
              fontWeight: 500,
              width: '100%',
              textAlign: 'left'
            }}
          >
            <LogOut size={20} />
            <span>Sair do Painel</span>
          </button>
        </div>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
