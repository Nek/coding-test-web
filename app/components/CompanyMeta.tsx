interface CompanyMetaProps {
  companyTicker: string;
  companyCountry: string;
  reportingCurrency: string;
}

export const CompanyMeta = ({ 
  companyTicker, 
  companyCountry, 
  reportingCurrency 
}: CompanyMetaProps) => {
  return (
    <div className="company-meta" role="group" aria-label="Company metadata">
      <span className="ticker" aria-label={`Stock ticker: ${companyTicker}`}>
        <span aria-hidden="true">{companyTicker}</span>
      </span>
      <span className="country" aria-label={`Country: ${companyCountry}`}>
        <span aria-hidden="true">{companyCountry}</span>
      </span>
      <span className="currency" aria-label={`Reporting currency: ${reportingCurrency}`}>
        <span aria-hidden="true">{reportingCurrency}</span>
      </span>
    </div>
  );
};