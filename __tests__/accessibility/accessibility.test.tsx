import { render, screen } from '../test-utils'
import { axe, toHaveNoViolations } from 'jest-axe'
import Home from '../../app/page'
import { CompanyCard } from '../../app/components/CompanyCard'
import { Company } from '../../app/types/company'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

// Mock the useCompanies hook
jest.mock('../../app/hooks/useCompanies')
const mockUseCompanies = require('../../app/hooks/useCompanies').useCompanies as jest.MockedFunction<any>

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
  description: 'A test company description',
  reportingCurrency: 'NOK',
  colorSettings: { brandColor: '#ff0000' },
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

describe('Accessibility Tests', () => {
  beforeEach(() => {
    mockUseCompanies.mockClear()
  })

  describe('Home Page Accessibility', () => {
    it('should not have accessibility violations in loading state', async () => {
      mockUseCompanies.mockReturnValue({
        companies: [],
        loading: true,
        error: null,
      })

      const { container } = render(<Home />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations in error state', async () => {
      mockUseCompanies.mockReturnValue({
        companies: [],
        loading: false,
        error: 'Network error',
      })

      const { container } = render(<Home />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with companies', async () => {
      mockUseCompanies.mockReturnValue({
        companies: [mockCompany],
        loading: false,
        error: null,
      })

      const { container } = render(<Home />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('CompanyCard Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<CompanyCard company={mockCompany} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have proper ARIA attributes', () => {
      render(<CompanyCard company={mockCompany} />)
      
      const article = screen.getByRole('article')
      expect(article).toHaveAttribute('aria-labelledby', 'company-1-name')
      
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveAttribute('id', 'company-1-name')
    })

    it('should have keyboard navigation support', () => {
      render(<CompanyCard company={mockCompany} />)
      
      const article = screen.getByRole('article')
      expect(article).toHaveAttribute('tabIndex', '0')
    })
  })

  describe('Semantic HTML Structure', () => {
    it('should have proper heading hierarchy', () => {
      mockUseCompanies.mockReturnValue({
        companies: [mockCompany],
        loading: false,
        error: null,
      })

      render(<Home />)
      
      // Main heading
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Quartr')
      
      // Company name heading
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Company')
      
      // Latest report heading
      expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Latest Report')
    })

    it('should have proper landmark roles', () => {
      mockUseCompanies.mockReturnValue({
        companies: [mockCompany],
        loading: false,
        error: null,
      })

      render(<Home />)
      
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('article')).toBeInTheDocument()
    })
  })

  describe('ARIA Live Regions', () => {
    it('should announce loading state', () => {
      mockUseCompanies.mockReturnValue({
        companies: [],
        loading: true,
        error: null,
      })

      render(<Home />)
      
      const loadingRegion = screen.getByRole('status')
      expect(loadingRegion).toHaveAttribute('aria-live', 'polite')
      expect(loadingRegion).toHaveTextContent('Loading trending companies...')
    })

    it('should announce error state', () => {
      mockUseCompanies.mockReturnValue({
        companies: [],
        loading: false,
        error: 'Network error',
      })

      render(<Home />)
      
      const errorRegion = screen.getByRole('alert')
      expect(errorRegion).toHaveAttribute('aria-live', 'assertive')
      expect(errorRegion).toHaveTextContent('Error loading companies: Network error')
    })
  })

  describe('Link Accessibility', () => {
    it('should have descriptive link text', () => {
      render(<CompanyCard company={mockCompany} />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute(
        'aria-label', 
        'Visit Test Company investor relations page (opens in new tab)'
      )
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Form Controls', () => {
    it('should have accessible retry button', () => {
      mockUseCompanies.mockReturnValue({
        companies: [],
        loading: false,
        error: 'Network error',
      })

      render(<Home />)
      
      const retryButton = screen.getByRole('button', { name: 'Retry loading companies' })
      expect(retryButton).toHaveAttribute('aria-label', 'Retry loading companies')
    })
  })

  describe('Skip Link', () => {
    it('should have skip link for keyboard navigation', () => {
      mockUseCompanies.mockReturnValue({
        companies: [],
        loading: false,
        error: null,
      })

      render(<Home />)
      
      const skipLink = screen.getByText('Skip to main content')
      expect(skipLink).toHaveAttribute('href', '#main-content')
    })
  })

  describe('Screen Reader Support', () => {
    it('should have screen reader only content', () => {
      render(<CompanyCard company={mockCompany} />)
      
      // Check for screen reader only content
      const srOnlyElements = document.querySelectorAll('.sr-only')
      expect(srOnlyElements.length).toBeGreaterThan(0)
    })
  })
})