interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

export const SkipLink = ({ href, children }: SkipLinkProps) => {
  return (
    <a 
      href={href}
      className="skip-link"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            (target as HTMLElement).focus();
            if (target.scrollIntoView) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }}
    >
      {children}
    </a>
  );
};