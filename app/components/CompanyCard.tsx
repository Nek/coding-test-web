import { Company } from "../types/company";
import { CompanyLogo } from "./CompanyLogo";

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
  const {
    displayName,
    description,
    logoLightUrl,
    colorSettings,
    liveUrl,
    companyId,
  } = company;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.open(liveUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <a
      href={liveUrl}
      target="_blank"
      id={`company-${company.companyId}-name`}
      rel="noopener noreferrer"
      aria-label={`Visit ${displayName} investor relations page (opens in new tab)`}
    >
      <article
        className="company-card"
        style={{ borderLeftColor: colorSettings.brandColor }}
        aria-labelledby={`company-${company.companyId}-name`}
        role="article"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <CompanyLogo displayName={displayName} logoLightUrl={logoLightUrl} />

        <div className="company-info">
          <h3 className="company-name" id={`company-${companyId}-name`}>
            {displayName}
          </h3>
          <p className="company-description">{description}</p>
        </div>
      </article>
    </a>
  );
};
