import React, { useState } from 'react';
import FlipBoard from './flip-component';
import { LineConfig } from './types';

// Default characters that can be used in the flip animation
const DEFAULT_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';

// Interface for the board configuration
interface BoardConfig {
  theme: 'light' | 'dark' | 'system';
  perspective: number;
  boardBackground: string;
  gap: string;
  padding: string;
}

// FlipBoardDemo component with controls
const FlipBoardDemo: React.FC = () => {
  const [boardConfig, setBoardConfig] = useState<BoardConfig>({
    theme: 'dark',
    perspective: 1,
    boardBackground: 'hsl(0 0% 15%)',
    gap: '0.5ch',
    padding: '6px'
  });
  
  const [lines, setLines] = useState<LineConfig[]>([
    {
      text: 'Babe!',
      padAmount: 1,
      alignment: 'left',
      color: 'white',
      fontSize: '2.5rem',
      slotWidth: '1.5ch',
      length: 10,
      characters: DEFAULT_CHARACTERS
    },
    {
      text: 'new craft',
      padAmount: 2,
      alignment: 'right',
      color: 'white',
      fontSize: '2.5rem',
      slotWidth: '1.5ch',
      length: 10,
      characters: DEFAULT_CHARACTERS
    },
    {
      text: 'of ui',
      padAmount: 3,
      alignment: 'right',
      color: 'white',
      fontSize: '2.5rem',
      slotWidth: '1.5ch',
      length: 10,
      characters: DEFAULT_CHARACTERS
    },
    {
      text: 'dropped',
      padAmount: 4,
      alignment: 'right',
      color: 'hsl(44,82%,49%)',
      fontSize: '2.5rem',
      slotWidth: '1.5ch',
      length: 10,
      characters: DEFAULT_CHARACTERS
    }
  ]);
  
  const handleAddLine = () => {
    setLines([...lines, {
      text: 'new line',
      padAmount: 1,
      alignment: 'left',
      color: 'white',
      fontSize: '2.5rem',
      slotWidth: '1.5ch',
      length: 10,
      characters: DEFAULT_CHARACTERS
    }]);
  };
  
  const handleRemoveLine = (index: number) => {
    const newLines = [...lines];
    newLines.splice(index, 1);
    setLines(newLines);
  };
  
  const handleLineChange = (index: number, property: keyof LineConfig, value: any) => {
    const newLines = [...lines];
    newLines[index] = { ...newLines[index], [property]: value };
    setLines(newLines);
  };
  
  const handleBoardChange = (property: keyof BoardConfig, value: any) => {
    setBoardConfig({ ...boardConfig, [property]: value });
  };
  
  // Reset all lines to blank
  const handleBlankAll = () => {
    const newLines = lines.map(line => ({ ...line, text: '' }));
    setLines(newLines);
  };

  return (
    <div className="flip-board-demo" style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>Flip Board Controls</h2>
        
        <div style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px', background: boardConfig.theme === 'dark' ? '#333' : '#f0f0f0' }}>
          <h3 style={{ margin: '0 0 10px 0', color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>Board Settings</h3>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>Theme:</label>
              <select 
                value={boardConfig.theme}
                onChange={(e) => handleBoardChange('theme', e.target.value as 'light' | 'dark' | 'system')}
                style={{ padding: '5px', borderRadius: '4px' }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>Perspective:</label>
              <input 
                type="range" 
                min="0.5" 
                max="4" 
                step="0.1" 
                value={boardConfig.perspective}
                onChange={(e) => handleBoardChange('perspective', parseFloat(e.target.value))}
                style={{ width: '100px' }}
              />
              <span style={{ marginLeft: '5px', color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>{boardConfig.perspective}</span>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>Background:</label>
              <input 
                type="color" 
                value={boardConfig.boardBackground.includes('hsl') ? '#333333' : boardConfig.boardBackground}
                onChange={(e) => handleBoardChange('boardBackground', e.target.value)}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>Gap:</label>
              <select 
                value={boardConfig.gap}
                onChange={(e) => handleBoardChange('gap', e.target.value)}
                style={{ padding: '5px', borderRadius: '4px' }}
              >
                <option value="0.25ch">Small</option>
                <option value="0.5ch">Medium</option>
                <option value="1ch">Large</option>
              </select>
            </div>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <button 
              onClick={handleAddLine}
              style={{ padding: '8px 12px', borderRadius: '4px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', marginRight: '10px' }}
            >
              Add Line
            </button>
            
            <button 
              onClick={handleBlankAll}
              style={{ padding: '8px 12px', borderRadius: '4px', background: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}
            >
              Clear All
            </button>
          </div>
        </div>

        {lines.map((line, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '15px', borderRadius: '8px', background: boardConfig.theme === 'dark' ? '#333' : '#f0f0f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ margin: '0', color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>Line {index + 1}</h3>
              <button 
                onClick={() => handleRemoveLine(index)}
                style={{ padding: '5px 10px', borderRadius: '4px', background: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Remove
              </button>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>Text:</label>
                <input 
                  type="text" 
                  value={line.text}
                  onChange={(e) => handleLineChange(index, 'text', e.target.value)}
                  style={{ padding: '5px', borderRadius: '4px', width: '120px' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>Characters:</label>
                <input 
                  type="text" 
                  value={line.characters}
                  onChange={(e) => handleLineChange(index, 'characters', e.target.value)}
                  style={{ padding: '5px', borderRadius: '4px', width: '120px' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>Padding:</label>
                <input 
                  type="range" 
                  min="0" 
                  max="4" 
                  step="1" 
                  value={line.padAmount}
                  onChange={(e) => handleLineChange(index, 'padAmount', parseInt(e.target.value))}
                  style={{ width: '100px' }}
                />
                <span style={{ marginLeft: '5px', color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>{line.padAmount}</span>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>Alignment:</label>
                <select 
                  value={line.alignment}
                  onChange={(e) => handleLineChange(index, 'alignment', e.target.value as 'left' | 'right')}
                  style={{ padding: '5px', borderRadius: '4px' }}
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>Color:</label>
                <input 
                  type="color" 
                  value={line.color?.includes('hsl') ? '#FFFFFF' : line.color || '#000000'}
                  onChange={(e) => handleLineChange(index, 'color', e.target.value)}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>Font Size:</label>
                <select 
                  value={line.fontSize}
                  onChange={(e) => handleLineChange(index, 'fontSize', e.target.value)}
                  style={{ padding: '5px', borderRadius: '4px' }}
                >
                  <option value="1.5rem">Small</option>
                  <option value="2.5rem">Medium</option>
                  <option value="3.5rem">Large</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>Length:</label>
                <input 
                  type="range" 
                  min="4" 
                  max="20" 
                  step="1" 
                  value={line.length}
                  onChange={(e) => handleLineChange(index, 'length', parseInt(e.target.value))}
                  style={{ width: '100px' }}
                />
                <span style={{ marginLeft: '5px', color: boardConfig.theme === 'dark' ? 'white' : 'black' }}>{line.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <FlipBoard
        lines={lines}
        boardBackground={boardConfig.boardBackground}
        gap={boardConfig.gap}
        padding={boardConfig.padding}
        perspective={boardConfig.perspective}
        theme={boardConfig.theme}
      />
    </div>
  );
};

export default FlipBoardDemo;