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
    <div className="company-meta">
      <span className="ticker">{companyTicker}</span>
      <span className="country">{companyCountry}</span>
      <span className="currency">{reportingCurrency}</span>
    </div>
  );
};