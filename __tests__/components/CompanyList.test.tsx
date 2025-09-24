import { render, screen } from '../test-utils'
import { CompanyList } from '../../app/components/CompanyList'
import { Company } from '../../app/types/company'

// Mock the CompanyCard component
jest.mock('../../app/components/CompanyCard', () => ({
  CompanyCard: ({ company }: { company: Company }) => (
    <div data-testid={`company-card-${company.companyId}`}>
      {company.displayName}
    </div>
  ),
}))

describe('CompanyList', () => {
  const mockCompanies: Company[] = [
    {
      companyId: 1,
      companyName: 'Test Company 1',
      companyCountry: 'NO',
      companyTicker: 'TEST1',
      displayName: 'Test Company 1',
      infoUrl: 'https://test1.com',
      liveUrl: 'https://test1.com/investor',
      logoLightUrl: 'https://test1.com/logo.png',
      logoDarkUrl: 'https://test1.com/logo-dark.png',
      iconUrl: null,
      description: 'First test company',
      reportingCurrency: 'NOK',
      colorSettings: { brandColor: '#ffffff' },
      events: [],
      isins: [],
    },
    {
      companyId: 2,
      companyName: 'Test Company 2',
      companyCountry: 'US',
      companyTicker: 'TEST2',
      displayName: 'Test Company 2',
      infoUrl: 'https://test2.com',
      liveUrl: 'https://test2.com/investor',
      logoLightUrl: 'https://test2.com/logo.png',
      logoDarkUrl: 'https://test2.com/logo-dark.png',
      iconUrl: null,
      description: 'Second test company',
      reportingCurrency: 'USD',
      colorSettings: { brandColor: '#000000' },
      events: [],
      isins: [],
    },
  ]

  it('renders list of companies correctly', () => {
    render(<CompanyList companies={mockCompanies} />)
    
    expect(screen.getByTestId('company-card-1')).toBeInTheDocument()
    expect(screen.getByTestId('company-card-2')).toBeInTheDocument()
    expect(screen.getByText('Test Company 1')).toBeInTheDocument()
    expect(screen.getByText('Test Company 2')).toBeInTheDocument()
  })

  it('applies correct CSS class to container', () => {
    render(<CompanyList companies={mockCompanies} />)
    
    const container = screen.getByTestId('company-card-1').parentElement
    expect(container).toHaveClass('company-list')
  })

  it('renders each company with unique key', () => {
    render(<CompanyList companies={mockCompanies} />)
    
    // Each company should be rendered as a separate element
    const companyCards = screen.getAllByText(/Test Company/)
    expect(companyCards).toHaveLength(2)
  })

  it('shows no companies message when list is empty', () => {
    render(<CompanyList companies={[]} />)
    
    expect(screen.getByText('No trending companies available at the moment.')).toBeInTheDocument()
    expect(screen.queryByTestId(/company-card/)).not.toBeInTheDocument()
  })

  it('applies correct CSS class to no companies message', () => {
    render(<CompanyList companies={[]} />)
    
    const noCompaniesElement = screen.getByText('No trending companies available at the moment.')
    expect(noCompaniesElement.parentElement).toHaveClass('no-companies')
  })

  it('handles single company correctly', () => {
    render(<CompanyList companies={[mockCompanies[0]]} />)
    
    expect(screen.getByTestId('company-card-1')).toBeInTheDocument()
    expect(screen.queryByTestId('company-card-2')).not.toBeInTheDocument()
    expect(screen.getByText('Test Company 1')).toBeInTheDocument()
  })

  it('handles large number of companies', () => {
    const manyCompanies = Array.from({ length: 10 }, (_, i) => ({
      ...mockCompanies[0],
      companyId: i + 1,
      displayName: `Company ${i + 1}`,
    }))
    
    render(<CompanyList companies={manyCompanies} />)
    
    manyCompanies.forEach((_, index) => {
      expect(screen.getByTestId(`company-card-${index + 1}`)).toBeInTheDocument()
    })
  })
})