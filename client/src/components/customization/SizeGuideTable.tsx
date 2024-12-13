import React from 'react';
import styles from './Sizes.module.css';

const SizeGuideTable = () => {
  return (
    <div className={styles.sizeGuideContainer}>
      <div className={styles.measurementToggle}>
        <button className={styles.measurementButton}>Inches</button>
        <button className={styles.measurementButton}>Centimeters</button>
      </div>
      <table className={styles.sizeTable}>
        <thead>
          <tr>
            <th>SIZE LABEL</th>
            <th>A</th>
            <th>B</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['2XS', '21⅛', '27⅞'],
            ['XS', '22½', '28⅛'],
            ['S', '23¾', '28¾'],
            ['M', '24', '29⅛'],
            ['L', '25⅛', '29⅞'],
            ['XL', '27⅛', '30⅞'],
            ['2XL', '28⅞', '31⅞'],
            ['3XL', '30¼', '32⅞'],
            ['4XL', '31⅞', '33⅞'],
            ['5XL', '33½', '34⅞'],
            ['6XL', '35', '35⅞']
          ].map(([size, a, b]) => (
            <tr key={size}>
              <td>{size}</td>
              <td>{a}</td>
              <td>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SizeGuideTable;