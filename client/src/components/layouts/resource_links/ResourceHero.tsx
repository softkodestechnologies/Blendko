import styles from './resource.module.css';

function ResourceHero({ caption }: { caption: string }) {
  return (
    <section className={`flex center ${styles.hero}`}>
      <h1 className={styles.header_title}>{caption}</h1>
    </section>
  );
}

export default ResourceHero;
