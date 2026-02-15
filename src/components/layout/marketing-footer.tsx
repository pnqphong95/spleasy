import type { Dictionary } from '@/i18n/types';

interface MarketingFooterProps {
  dict: Dictionary;
}

export function MarketingFooter({ dict }: MarketingFooterProps) {
  return (
    <footer className="text-muted-foreground px-6 py-12 text-center text-sm">
      <p>
        © {new Date().getFullYear()} {dict.footer.copyright}
      </p>
    </footer>
  );
}
