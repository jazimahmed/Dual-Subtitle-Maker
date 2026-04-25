import { useState, useCallback } from 'react'

/**
 * Handles file selection (click + drag-and-drop) and reads the file as text.
 * Returns helpers to wire up to a drop zone and a hidden <input type="file">.
 */
export function useFileLoader(onLoad) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName,   setFileName]   = useState('')

  const readFile = useCallback(
    (file) => {
      if (!file) return
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (ev) => onLoad(ev.target.result)
      reader.readAsText(file, 'utf-8')
    },
    [onLoad],
  )

  const handleInputChange = useCallback(
    (e) => readFile(e.target.files[0]),
    [readFile],
  )

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragging(false)
      readFile(e.dataTransfer.files[0])
    },
    [readFile],
  )

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => setIsDragging(false), [])

  return {
    fileName,
    isDragging,
    handleInputChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  }
}
