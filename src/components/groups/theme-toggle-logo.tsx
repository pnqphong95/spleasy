'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface ThemeToggleLogoProps {
    className?: string;
}

export function ThemeToggleLogo({ className }: ThemeToggleLogoProps) {
    const { setTheme, theme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={cn(
                "flex items-center justify-center rounded-[2rem] shadow-sm mb-2 overflow-hidden transition-transform hover:scale-105 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                className || "h-20 w-20"
            )}
            aria-label="Toggle theme"
            title="Toggle theme"
        >
            <Image
                src="/icon-universal.svg"
                alt="Spleasy Logo"
                width={96}
                height={96}
                className="h-full w-full object-cover"
                priority
            />
        </button>
    );
}
