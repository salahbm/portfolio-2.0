export const TanStackQueryIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    {...props}
    width='114'
    height='114'
    viewBox='0 0 114 114'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs>
      <linearGradient
        id='tanstack-gradient'
        x1='0%'
        y1='0%'
        x2='100%'
        y2='100%'
      >
        <stop offset='0%' stopColor='#FF4154' />
        <stop offset='50%' stopColor='#FFC800' />
        <stop offset='100%' stopColor='#00D8FF' />
      </linearGradient>
    </defs>
    <rect width='114' height='114' fill='#000000' />
    <circle cx='57' cy='35' r='12' fill='url(#tanstack-gradient)' />
    <circle cx='35' cy='70' r='12' fill='url(#tanstack-gradient)' />
    <circle cx='79' cy='70' r='12' fill='url(#tanstack-gradient)' />
    <path
      d='M57 35L35 70M57 35L79 70'
      stroke='url(#tanstack-gradient)'
      strokeWidth='4'
    />
  </svg>
)
