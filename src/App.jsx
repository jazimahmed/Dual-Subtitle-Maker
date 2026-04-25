import { useState } from 'react'
import { useTranslation } from './hooks/useTranslation'
import Card from './components/Card'
import LanguagePicker from './components/LanguagePicker'
import SrtInput from './components/SrtInput'
import OptionsPanel from './components/OptionsPanel'
import ProgressPanel from './components/ProgressPanel'
import ResultPanel from './components/ResultPanel'
import styles from './App.module.css'

export default function App() {
  // Form state
  const [selLang,   setSelLang]   = useState(null)
  const [srtText,   setSrtText]   = useState('')
  const [order,     setOrder]     = useState('orig-trans')
  const [delay,     setDelay]     = useState('600')
  const [stripHtml, setStripHtml] = useState(true)

  const { start, progress, result, error, isRunning } = useTranslation()

  const handleSubmit = () => {
    start({ selLang, srtText, order, delayMs: parseInt(delay), stripHtml })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.gridOverlay} />

      <div className={styles.inner}>
        {/* ── Header ─────────────────────────────────────────────────── */}
        <header className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Standalone · No Login Required
          </div>
          <h1 className={styles.h1}>
            Dual Subtitle<br />Maker
          </h1>
          <p className={styles.tagline}>
            Translate any .SRT subtitle file and display both the original
            and your language side-by-side on screen.
          </p>
        </header>

        {/* ── Notice ─────────────────────────────────────────────────── */}
        <div className={styles.notice}>
          <span className={styles.noticeIcon}>✅</span>
          <span>
            Uses Google Translate's free service.{' '}
            <strong>No account, no API key, no login needed</strong> — just an
            internet connection for translation.
          </span>
        </div>

        {/* ── Steps ──────────────────────────────────────────────────── */}
        <div className={styles.main}>

          <Card step="01" title="Choose Your Mother Tongue">
            <LanguagePicker value={selLang} onChange={setSelLang} />
          </Card>

          <Card step="02" title="Load Your Subtitle File">
            <SrtInput value={srtText} onChange={setSrtText} />
          </Card>

          <Card step="03" title="Options">
            <OptionsPanel
              order={order}         onOrderChange={setOrder}
              delay={delay}         onDelayChange={setDelay}
              stripHtml={stripHtml} onStripHtmlChange={setStripHtml}
            />
          </Card>

          {/* Error */}
          {error && <div className={styles.error}>⚠ {error}</div>}

          {/* Submit */}
          <button
            className={styles.goBtn}
            onClick={handleSubmit}
            disabled={isRunning}
          >
            🚀 &nbsp; Translate &amp; Build Dual Subtitles
          </button>

          {/* Progress */}
          <ProgressPanel progress={progress} />

          {/* Result */}
          <ResultPanel result={result} order={order} />

          {/* How to use */}
          <div className={styles.howto}>
            <h3 className={styles.howtoTitle}>📺 How to show both subtitles on your video</h3>
            <ol>
              <li>Download the dual <code className={styles.code}>.srt</code> file above.</li>
              <li>
                Rename it to match your video — e.g. if your video is{' '}
                <code className={styles.code}>movie.mp4</code>, name the subtitle{' '}
                <code className={styles.code}>movie.srt</code>.
              </li>
              <li>Put both files in the <strong>same folder</strong>.</li>
              <li>
                Open in <strong>VLC</strong>, <strong>MPC-HC</strong>, or{' '}
                <strong>KMPlayer</strong> — dual subtitles appear automatically!
              </li>
            </ol>
          </div>

        </div>
      </div>
    </div>
  )
}
