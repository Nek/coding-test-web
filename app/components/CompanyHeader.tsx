interface CompanyHeaderProps {
  displayName: string;
  logoLightUrl: string;
  companyId: number;
}

export const CompanyHeader = ({ displayName, logoLightUrl, companyId }: CompanyHeaderProps) => {
  return (
    <header className="company-header">
      <div className="company-logo" role="img" aria-label={`${displayName} company logo`}>
        {logoLightUrl && (
          <img 
            src={logoLightUrl} 
            alt=""
            role="presentation"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
      </div>
      <div className="company-info">
        <h3 className="company-name" id={`company-${companyId}-name`}>{displayName}</h3>
      </div>
    </header>
  );
};