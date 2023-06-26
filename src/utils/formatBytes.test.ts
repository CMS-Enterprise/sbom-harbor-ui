import formatBytes from '@/utils/formatBytes'

describe('formatBytes', () => {
  it('should return 0 Bytes if input is 0', () => {
    expect(formatBytes(0)).toBe('0 Bytes')
  })

  it('should format bytes to KB', () => {
    expect(formatBytes(1024)).toBe('1 KB')
  })

  it('should format bytes to MB', () => {
    expect(formatBytes(1048576)).toBe('1 MB')
  })

  it('should format bytes to GB', () => {
    expect(formatBytes(1073741824)).toBe('1 GB')
  })

  it('should format bytes to TB', () => {
    expect(formatBytes(1099511627776)).toBe('1 TB')
  })

  it('should format bytes to PB', () => {
    expect(formatBytes(1125899906842624)).toBe('1 PB')
  })

  it('should format bytes to EB', () => {
    expect(formatBytes(1152921504606846976)).toBe('1 EB')
  })

  it('should return decimal values if specified', () => {
    expect(formatBytes(1500, 2)).toBe('1.46 KB')
    expect(formatBytes(1500000, 2)).toBe('1.43 MB')
  })

  it('should return 0 decimal places if negative decimal is provided', () => {
    expect(formatBytes(1500, -2)).toBe('1 KB')
  })
})
