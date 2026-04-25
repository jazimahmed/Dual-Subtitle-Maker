import { useEffect, useRef } from 'react'
import styles from './ProgressPanel.module.css'

const LOG_COLOR = { ok: '#34d399', err: '#f87171', cur: '#38bdf8' }

export default function ProgressPanel({ progress }) {
  const logEndRef = useRef(null)

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [progress?.logs?.length])

  if (!progress) return null

  const pct = Math.round((progress.done / progress.total) * 100)

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span className={styles.title}>Translating via Google Translate…</span>
        <span className={styles.pct}>{pct}%</span>
      </div>

      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>

      <div className={styles.log}>
        {progress.logs.map((entry, i) => (
          <div key={i} style={{ color: LOG_COLOR[entry.cls] ?? 'var(--muted)' }}>
            {entry.text}
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  )
}
