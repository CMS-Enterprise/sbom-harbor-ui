import sanitizeUrl from '@/utils/sanitizeUrl'

describe('sanitizeUrl', () => {
  it('should remove double slashes from the URL', () => {
    const url = 'http://example.com//path//to//resource'
    const sanitizedUrl = sanitizeUrl(url)
    expect(sanitizedUrl.toString()).toBe('http://example.com/path/to/resource')
  })

  it('should not modify URLs without double slashes', () => {
    const url = 'http://example.com/path/to/resource'
    const sanitizedUrl = sanitizeUrl(url)
    expect(sanitizedUrl.toString()).toBe(url)
  })
})
