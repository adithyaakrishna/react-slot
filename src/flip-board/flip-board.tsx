'use client'

import React, { useEffect } from 'react'
import { FlipLine } from './flip-line'
import { FlipBoardProps } from './types'
import { DEFAULT_CHARACTERS } from './constants'

export function FlipBoard({
  lines = [],
  boardBackground = 'hsl(0 0% 15%)',
  gap = '0.5ch',
  padding = '6px',
  perspective = 1,
  theme = 'dark'
}: FlipBoardProps) {
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.setProperty('--perspective', perspective.toString())
  }, [theme, perspective])

  return (
    <div 
      className="board" 
      style={{ 
        display: 'flex',
        gap,
        flexDirection: 'column',
        textTransform: 'uppercase',
        fontFamily: "'Roboto Mono', monospace",
        padding,
        background: boardBackground
      }}
    >
      {lines.map((line, index) => (
        <FlipLine
          key={index}
          text={line.text || ''}
          characters={line.characters || DEFAULT_CHARACTERS}
          color={line.color || 'black'}
          backgroundColor={line.backgroundColor || 'hsl(0 0% 92%)'}
          padAmount={line.padAmount || 0}
          alignment={line.alignment || 'left'}
          length={line.length || 10}
          fontSize={line.fontSize || '2.5rem'}
          slotWidth={line.slotWidth || '1.5ch'}
          perspective={perspective}
          gap={gap}
        />
      ))}
    </div>
  )
}