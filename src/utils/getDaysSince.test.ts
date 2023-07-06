import getDaysSince from './getDaysSince'

describe('getDaysSince', () => {
  it('should return the correct number of days since a past date', () => {
    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - 5) // 5 days in the past
    expect(getDaysSince(pastDate)).toBe(5)
  })

  it('should return 0 for the current date', () => {
    const now = new Date()
    expect(getDaysSince(now)).toBe(0)
  })

  it('should handle dates in the future', () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 5) // 5 days in the future
    expect(getDaysSince(futureDate)).toBe(-5)
  })

  it('should handle invalid date objects', () => {
    const invalidDate = new Date('invalid date')
    expect(() => getDaysSince(invalidDate)).toThrow()
  })
})
