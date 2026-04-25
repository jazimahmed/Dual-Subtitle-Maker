import { useState } from 'react'
import { LANGS } from '../constants/languages'
import styles from './LanguagePicker.module.css'

export default function LanguagePicker({ value, onChange }) {
  const [search, setSearch] = useState('')

  const filtered = LANGS.filter((l) =>
    l.label.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div>
      <input
        className={styles.search}
        type="text"
        placeholder="🔍  Search language…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={styles.grid}>
        {filtered.map((l) => (
          <button
            key={l.code}
            className={`${styles.btn} ${value?.code === l.code ? styles.active : ''}`}
            onClick={() => onChange(l)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <p className={styles.selected}>
        Selected:{' '}
        <span className={styles.selectedValue}>
          {value ? value.label : 'none'}
        </span>
      </p>
    </div>
  )
}
