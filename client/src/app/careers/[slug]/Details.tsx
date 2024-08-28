import styles from './careerdetails.module.css';

import { career } from '@/utils/data/career';

function Details() {
  return (
    <section>
      <div
        className={`section_container grid ${styles.career_details_section}`}
      >
        <div className={`${styles.career_content}`}>
          <h2>{career.heder.title}</h2>

          {career.heder.content.map((content, index) => (
            <p key={index}>{content}</p>
          ))}

          {career.body.map((section, index) => (
            <div key={index}>
              <h3>{section.title}</h3>

              {section.content.map((content, index) => (
                <p key={index}>{content}</p>
              ))}
            </div>
          ))}
        </div>

        <aside className={`${styles.sidebar}`}>
          <h2>Job Details</h2>

          <ul className={`flex flex-col ${styles.details}`}>
            {career.highlight.map((highlight, index) => (
              <li key={index} className="grid align-y">
                <h3>{highlight.key}</h3>

                <p>{highlight.value}</p>
              </li>
            ))}
          </ul>

          <button type="button" className="full-width">
            APPLY NOW
          </button>
        </aside>
      </div>
    </section>
  );
}

export default Details;
