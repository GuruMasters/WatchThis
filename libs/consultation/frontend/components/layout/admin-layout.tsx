import React from 'react';
import {
  Users,
  Calendar,
  Settings,
  BarChart3,
  LogOut,
  Menu,
  X,
  UserCheck,
  Building2,
  MessageSquare,
  Bell,
  Home
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home, current: true },
    { name: 'Consultations', href: '/admin/consultations', icon: Calendar, current: false },
    { name: 'Team Management', href: '/admin/team', icon: Users, current: false },
    { name: 'Services', href: '/admin/services', icon: UserCheck, current: false },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare, current: false },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3, current: false },
    { name: 'Settings', href: '/admin/settings', icon: Settings, current: false },
  ];

  const Sidebar = () => (
    <div className="w-64 min-h-screen glass-card border-r border-gray-200 bg-white/95">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-glow">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-600">WatchThis</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                  item.current
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-muted hover:text-text hover:bg-hover'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-border">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted hover:text-text hover:bg-hover w-full transition-all">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-bg">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 lg:static lg:translate-x-0 transform transition-transform duration-300 ease-in-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="enterprise-header">
          <button
            onClick={() => setSidebarOpen(true)}
            className="enterprise-btn enterprise-btn--ghost lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="enterprise-badge enterprise-badge--success">
              <div className="w-2 h-2 rounded-full bg-success-600 animate-pulse"></div>
              System Online
            </div>
            <div className="enterprise-badge enterprise-badge--info">
              Admin Mode
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="enterprise-btn enterprise-btn--ghost p-2">
              <Bell className="w-5 h-5" />
            </button>
            <div className="enterprise-avatar enterprise-avatar--md enterprise-avatar--primary">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;