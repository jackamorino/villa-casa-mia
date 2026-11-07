export function Logo({ compact = false }: { compact?: boolean }) {
  return <span className={`brand ${compact ? 'brand-compact' : ''}`}>
    <svg viewBox="0 0 100 70" fill="none" aria-hidden="true"><path d="M5 51c15-12 25-13 40-5M59 46c14-12 24-12 36-8M9 61h82M30 57V28l20-13 20 13v29M25 29l25-17 25 17M45 57V43a5 5 0 0 1 10 0v14M37 31v6m26-6v6M50 24v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M17 53c-3-10 0-17 5-23m-4 14-7-4m9-1 7-3" stroke="currentColor" strokeWidth="1.3"/></svg>
    <span><span className="brand-name">Villa Casa Mia</span><span className="brand-place">Arquà Petrarca · Italia</span></span>
  </span>;
}
