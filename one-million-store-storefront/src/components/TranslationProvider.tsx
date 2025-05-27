"use client";

import { appWithTranslation } from "next-i18next";

const TranslationProvider = appWithTranslation(({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
});

export default TranslationProvider;
