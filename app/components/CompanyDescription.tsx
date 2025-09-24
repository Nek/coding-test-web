interface CompanyDescriptionProps {
  description: string;
}

export const CompanyDescription = ({ description }: CompanyDescriptionProps) => {
  return (
    <p className="company-description">{description}</p>
  );
};