// Minimal line-style icon set — replaces emoji across the site.
const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function ShieldIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function PaletteIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3a9 9 0 1 0 0 18c1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H16a4 4 0 0 0 4-4c0-4.4-3.6-8-8-8z" />
      <circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function MegaphoneIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11v2a2 2 0 0 0 2 2h1l4 4V5L6 9H5a2 2 0 0 0-2 2z" />
      <path d="M14 8a4 4 0 0 1 0 8" />
      <path d="M17 5a8 8 0 0 1 0 14" />
    </svg>
  )
}

export function TrendingUpIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  )
}

export function BriefcaseIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  )
}

export function FileTextIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  )
}

export function RocketIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2c3 1.5 5 4.8 5 9 0 2-1 4-2 5l-3 3-3-3c-1-1-2-3-2-5 0-4.2 2-7.5 5-9z" />
      <circle cx="12" cy="9" r="1.6" fill="currentColor" stroke="none" />
      <path d="M8.5 15.5L6 18M15.5 15.5L18 18" />
    </svg>
  )
}

export const ICONS = {
  shield: ShieldIcon,
  palette: PaletteIcon,
  megaphone: MegaphoneIcon,
  trending: TrendingUpIcon,
  briefcase: BriefcaseIcon,
  file: FileTextIcon,
  rocket: RocketIcon,
}

export function ServiceIcon({ name, ...props }) {
  const Cmp = ICONS[name]
  if (!Cmp) return null
  return <Cmp {...props} />
}
