import { render, screen } from '../test-utils'
import { CompanyMeta } from '../../app/components/CompanyMeta'

describe('CompanyMeta', () => {
  const defaultProps = {
    companyTicker: 'TEST',
    companyCountry: 'NO',
    reportingCurrency: 'NOK',
  }

  it('renders all meta information correctly', () => {
    render(<CompanyMeta {...defaultProps} />)
    
    expect(screen.getByText('TEST')).toBeInTheDocument()
    expect(screen.getByText('NO')).toBeInTheDocument()
    expect(screen.getByText('NOK')).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    render(<CompanyMeta {...defaultProps} />)
    
    const container = screen.getByText('TEST').parentElement
    expect(container).toHaveClass('company-meta')
    
    expect(screen.getByText('TEST')).toHaveClass('ticker')
    expect(screen.getByText('NO')).toHaveClass('country')
    expect(screen.getByText('NOK')).toHaveClass('currency')
  })

  it('handles different ticker formats', () => {
    render(<CompanyMeta {...defaultProps} companyTicker="LONG-TICKER" />)
    
    expect(screen.getByText('LONG-TICKER')).toBeInTheDocument()
  })

  it('handles different country codes', () => {
    render(<CompanyMeta {...defaultProps} companyCountry="US" />)
    
    expect(screen.getByText('US')).toBeInTheDocument()
  })

  it('handles different currencies', () => {
    render(<CompanyMeta {...defaultProps} reportingCurrency="USD" />)
    
    expect(screen.getByText('USD')).toBeInTheDocument()
  })
})