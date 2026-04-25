import { useState } from 'react'
import { escapeHtml, downloadFile } from '../utils/srt'
import styles from './ResultPanel.module.css'

const PREVIEW_LIMIT = 30

export default function ResultPanel({ result, order }) {
  const [copyLabel, setCopyLabel] = useState('📋  Copy to Clipboard')

  if (!result) return null

  const { srt, subs, translations, errors } = result

  const handleDownload = () => downloadFile(srt, 'dual_subtitles.srt')

  const handleCopy = () => {
    navigator.clipboard.writeText(srt).then(() => {
      setCopyLabel('✓  Copied!')
      setTimeout(() => setCopyLabel('📋  Copy to Clipboard'), 2000)
    })
  }

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.head}>
        <div className={styles.headTitle}>✓  Dual Subtitles Ready</div>
        <div className={styles.stats}>
          {subs.length} subtitles · {errors > 0 ? `${errors} failed` : 'all translated'}
        </div>
      </div>

      {/* Preview */}
      <div className={styles.preview}>
        {subs.slice(0, PREVIEW_LIMIT).map((s, i) => {
          const t = translations[i]
          return (
            <div key={i} className={styles.entry}>
              <span className={styles.idx}>{escapeHtml(s.index)}</span>
              {'\n'}
              <span className={styles.time}>{escapeHtml(s.time)}</span>
              {'\n'}
              {order === 'orig-trans' ? (
                <>
                  <span className={styles.orig}>{escapeHtml(s.text)}</span>
                  {'\n'}
                  <span className={styles.trans}>{escapeHtml(t)}</span>
                </>
              ) : (
                <>
                  <span className={styles.trans}>{escapeHtml(t)}</span>
                  {'\n'}
                  <span className={styles.orig}>{escapeHtml(s.text)}</span>
                </>
              )}
            </div>
          )
        })}
        {subs.length > PREVIEW_LIMIT && (
          <span className={styles.more}>… and {subs.length - PREVIEW_LIMIT} more entries</span>
        )}
      </div>

      {/* Download row */}
      <div className={styles.dlRow}>
        <button className={`${styles.btn} ${styles.primary}`} onClick={handleDownload}>
          ⬇  Download .SRT File
        </button>
        <button className={`${styles.btn} ${styles.secondary}`} onClick={handleCopy}>
          {copyLabel}
        </button>
      </div>
    </div>
  )
}
