interface CompanyLogoProps {
  displayName: string;
  logoLightUrl: string;
}

export const CompanyLogo = ({
  displayName,
  logoLightUrl,
}: CompanyLogoProps) => {
  return (
    <header className="company-header">
      <div
        className="company-logo"
        role="img"
        aria-label={`${displayName} company logo`}
      >
        {logoLightUrl && (
          <img
            src={logoLightUrl}
            alt=""
            role="presentation"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
      </div>
    </header>
  );
};
