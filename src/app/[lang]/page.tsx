import Link from "next/link";
import { Zap, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="flex items-center gap-2">
          {/* Spleasy Icon */}
          <div className="w-8 h-8 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/spleasy-icon.svg" alt="Spleasy Logo" className="w-full h-full" />
          </div>
          <span className="text-xl font-bold tracking-tight">Spleasy</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">{dict.navigation.features}</Link>
          <Link href="#" className="hover:text-foreground transition-colors">{dict.navigation.howItWorks}</Link>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <ModeToggle />
          <Link
            href="/join"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            {dict.navigation.joinGroup}
          </Link>
          <Link
            href="/create"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            {dict.navigation.startSplitting}
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 pt-20 pb-32 md:pt-32 md:pb-40 flex flex-col items-center text-center overflow-hidden max-w-7xl mx-auto">
          {/* Background blending element */}
          <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4"></div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 relative z-10">
              <div className="inline-flex items-center rounded-full border border-border bg-background/50 px-3 py-1 text-sm font-medium text-muted-foreground mb-6 backdrop-blur-md shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                {dict.home.badge}
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent leading-[1.1]">
                {dict.home.title} <br />
                <span className="text-primary block mt-2">{dict.home.subtitle}</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg">
                {dict.home.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/create"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25 group"
                >
                  {dict.home.createGroup}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#demo"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-border bg-background hover:bg-muted/50 transition-all font-medium flex items-center justify-center"
                >
                  {dict.home.viewDemo}
                </Link>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 hidden lg:flex justify-center h-full items-center">
              {/* Seamless blend with background shapes */}
              <div className="absolute inset-0 bg-gradient-to-tr from-background/0 via-background/0 to-primary/0 rounded-full blur-3xl -z-10"></div>

              {/* Image with radial mask for seamless blending */}
              {/* High-quality vector illustration */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-illustration.svg"
                alt="Spleasy Bill Splitting Illustration"
                className="w-full h-auto object-contain animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-10"
              />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="px-6 py-20 bg-muted/30 border-y border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-background p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{dict.features.instantAccess.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {dict.features.instantAccess.description}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-background p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{dict.features.splitEasy.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {dict.features.splitEasy.description}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-background p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{dict.features.transparentSafe.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {dict.features.transparentSafe.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Marketing Footer */}
        <footer className="px-6 py-12 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} {dict.footer.copyright}</p>
        </footer>
      </main>
    </div>
  );
}
