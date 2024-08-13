import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';

import styles from './resource.module.css';

import ResourceSideBar from './ResourceSidebar';
import BackDrop from '@/components/ui/BackDrop';
import useDimension from '@/utils/hooks/useDimension';

function Resource({
  children,
  hero,
}: {
  hero?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { width } = useDimension();
  const pathname = usePathname().split('/')[1];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const strings = pathname
    .split('-')
    .map((str) => str[0].toUpperCase() + str.slice(1));

  return (
    <div>
      {hero && hero}

      <div className={`full-width section_container grid ${styles.wrapper}`}>
        <AnimatePresence mode="wait">
          {width && width < 1024 && isSidebarOpen && (
            <ResourceSideBar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={() => setIsSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <BackDrop onClick={() => {}} style={{ zIndex: 50 }} />
          )}
        </AnimatePresence>

        {width && width >= 1024 && <ResourceSideBar />}

        <main>
          <header className={`flex align-y space-between ${styles.mobileNav}`}>
            <button
              aria-label="Open sidebar"
              onClick={() => setIsSidebarOpen(true)}
            >
              Explore
            </button>

            <span>{strings.join(' ')}</span>
          </header>

          {children}
        </main>
      </div>
    </div>
  );
}

export default Resource;
