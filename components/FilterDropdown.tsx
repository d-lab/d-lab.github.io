'use client';

import { useEffect, useId, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';

export type FilterDropdownGroup = {
  label?: string;
  options: string[];
};

type FilterDropdownProps = {
  label: string;
  groups: FilterDropdownGroup[];
  selected: string[];
  // Results each option would give with the other filters; options with none are dimmed.
  counts: Map<string, number>;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onToggle: (option: string) => void;
  onClear: () => void;
  searchPlaceholder?: string;
};

// Space kept between an open menu and the edge of the screen.
const SCREEN_MARGIN = 16;

// Normalised for the in-menu search: lowercase, accents removed.
const normalize = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// A pill button that opens a floating menu of tick boxes. Several options can be ticked.
export default function FilterDropdown({
  label,
  groups,
  selected,
  counts,
  isOpen,
  onOpenChange,
  onToggle,
  onClear,
  searchPlaceholder,
}: FilterDropdownProps) {
  const panelId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [menuQuery, setMenuQuery] = useState('');
  // Horizontal shift that keeps the menu inside the screen, measured when it opens.
  const [panelOffset, setPanelOffset] = useState(0);
  // Kept in a ref so the effect below runs only when the menu opens or closes,
  // not on every render (which would pull focus back to the menu's first field).
  const onOpenChangeRef = useRef(onOpenChange);

  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  });

  // Close on a click outside, and move focus into the menu when it opens.
  useEffect(() => {
    if (!isOpen) {
      setMenuQuery('');
      return;
    }

    const wrapperLeft = wrapperRef.current?.getBoundingClientRect().left ?? 0;
    const panelWidth = panelRef.current?.offsetWidth ?? 0;
    const overflow = wrapperLeft + panelWidth - (window.innerWidth - SCREEN_MARGIN);
    setPanelOffset(overflow > 0 ? -Math.min(overflow, wrapperLeft - SCREEN_MARGIN) : 0);

    panelRef.current?.querySelector<HTMLElement>('input')?.focus();

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) onOpenChangeRef.current(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  const handleButtonClick = () => {
    onOpenChange(!isOpen);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && isOpen) {
      event.stopPropagation();
      onOpenChange(false);
      buttonRef.current?.focus();
    }
  };

  const handleMenuQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMenuQuery(event.target.value);
  };

  const handleDone = () => {
    onOpenChange(false);
    buttonRef.current?.focus();
  };

  const isActive = selected.length > 0;
  const buttonText = selected.length === 1 ? selected[0] : isActive ? `${label} · ${selected.length}` : label;
  const terms = normalize(menuQuery).split(/\s+/).filter(Boolean);
  const visibleGroups = groups
    .map((group) => ({
      ...group,
      options: group.options.filter((option) => terms.every((term) => normalize(option).includes(term))),
    }))
    .filter((group) => group.options.length > 0);

  return (
    <div ref={wrapperRef} className="relative" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleButtonClick}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isActive ? `${label}: ${selected.join(', ')}` : label}
        className={`inline-flex h-11 max-w-[16rem] items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-150 ease-[var(--ease-out-quart)] ${
          isActive
            ? 'border-brand bg-brand text-brand-foreground hover:opacity-90'
            : 'border-border-strong bg-surface-raised text-foreground hover:border-foreground'
        }`}
      >
        <span className="truncate">{buttonText}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ease-[var(--ease-out-quint)] ${isOpen ? 'rotate-180' : ''} ${
            isActive ? 'text-gold' : 'text-muted'
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          ref={panelRef}
          id={panelId}
          role="group"
          aria-label={`${label} filter`}
          style={{ left: panelOffset }}
          className="dropdown-enter absolute top-full z-30 mt-2 w-[min(20rem,calc(100vw-2rem))] origin-top rounded-xl border border-border bg-surface-raised shadow-card"
        >
          {searchPlaceholder ? (
            <div className="relative border-b border-border p-2">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                type="search"
                value={menuQuery}
                onChange={handleMenuQueryChange}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="h-10 w-full rounded-lg bg-surface-tint pl-9 pr-3 text-sm text-foreground placeholder:text-muted"
              />
            </div>
          ) : null}

          <div className="max-h-80 overflow-y-auto overscroll-contain p-1.5">
            {visibleGroups.length === 0 ? <p className="px-3 py-3 text-sm text-muted">No matches</p> : null}
            {visibleGroups.map((group) => (
              <div key={group.label ?? 'options'} className="[&+&]:mt-1.5">
                {group.label ? (
                  <p className="px-3 pb-1 pt-2 font-mono text-sm uppercase tracking-[0.1em] text-muted">{group.label}</p>
                ) : null}
                <ul>
                  {group.options.map((option) => {
                    const isChecked = selected.includes(option);
                    const hasResults = (counts.get(option) ?? 0) > 0;

                    return (
                      <li key={option}>
                        <label
                          className={`group flex min-h-10 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150 hover:bg-surface-tint ${
                            hasResults || isChecked ? 'text-foreground' : 'text-muted'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => onToggle(option)}
                            className="peer sr-only"
                          />
                          <span
                            aria-hidden="true"
                            className={`flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-[0.3rem] border transition-colors duration-150 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--focus-ring)] ${
                              isChecked ? 'border-accent bg-accent text-background' : 'border-border-strong group-hover:border-foreground'
                            }`}
                          >
                            {isChecked ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                          </span>
                          <span className="leading-5">{option}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-border px-3 py-1.5">
            <button
              type="button"
              onClick={onClear}
              disabled={!isActive}
              className="inline-flex min-h-9 items-center px-1 text-sm font-medium text-accent transition-colors hover:text-accent-hover disabled:text-muted disabled:opacity-60"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleDone}
              className="inline-flex min-h-9 items-center rounded-full bg-foreground px-4 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
