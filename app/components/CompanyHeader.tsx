interface CompanyHeaderProps {
  displayName: string;
  logoLightUrl: string;
}

export const CompanyHeader = ({ displayName, logoLightUrl }: CompanyHeaderProps) => {
  return (
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
      </div>
    </div>
  );
};