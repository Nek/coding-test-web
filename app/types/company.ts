export interface CompanyEvent {
  reportUrl?: string;
  pdfUrl?: string;
  audioUrl?: string;
  eventId: number;
  eventTitle: string;
  eventDate: string;
  qnaTimestamp?: number | null;
  fiscalPeriod: string;
  fiscalYear: string;
}

export interface ColorSettings {
  brandColor: string;
}

export interface Company {
  companyId: number;
  companyName: string;
  companyCountry: string;
  companyTicker: string;
  displayName: string;
  infoUrl: string;
  liveUrl: string;
  logoLightUrl: string;
  logoDarkUrl: string;
  iconUrl: string | null;
  description: string;
  reportingCurrency: string;
  colorSettings: ColorSettings;
  events: CompanyEvent[];
  isins: string[];
}

export interface CompaniesApiResponse {
  data: Company[];
}

export interface UseCompaniesResult {
  companies: Company[];
  loading: boolean;
  error: string | null;
}