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
    back: string;
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
    header: {
      title: string;
      description: string;
    };
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
  groups: {
    subtitle: string;
    tabs: {
      create: string;
      join: string;
    };
    create: {
      title: string;
      nameLabel: string;
      namePlaceholder: string;
      groupNameLabel: string;
      groupNameOptional: string;
      groupNameHelp: string;
      submit: string;
    };
    join: {
      title: string;
      description: string;
      nameLabel: string;
      namePlaceholder: string;
      pinLabel: string;
      pinPlaceholder: string;
      submit: string;
      errorPinLength: string;
      errorNotFound: string;
      errorGeneric: string;
    };
  };
  dashboard: {
    loading: string;
    errorTitle: string;
    errorNotFound: string;
    errorBackHome: string;
    tabs: {
      activity: string;
      balances: string;
      settings: string;
    };
    header: {
      pin: string;
      copyLink: string;
      linkCopied: string;
      shareTitle: string;
      shareText: string;
      shareVia: string;
    };
    activity: {
      title: string;
      total: string;
      loading: string;
      emptyTitle: string;
      emptyDescription: string;
      paidBy: string;
      deleteLabel: string;
      deleteSuccess: string;
      totalSpend: string;
      yourBalance: string;
    };
    balances: {
      title: string;
      members: string;
      isOwed: string;
      owes: string;
      settled: string;
      settleButton: string;
      settledAll: string;
      owesTo: string;
      totalSpend: string;
      yourBalance: string;
    };
    addExpense: {
      title: string;
      amountLabel: string;
      descriptionLabel: string;
      descriptionPlaceholder: string;
      paidByLabel: string;
      splitWithLabel: string;
      selectAll: string;
      deselectAll: string;
      submit: string;
      submitting: string;
      successToast: string;
      errorAmount: string;
      errorDescription: string;
      errorInvolved: string;
      errorGeneric: string;
    };
    settleUp: {
      title: string;
      description: string;
      whoPaid: string;
      toWhom: string;
      amountLabel: string;
      submit: string;
      submitting: string;
      errorDetails: string;
      errorSameUser: string;
      successToast: string;
      errorGeneric: string;
    };
    settings: {
      title: string;
      groupNameLabel: string;
      updateNameSuccess: string;
      updateNameError: string;
      quickAccessLabel: string;
      copyPinSuccess: string;
      copyLinkSuccess: string;
      shareTitle: string;
      shareText: string;
      shareButton: string;
      membersLabel: string;
      membersTotal: string;
      joinedAt: string;
      comingSoon: string;
      leaveGroup: string;
      leaveGroupConfirm: string;
      appearance: string;
      lightMode: string;
      darkMode: string;
      language: string;
      pinLabel: string;
    };
  };
}
