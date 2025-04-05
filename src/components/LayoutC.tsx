
import React, { ReactNode } from 'react';
import SidebarC from './SidebarC';
import { useToast } from "@/hooks/use-toast";

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutC({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarC />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
