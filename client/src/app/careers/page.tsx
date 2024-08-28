'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import styles from './career.module.css';

import SideBar from './SideBar';
import SearchBar from './SearchBar';
import BackDrop from '@/components/ui/BackDrop';
import { Logo } from '../../../public/svg/icon';
import Dropdown from '@/components/ui/dropdown/Dropdown';
import { ShareIcon, ChevronDown } from '../../../public/svg/icon';
import careerImage from '../../../public/career.jpeg';
import ResourceHero from '@/components/layouts/resource_links/ResourceHero';


function Page() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <>
      <ResourceHero caption="CAREERS" />

      <section>
        <div className={`section_container grid ${styles.career}`}>
          <SideBar className={`${styles.desktop_sidebar}`} />

          <AnimatePresence mode="wait">
            {openSidebar && (
              <SideBar
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                initial={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className={`flex flex-col align-x full-width full-height ${styles.mobile_sidebar}`}
              />
            )}
          </AnimatePresence>

          {openSidebar && (
            <BackDrop
              style={{ zIndex: 59 }}
              onClick={() => setOpenSidebar(false)}
            />
          )}

          <section className={`full-width ${styles.job_list}`}>
            <h2>THERE ARE 30 OPEN POSITIONS</h2>

            <div className={`${styles.job_mobile_action}`}>
              <SearchBar className={`${styles.mobile_search}`} />

              <button
                type="button"
                onClick={() => setOpenSidebar(true)}
                className={`full-width`}
              >
                FILTER
              </button>
            </div>

            <div className={`grid ${styles.career_pane}`}>
              <ul className={`grid ${styles.careers}`}>
                {Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <li key={i}>
                      <Link
                        href="/careers/1"
                        className={`full-width grid align-y ${styles.career_item}`}
                      >
                        <Image
                          alt="career"
                          src={careerImage}
                          className="full-width full-height"
                        />

                        <div
                          className={`grid align-y ${styles.career_details}`}
                        >
                          <div
                            className={`flex flex-col ${styles.career_content}`}
                          >
                            <span className={`${styles.logo}`}>
                              <Logo style={{ width: '100%', height: '100%' }} />
                            </span>

                            <h3>Graphics Designer</h3>

                            <span>Mid-Level</span>

                            <p>Remote, Uk</p>
                          </div>

                          <button>
                            <ShareIcon />
                          </button>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>

              <div className={`flex align-y ${styles.sort}`}>
                <Dropdown
                  value={selectedOption}
                  caption="Sort By Date"
                  optionsList={['Asc', 'Desc']}
                  onSelect={(value) => setSelectedOption(value)}
                />
              </div>
            </div>
          </section>
        </div>

      </section>
    </>
  );
}

Page.displayName = 'CareerPage';
export default Page;
