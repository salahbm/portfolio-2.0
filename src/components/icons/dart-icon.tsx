export const DartIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    {...props}
    width='114'
    height='114'
    viewBox='0 0 114 114'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs>
      <linearGradient id='dart-gradient-1' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stopColor='#00D2B8' />
        <stop offset='100%' stopColor='#55DDCA' />
      </linearGradient>
      <linearGradient id='dart-gradient-2' x1='0%' y1='0%' x2='100%' y2='0%'>
        <stop offset='0%' stopColor='#0075C9' />
        <stop offset='100%' stopColor='#00A4E4' />
      </linearGradient>
    </defs>
    <path
      d='M20 20L57 20L94 57L94 94L57 94L20 57Z'
      fill='url(#dart-gradient-1)'
    />
    <path d='M57 20L94 57L57 94Z' fill='url(#dart-gradient-2)' opacity='0.8' />
    <path d='M20 57L57 94L57 20Z' fill='#00D2B8' opacity='0.5' />
    <circle cx='85' cy='85' r='6' fill='white' />
  </svg>
)
