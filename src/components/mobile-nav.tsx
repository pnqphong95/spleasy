'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ModeToggle } from '@/components/mode-toggle';
import { Separator } from '@/components/ui/separator';
import type { Dictionary } from '@/i18n/types';

interface MobileNavProps {
  dict: Dictionary;
}

export function MobileNav({ dict }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="flex items-center gap-2 px-6 text-left">
          <SheetTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon-universal.svg" alt="Spleasy Logo" className="h-full w-full" />
            </div>
            <span className="text-xl font-bold tracking-tight">Spleasy</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-3">
            <SheetClose asChild>
              <Link
                href="#features"
                className="hover:text-primary flex items-center gap-2 text-lg font-medium transition-colors"
              >
                {dict.navigation.features}
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="#" className="hover:text-primary text-lg font-medium transition-colors">
                {dict.navigation.howItWorks}
              </Link>
            </SheetClose>
          </div>

          <Separator />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{dict.navigation.language}</span>
              <LanguageSwitcher />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{dict.navigation.theme}</span>
              <ModeToggle />
            </div>
            <SheetClose asChild>
              <Link
                href="/join"
                className="hover:text-primary text-lg font-medium transition-colors"
              >
                {dict.navigation.joinGroup}
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
