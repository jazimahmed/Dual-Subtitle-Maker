/**
 * Translate a single string using Google Translate's free endpoint.
 * @param {string} text - Text to translate
 * @param {string} targetLang - BCP-47 language code (e.g. 'fr', 'zh-cn')
 * @returns {Promise<string>} Translated text
 */
export async function translateOne(text, targetLang) {
  const url =
    `https://translate.googleapis.com/translate_a/single` +
    `?client=gtx&sl=auto&tl=${encodeURIComponent(targetLang)}` +
    `&dt=t&q=${encodeURIComponent(text)}`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const data = await res.json()
  // data[0] is an array of [translatedSegment, originalSegment] pairs
  return data[0]
    .map((seg) => seg[0])
    .join('')
    .trim()
}

/**
 * Simple promise-based sleep.
 * @param {number} ms
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
