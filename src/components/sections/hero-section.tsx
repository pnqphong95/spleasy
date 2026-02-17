import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Dictionary } from '@/i18n/types';

interface HeroSectionProps {
  dict: Dictionary;
}

export function HeroSection({ dict }: HeroSectionProps) {
  return (
    <section className="relative mx-auto flex max-w-7xl flex-col items-center overflow-hidden px-4 pt-20 pb-32 text-center md:px-6 md:pt-32 md:pb-40">
      {/* Background blending elements - Updated to Violet/Primary */}
      <div className="bg-primary/10 absolute top-0 right-0 -z-10 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/4 rounded-full blur-[120px]"></div>
      <div className="bg-primary/15 absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/4 rounded-full blur-[120px]"></div>

      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div className="relative z-10 order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <div className="border-border/50 bg-background/60 text-muted-foreground mb-8 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium shadow-sm backdrop-blur-xl">
            <span className="bg-primary mr-2 flex h-2 w-2 rounded-full"></span>
            {dict.home.badge}
          </div>

          {/* Typography updated to font-heading (Outfit) */}
          <h1 className="font-heading from-foreground to-foreground/70 mb-8 bg-gradient-to-b bg-clip-text text-5xl leading-[1.1] font-bold tracking-tight text-balance text-transparent sm:text-6xl md:text-7xl">
            {dict.home.title} <br />
            <span className="text-primary mt-2 block">{dict.home.subtitle}</span>
          </h1>

          <p className="text-muted-foreground mb-10 max-w-lg text-xl leading-relaxed text-balance lg:max-w-2xl">
            {dict.home.description}
          </p>

          <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
            <Link
              href="/create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 group shadow-primary/20 flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 sm:w-auto"
            >
              {dict.home.createGroup}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#demo"
              className="border-border/50 bg-background/80 hover:bg-muted/50 hover:text-foreground flex w-full items-center justify-center rounded-full border px-8 py-4 font-medium backdrop-blur-sm transition-all sm:w-auto"
            >
              {dict.home.viewDemo}
            </Link>
          </div>
        </div>

        <div className="relative order-1 hidden h-full items-center justify-center lg:order-2 lg:flex">
          {/* Seamless blend with background shapes - Updated gradient */}
          <div className="from-background/0 via-background/0 to-primary/0 absolute inset-0 -z-10 rounded-full bg-gradient-to-tr blur-3xl"></div>

          <Image
            src="/hero-illustration.svg"
            alt="Spleasy Bill Splitting Illustration"
            width={600}
            height={400}
            className="animate-in fade-in zoom-in slide-in-from-bottom-10 h-auto w-full object-contain duration-1000"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
