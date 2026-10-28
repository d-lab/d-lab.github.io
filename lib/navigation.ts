export type NavigationItem = {
  href: string;
  label: string;
};

// Single source for the desktop menu, mobile menu, and footer.
export const navigationItems: NavigationItem[] = [
  { href: '/about/', label: 'About' },
  { href: '/people/', label: 'People' },
  { href: '/publications/', label: 'Publications' },
  { href: '/blog/', label: 'Blog' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/visiting/', label: 'Visiting' },
  { href: '/sponsors/', label: 'Sponsors' },
];

export const isActivePath = (pathname: string, href: string) => {
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return normalizedPath === href || normalizedPath.startsWith(href);
};
