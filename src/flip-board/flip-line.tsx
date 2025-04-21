'use client'

import React from 'react'
import { FlipSlot } from './flip-slot'
import { FlipLineProps } from './types'
import { DEFAULT_CHARACTERS } from './constants'

export function FlipLine({
  text = '',
  characters = DEFAULT_CHARACTERS,
  color = 'black',
  backgroundColor = 'hsl(0 0% 92%)',
  padAmount = 0,
  alignment = 'left',
  length = 10,
  fontSize = '2.5rem',
  slotWidth = '1.5ch',
  perspective = 1,
  gap = '0.5ch'
}: FlipLineProps) {
  const processedText = alignment === 'right'
    ? text.toLowerCase().padStart(length, ' ')
    : text.toLowerCase().padEnd(length, ' ')
    
  const chars = processedText.split('').slice(0, length)
  
  while (chars.length < length) {
    chars.push(' ')
  }

  return (
    <div 
      className="flip-line" 
      style={{ 
        display: 'flex', 
        gap,
        justifyContent: alignment === 'right' ? 'flex-end' : 'flex-start'
      }}
    >
      {chars.map((char: string, index: number) => (
        <FlipSlot
          key={index}
          character={char}
          characters={characters}
          color={color}
          padAmount={padAmount}
          fontSize={fontSize}
          slotWidth={slotWidth}
          perspective={perspective}
        />
      ))}
    </div>
  )
}