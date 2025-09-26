import { Company } from "../types/company";
import { CompanyCard } from "./CompanyCard";

interface CompanyListProps {
  companies: Company[];
}

export const CompanyList = ({ companies }: CompanyListProps) => {
  if (companies.length === 0) {
    return (
      <div className="no-companies" role="status">
        <p>No trending companies available at the moment.</p>
      </div>
    );
  }

  return (
    <div
      className="company-list"
      role="feed"
      aria-label={`${companies.length} trending companies`}
      aria-busy="false"
    >
      {companies.map((company, index) => (
        <CompanyCard
          key={company.companyId}
          company={company}
          aria-posinset={index + 1}
          aria-setsize={companies.length}
        />
      ))}
    </div>
  );
};
