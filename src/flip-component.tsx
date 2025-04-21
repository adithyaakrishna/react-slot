import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { gsap } from 'gsap';
import { FlipBoardProps, FlipLineProps, FlipSlotProps } from './types';

// Default characters that can be used in the flip animation
const DEFAULT_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';

// FlipSlot component - represents a single character slot in the flip board
const FlipSlot: React.FC<FlipSlotProps> = ({ 
  character = ' ', 
  characters = DEFAULT_CHARACTERS,
  color = 'black', 
  padAmount = 0,
  fontSize = '2.5rem',
  slotWidth = '1.5ch',
  perspective = 1
}) => {
  const slotRef = useRef(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrubberRef = useRef<gsap.core.Tween | null>(null);
  
  const allChars = useRef(Array.from(` ${characters} `));
  const [currentChar, setCurrentChar] = useState(' ');

  // Elements refs
  const foldTopRef = useRef<HTMLDivElement>(null);
  const foldBottomRef = useRef<HTMLDivElement>(null);
  const unfoldTopRef = useRef<HTMLDivElement>(null);
  const unfoldBottomRef = useRef<HTMLDivElement>(null);

  // Generate the flip animation timeline
  useEffect(() => {
    if (!slotRef.current) return;
    
    // Kill previous timeline and scrubber if they exist
    if (timelineRef.current) {
      const timeline = timelineRef.current as gsap.core.Timeline;
      timeline.kill();
    }
    
    if (scrubberRef.current) {
      const scrubber = scrubberRef.current as gsap.core.Tween;
      scrubber.kill();
    }
    
    const foldTop = foldTopRef.current;
    const foldBottom = foldBottomRef.current;
    const unfoldTop = unfoldTopRef.current;
    const unfoldBottom = unfoldBottomRef.current;
    
    // Safety check for null refs
    if (!foldTop || !foldBottom || !unfoldTop || !unfoldBottom) return;
    
    const chars = allChars.current;

    gsap.set([foldTop, unfoldBottom], { clearProps: 'all' });

    unfoldTop.innerText = unfoldBottom.innerText = chars[1];
    foldTop.innerText = foldBottom.innerText = chars[0];

    const timeline = gsap.timeline({
      paused: true,
      repeat: chars.length - 2,
      onRepeat: () => {
        const index = Math.floor(timeline.totalTime() / timeline.duration());
        const next = chars[index % chars.length];
        const current = chars[(index + 1) % chars.length];
        unfoldTop.innerText = unfoldBottom.innerText = current;
        foldTop.innerText = foldBottom.innerText = next;
      },
    });

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
      );

    const duration = timeline.totalDuration();
    
    const scrubber = gsap.to(timeline, {
      totalTime: duration,
      repeat: -1,
      paused: true,
      duration: duration,
      ease: 'none',
    });
    
    scrubber.time(timeline.totalDuration());
    
    timelineRef.current = timeline;
    scrubberRef.current = scrubber;
  }, [characters]);

  // Handle character change and trigger flip animation
  useEffect(() => {
    if (!timelineRef.current || !scrubberRef.current) return;
    
    if (character === currentChar) return;
    
    const chars = allChars.current;
    const timeline = timelineRef.current as gsap.core.Timeline;
    const scrubber = scrubberRef.current as gsap.core.Tween;
    
    const currentIndex = chars.indexOf(currentChar);
    const desiredIndex = chars.indexOf(character) !== -1 ? chars.indexOf(character) : 0;
    
    // If the current index is greater, loop around
    const shift = currentIndex > desiredIndex
      ? chars.length - 1 - currentIndex + desiredIndex
      : desiredIndex - currentIndex;
      
    // This is how you throw an extra loop in for the stagger
    const padding = currentIndex === desiredIndex ? 0 : padAmount * (chars.length - 1);
    
    // Create a string for the totalTime increment
    const timeIncrement = `+=${shift + padding}`;
    
    gsap.to(scrubber, {
      totalTime: timeIncrement,
      ease: 'power1.out',
      duration: (shift + padding) * gsap.utils.random(0.02, 0.06),
    });
    
    setCurrentChar(character);
  }, [character, currentChar, padAmount]);

  // Create a properly typed style object
  const slotStyle: CSSProperties = {
    fontSize: fontSize,
    width: slotWidth,
    position: 'relative',
    transformStyle: 'preserve-3d',
    display: 'inline-block',
    textAlign: 'center',
    height: '1.2em',
    perspective: `calc(${perspective} * 1em)`,
    textTransform: 'uppercase',
  };
  
  // Apply custom properties using attribute
  return (
    <div 
      ref={slotRef} 
      className="flip" 
      style={slotStyle}
      data-color={color}
      data-perspective={perspective}
    >
      {/* Fold top */}
      <div 
        ref={foldTopRef}
        style={{
          position: 'absolute',
          transformStyle: 'preserve-3d',
          overflow: 'hidden',
          inset: 0,
          background: 'hsl(0 0% 92%)',
          color: color,
          clipPath: 'polygon(0 0, 100% 0, 100% 40%, calc(90% + 0.025em) 40%, calc(90% + 0.025em) 48%, calc(10% - 0.025em) 48%, calc(10% - 0.025em) 40%, 0 40%)',
        }}
      ></div>
      
      {/* Fold bottom */}
      <div 
        ref={foldBottomRef}
        style={{
          position: 'absolute',
          transformStyle: 'preserve-3d',
          overflow: 'hidden',
          inset: 0,
          background: 'hsl(0 0% 92%)',
          color: color,
          clipPath: 'polygon(0 60%, calc(10% - 0.025em) 60%, calc(10% - 0.025em) 52%, calc(90% + 0.025em) 52%, calc(90% + 0.025em) 60%, 100% 60%, 100% 100%, 0 100%)',
        }}
      ></div>
      
      {/* Unfold top */}
      <div 
        ref={unfoldTopRef}
        style={{
          position: 'absolute',
          transformStyle: 'preserve-3d',
          overflow: 'hidden',
          inset: 0,
          background: 'hsl(0 0% 92%)',
          color: color,
          zIndex: 2,
          transform: 'rotateX(-180deg)',
          backfaceVisibility: 'hidden',
          clipPath: 'polygon(0 0, 100% 0, 100% 40%, calc(90% + 0.025em) 40%, calc(90% + 0.025em) 48%, calc(10% - 0.025em) 48%, calc(10% - 0.025em) 40%, 0 40%)',
        }}
      ></div>
      
      {/* Unfold bottom */}
      <div 
        ref={unfoldBottomRef}
        style={{
          position: 'absolute',
          transformStyle: 'preserve-3d',
          overflow: 'hidden',
          inset: 0,
          background: 'hsl(0 0% 92%)',
          color: color,
          zIndex: 3,
          backfaceVisibility: 'hidden',
          clipPath: 'polygon(0 60%, calc(10% - 0.025em) 60%, calc(10% - 0.025em) 52%, calc(90% + 0.025em) 52%, calc(90% + 0.025em) 60%, 100% 60%, 100% 100%, 0 100%)',
        }}
      ></div>
    </div>
  );
};

