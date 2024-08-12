'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import styles from './resource.module.css';

import useDimension from '@/utils/hooks/useDimension';
import { CloseIcon } from '../../../../public/svg/icon';
import { resourceSidebarLinks } from '@/utils/data/dummy';

const ResourceLink = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: () => void;
}) => {
  return (
    <>
      <div className={`flex space-between align-y ${styles.sidebar_header}`}>
        <h2>Explore</h2>

        <button aria-label="Close sidebar" onClick={setIsSidebarOpen}>
          <CloseIcon />
        </button>
      </div>

      {resourceSidebarLinks.map((section, index) => (
        <section
          key={index}
          aria-label={section.header}
          className={`${styles.items}`}
        >
          <h3>{section.header}</h3>

          <ul className={`flex flex-col`}>
            {section.links.map((link, index) => (
              <li key={index} className={`flex align-y ${styles.link_item}`}>
                <input type="checkbox" id={link.title} />

                <Link href={link.url}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
};

function ResourceSideBar({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: () => void;
}) {
  const { width } = useDimension();

  if (width && width < 1024) {
    return (
      <motion.aside
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        initial={{ x: '-100%' }}
        aria-label="Resource sidebar"
        className={`${styles.sidebar}`}
        transition={{ duration: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
      >
        <ResourceLink
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </motion.aside>
    );
  }

  if (width && width >= 1024) {
    return (
      <aside aria-label="Resource sidebar" className={`${styles.sidebar}`}>
        <ResourceLink />
      </aside>
    );
  }
}

export default ResourceSideBar;
