export const CloudflareIcon = (props: React.HTMLAttributes<SVGElement>) => (
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
        id='cloudflare-gradient'
        x1='0%'
        y1='0%'
        x2='100%'
        y2='0%'
      >
        <stop offset='0%' stopColor='#F38020' />
        <stop offset='100%' stopColor='#FAAE40' />
      </linearGradient>
    </defs>
    <rect width='114' height='114' fill='#F38020' />
    <path
      d='M20 60C20 60 25 50 35 50H70C80 50 85 55 85 60H20Z'
      fill='url(#cloudflare-gradient)'
    />
    <path
      d='M25 60H90C90 60 92 62 92 65C92 68 90 70 87 70H30C25 70 22 67 22 63C22 61 23 60 25 60Z'
      fill='white'
    />
  </svg>
)
