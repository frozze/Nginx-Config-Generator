'use client';

import Link from 'next/link';
import { Server } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center px-4">
            <Link href="/" className="flex items-center gap-2.5 mb-8 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400 group-hover:bg-accent-500/25 transition-colors">
                    <Server className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-dark-300">
                    Nginx<span className="text-accent-400">Config</span>
                </span>
            </Link>
            {children}
        </div>
    );
}
