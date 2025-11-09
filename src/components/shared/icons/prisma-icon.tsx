export const PrismaIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg
    {...props}
    width='114'
    height='114'
    viewBox='0 0 114 114'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs>
      <linearGradient id='prisma-gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stopColor='#5A67D8' />
        <stop offset='100%' stopColor='#2D3748' />
      </linearGradient>
    </defs>
    <rect width='114' height='114' fill='#0C344B' />
    <path d='M57 15L30 75L45 90L75 35L57 15Z' fill='url(#prisma-gradient)' />
    <path d='M45 90L57 95L75 35L57 15L45 90Z' fill='white' opacity='0.9' />
  </svg>
)
