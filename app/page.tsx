"use client";

import { Inter } from "@next/font/google";
import { useCompanies } from "./hooks/useCompanies";
import { CompanyList } from "./components/CompanyList";
import { SkipLink } from "./components/SkipLink";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { companies, loading, error } = useCompanies();

  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <main className="main-container" id="main-content" tabIndex={-1}>
        <header className="page-header">
          <h1 className={`page-title ${inter.className}`}>Quartr</h1>
          <p className={`page-subtitle ${inter.className}`}>Trending companies</p>
        </header>

      <section className="companies-section" aria-label="Trending companies">
        {loading && (
          <div className="loading-state" role="status" aria-live="polite">
            <p>Loading trending companies...</p>
            <span className="sr-only">Please wait while we load the trending companies data.</span>
          </div>
        )}

        {error && (
          <div className="error-state" role="alert" aria-live="assertive">
            <p>Error loading companies: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="retry-button"
              aria-label="Retry loading companies"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.reload();
                }
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <CompanyList companies={companies} />
        )}
      </section>
    </main>
    </>
  );
}
