/**
 * Parse raw SRT text into an array of subtitle objects.
 * @param {string} text - Raw SRT content
 * @param {boolean} stripHtml - Whether to strip HTML tags from subtitle text
 * @returns {{ index: string, time: string, text: string }[]}
 */
export function parseSRT(text, stripHtml = true) {
  const blocks = text.trim().split(/\n\s*\n/)
  const subs = []

  for (const block of blocks) {
    const lines = block.trim().split('\n')
    if (lines.length < 3) continue
    if (!/-->/.test(lines[1])) continue

    const index = lines[0].trim()
    const time  = lines[1].trim()
    let txt     = lines.slice(2).join('\n').trim()

    if (stripHtml) txt = txt.replace(/<[^>]*>/g, '')
    if (txt) subs.push({ index, time, text: txt })
  }

  return subs
}

/**
 * Build a dual-subtitle SRT string from subtitle objects + translations.
 * @param {{ index: string, time: string, text: string }[]} subs
 * @param {string[]} translations
 * @param {'orig-trans'|'trans-orig'} order
 * @returns {string}
 */
export function buildSRT(subs, translations, order) {
  return subs
    .map((s, i) => {
      const orig  = s.text
      const trans = translations[i]
      const body  = order === 'orig-trans'
        ? `${orig}\n${trans}`
        : `${trans}\n${orig}`
      return `${s.index}\n${s.time}\n${body}`
    })
    .join('\n\n')
}

/**
 * Count valid subtitle blocks in raw SRT text.
 * @param {string} text
 * @returns {number}
 */
export function countValidSubs(text) {
  if (!text.trim()) return 0
  return text
    .split(/\n\s*\n/)
    .filter((b) => {
      const lines = b.trim().split('\n')
      return lines.length >= 3 && /-->/.test(lines[1])
    }).length
}

/**
 * Escape HTML special characters.
 * @param {string} s
 * @returns {string}
 */
export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Trigger a file download in the browser.
 * @param {string} content
 * @param {string} filename
 */
export function downloadFile(content, filename) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const a    = document.createElement('a')
  a.href     = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}
