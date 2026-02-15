export interface FaqItem {
  question: string;
  answer: string;
}

export interface Dictionary {
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    keywords: string[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  navigation: {
    features: string;
    howItWorks: string;
    joinGroup: string;
    startSplitting: string;
    language: string;
    theme: string;
  };
  home: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    createGroup: string;
    viewDemo: string;
  };
  features: {
    instantAccess: {
      title: string;
      description: string;
    };
    splitEasy: {
      title: string;
      description: string;
    };
    transparentSafe: {
      title: string;
      description: string;
    };
  };
  footer: {
    copyright: string;
  };
}
