import Link from 'next/link';

import styles from './customize.module.css';

import Customize from './Customize';

function CustomizeSection() {
  return (
    <section className={`section_container`}>
      <div className={`${styles.customize_wrapper}`}>
        <div className={`flex flex-col center ${styles.mobile_customize}`}>
          <h2>Customize Your Style</h2>

          <p>
            Transform your wardrobe with our customization tools. Choose
            fabrics, add unique touches, and express your style!
          </p>

          <Customize />

          <Link href="/customize" className="flex center">
            EXPLORE
          </Link>
        </div>

        <div className={`grid ${styles.desktop_customize}`}>
          <Customize />

          <div className={`flex flex-col align-x ${styles.right}`}>
            <h2>Customize Your Style</h2>

            <p>
              Transform your wardrobe with our customization tools. Choose
              fabrics, add unique touches, and express your style!
            </p>

            <Link href="/customize" className="flex center">
              Start Customising
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomizeSection;
