import { gsap } from 'gsap'
import { RefObject } from 'react'

interface CreateFlipAnimationProps {
  foldTopRef: RefObject<HTMLDivElement>
  foldBottomRef: RefObject<HTMLDivElement>
  unfoldTopRef: RefObject<HTMLDivElement>
  unfoldBottomRef: RefObject<HTMLDivElement>
  allChars: string[]
  timelineRef: RefObject<gsap.core.Timeline | null>
  scrubberRef: RefObject<gsap.core.Tween | null>
}

export function createFlipAnimation({
  foldTopRef,
  foldBottomRef,
  unfoldTopRef,
  unfoldBottomRef,
  allChars,
  timelineRef,
  scrubberRef
}: CreateFlipAnimationProps) {
  if (timelineRef.current) {
    timelineRef.current.kill()
  }
  
  if (scrubberRef.current) {
    scrubberRef.current.kill()
  }
  
  const foldTop = foldTopRef.current
  const foldBottom = foldBottomRef.current
  const unfoldTop = unfoldTopRef.current
  const unfoldBottom = unfoldBottomRef.current
  
  if (!foldTop || !foldBottom || !unfoldTop || !unfoldBottom) {
    throw new Error('Required refs are not available')
  }
  
  gsap.set([foldTop, unfoldBottom], { clearProps: 'all' })

  unfoldTop.innerText = unfoldBottom.innerText = allChars[1]
  foldTop.innerText = foldBottom.innerText = allChars[0]

  const timeline = gsap.timeline({
    paused: true,
    repeat: allChars.length - 2,
    onRepeat: () => {
      const index = Math.floor(timeline.totalTime() / timeline.duration())
      const next = allChars[index % allChars.length]
      const current = allChars[(index + 1) % allChars.length]
      unfoldTop.innerText = unfoldBottom.innerText = current
      foldTop.innerText = foldBottom.innerText = next
    },
  })

  timeline
    .fromTo(
      unfoldBottom,
      { rotateX: 180 },
      {
        rotateX: 0,
        duration: 1,
        ease: 'none'
      },
      0
    )
    .fromTo(
      unfoldTop,
      { filter: 'brightness(0)' },
      {
        filter: 'brightness(1)',
        duration: 1,
        ease: 'none'
      },
      0
    )
    .fromTo(
      foldTop,
      { rotateX: 0 },
      {
        duration: 1,
        rotateX: -180,
        ease: 'none'
      },
      0
    )
    .fromTo(
      foldBottom,
      { filter: 'brightness(1)' },
      {
        duration: 1,
        filter: 'brightness(0)',
        ease: 'none'
      },
      0
    )

  const duration = timeline.totalDuration()
  
  const scrubber = gsap.to(timeline, {
    totalTime: duration,
    repeat: -1,
    paused: true,
    duration: duration,
    ease: 'none',
  })
  
  scrubber.time(timeline.totalDuration())
  
  return { timeline, scrubber }
}