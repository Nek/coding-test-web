"use client";

import { Inter } from "@next/font/google";
import { useCompanies } from "./hooks/useCompanies";
import { CompanyList } from "./components/CompanyList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { companies, loading, error } = useCompanies();

  return (
    <main className="main-container">
      <header className="page-header">
        <h1 className={`page-title ${inter.className}`}>Quartr</h1>
        <p className={`page-subtitle ${inter.className}`}>Trending companies</p>
      </header>

      <section className="companies-section">
        {loading && (
          <div className="loading-state">
            <p>Loading trending companies...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>Error loading companies: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="retry-button"
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
  );
}
