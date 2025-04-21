export interface FlipSlotProps {
  character?: string
  characters?: string
  color?: string
  padAmount?: number
  fontSize?: string
  slotWidth?: string
  perspective?: number
}

export interface FlipLineProps extends FlipSlotProps {
  text?: string
  backgroundColor?: string
  alignment?: 'left' | 'right'
  length?: number
  gap?: string
}

export interface LineConfig {
  text?: string
  characters?: string
  padAmount?: number
  alignment?: 'left' | 'right'
  color?: string
  fontSize?: string
  slotWidth?: string
  length?: number
  backgroundColor?: string
  id?: string
}

export interface FlipBoardProps {
  lines: LineConfig[]
  boardBackground?: string
  gap?: string
  padding?: string
  perspective?: number
  theme?: 'light' | 'dark' | 'system'
}