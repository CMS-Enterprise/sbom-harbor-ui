import { advanceTo, clear } from 'jest-date-mock'
import {
  formatLastUploadDate,
  mapLastUploadToFreshness,
} from '@/views/Uploads/utils'

describe('formatLastUploadDate', () => {
  it('returns "N/A" when lastUpload is undefined', () => {
    expect(formatLastUploadDate()).toBe('N/A')
  })

  it('throws an error for an invalid date', () => {
    expect(() => formatLastUploadDate('2023-02-32T00:00:00.000Z')).toThrow(
      'Invalid date object'
    )
  })

  it('formats a valid date correctly', () => {
    const isoDate = new Date().toISOString()
    const formattedDate = new Date(isoDate).toLocaleDateString()
    expect(formatLastUploadDate(isoDate)).toBe(formattedDate)
  })
})

describe('mapLastUploadToFreshness', () => {
  beforeEach(() => {
    // Freeze time
    advanceTo(new Date(2023, 5, 27, 0, 0, 0)) // June 27, 2023
  })

  afterEach(() => {
    // Unfreeze time
    clear()
  })

  it('returns -1 when lastUpload is undefined', () => {
    expect(mapLastUploadToFreshness()).toBe(-1)
  })

  it('returns the correct freshness score', () => {
    const tenDaysAgo = new Date()
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10)
    const isoDate = tenDaysAgo.toISOString()
    expect(mapLastUploadToFreshness(isoDate)).toBe(10)
  })
})
