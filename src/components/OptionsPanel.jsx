import { ORDER_OPTIONS, DELAY_OPTIONS } from '../constants/languages'
import styles from './OptionsPanel.module.css'

export default function OptionsPanel({ order, onOrderChange, delay, onDelayChange, stripHtml, onStripHtmlChange }) {
  return (
    <div>
      <div className={styles.row}>
        <div className={styles.group}>
          <label className={styles.label}>Translation Order</label>
          <select
            className={styles.select}
            value={order}
            onChange={(e) => onOrderChange(e.target.value)}
          >
            {ORDER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Delay Between Requests</label>
          <select
            className={styles.select}
            value={delay}
            onChange={(e) => onDelayChange(e.target.value)}
          >
            {DELAY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.toggleRow}>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={stripHtml}
            onChange={(e) => onStripHtmlChange(e.target.checked)}
          />
          <span
            className={styles.slider}
            style={{ background: stripHtml ? 'var(--accent)' : 'var(--border)' }}
          >
            <span
              className={styles.knob}
              style={{ transform: stripHtml ? 'translateX(18px)' : 'translateX(0)' }}
            />
          </span>
        </label>
        <span className={styles.toggleLabel}>
          Strip HTML tags from subtitles before translating
        </span>
      </div>
    </div>
  )
}
