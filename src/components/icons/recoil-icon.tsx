export const RecoilIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    {...props}
    width='114'
    height='114'
    viewBox='0 0 114 114'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect width='114' height='114' fill='#3578E5' />
    <circle cx='35' cy='57' r='8' fill='white' />
    <circle cx='57' cy='35' r='8' fill='white' />
    <circle cx='79' cy='57' r='8' fill='white' />
    <circle cx='57' cy='79' r='8' fill='white' />
    <path
      d='M35 57L57 35M57 35L79 57M79 57L57 79M57 79L35 57'
      stroke='white'
      strokeWidth='3'
    />
    <circle
      cx='57'
      cy='57'
      r='6'
      fill='#3578E5'
      stroke='white'
      strokeWidth='2'
    />
  </svg>
)
