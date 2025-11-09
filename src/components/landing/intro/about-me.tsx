const AboutMe: React.FC = () => {
  return (
    <div className='w-full overflow-hidden bg-foreground py-20 md:py-32 lg:py-40'>
      <div className='flex whitespace-nowrap'>
        <p
          className='about-me-text inline-block font-monument-extended font-extrabold leading-none text-background'
          style={{ fontSize: 'clamp(4rem, 15vw, 10rem)' }}
        >
          about me * about me * about me * about me * about me * about me *
        </p>
      </div>
    </div>
  )
}

export { AboutMe }
