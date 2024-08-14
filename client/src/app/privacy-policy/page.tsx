import styles from './legal.module.css';

import { policy } from '@/utils/data/dummy';
import Resource from '@/components/layouts/resource_links/Resource';
import ResourceHero from '@/components/layouts/resource_links/ResourceHero';
import ResourceContent from '@/components/layouts/resource_links/ResourceContent';

function page() {
  return (
    <Resource hero={<ResourceHero caption="Legal" />}>
      <ResourceContent>
        <div className={`${styles.policy_header}`}>
          <h2>BLENDKO PRIVACY POLICY</h2>

          <time dateTime="15-3-2024" aria-label="last updated">
            Last Updated: March 15, 2024
          </time>

          <p>
            This Privacy Policy describes how Nike, Inc. (referred to as “Nike”,
            “our”, “we” or “us” in this Policy) collects, uses, shares, and
            protects your personal information, what choices you have relating
            to your personal information, and how you can contact us.
          </p>
        </div>

        {policy.map((section, index) => (
          <section
            key={index}
            aria-labelledby={section.heading}
            className={`${styles.section}`}
          >
            <h3 className={`flex`}>
              <span>{index + 1}.</span> {section.heading}
            </h3>

            {section.content.map((content, index) => (
              <p key={index}>{content}</p>
            ))}

            {section.subcontent.length > 0 &&
              section.subcontent.map((sub, index) => (
                <div key={index}>
                  <p>{sub.heading}</p>

                  <ul>
                    {sub.list.map((content, index) => (
                      <li key={index}>{content}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </section>
        ))}
      </ResourceContent>
    </Resource>
  );
}

export default page;
