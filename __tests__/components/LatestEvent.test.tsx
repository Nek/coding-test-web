import { render, screen } from '../test-utils'
import { LatestEvent } from '../../app/components/LatestEvent'
import { CompanyEvent } from '../../app/types/company'

describe('LatestEvent', () => {
  const mockEvent: CompanyEvent = {
    eventId: 1,
    eventTitle: 'Q3 2022',
    eventDate: '2022-10-26T08:00:00.000Z',
    fiscalPeriod: 'Q3',
    fiscalYear: '2022',
  }

  it('renders event information correctly', () => {
    render(<LatestEvent event={mockEvent} />)
    
    expect(screen.getByText('Latest Report')).toBeInTheDocument()
    expect(screen.getByText('Q3 2022 - 2022')).toBeInTheDocument()
  })

  it('formats date correctly', () => {
    render(<LatestEvent event={mockEvent} />)
    
    // The date should be formatted as a localized date string
    const timeElement = screen.getByText(/10\/26\/2022|26\/10\/2022|2022-10-26/)
    expect(timeElement).toBeInTheDocument()
    expect(timeElement.tagName).toBe('TIME')
  })

  it('applies correct CSS classes', () => {
    render(<LatestEvent event={mockEvent} />)
    
    const container = screen.getByText('Latest Report').parentElement
    expect(container).toHaveClass('latest-event')
  })

  it('handles different event titles', () => {
    const eventWithDifferentTitle = {
      ...mockEvent,
      eventTitle: 'Annual Report 2023',
      fiscalYear: '2023',
    }
    
    render(<LatestEvent event={eventWithDifferentTitle} />)
    
    expect(screen.getByText('Annual Report 2023 - 2023')).toBeInTheDocument()
  })

  it('handles different fiscal years', () => {
    const eventWithDifferentYear = {
      ...mockEvent,
      fiscalYear: '2023',
    }
    
    render(<LatestEvent event={eventWithDifferentYear} />)
    
    expect(screen.getByText('Q3 2022 - 2023')).toBeInTheDocument()
  })

  it('handles different date formats', () => {
    const eventWithDifferentDate = {
      ...mockEvent,
      eventDate: '2023-12-15T10:30:00.000Z',
    }
    
    render(<LatestEvent event={eventWithDifferentDate} />)
    
    // Should format the new date
    const timeElement = screen.getByText(/12\/15\/2023|15\/12\/2023|2023-12-15/)
    expect(timeElement).toBeInTheDocument()
  })
})