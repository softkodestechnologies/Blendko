import { useState } from 'react';

import styles from './header.module.css';

import { CloseIcon } from '../../../../public/svg/icon';

function TopBanner() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    showBanner && (
      <div className={`${styles.top_wrapper}`}>
        <div
          aria-hidden="false"
          aria-label="Top banner"
          className={`flex center ${styles.navWrapper} ${styles.top_banner}`}
        >
          <p>
            LEAP DAY SALE, GET AN EXTRA 40% OFF SALE STYLES, TODAY ONLY!! SHOP
            NOW
          </p>

          <button
            aria-label="Close banner"
            className={`${styles.closeBanner}`}
            onClick={() => setShowBanner(false)}
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    )
  );
}

export default TopBanner;