// FlipLine component - represents a line of flip slots
const FlipLine: React.FC<FlipLineProps> = ({
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
}) => {
  // Prepare text based on alignment
  const processedText = alignment === 'right'
    ? text.toLowerCase().padStart(length, ' ')
    : text.toLowerCase().padEnd(length, ' ');
    
  const chars = processedText.split('').slice(0, length);
  
  // Fill remaining slots if text is shorter than length
  while (chars.length < length) {
    chars.push(' ');
  }

  return (
    <div 
      className="flip-line" 
      style={{ 
        display: 'flex', 
        gap: gap,
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
  );
};

// FlipBoard component - main component that contains multiple flip lines
const FlipBoard: React.FC<FlipBoardProps> = ({
  lines = [],
  boardBackground = 'hsl(0 0% 15%)',
  gap = '0.5ch',
  padding = '6px',
  perspective = 1,
  theme = 'dark'
}) => {
  useEffect(() => {
    // Set theme on document
    document.documentElement.dataset.theme = theme;
    
    // Set perspective
    document.documentElement.style.setProperty('--perspective', perspective.toString());
  }, [theme, perspective]);

  return (
    <div 
      className="board" 
      style={{ 
        display: 'flex',
        gap: gap,
        flexDirection: 'column',
        textTransform: 'uppercase',
        fontFamily: "'Roboto Mono', monospace",
        padding: padding,
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
  );
};

// Export the component
export default FlipBoard;