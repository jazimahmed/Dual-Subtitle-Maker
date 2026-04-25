import { useRef } from 'react'
import { useFileLoader } from '../hooks/useFileLoader'
import { countValidSubs } from '../utils/srt'
import styles from './SrtInput.module.css'

export default function SrtInput({ value, onChange }) {
  const fileInputRef = useRef(null)

  const { fileName, isDragging, handleInputChange, handleDrop, handleDragOver, handleDragLeave } =
    useFileLoader(onChange)

  const subCount = countValidSubs(value)

  return (
    <div>
      {/* Drop zone */}
      <div
        className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".srt,.txt"
          style={{ display: 'none' }}
          onChange={handleInputChange}
        />
        <div className={styles.dzIcon}>📂</div>
        <div>
          Click to browse or drag &amp; drop your{' '}
          <code className={styles.code}>.srt</code> file here
        </div>
      </div>

      {/* Paste area */}
      <textarea
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`…or paste your SRT content directly here:\n\n1\n00:00:01,000 --> 00:00:03,500\nHello, how are you?\n\n2\n00:00:04,000 --> 00:00:06,800\nI am doing well, thank you!`}
      />

      {/* Meta row */}
      <div className={styles.meta}>
        <span>
          Subtitles detected:{' '}
          <span className={styles.count}>{subCount}</span>
        </span>
        {fileName && <span className={styles.fileName}>{fileName}</span>}
      </div>
    </div>
  )
}
