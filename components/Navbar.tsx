'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import { isActivePath, navigationItems } from '@/lib/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className="fixed left-0 right-0 top-0 z-50 h-14 bg-brand text-brand-foreground"
      >
        <div className="mx-auto flex h-full w-full max-w-frame items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-base font-semibold tracking-tight text-brand-foreground"
            onClick={handleMenuClose}
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            DLab
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative inline-flex min-h-11 items-center px-3 text-sm font-medium transition-colors duration-150 ease-[var(--ease-out-quart)] after:absolute after:bottom-1.5 after:left-3 after:right-3 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-150 ${
                    isActive
                      ? 'text-brand-foreground after:scale-x-100'
                      : 'text-brand-muted after:scale-x-0 hover:text-brand-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <span aria-hidden="true" className="ml-2 mr-1 h-4 w-px bg-brand-border" />
            <ThemeSwitcher />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={handleMenuToggle}
            className="flex h-11 w-11 items-center justify-center rounded-md text-brand-muted transition-colors duration-150 hover:text-brand-foreground lg:hidden"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>

        <div
          id="mobile-navigation"
          hidden={!isMenuOpen}
          className="absolute left-0 right-0 top-14 border-t border-brand-border bg-brand shadow-[0_18px_40px_-28px_var(--navigation-shadow)] lg:hidden"
        >
          <div className="mx-auto max-w-frame space-y-1 px-4 py-4 sm:px-6">
            {navigationItems.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleMenuClose}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-11 items-center border-l-2 px-3 font-medium transition-colors duration-150 ${
                    isActive
                      ? 'border-gold text-brand-foreground'
                      : 'border-transparent text-brand-muted hover:text-brand-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-2 flex items-center justify-between border-t border-brand-border pt-2">
              <span className="px-3 text-sm text-brand-muted">Theme</span>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </nav>

      <div className="h-14 w-full" aria-hidden="true" />
    </>
  );
}
