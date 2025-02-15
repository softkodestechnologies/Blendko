import styles from './terms.module.css';
import { terms } from '@/utils/data/dummy'; 
import Resource from '@/components/layouts/resource_links/Resource';
import ResourceHero from '@/components/layouts/resource_links/ResourceHero';
import ResourceContent from '@/components/layouts/resource_links/ResourceContent';

function page() {
  return (
    <Resource hero={<ResourceHero caption="Legal" />}>
      <ResourceContent>
        <div className={`${styles.policy_header}`}>
          <h2>BLENDKO TERMS OF SERVICE</h2>

          <time dateTime="15-3-2024" aria-label="last updated">
            Last Updated: March 15, 2024
          </time>

          <p>
            These Terms of Service describe the rules and guidelines for using
            Blendko&apos;s services. By accessing and using our services, you agree
            to these terms and conditions.
          </p>
        </div>

        {terms.map((section, index) => (
          <section
            key={index}
            aria-labelledby={section.heading}
            className={`${styles.section}`}
          >
            <h3 className={`flex`}>
               {section.heading}
            </h3>

            {section.content.map((content, index) => (
              <p key={index}>{content}</p>
            ))}

            {section.subcontent.length > 0 &&
              section.subcontent.map((sub, index) => (
                <div key={index}>
                  <h4>{sub.heading}</h4>

                  <p>{sub.content}</p>
                </div>
              ))}
          </section>
        ))}
      </ResourceContent>
    </Resource>
  );
}

export default page;
