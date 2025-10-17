import React from 'react';
import {
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  Menu,
  Calendar,
  MessageSquare,
  Users,
  Plus
} from 'lucide-react';

export const DashboardHeader: React.FC = () => {
  const [notifications] = React.useState(3); // Mock notification count

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Users, current: true },
    { name: 'My Bookings', href: '/bookings', icon: Calendar, current: false },
    { name: 'Messages', href: '/messages', icon: MessageSquare, current: false },
    { name: 'Profile', href: '/profile', icon: User, current: false },
  ];

  const quickActions = [
    { name: 'New Booking', icon: Plus, href: '/booking/new' },
    { name: 'Send Message', icon: MessageSquare, href: '/messages/new' },
    { name: 'View Calendar', icon: Calendar, href: '/calendar' },
  ];

  return (
    <header className="enterprise-header">
      {/* Mobile menu button */}
      <button className="enterprise-btn enterprise-btn--ghost lg:hidden">
        <Menu className="w-5 h-5" />
      </button>

      {/* Navigation */}
      <nav className="hidden lg:flex items-center gap-1">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              item.current
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted hover:text-text hover:bg-hover'
            }`}
          >
            <item.icon className="w-4 h-4 inline mr-2" />
            {item.name}
          </a>
        ))}
      </nav>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        {/* Quick Actions Dropdown */}
        <div className="relative group">
          <button className="enterprise-btn enterprise-btn--ghost p-2">
            <Plus className="w-5 h-5" />
          </button>

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="p-2">
              {quickActions.map((action) => (
                <a
                  key={action.name}
                  href={action.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:text-text hover:bg-hover transition-all"
                >
                  <action.icon className="w-4 h-4" />
                  {action.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-muted" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="enterprise-form-input pl-10 pr-4 py-2 w-64"
          />
        </div>

        {/* Notifications */}
        <button className="enterprise-btn enterprise-btn--ghost p-2 relative">
          <Bell className="w-5 h-5" />
          {notifications > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
              {notifications}
            </div>
          )}
        </button>

        {/* Settings */}
        <button className="enterprise-btn enterprise-btn--ghost p-2">
          <Settings className="w-5 h-5" />
        </button>

        {/* User Menu */}
        <div className="relative group">
          <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-hover transition-all">
            <div className="enterprise-avatar enterprise-avatar--md enterprise-avatar--primary">
              A
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-text">Alex Rodriguez</div>
              <div className="text-xs text-muted">alex@techflow.com</div>
            </div>
          </button>

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="p-2">
              <div className="px-3 py-2 border-b border-border mb-2">
                <div className="font-medium text-text">Alex Rodriguez</div>
                <div className="text-sm text-muted">alex@techflow.com</div>
              </div>

              {[
                { name: 'Profile Settings', href: '/profile', icon: User },
                { name: 'Account Settings', href: '/settings', icon: Settings },
                { name: 'Help & Support', href: '/help', icon: MessageSquare },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:text-text hover:bg-hover transition-all"
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </a>
              ))}

              <div className="border-t border-border mt-2 pt-2">
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-error hover:bg-error/10 transition-all w-full">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
