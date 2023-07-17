import toTitleCase from '@/utils/toTitleCase'

describe('utils/toTitleCase', () => {
  it('should convert a lowercase string to proper case', () => {
    expect(toTitleCase('hello world')).toBe('Hello World')
  })

  it('should convert an uppercase string to proper case', () => {
    expect(toTitleCase('HELLO WORLD')).toBe('Hello World')
  })

  it('should convert a mixed case string to proper case', () => {
    expect(toTitleCase('hELlo WOrlD')).toBe('Hello World')
  })

  it('should handle an empty string', () => {
    expect(toTitleCase('')).toBe('')
  })

  it('should handle a string with only whitespace characters', () => {
    expect(toTitleCase('   ')).toBe('   ')
  })
})
