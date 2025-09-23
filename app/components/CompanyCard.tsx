import { Company } from '../types/company';

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
  const {
    displayName,
    companyTicker,
    companyCountry,
    description,
    logoLightUrl,
    colorSettings,
    reportingCurrency,
    events,
    liveUrl
  } = company;

  const latestEvent = events[0];

  return (
    <div className="company-card" style={{ borderLeftColor: colorSettings.brandColor }}>
      <div className="company-header">
        <div className="company-logo">
          {logoLightUrl && (
            <img 
              src={logoLightUrl} 
              alt={`${displayName} logo`}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
        </div>
        <div className="company-info">
          <h3 className="company-name">{displayName}</h3>
          <div className="company-meta">
            <span className="ticker">{companyTicker}</span>
            <span className="country">{companyCountry}</span>
            <span className="currency">{reportingCurrency}</span>
          </div>
        </div>
      </div>
      
      <p className="company-description">{description}</p>
      
      {latestEvent && (
        <div className="latest-event">
          <h4>Latest Report</h4>
          <p>{latestEvent.eventTitle} - {latestEvent.fiscalYear}</p>
          <time>{new Date(latestEvent.eventDate).toLocaleDateString()}</time>
        </div>
      )}
      
      <div className="company-actions">
        <a 
          href={liveUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="investor-link"
        >
          Investor Relations
        </a>
      </div>
    </div>
  );
};