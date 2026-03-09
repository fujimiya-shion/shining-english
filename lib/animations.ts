import gsap from 'gsap'

export const fadeInUp = (element: Element, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power3.out' }
  )
}

export const scaleIn = (element: Element, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.6, delay, ease: 'back.out' }
  )
}

export const slideInLeft = (element: Element, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: -30 },
    { opacity: 1, x: 0, duration: 0.8, delay, ease: 'power3.out' }
  )
}

export const slideInRight = (element: Element, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: 30 },
    { opacity: 1, x: 0, duration: 0.8, delay, ease: 'power3.out' }
  )
}

export const pulse = (element: Element) => {
  return gsap.to(element, {
    scale: 1.05,
    duration: 0.6,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  })
}

export const hoverLift = (element: Element) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, { y: -5, duration: 0.3, ease: 'power2.out' })
  })
  element.addEventListener('mouseleave', () => {
    gsap.to(element, { y: 0, duration: 0.3, ease: 'power2.out' })
  })
}
