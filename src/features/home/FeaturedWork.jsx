import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP } from '@utils/gsap'
import { FEATURED_PROJECTS } from '@constants/projects'
import { ROUTES } from '@constants/routes'
import Eyebrow from '@components/Eyebrow'
import RevealText from '@components/RevealText'
import Button from '@components/Button'
import ProjectCard from '@features/projects/ProjectCard'
import './FeaturedWork.css'

export default function FeaturedWork() {
  const { t } = useTranslation()
  const ref = useRef(null)

  useGSAP(
    () => {
      // the right-hand column travels faster for a staggered, layered feel
      gsap.matchMedia().add('(min-width: 768px)', () => {
        gsap.fromTo(
          '.work__col--b',
          { y: 120 },
          {
            y: -120,
            ease: 'none',
            scrollTrigger: { trigger: '.work__grid', start: 'top bottom', end: 'bottom top', scrub: true },
          }
        )
      })
    },
    { scope: ref }
  )

  const colA = FEATURED_PROJECTS.filter((_, i) => i % 2 === 0)
  const colB = FEATURED_PROJECTS.filter((_, i) => i % 2 === 1)

  return (
    <section ref={ref} className="work container">
      <div className="work__head">
        <div>
          <Eyebrow index="02">{t('work.eyebrow')}</Eyebrow>
          <RevealText as="h2" type="chars" className="work__title">
            {t('work.title')}
          </RevealText>
        </div>
        <div className="work__aside">
          <RevealText as="p" className="work__body" delay={0.1}>
            {t('work.body')}
          </RevealText>
          <Button to={ROUTES.PROJECTS} variant="outline">
            {t('work.all')}
          </Button>
        </div>
      </div>

      <div className="work__grid">
        <div className="work__col work__col--a">
          {colA.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="work__col work__col--b">
          {colB.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
