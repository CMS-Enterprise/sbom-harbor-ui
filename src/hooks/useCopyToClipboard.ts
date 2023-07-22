/**
 * Custom hook to copy text to clipboard.
 * @module sbom-harbor-ui/hooks/useCopyToClipboard
 */
import { useState } from 'react'

export type CopiedValue = string | null
export type CopyFn = (text: string) => Promise<boolean> // Return success
export type ClearFn = () => void

/**
 * Hook to copy text to clipboard.
 * @returns {[CopiedValue, CopyFn, ClearFn]} [copiedText, copy, clear]
 */
function useCopyToClipboard(): [CopiedValue, CopyFn, ClearFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const clear = () => setCopiedText(null)

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      // Clipboard not supported
      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch (error) {
      setCopiedText(null)
      return false
    }
  }

  return [copiedText, copy, clear]
}

export default useCopyToClipboard
