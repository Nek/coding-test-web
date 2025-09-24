interface CompanyDescriptionProps {
  description: string;
}

export const CompanyDescription = ({ description }: CompanyDescriptionProps) => {
  return (
    <div className="company-description-container">
      <span className="sr-only">Company description: </span>
      <p className="company-description">{description}</p>
    </div>
  );
};