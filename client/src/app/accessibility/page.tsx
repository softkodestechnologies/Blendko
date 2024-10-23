import styles from './accessibility.module.css';
import { accessibility } from '@/utils/data/dummy'; 
import Resource from '@/components/layouts/resource_links/Resource';
import ResourceHero from '@/components/layouts/resource_links/ResourceHero';
import ResourceContent from '@/components/layouts/resource_links/ResourceContent';

function AccessibilityPage() {
  return (
    <Resource hero={<ResourceHero caption="Accessibility" />}>
      <ResourceContent>
        {/* Accessibility Commitment */}
        <section className={styles.section}>
          <h2>{accessibility.commitment.heading}</h2>
          <p>{accessibility.commitment.approach}</p>
        </section>

        {/* Our Approach */}
        <section className={styles.section}>
          <h3>{accessibility.efforts.heading}</h3>
          <p>{accessibility.efforts.description}</p>
        </section>

        {/* Questions and Feedback */}
        <section className={styles.section}>
          <h3>{accessibility.feedback.heading}</h3>
          <p>{accessibility.feedback.description}</p>
        </section>
      </ResourceContent>
    </Resource>
  );
}

export default AccessibilityPage;
