import styles from './contact-us.module.css';

import { contactCards } from '@/utils/data/dummy';
import Resource from '@/components/layouts/resource_links/Resource';
import ResourceHero from '@/components/layouts/resource_links/ResourceHero';
import ResourceContent from '@/components/layouts/resource_links/ResourceContent';

export default function ContactUs() {
  return (
    <Resource hero={<ResourceHero caption="CONTACT US" />}>
      <ResourceContent className={`grid ${styles.contact_list}`}>
        {contactCards.map((card, index) => (
          <div
            key={index}
            className={`flex flex-col align-y ${styles.contact_card}`}
          >
            {card.icon}

            <h3>{card.title}</h3>

            {card.description.map((desc, index) => (
              <p key={index}>{desc}</p>
            ))}
          </div>
        ))}
      </ResourceContent>
    </Resource>
  );
}
