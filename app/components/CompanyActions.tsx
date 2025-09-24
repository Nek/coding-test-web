interface CompanyActionsProps {
  liveUrl: string;
}

export const CompanyActions = ({ liveUrl }: CompanyActionsProps) => {
  return (
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
  );
};