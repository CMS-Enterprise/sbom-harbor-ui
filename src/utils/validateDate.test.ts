import validateDate from '@/utils/validateDate'

describe('validateDate', () => {
  it('returns undefined if dateString is undefined', () => {
    expect(validateDate()).toBeUndefined()
  })

  it('throws error if dateString cannot be converted into a valid date', () => {
    expect(() => validateDate('2023-02-32T00:00:00.000Z')).toThrow(
      'Invalid date object'
    )
  })

  it('returns a Date object if dateString is a valid ISO date string', () => {
    const validDateString = '2023-07-05T00:00:00.000Z'
    const result = validateDate(validDateString)
    expect(result).toBeInstanceOf(Date)
    expect(result?.toISOString()).toBe(validDateString)
  })
})
