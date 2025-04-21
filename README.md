# @adikris/react-slot

A React component library inspired by vintage split-flap display boards, like those classic railway station information boards. Built with TypeScript, GSAP animations, and modern React patterns.

## Installation

```bash
npm install @adikris/react-slot
# or
yarn add @adikris/react-slot
```

## Features

- 🎨 Customizable split-flap animations
- 🔄 Smooth GSAP-powered transitions
- 📱 Responsive design
- 🌗 Light/Dark/System theme support
- 🎛️ Configurable board and line properties
- 🔧 TypeScript support

## Basic Usage

```tsx
import { FlipBoard } from '@adikris/react-slot';

function App() {
  return (
    <FlipBoard
      lines={[
        {
          text: "Hello World",
          color: "white",
          alignment: "left",
          length: 10
        }
      ]}
      theme="dark"
    />
  );
}
```

## Props

### FlipBoard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| lines | `LineConfig[]` | `[]` | Array of line configurations |
| boardBackground | `string` | `'hsl(0 0% 15%)'` | Board background color |
| gap | `string` | `'0.5ch'` | Gap between lines |
| padding | `string` | `'6px'` | Board padding |
| perspective | `number` | `1` | 3D perspective effect |
| theme | `'light' \| 'dark' \| 'system'` | `'dark'` | Color theme |

### LineConfig Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | `string` | `''` | Text to display |
| characters | `string` | `'a-z'` | Available characters |
| padAmount | `number` | `0` | Animation padding |
| alignment | `'left' \| 'right'` | `'left'` | Text alignment |
| color | `string` | `'black'` | Text color |
| fontSize | `string` | `'2.5rem'` | Font size |
| slotWidth | `string` | `'1.5ch'` | Character slot width |
| length | `number` | `10` | Line length |
| backgroundColor | `string` | `'hsl(0 0% 92%)'` | Slot background |

## Demo Component

The library includes a demo component with a full UI for testing all features:

```tsx
import { FlipBoardDemo } from '@adikris/react-slot';

function App() {
  return <FlipBoardDemo />;
}
```

The demo provides controls for:
- Adding/removing lines
- Modifying text and characters
- Adjusting animations and padding
- Changing colors and themes
- Configuring layout properties

## Animation Details

The component uses GSAP for smooth flip animations with configurable properties:
- Character-by-character flipping
- Configurable flip speed
- Customizable padding between flips
- 3D perspective effects

## Browser Support

Supports all modern browsers with CSS transform and custom properties support.

## License

MIT
