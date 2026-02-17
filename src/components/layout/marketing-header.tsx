import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { MobileNav } from '@/components/mobile-nav';
import type { Dictionary } from '@/i18n/types';

interface MarketingHeaderProps {
  dict: Dictionary;
}

export function MarketingHeader({ dict }: MarketingHeaderProps) {
  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-50 flex items-center justify-between border-b px-6 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center">
          <Image
            src="/icon-universal.svg"
            alt="Spleasy Logo"
            width={32}
            height={32}
            className="h-full w-full"
            unoptimized
          />
        </div>
        <span className="text-xl font-bold tracking-tight">Spleasy</span>
      </div>
      <nav className="text-muted-foreground hidden items-center gap-6 text-sm font-medium md:flex">
        <Link href="#features" className="hover:text-foreground transition-colors">
          {dict.navigation.features}
        </Link>
        <Link href="#" className="hover:text-foreground transition-colors">
          {dict.navigation.howItWorks}
        </Link>
      </nav>
      <div className="hidden items-center gap-4 md:flex">
        <LanguageSwitcher />
        <ModeToggle />
        <Link href="/join" className="hover:text-primary text-sm font-medium transition-colors">
          {dict.navigation.joinGroup}
        </Link>
        <Link
          href="/create"
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20 rounded-full px-4 py-2 text-sm font-medium shadow-lg transition-colors"
        >
          {dict.navigation.startSplitting}
        </Link>
      </div>

      {/* Mobile Header Actions */}
      <div className="flex items-center gap-2 md:hidden">
        <Link
          href="/create"
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap shadow-lg transition-colors"
        >
          {dict.navigation.startSplitting}
        </Link>
        <MobileNav dict={dict} />
      </div>
    </header>
  );
}
