import { render, screen } from '../test-utils'
import { CompanyHeader } from '../../app/components/CompanyHeader'

describe('CompanyHeader', () => {
  const defaultProps = {
    displayName: 'Test Company',
    logoLightUrl: 'https://example.com/logo.png',
  }

  it('renders company name correctly', () => {
    render(<CompanyHeader {...defaultProps} />)
    
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Company')
  })

  it('renders logo with correct attributes', () => {
    render(<CompanyHeader {...defaultProps} />)
    
    const logo = screen.getByRole('img')
    expect(logo).toHaveAttribute('src', 'https://example.com/logo.png')
    expect(logo).toHaveAttribute('alt', 'Test Company logo')
  })

  it('does not render logo when logoLightUrl is empty', () => {
    render(<CompanyHeader displayName="Test Company" logoLightUrl="" />)
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('hides logo on error', () => {
    render(<CompanyHeader {...defaultProps} />)
    
    const logo = screen.getByRole('img')
    
    // Simulate image load error
    logo.dispatchEvent(new Event('error'))
    
    expect(logo).toHaveStyle('display: none')
  })

  it('has correct CSS classes', () => {
    render(<CompanyHeader {...defaultProps} />)
    
    expect(screen.getByRole('heading')).toHaveClass('company-name')
    expect(screen.getByRole('img').parentElement).toHaveClass('company-logo')
  })
})