import { act, renderHook } from '@testing-library/react'
import useCopyToClipboard from '../hooks/useCopyToClipboard'

describe('useCopyToClipboard', () => {
  it('should copy text to clipboard and clear it', async () => {
    const { result } = renderHook(() => useCopyToClipboard())
    const [copiedText, copy, clear] = result.current

    // Initially, copiedText should be null
    expect(copiedText).toBeNull()

    // Mock the clipboard API
    // @ts-expect-error
    global.navigator.clipboard = {
      writeText: jest.fn().mockResolvedValue(undefined),
    }

    // Copy text
    await act(async () => {
      const success = await copy('test')
      expect(success).toBe(true)
    })

    // Check if the text is copied
    expect(result.current[0]).toBe('test')

    // Clear the copied text
    act(() => {
      clear()
    })

    // Check if the copied text is cleared
    expect(result.current[0]).toBeNull()
  })

  it('should handle errors when copying text', async () => {
    const { result } = renderHook(() => useCopyToClipboard())
    const [, copy] = result.current

    // Mock the clipboard API to throw an error
    // @ts-expect-error
    global.navigator.clipboard = {
      writeText: jest.fn().mockRejectedValue(new Error('Failed to copy text')),
    }

    // Try to copy text
    await act(async () => {
      const success = await copy('test')
      expect(success).toBe(false)
    })

    // Check if the copied text is null
    expect(result.current[0]).toBeNull()
  })

  it('should return false when clipboard API is not supported', async () => {
    const { result } = renderHook(() => useCopyToClipboard())
    const [, copy] = result.current

    // Mock the clipboard API to be undefined
    // @ts-expect-error
    global.navigator.clipboard = undefined

    // Try to copy text
    await act(async () => {
      const success = await copy('test')
      expect(success).toBe(false)
    })

    // Check if the copied text is null
    expect(result.current[0]).toBeNull()
  })
})
