import styles from './resource.module.css';

function ResourceContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${styles.content} ${className}`}>{children}</div>;
}

export default ResourceContent;
