import { Company } from '../types/company';
import { CompanyCard } from './CompanyCard';

interface CompanyListProps {
  companies: Company[];
}

export const CompanyList = ({ companies }: CompanyListProps) => {
  if (companies.length === 0) {
    return (
      <div className="no-companies">
        <p>No trending companies available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="company-list">
      {companies.map((company) => (
        <CompanyCard key={company.companyId} company={company} />
      ))}
    </div>
  );
};