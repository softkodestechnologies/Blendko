import React from 'react';
import { ColorChangeHandler, SketchPicker, ColorResult } from 'react-color';
import styles from './customize.module.css';

interface ColorPaletteProps {
  onChange: ColorChangeHandler;
  setActivePanel: (panel: string | null) => void;
  onColorSelect: (color: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ onChange, setActivePanel, onColorSelect }) => {
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

  const palette = generatePalette();

  const handleColorChange = (color: ColorResult) => {
    //onChange(color);
    setSelectedColor(color.hex);
    onColorSelect(color.hex);
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
        ></div>
        ))}
      </div>
      <h3 className={styles.customTitle}>Create custom color</h3>
      <SketchPicker color={selectedColor} onChange={handleColorChange} />
    </div>
  );
};

export default ColorPalette;



