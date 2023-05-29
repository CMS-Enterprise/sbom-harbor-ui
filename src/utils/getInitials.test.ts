import getInitials from '@/utils/getInitials'

describe('getInitials', () => {
  it('should return initials from the full name', () => {
    expect(getInitials({ name: 'John Doe' })).toEqual('JD')
  })

  it('should return initials from the email if the name is not provided', () => {
    expect(getInitials({ email: 'john.doe@example.com' })).toEqual('JD')
  })

  it('should return initials from the email if the name is a single character', () => {
    expect(getInitials({ name: 'J', email: 'john.doe@example.com' })).toEqual(
      'JD'
    )
  })

  it('should return initials from the first two characters of the email if there is no period in the email', () => {
    expect(getInitials({ email: 'john@example.com' })).toEqual('JO')
  })

  it('should return initials from the name if the email is not provided', () => {
    expect(getInitials({ name: 'John Doe' })).toEqual('JD')
  })

  it('should handle names with more than two words', () => {
    expect(getInitials({ name: 'John Jacob Doe' })).toEqual('JD')
  })

  it('should handle names with only one word', () => {
    expect(getInitials({ name: 'John' })).toEqual('J')
  })

  it('should handle names with special characters', () => {
    expect(getInitials({ name: 'Jöhn Døe' })).toEqual('JD')
  })
})
