interface CompanyActionsProps {
  liveUrl: string;
  companyName: string;
}

export const CompanyActions = ({ liveUrl, companyName }: CompanyActionsProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.open(liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="company-actions" role="group" aria-label="Company actions">
      <a 
        href={liveUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="investor-link"
        aria-label={`Visit ${companyName} investor relations page (opens in new tab)`}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        Investor Relations
        <span className="sr-only"> for {companyName}</span>
      </a>
    </div>
  );
};