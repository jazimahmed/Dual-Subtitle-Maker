import { useState, useCallback } from 'react'
import { parseSRT, buildSRT } from '../utils/srt'
import { translateOne, sleep } from '../utils/translate'

/**
 * Manages the full translation workflow:
 * validation → per-subtitle API calls → progress tracking → result assembly.
 */
export function useTranslation() {
  const [progress, setProgress] = useState(null) // { done, total, logs[] } | null
  const [result,   setResult]   = useState(null) // { srt, subs, translations, errors } | null
  const [error,    setError]    = useState('')

  const isRunning = !!progress

  const start = useCallback(async ({ selLang, srtText, order, delayMs, stripHtml }) => {
    // ── Validate inputs ──────────────────────────────────────────────────
    if (!selLang) {
      setError('Please select your language first.')
      return
    }
    if (!srtText.trim()) {
      setError('Please paste or load an SRT file.')
      return
    }

    const subs = parseSRT(srtText, stripHtml)
    if (subs.length === 0) {
      setError('No valid subtitles found. Check your SRT format.')
      return
    }

    // ── Reset state ──────────────────────────────────────────────────────
    setError('')
    setResult(null)
    setProgress({
      done: 0,
      total: subs.length,
      logs: [{ text: `Starting: ${subs.length} subtitles → ${selLang.label}`, cls: 'cur' }],
    })

    // ── Translate subtitle by subtitle ───────────────────────────────────
    const translations = []
    let errors = 0

    for (let i = 0; i < subs.length; i++) {
      // Add "translating…" log entry
      setProgress((p) => ({
        ...p,
        logs: [...p.logs, { text: `[${i + 1}/${subs.length}] Translating…`, cls: 'cur' }],
      }))

      try {
        const translated = await translateOne(subs[i].text, selLang.code)
        translations.push(translated)

        // Replace last log entry with success
        setProgress((p) => {
          const logs = [...p.logs]
          logs[logs.length - 1] = { text: `[${i + 1}/${subs.length}] ✓ Done`, cls: 'ok' }
          return { ...p, done: i + 1, logs }
        })
      } catch {
        errors++
        translations.push(subs[i].text) // fall back to original

        setProgress((p) => {
          const logs = [...p.logs]
          logs[logs.length - 1] = {
            text: `[${i + 1}/${subs.length}] ✗ Failed (kept original)`,
            cls: 'err',
          }
          return { ...p, done: i + 1, logs }
        })
      }

      if (i < subs.length - 1) await sleep(delayMs)
    }

    // ── Assemble final SRT ───────────────────────────────────────────────
    const srt = buildSRT(subs, translations, order)
    setProgress(null)
    setResult({ srt, subs, translations, errors })
  }, [])

  const clearError = useCallback(() => setError(''), [])
  const clearResult = useCallback(() => setResult(null), [])

  return { start, progress, result, error, isRunning, clearError, clearResult }
}
