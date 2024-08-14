import React from 'react';
import { ColorChangeHandler, SketchPicker, ColorResult } from 'react-color';
import styles from './customize.module.css';

interface ColorPaletteProps {
  setActivePanel: (panel: string | null) => void;
  onColorSelect: (color: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ setActivePanel, onColorSelect }) => {
  const [selectedColor, setSelectedColor] = React.useState<string>('');
  const generatePalette = () => {
    const colors = [
      { name: 'red', rgb: [255, 0, 0] },
      { name: 'pink', rgb: [233, 30, 99] },
      { name: 'purple', rgb: [156, 39, 176] },
      { name: 'deepPurple', rgb: [103, 58, 183] },
      { name: 'indigo', rgb: [63, 81, 181] },
      { name: 'blue', rgb: [33, 150, 243] },
      { name: 'green', rgb: [76, 175, 80] },
      { name: 'lime', rgb: [205, 220, 57] },
      { name: 'orange', rgb: [255, 152, 0] },
      { name: 'deepOrange', rgb: [255, 87, 34] }
    ];
  
    return colors.flatMap(color => 
      Array(9).fill(null).map((_, index) => ({
        color: color.name,
        rgb: color.rgb,
        alpha: (index + 1) * 0.14
      }))
    );
  };

  const handleColorChange = (color: ColorResult) => {
    setSelectedColor(color.hex);
    onColorSelect(color.hex);
  };

  const palette = generatePalette();

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number, s: number, l: number = (max + min) / 2;
  
    if (max === min) {
      h = s = 0; 
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          h = 0;
      }
      h /= 6;
    }
  
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };
  

  const handlePaletteClick = (rgb: number[], alpha: number) => {
    const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);

    const colorResult: ColorResult = {
      rgb: { r: rgb[0], g: rgb[1], b: rgb[2], a: alpha },
      hex: `#${rgb[0].toString(16).padStart(2, '0')}${rgb[1].toString(16).padStart(2, '0')}${rgb[2].toString(16).padStart(2, '0')}`,
      hsl: { h: hsl.h, s: hsl.s, l: hsl.l },
    };
  
    handleColorChange(colorResult);
  };

  return (
    <div className={styles.colorPalette}>
      <button onClick={() => setActivePanel('files')}>Files</button>
      <h3 className={styles.paletteTitle}>Pick from palette</h3>
      <div className={styles.palette}>
        {palette.map((item, index) => (
          <div key={index}
          className={styles.colorBox}
          style={{ backgroundColor: `rgba(${item.rgb[0]}, ${item.rgb[1]}, ${item.rgb[2]}, ${item.alpha})` }}
          onClick={() => handlePaletteClick(item.rgb, item.alpha)}
        ></div>
        ))}
      </div>
      <h3 className={styles.customTitle}>Create custom color</h3>
      <SketchPicker color={selectedColor} onChange={handleColorChange} />
    </div>
  );
};

export default ColorPalette;



