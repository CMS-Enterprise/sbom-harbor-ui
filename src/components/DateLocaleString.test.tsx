import { render, screen } from '@testing-library/react'
import DateLocaleString from '@/components/DateLocaleString'

describe('DateLocaleString', () => {
  it('should render the input date as a locale string', () => {
    const inputDate = new Date('2023-01-01T00:00:00')
    const formattedDate = inputDate.toLocaleDateString('en-US')
    render(<DateLocaleString date={inputDate} />)
    const dateElement = screen.getByText(formattedDate)
    expect(dateElement).toBeInTheDocument()
  })
})
