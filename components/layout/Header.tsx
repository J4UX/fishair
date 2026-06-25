"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/src/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { LocaleSwitcher } from "./LocaleSwitcher";
import Image from "next/image";

const navItems = [
  { key: "home", href: "/" },
  { key: "map", href: "/mapa" },
  { key: "alerts", href: "/alerty" },
  { key: "rybopedia", href: "/rybopedia" },
  { key: "profile", href: "/profil" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg ring-offset-background focus-within:ring-2 focus-within:ring-ring">
            <Image
              src="/logo.jpg"
              alt="FISH.AIR logo"
              width={36}
              height={36}
              className="size-9 object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-primary">FISH</span>.AIR
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="text-sm font-medium"
              >
                {t(item.key)}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
              <Menu data-icon="inline-start" />
              <span className="sr-only">Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <nav className="mt-8 flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link key={item.key} href={item.href}>
                    <Button
                      variant={
                        pathname === item.href ? "secondary" : "ghost"
                      }
                      className="w-full justify-start text-base"
                    >
                      {t(item.key)}
                    </Button>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
