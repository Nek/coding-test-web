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
    <div className="company-card" style={{ borderLeftColor: colorSettings.brandColor }}>
      <CompanyHeader 
        displayName={displayName}
        logoLightUrl={logoLightUrl}
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
      
      <CompanyActions liveUrl={liveUrl} />
    </div>
  );
};