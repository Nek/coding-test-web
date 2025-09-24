import { Company } from '../types/company';
import { CompanyHeader } from './CompanyHeader';
import { CompanyMeta } from './CompanyMeta';
import { CompanyDescription } from './CompanyDescription';
import { LatestEvent } from './LatestEvent';
import { CompanyActions } from './CompanyActions';

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
    <article 
      className="company-card" 
      style={{ borderLeftColor: colorSettings.brandColor }}
      aria-labelledby={`company-${company.companyId}-name`}
      role="article"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const link = e.currentTarget.querySelector('.investor-link') as HTMLAnchorElement;
          if (link) {
            link.click();
          }
        }
      }}
    >
      <CompanyHeader 
        displayName={displayName}
        logoLightUrl={logoLightUrl}
        companyId={company.companyId}
      />
      
      <CompanyMeta 
        companyTicker={companyTicker}
        companyCountry={companyCountry}
        reportingCurrency={reportingCurrency}
      />
      
      <CompanyDescription description={description} />
      
      {latestEvent && (
        <LatestEvent event={latestEvent} />
      )}
      
      <CompanyActions liveUrl={liveUrl} companyName={displayName} />
    </article>
  );
};