
import styles from './cookie-info.module.css';

export default function CookieInfo() {
  return (
    <div
        className={`flex flex-col align-y full-width ${styles.main_content}`}
      >
        <h1 className={styles.hero}>Cookie Information</h1>
        <hr />

        <span>
        </span>

        <div className={`flex flex-col ${styles.main_content_text_container}`}>
            <h2>Control your data</h2>

            <p>We and our business partners use various technologies, including ‘cookies’ to process your data for the following purposes:</p>

            <ol>
                <li>Enhancing your experience of visiting and using our website</li>
                <li>Enabling the use of certain functions</li>
                <li>Data analytic</li>
                <li>Advertisement</li>
            </ol>
            
            
            
            
            <p>When you click ‘agree’, you hereby give explicit consent to us to process your data for the aforementioned purposes.</p>
        </div>

        
      </div>
  );
}