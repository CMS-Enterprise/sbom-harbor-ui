import { hexToRGBA } from './hexToRGBA'

describe('hexToRGBA', () => {
  it('should convert hex to rgba', () => {
    expect(hexToRGBA('#FFFFFF', 1)).toBe('rgba(255, 255, 255, 1)')
    expect(hexToRGBA('#000000', 0.5)).toBe('rgba(0, 0, 0, 0.5)')
  })

  it('should handle short hex codes', () => {
    expect(hexToRGBA('#FFF', 1)).toBe('rgba(255, 255, 255, 1)')
    expect(hexToRGBA('#000', 0.5)).toBe('rgba(0, 0, 0, 0.5)')
  })

  it('should return an error for invalid hex codes', () => {
    expect(() => hexToRGBA('#ZZZ', 1)).toThrow(/Invalid hex color/)
    expect(() => hexToRGBA('FFFFFF', 1)).toThrow(/Invalid hex color/)
  })

  it('should return an error for invalid opacity values', () => {
    expect(() => hexToRGBA('#FFFFFF', -1)).toThrow(/Invalid opacity value/)
    expect(() => hexToRGBA('#FFFFFF', 2)).toThrow(/Invalid opacity value/)
  })
})
