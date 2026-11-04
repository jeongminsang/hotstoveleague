"use client";

import { useLanguage } from "./language-provider";

export default function HomeHero() {
  const { t } = useLanguage();

  return (
    <div className="text-center space-y-1">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
        {t("title")}
      </h1>
      <p className="text-sm text-muted-foreground">
        {t("subtitle")}
      </p>
    </div>
  );
}

