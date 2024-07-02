import React from 'react';
import { ColorChangeHandler, SketchPicker } from 'react-color';
import styles from './customize.module.css';

interface ColorPaletteProps {
  onChange: ColorChangeHandler;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ onChange }) => {
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

  return (
    <div className={styles.colorPalette}>
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
      <SketchPicker onChangeComplete={onChange} />
    </div>
  );
};

export default ColorPalette;


