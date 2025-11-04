import localFont from 'next/font/local'

export const monumentExtended = localFont({
  src: '../../public/fonts/monument-extended.otf',
  variable: '--font-monument-extended',
  display: 'swap',
  weight: '900',
})

export const syne = localFont({
  src: '../../public/fonts/syne.ttf',
  variable: '--font-syne',
  display: 'swap',
})

export const sfMedium = localFont({
  src: '../../public/fonts/san-francisco-medium.otf',
  variable: '--font-sf-medium',
  display: 'swap',
  weight: '500',
  style: 'normal',
})
