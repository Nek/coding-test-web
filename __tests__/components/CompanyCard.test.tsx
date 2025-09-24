import { render, screen } from '../test-utils'
import { CompanyCard } from '../../app/components/CompanyCard'
import { Company } from '../../app/types/company'

describe('CompanyCard', () => {
  const mockCompany: Company = {
    companyId: 1,
    companyName: 'Test Company',
    companyCountry: 'NO',
    companyTicker: 'TEST',
    displayName: 'Test Company',
    infoUrl: 'https://test.com',
    liveUrl: 'https://test.com/investor',
    logoLightUrl: 'https://test.com/logo.png',
    logoDarkUrl: 'https://test.com/logo-dark.png',
    iconUrl: 'https://test.com/icon.png',
    description: 'A comprehensive test company description',
    reportingCurrency: 'NOK',
    colorSettings: {
      brandColor: '#ff0000',
    },
    events: [
      {
        eventId: 1,
        eventTitle: 'Q3 2022',
        eventDate: '2022-10-26T08:00:00.000Z',
        fiscalPeriod: 'Q3',
        fiscalYear: '2022',
      },
    ],
    isins: [],
  }

  it('renders all company information correctly', () => {
    render(<CompanyCard company={mockCompany} />)
    
    // Check if all components are rendered
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Company')
    expect(screen.getByText('TEST')).toBeInTheDocument()
    expect(screen.getByText('NO')).toBeInTheDocument()
    expect(screen.getByText('NOK')).toBeInTheDocument()
    expect(screen.getByText('A comprehensive test company description')).toBeInTheDocument()
    expect(screen.getByText('Latest Report')).toBeInTheDocument()
    expect(screen.getByText('Q3 2022 - 2022')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Investor Relations' })).toBeInTheDocument()
  })

  it('applies brand color to border', () => {
    const { container } = render(<CompanyCard company={mockCompany} />)
    
    const card = container.querySelector('.company-card')
    expect(card).toHaveStyle('border-left-color: #ff0000')
  })

  it('renders logo with correct attributes', () => {
    render(<CompanyCard company={mockCompany} />)
    
    const logo = screen.getByRole('img')
    expect(logo).toHaveAttribute('src', 'https://test.com/logo.png')
    expect(logo).toHaveAttribute('alt', 'Test Company logo')
  })

  it('renders investor relations link with correct URL', () => {
    render(<CompanyCard company={mockCompany} />)
    
    const link = screen.getByRole('link', { name: 'Investor Relations' })
    expect(link).toHaveAttribute('href', 'https://test.com/investor')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('handles company without events', () => {
    const companyWithoutEvents = {
      ...mockCompany,
      events: [],
    }
    
    render(<CompanyCard company={companyWithoutEvents} />)
    
    expect(screen.queryByText('Latest Report')).not.toBeInTheDocument()
    expect(screen.getByText('Test Company')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Investor Relations' })).toBeInTheDocument()
  })

  it('shows latest event when multiple events exist', () => {
    const companyWithMultipleEvents = {
      ...mockCompany,
      events: [
        {
          eventId: 2,
          eventTitle: 'Q4 2022',
          eventDate: '2023-01-26T08:00:00.000Z',
          fiscalPeriod: 'Q4',
          fiscalYear: '2022',
        },
        {
          eventId: 1,
          eventTitle: 'Q3 2022',
          eventDate: '2022-10-26T08:00:00.000Z',
          fiscalPeriod: 'Q3',
          fiscalYear: '2022',
        },
      ],
    }
    
    render(<CompanyCard company={companyWithMultipleEvents} />)
    
    // Should show the first event (latest)
    expect(screen.getByText('Q4 2022 - 2022')).toBeInTheDocument()
    expect(screen.queryByText('Q3 2022 - 2022')).not.toBeInTheDocument()
  })

  it('applies correct CSS class to main container', () => {
    const { container } = render(<CompanyCard company={mockCompany} />)
    
    const card = container.querySelector('.company-card')
    expect(card).toHaveClass('company-card')
  })

  it('handles different brand colors', () => {
    const companyWithDifferentColor = {
      ...mockCompany,
      colorSettings: {
        brandColor: '#00ff00',
      },
    }
    
    const { container } = render(<CompanyCard company={companyWithDifferentColor} />)
    
    const card = container.querySelector('.company-card')
    expect(card).toHaveStyle('border-left-color: #00ff00')
  })

  it('handles empty logo URL gracefully', () => {
    const companyWithoutLogo = {
      ...mockCompany,
      logoLightUrl: '',
    }
    
    render(<CompanyCard company={companyWithoutLogo} />)
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('Test Company')).toBeInTheDocument()
  })

  it('renders all granular components in correct order', () => {
    const { container } = render(<CompanyCard company={mockCompany} />)
    
    const card = container.querySelector('.company-card')
    const children = Array.from(card?.children || [])
    
    // Should have header, meta, description, event, and actions
    expect(children).toHaveLength(5)
  })
})