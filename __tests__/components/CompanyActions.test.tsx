import { render, screen } from '../test-utils'
import { CompanyActions } from '../../app/components/CompanyActions'

describe('CompanyActions', () => {
  const defaultProps = {
    liveUrl: 'https://example.com/investor',
  }

  it('renders investor relations link correctly', () => {
    render(<CompanyActions {...defaultProps} />)
    
    const link = screen.getByRole('link', { name: 'Investor Relations' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com/investor')
  })

  it('opens link in new tab with security attributes', () => {
    render(<CompanyActions {...defaultProps} />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('applies correct CSS classes', () => {
    render(<CompanyActions {...defaultProps} />)
    
    const container = screen.getByRole('link').parentElement
    expect(container).toHaveClass('company-actions')
    
    const link = screen.getByRole('link')
    expect(link).toHaveClass('investor-link')
  })

  it('handles different URLs', () => {
    render(<CompanyActions liveUrl="https://different-company.com/investors" />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://different-company.com/investors')
  })

  it('handles relative URLs', () => {
    render(<CompanyActions liveUrl="/investor-relations" />)
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/investor-relations')
  })

  it('is accessible', () => {
    render(<CompanyActions {...defaultProps} />)
    
    const link = screen.getByRole('link')
    expect(link).toBeVisible()
    expect(link).toHaveAccessibleName('Investor Relations')
  })
})