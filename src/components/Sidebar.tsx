
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Plus, FileText, BarChart2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: FileText },
    { name: 'Create Team', href: '/create-team', icon: Plus },
    { name: 'Employee List', href: '/employee-list', icon: Users },
    { name: 'Team Performance', href: '/team-performance', icon: BarChart2 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col w-64 bg-sidebar text-sidebar-foreground border-r border-gray-200">
      <div className="flex items-center h-16 px-4 border-b border-gray-200 bg-sidebar">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-blue-500 text-2xl font-bold">Floww</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
