import styles from './resource.module.css';

function ResourceContent({ children }: { children: React.ReactNode }) {
  return <div className={`${styles.content}`}>{children}</div>;
}

export default ResourceContent;
