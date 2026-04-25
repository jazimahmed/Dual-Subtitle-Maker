import styles from './Card.module.css'

export default function Card({ step, title, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <div className={styles.stepNum}>{step}</div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
