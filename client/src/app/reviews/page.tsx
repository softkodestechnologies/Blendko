import styles from './reviews.module.css';

import { reviews } from '@/utils/data/dummy';
import Resource from '@/components/layouts/resource_links/Resource';
import ResourceHero from '@/components/layouts/resource_links/ResourceHero';
import ResourceContent from '@/components/layouts/resource_links/ResourceContent';

export default function Reviews() {
  return (
    <Resource hero={<ResourceHero caption="RATINGS & REVIEWS" />}>
      <ResourceContent>
        {reviews.map((review, index) => (
          <>
            {review.bold && (
              <div className={`${styles.opening_paragraph}`}>
                <h2 key={index} className={styles.bold}>
                  {review.bold}
                </h2>

                <p>{review.text}</p>
              </div>
            )}

            {review.list.length > 0 && (
              <div>
                <p>{review.text}</p>

                <ol>
                  {review.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </div>
            )}

            {!review.bold && !review.list.length ? (
              <p key={index}>{review.text}</p>
            ) : null}
          </>
        ))}
      </ResourceContent>
    </Resource>
  );
}
