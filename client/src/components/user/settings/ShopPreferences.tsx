import React from 'react';
import styles from './Settings.module.css';

const ShopPreferences: React.FC = () => {
  return (
    <div className={styles.shopPreferences}>
      <h2>Shop Preferences</h2>
      <form className={styles.formPreferences}>
        <div className={styles.formGroup}>
          <label htmlFor="shoeSize">Shoe Size</label>
          <select id="shoeSize">
            <option value="">Shoe Size</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <h3>Shopping Preferences</h3>
          <div className={styles.radioGroup}>
            <label htmlFor="womens">
              <input type="radio" id="womens" name="shoppingPreference" value="womens" />
              Women&apos;s
            </label>
          </div>
          <div className={styles.radioGroup}>
            <label htmlFor="mens">
              <input type="radio" id="mens" name="shoppingPreference" value="mens" checked />
              Men&apos;s
            </label>
          </div>
        </div>
        <div className={styles.formGroup}>
          <h3>Additional Preferences</h3>
          <div className={styles.checkboxGroup}>
            <label htmlFor="girls">
              <input type="checkbox" id="girls" name="additionalPreference" value="girls" />
              Girls&apos;
            </label>
          </div>
          <div className={styles.checkboxGroup}>
            <label htmlFor="boys">
              <input type="checkbox" id="boys" name="additionalPreference" value="boys" />
              Boys&apos;
            </label>
          </div>
          <div className={styles.checkboxGroup}>
            <label htmlFor="womens">
              <input type="checkbox" id="womens" name="additionalPreference" value="womens" />
              Women&apos;s
            </label>
          </div>
          <div className={styles.checkboxGroup}>
            <label htmlFor="mens">
              <input type="checkbox" id="mens" name="additionalPreference" value="mens" />
              Men&apos;s
            </label>
          </div>
        </div>
        <div className={styles.prefBtnParent}>
          <button type="submit" className={styles.saveButton}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default ShopPreferences;
