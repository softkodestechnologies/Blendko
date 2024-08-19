'use client';

import { useState } from 'react';

import styles from './career.module.css';

import SideBar from './SideBar';
import SearchBar from './SearchBar';
import BackDrop from '@/components/ui/BackDrop';
import ResourceHero from '@/components/layouts/resource_links/ResourceHero';

function page() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <>
      <ResourceHero caption="CAREERS" />

      <section>
        <div className={`section_container grid ${styles.career}`}>
          <SideBar className={`${styles.desktop_sidebar}`} />

          {openSidebar && (
            <SideBar
              className={`flex flex-col align-x full-width full-height ${styles.mobile_sidebar}`}
            />
          )}

          {openSidebar && (
            <BackDrop
              style={{ zIndex: 59 }}
              onClick={() => setOpenSidebar(false)}
            />
          )}

          <section className={`${styles.job_list}`}>
            <h2>THERE ARE 30 OPEN POSITIONS</h2>

            <div className={`${styles.job_}`}>
              <SearchBar className={`${styles.search}`} />

              <button type="button" onClick={() => setOpenSidebar(true)}>
                FILTER
              </button>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default page;
