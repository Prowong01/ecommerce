'use client';

import React, {useState} from 'react';
import { cn } from "@/lib/utils";
import SuperAdminSidebar from "@/components/super-admin/sidebar";

const SuperAdminLayout = ({children}: {children: React.ReactNode}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className={`min-h-screen bg-background`}>
            <SuperAdminSidebar
                isOpen={isSidebarOpen}
                toggle={()=> setIsSidebarOpen(!isSidebarOpen)}
            />

            <div
                className={cn(
                    "transition-all duration-300",
                    isSidebarOpen ? "ml-64" : "ml-16",
                    "min-h-screen"
                )}
            >
                {children}
            </div>
        </div>
    )
}
export default SuperAdminLayout
