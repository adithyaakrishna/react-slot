import { CSSProperties } from 'react'

interface SlotStyleProps {
  fontSize: string
  slotWidth: string
  perspective: number
}

export function getSlotStyle({ fontSize, slotWidth, perspective }: SlotStyleProps): CSSProperties {
  return {
    fontSize,
    width: slotWidth,
    position: 'relative',
    transformStyle: 'preserve-3d',
    display: 'inline-block',
    textAlign: 'center',
    height: '1.2em',
    perspective: `calc(${perspective} * 1em)`,
    textTransform: 'uppercase',
  }
}

export function getFoldStyles(color: string) {
  const baseStyle: CSSProperties = {
    position: 'absolute',
    transformStyle: 'preserve-3d',
    overflow: 'hidden',
    inset: 0,
    background: 'hsl(0 0% 92%)',
    color,
  }

  return {
    foldTopStyle: {
      ...baseStyle,
      clipPath: 'polygon(0 0, 100% 0, 100% 40%, calc(90% + 0.025em) 40%, calc(90% + 0.025em) 48%, calc(10% - 0.025em) 48%, calc(10% - 0.025em) 40%, 0 40%)',
    },
    foldBottomStyle: {
      ...baseStyle,
      clipPath: 'polygon(0 60%, calc(10% - 0.025em) 60%, calc(10% - 0.025em) 52%, calc(90% + 0.025em) 52%, calc(90% + 0.025em) 60%, 100% 60%, 100% 100%, 0 100%)',
    },
    unfoldTopStyle: {
      ...baseStyle,
      zIndex: 2,
      transform: 'rotateX(-180deg)',
      backfaceVisibility: 'hidden' as const,
      clipPath: 'polygon(0 0, 100% 0, 100% 40%, calc(90% + 0.025em) 40%, calc(90% + 0.025em) 48%, calc(10% - 0.025em) 48%, calc(10% - 0.025em) 40%, 0 40%)',
    },
    unfoldBottomStyle: {
      ...baseStyle,
      zIndex: 3,
      backfaceVisibility: 'hidden' as const,
      clipPath: 'polygon(0 60%, calc(10% - 0.025em) 60%, calc(10% - 0.025em) 52%, calc(90% + 0.025em) 52%, calc(90% + 0.025em) 60%, 100% 60%, 100% 100%, 0 100%)',
    },
  }
}