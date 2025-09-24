import { render, screen, waitFor } from '../test-utils'
import Home from '../../app/page'
import { CompaniesApiResponse } from '../../app/types/company'

// Mock the useCompanies hook
jest.mock('../../app/hooks/useCompanies')

// Mock the CompanyList component
jest.mock('../../app/components/CompanyList', () => ({
  CompanyList: ({ companies }: { companies: any[] }) => (
    <div data-testid="company-list">
      {companies.map((company) => (
        <div key={company.companyId} data-testid={`company-${company.companyId}`}>
          {company.displayName}
        </div>
      ))}
    </div>
  ),
}))

const mockUseCompanies = require('../../app/hooks/useCompanies').useCompanies as jest.MockedFunction<any>

const mockCompaniesData = [
  {
    companyId: 1,
    displayName: 'Test Company 1',
    companyTicker: 'TEST1',
  },
  {
    companyId: 2,
    displayName: 'Test Company 2',
    companyTicker: 'TEST2',
  },
]

describe('Home Page', () => {
  beforeEach(() => {
    mockUseCompanies.mockClear()
  })

  it('renders page title and subtitle', () => {
    mockUseCompanies.mockReturnValue({
      companies: [],
      loading: false,
      error: null,
    })

    render(<Home />)
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Quartr')
    expect(screen.getByText('Trending companies')).toBeInTheDocument()
  })

  it('shows loading state initially', () => {
    mockUseCompanies.mockReturnValue({
      companies: [],
      loading: true,
      error: null,
    })

    render(<Home />)
    
    expect(screen.getByText('Loading trending companies...')).toBeInTheDocument()
    expect(screen.queryByTestId('company-list')).not.toBeInTheDocument()
  })

  it('displays companies when loaded successfully', () => {
    mockUseCompanies.mockReturnValue({
      companies: mockCompaniesData,
      loading: false,
      error: null,
    })

    render(<Home />)
    
    expect(screen.getByTestId('company-list')).toBeInTheDocument()
    expect(screen.getByTestId('company-1')).toBeInTheDocument()
    expect(screen.getByTestId('company-2')).toBeInTheDocument()
    expect(screen.getByText('Test Company 1')).toBeInTheDocument()
    expect(screen.getByText('Test Company 2')).toBeInTheDocument()
  })

  it('shows error state when fetch fails', () => {
    mockUseCompanies.mockReturnValue({
      companies: [],
      loading: false,
      error: 'Failed to fetch companies',
    })

    render(<Home />)
    
    expect(screen.getByText('Error loading companies: Failed to fetch companies')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument()
    expect(screen.queryByTestId('company-list')).not.toBeInTheDocument()
  })

  it('renders retry button when there is an error', () => {
    mockUseCompanies.mockReturnValue({
      companies: [],
      loading: false,
      error: 'Network error',
    })

    render(<Home />)
    
    const retryButton = screen.getByRole('button', { name: 'Try Again' })
    expect(retryButton).toBeInTheDocument()
    expect(retryButton).toHaveClass('retry-button')
  })

  it('applies correct CSS classes', () => {
    mockUseCompanies.mockReturnValue({
      companies: [],
      loading: false,
      error: null,
    })

    render(<Home />)
    
    const main = screen.getByRole('main')
    expect(main).toHaveClass('main-container')
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('page-header')
    
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveClass('page-title')
    
    const subtitle = screen.getByText('Trending companies')
    expect(subtitle).toHaveClass('page-subtitle')
  })

  it('does not show loading or error when companies are displayed', () => {
    mockUseCompanies.mockReturnValue({
      companies: mockCompaniesData,
      loading: false,
      error: null,
    })

    render(<Home />)
    
    expect(screen.queryByText('Loading trending companies...')).not.toBeInTheDocument()
    expect(screen.queryByText(/Error loading companies/)).not.toBeInTheDocument()
    expect(screen.getByTestId('company-list')).toBeInTheDocument()
  })

  it('handles empty companies array', () => {
    mockUseCompanies.mockReturnValue({
      companies: [],
      loading: false,
      error: null,
    })

    render(<Home />)
    
    expect(screen.getByTestId('company-list')).toBeInTheDocument()
    expect(screen.queryByTestId(/company-\d+/)).not.toBeInTheDocument()
  })

  it('has proper semantic HTML structure', () => {
    mockUseCompanies.mockReturnValue({
      companies: mockCompaniesData,
      loading: false,
      error: null,
    })

    render(<Home />)
    
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('transitions from loading to success state', async () => {
    // Start with loading
    mockUseCompanies.mockReturnValue({
      companies: [],
      loading: true,
      error: null,
    })

    const { rerender } = render(<Home />)
    
    expect(screen.getByText('Loading trending companies...')).toBeInTheDocument()
    
    // Simulate successful load
    mockUseCompanies.mockReturnValue({
      companies: mockCompaniesData,
      loading: false,
      error: null,
    })

    rerender(<Home />)
    
    expect(screen.queryByText('Loading trending companies...')).not.toBeInTheDocument()
    expect(screen.getByTestId('company-list')).toBeInTheDocument()
  })

  it('transitions from loading to error state', () => {
    // Start with loading
    mockUseCompanies.mockReturnValue({
      companies: [],
      loading: true,
      error: null,
    })

    const { rerender } = render(<Home />)
    
    expect(screen.getByText('Loading trending companies...')).toBeInTheDocument()
    
    // Simulate error
    mockUseCompanies.mockReturnValue({
      companies: [],
      loading: false,
      error: 'Network error',
    })

    rerender(<Home />)
    
    expect(screen.queryByText('Loading trending companies...')).not.toBeInTheDocument()
    expect(screen.getByText('Error loading companies: Network error')).toBeInTheDocument()
  })
})