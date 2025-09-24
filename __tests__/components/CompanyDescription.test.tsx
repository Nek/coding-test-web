import { render, screen } from '../test-utils'
import { CompanyDescription } from '../../app/components/CompanyDescription'

describe('CompanyDescription', () => {
  it('renders description text correctly', () => {
    const description = 'This is a test company description with detailed information about the business.'
    
    render(<CompanyDescription description={description} />)
    
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('applies correct CSS class', () => {
    const description = 'Test description'
    
    render(<CompanyDescription description={description} />)
    
    expect(screen.getByText(description)).toHaveClass('company-description')
  })

  it('handles empty description', () => {
    const { container } = render(<CompanyDescription description="" />)
    
    const element = container.querySelector('.company-description')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('company-description')
    expect(element).toHaveTextContent('')
  })

  it('handles long description text', () => {
    const longDescription = 'This is a very long description that should be handled properly by the component. '.repeat(10)
    
    const { container } = render(<CompanyDescription description={longDescription} />)
    
    const element = container.querySelector('.company-description')
    expect(element).toBeInTheDocument()
    expect(element?.textContent).toContain('This is a very long description')
  })

  it('preserves text formatting', () => {
    const descriptionWithFormatting = 'Company with special characters: & < > " \' and numbers 123'
    
    render(<CompanyDescription description={descriptionWithFormatting} />)
    
    expect(screen.getByText(descriptionWithFormatting)).toBeInTheDocument()
  })
})