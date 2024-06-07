import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2>Filters</h2>

      <div className={styles.filterSection}>
        <h3>Price</h3>
        <input type="range" min="50" max="200" />
      </div>

      <div className={styles.filterSection}>
        <h3>Colors</h3>
        <div className={styles.colorOptions}>
          {['green', 'red', 'blue', 'yellow', 'pink', 'orange', 'black', 'white'].map(color => (
            <div key={color} className={styles.colorOption} style={{ backgroundColor: color }}></div>
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <h3>Size</h3>
        <div className={styles.sizeOptions}>
          {['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large'].map(size => (
            <div key={size} className={styles.sizeOption}>{size}</div>
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <h3>Dress Style</h3>
        <div className={styles.dressStyleOptions}>
          {['Casual', 'Formal', 'Party', 'Gym'].map(style => (
            <div key={style} className={styles.dressStyleOption}>{style}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
