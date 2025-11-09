export const NeonIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    {...props}
    width='114'
    height='114'
    viewBox='0 0 114 114'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect width='114' height='114' fill='#000000' />
    <defs>
      <linearGradient id='neon-gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stopColor='#00E599' />
        <stop offset='100%' stopColor='#00C2FF' />
      </linearGradient>
    </defs>
    <path
      d='M30 50L30 80L45 80L45 65L60 65L60 80L75 80L75 50L60 50L60 55L45 55L45 50L30 50Z'
      fill='url(#neon-gradient)'
    />
    <circle cx='57' cy='35' r='8' fill='url(#neon-gradient)' />
  </svg>
)
