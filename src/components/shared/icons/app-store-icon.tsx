export const AppStoreIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    {...props}
    width='114'
    height='114'
    viewBox='0 0 114 114'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs>
      <linearGradient id='appstore-gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
        <stop offset='0%' stopColor='#1A8FE8' />
        <stop offset='100%' stopColor='#0D5FBF' />
      </linearGradient>
    </defs>
    <rect width='114' height='114' fill='url(#appstore-gradient)' rx='24' />
    <path
      d='M45 35L57 55L69 35'
      stroke='white'
      strokeWidth='5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <line
      x1='35'
      y1='75'
      x2='79'
      y2='75'
      stroke='white'
      strokeWidth='5'
      strokeLinecap='round'
    />
    <path
      d='M40 55L50 70'
      stroke='white'
      strokeWidth='5'
      strokeLinecap='round'
    />
    <path
      d='M64 70L74 55'
      stroke='white'
      strokeWidth='5'
      strokeLinecap='round'
    />
  </svg>
)
