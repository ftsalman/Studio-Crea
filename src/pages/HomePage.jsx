import { usePageTitle } from '@hooks/usePageTitle'
import Hero from '@features/home/Hero'
import Intro from '@features/home/Intro'
import Reel from '@features/home/Reel'
import FeaturedWork from '@features/home/FeaturedWork'
import Services from '@features/home/Services'
import CtaMarquee from '@features/home/CtaMarquee'

export default function HomePage() {
  usePageTitle()
  return (
    <>
      <Hero />
      <Intro />
      <Reel />
      <FeaturedWork />
      <Services />
      <CtaMarquee />
    </>
  )
}
