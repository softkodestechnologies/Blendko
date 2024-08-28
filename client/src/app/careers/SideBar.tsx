import { useState } from 'react';
import { motion } from 'framer-motion';

import styles from './career.module.css';

import SearchBar from './SearchBar';
import JobAlertForm from './JobAlertForm';
import { careerNavLinks } from '@/utils/data/dummy';
import { ChevronDown } from '../../../public/svg/icon';
import Accordion from '@/components/ui/accordion/Accordion';

function SideBar({
  className,
  ...props
}: {
  className?: string;
  [key: string]: any;
}) {
  const [showAlert, setShowAlert] = useState(false);

  const formatText = (text: string) => text.toLowerCase().split(' ').join('-');

  return (
    <motion.aside className={`${styles.filter} ${className}`} {...props}>
      <h2>THERE ARE 30 OPEN POSITIONS</h2>

      <SearchBar className={`${styles.filter_search}`} />

      <h3>RESET FILTERS</h3>

      <section className={`flex flex-col ${styles.filter_options}`}>
        {careerNavLinks.map((section, index) => (
          <Accordion
            key={index}
            head={
              <div
                className={`full-width flex align-y space-between ${styles.accordion}`}
              >
                <h4>{section.title.toUpperCase()}</h4>
                <ChevronDown />
              </div>
            }
            body={
              <div className={`flex flex-col ${styles.acccordion_content}`}>
                {section.children.map((link, index) => (
                  <label
                    key={index}
                    htmlFor={formatText(link)}
                    className="flex align-y"
                  >
                    <input
                      type="checkbox"
                      id={formatText(link)}
                      name={formatText(link)}
                    />

                    <span>{link}</span>
                  </label>
                ))}
              </div>
            }
          />
        ))}
      </section>

      <button
        type="button"
        className="full-width"
        onClick={() => setShowAlert(true)}
      >
        SET A JOB ALERT
      </button>

      {showAlert && <JobAlertForm onCancel={() => setShowAlert(false)} />}
    </motion.aside>
  );
}

export default SideBar;
