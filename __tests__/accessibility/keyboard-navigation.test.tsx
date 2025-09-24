import { render, screen, fireEvent } from '../test-utils'
import userEvent from '@testing-library/user-event'
import { CompanyCard } from '../../app/components/CompanyCard'
import { CompanyActions } from '../../app/components/CompanyActions'
import { Company } from '../../app/types/company'

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
  events: [],
  isins: [],
}

// Mock window.open
const mockWindowOpen = jest.fn()
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true,
})

describe('Keyboard Navigation Tests', () => {
  beforeEach(() => {
    mockWindowOpen.mockClear()
  })

  describe('CompanyCard Keyboard Navigation', () => {
    it('should be focusable with tab key', async () => {
      const user = userEvent.setup()
      render(<CompanyCard company={mockCompany} />)
      
      const card = screen.getByRole('article')
      
      await user.tab()
      expect(card).toHaveFocus()
    })

    it('should activate investor link with Enter key on card', async () => {
      const user = userEvent.setup()
      render(<CompanyCard company={mockCompany} />)
      
      const card = screen.getByRole('article')
      card.focus()
      
      await user.keyboard('{Enter}')
      
      // Should trigger the link click
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://test.com/investor',
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('should activate investor link with Space key on card', async () => {
      const user = userEvent.setup()
      render(<CompanyCard company={mockCompany} />)
      
      const card = screen.getByRole('article')
      card.focus()
      
      await user.keyboard(' ')
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://test.com/investor',
        '_blank',
        'noopener,noreferrer'
      )
    })
  })

  describe('CompanyActions Keyboard Navigation', () => {
    it('should handle Enter key on investor link', async () => {
      const user = userEvent.setup()
      render(<CompanyActions liveUrl="https://test.com/investor" companyName="Test Company" />)
      
      const link = screen.getByRole('link')
      link.focus()
      
      await user.keyboard('{Enter}')
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://test.com/investor',
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('should handle Space key on investor link', async () => {
      const user = userEvent.setup()
      render(<CompanyActions liveUrl="https://test.com/investor" companyName="Test Company" />)
      
      const link = screen.getByRole('link')
      link.focus()
      
      await user.keyboard(' ')
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://test.com/investor',
        '_blank',
        'noopener,noreferrer'
      )
    })

    it('should be focusable with tab index', () => {
      render(<CompanyActions liveUrl="https://test.com/investor" companyName="Test Company" />)
      
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('tabIndex', '0')
    })
  })

  describe('Focus Management', () => {
    it('should maintain focus order', async () => {
      const user = userEvent.setup()
      render(<CompanyCard company={mockCompany} />)
      
      // Tab through focusable elements
      await user.tab()
      const card = screen.getByRole('article')
      expect(card).toHaveFocus()
      
      await user.tab()
      const link = screen.getByRole('link')
      expect(link).toHaveFocus()
    })

    it('should handle focus with keyboard events', () => {
      render(<CompanyCard company={mockCompany} />)
      
      const card = screen.getByRole('article')
      
      // Test focus event
      fireEvent.focus(card)
      expect(card).toHaveFocus()
      
      // Test blur event
      fireEvent.blur(card)
      expect(card).not.toHaveFocus()
    })
  })

  describe('Skip Link Navigation', () => {
    it('should focus main content when skip link is activated', async () => {
      const user = userEvent.setup()
      
      // Mock the useCompanies hook
      jest.doMock('../../app/hooks/useCompanies', () => ({
        useCompanies: () => ({
          companies: [],
          loading: false,
          error: null,
        }),
      }))
      
      const Home = require('../../app/page').default
      render(<Home />)
      
      const skipLink = screen.getByText('Skip to main content')
      const mainContent = screen.getByRole('main')
      
      // Focus skip link and activate
      skipLink.focus()
      await user.keyboard('{Enter}')
      
      // Main content should be focused
      expect(mainContent).toHaveFocus()
    })
  })

  describe('Button Keyboard Interaction', () => {
    it('should handle Enter key on retry button', async () => {
      const mockReload = jest.fn()
      Object.defineProperty(window, 'location', {
        value: { reload: mockReload },
        writable: true,
        configurable: true,
      })

      // Mock the useCompanies hook for error state
      jest.doMock('../../app/hooks/useCompanies', () => ({
        useCompanies: () => ({
          companies: [],
          loading: false,
          error: 'Network error',
        }),
      }))
      
      const Home = require('../../app/page').default
      const user = userEvent.setup()
      render(<Home />)
      
      const retryButton = screen.getByRole('button', { name: 'Retry loading companies' })
      retryButton.focus()
      
      await user.keyboard('{Enter}')
      
      expect(mockReload).toHaveBeenCalledTimes(1)
    })

    it('should handle Space key on retry button', async () => {
      const mockReload = jest.fn()
      Object.defineProperty(window, 'location', {
        value: { reload: mockReload },
        writable: true,
        configurable: true,
      })

      // Mock the useCompanies hook for error state
      jest.doMock('../../app/hooks/useCompanies', () => ({
        useCompanies: () => ({
          companies: [],
          loading: false,
          error: 'Network error',
        }),
      }))
      
      const Home = require('../../app/page').default
      const user = userEvent.setup()
      render(<Home />)
      
      const retryButton = screen.getByRole('button', { name: 'Retry loading companies' })
      retryButton.focus()
      
      await user.keyboard(' ')
      
      expect(mockReload).toHaveBeenCalledTimes(1)
    })
  })
})