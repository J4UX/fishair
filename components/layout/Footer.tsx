"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                <Image
                  src="/logo.jpg"
                  alt="FISH.AIR logo"
                  width={32}
                  height={32}
                  className="size-8 object-contain"
                />
              </div>
              <span className="text-lg font-bold">
                <span className="text-primary">FISH</span>.AIR
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">{t("about")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">{t("quickLinks")}</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/mapa"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {tNav("map")}
                </Link>
              </li>
              <li>
                <Link
                  href="/alerty"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {tNav("alerts")}
                </Link>
              </li>
              <li>
                <Link
                  href="/rybopedia"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {tNav("rybopedia")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">{t("contact")}</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <span className="text-sm text-muted-foreground">
                  kontakt@fishair.pl
                </span>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Empty column for balance */}
          <div />
        </div>

        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FISH.AIR. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
