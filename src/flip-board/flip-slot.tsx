'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FlipSlotProps } from './types'
import { DEFAULT_CHARACTERS } from './constants'
import { createFlipAnimation } from './animations'
import { getSlotStyle, getFoldStyles } from './styles'

export function FlipSlot({ 
  character = ' ', 
  characters = DEFAULT_CHARACTERS,
  color = 'black', 
  padAmount = 0,
  fontSize = '2.5rem',
  slotWidth = '1.5ch',
  perspective = 1
}: FlipSlotProps) {
  const slotRef = useRef(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const scrubberRef = useRef<gsap.core.Tween | null>(null)
  
  const allChars = useRef(Array.from(` ${characters} `))
  const [currentChar, setCurrentChar] = useState(' ')

  // Element refs
  const foldTopRef = useRef<HTMLDivElement>(null!)
  const foldBottomRef = useRef<HTMLDivElement>(null!)
  const unfoldTopRef = useRef<HTMLDivElement>(null!)
  const unfoldBottomRef = useRef<HTMLDivElement>(null!)

  // Initialize animation
  useEffect(() => {
    if (!slotRef.current) return
    
    const { timeline, scrubber } = createFlipAnimation({
      foldTopRef,
      foldBottomRef,
      unfoldTopRef,
      unfoldBottomRef,
      allChars: allChars.current,
      timelineRef,
      scrubberRef
    })
    
    timelineRef.current = timeline
    scrubberRef.current = scrubber
  }, [characters])

  // Handle character changes
  useEffect(() => {
    if (!timelineRef.current || !scrubberRef.current) return
    if (character === currentChar) return
    
    const chars = allChars.current
    const timeline = timelineRef.current
    const scrubber = scrubberRef.current
    
    const currentIndex = chars.indexOf(currentChar)
    const desiredIndex = chars.indexOf(character) !== -1 ? chars.indexOf(character) : 0
    
    const shift = currentIndex > desiredIndex
      ? chars.length - 1 - currentIndex + desiredIndex
      : desiredIndex - currentIndex
      
    const padding = currentIndex === desiredIndex ? 0 : padAmount * (chars.length - 1)
    const timeIncrement = `+=${shift + padding}`
    
    gsap.to(scrubber, {
      totalTime: timeIncrement,
      ease: 'power1.out',
      duration: (shift + padding) * gsap.utils.random(0.02, 0.06),
    })
    
    setCurrentChar(character)
  }, [character, currentChar, padAmount])

  const slotStyle = getSlotStyle({ fontSize, slotWidth, perspective })
  const { foldTopStyle, foldBottomStyle, unfoldTopStyle, unfoldBottomStyle } = getFoldStyles(color)

  return (
    <div 
      ref={slotRef} 
      className="flip" 
      style={slotStyle}
      data-color={color}
      data-perspective={perspective}
    >
      <div ref={foldTopRef} style={foldTopStyle}></div>
      <div ref={foldBottomRef} style={foldBottomStyle}></div>
      <div ref={unfoldTopRef} style={unfoldTopStyle}></div>
      <div ref={unfoldBottomRef} style={unfoldBottomStyle}></div>
    </div>
  )
}