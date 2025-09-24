import { Company, CompanyEvent, CompaniesApiResponse } from '../../app/types/company'

describe('Company Types', () => {
  describe('CompanyEvent interface', () => {
    it('should accept valid company event data', () => {
      const validEvent: CompanyEvent = {
        eventId: 47033,
        eventTitle: 'Q3 2022',
        eventDate: '2022-10-26T08:00:00.000Z',
        fiscalPeriod: 'Q3',
        fiscalYear: '2022',
        reportUrl: 'https://example.com/report.pdf',
        pdfUrl: 'https://example.com/pdf.pdf',
        qnaTimestamp: 1621,
      }

      expect(validEvent.eventId).toBe(47033)
      expect(validEvent.eventTitle).toBe('Q3 2022')
      expect(validEvent.fiscalPeriod).toBe('Q3')
      expect(validEvent.fiscalYear).toBe('2022')
    })

    it('should accept event with optional null values', () => {
      const eventWithNulls: CompanyEvent = {
        eventId: 47033,
        eventTitle: 'Q3 2022',
        eventDate: '2022-10-26T08:00:00.000Z',
        fiscalPeriod: 'Q3',
        fiscalYear: '2022',
        qnaTimestamp: null,
      }

      expect(eventWithNulls.qnaTimestamp).toBeNull()
    })
  })

  describe('Company interface', () => {
    it('should accept valid company data', () => {
      const validCompany: Company = {
        companyId: 1,
        companyName: 'Test Company',
        companyCountry: 'NO',
        companyTicker: 'TEST',
        displayName: 'Test Company',
        infoUrl: 'https://test.com',
        liveUrl: 'https://test.com/investor',
        logoLightUrl: 'https://test.com/logo.png',
        logoDarkUrl: 'https://test.com/logo-dark.png',
        iconUrl: 'https://test.com/icon.png',
        description: 'A test company',
        reportingCurrency: 'NOK',
        colorSettings: {
          brandColor: '#ffffff',
        },
        events: [],
        isins: [],
      }

      expect(validCompany.companyId).toBe(1)
      expect(validCompany.companyName).toBe('Test Company')
      expect(validCompany.colorSettings.brandColor).toBe('#ffffff')
    })

    it('should accept company with null iconUrl', () => {
      const companyWithNullIcon: Company = {
        companyId: 1,
        companyName: 'Test Company',
        companyCountry: 'NO',
        companyTicker: 'TEST',
        displayName: 'Test Company',
        infoUrl: 'https://test.com',
        liveUrl: 'https://test.com/investor',
        logoLightUrl: 'https://test.com/logo.png',
        logoDarkUrl: 'https://test.com/logo-dark.png',
        iconUrl: null,
        description: 'A test company',
        reportingCurrency: 'NOK',
        colorSettings: {
          brandColor: '#ffffff',
        },
        events: [],
        isins: [],
      }

      expect(companyWithNullIcon.iconUrl).toBeNull()
    })
  })

  describe('CompaniesApiResponse interface', () => {
    it('should accept valid API response structure', () => {
      const validResponse: CompaniesApiResponse = {
        data: [
          {
            companyId: 1,
            companyName: 'Test Company',
            companyCountry: 'NO',
            companyTicker: 'TEST',
            displayName: 'Test Company',
            infoUrl: 'https://test.com',
            liveUrl: 'https://test.com/investor',
            logoLightUrl: 'https://test.com/logo.png',
            logoDarkUrl: 'https://test.com/logo-dark.png',
            iconUrl: null,
            description: 'A test company',
            reportingCurrency: 'NOK',
            colorSettings: {
              brandColor: '#ffffff',
            },
            events: [],
            isins: [],
          },
        ],
      }

      expect(Array.isArray(validResponse.data)).toBe(true)
      expect(validResponse.data).toHaveLength(1)
      expect(validResponse.data[0].companyId).toBe(1)
    })

    it('should accept empty data array', () => {
      const emptyResponse: CompaniesApiResponse = {
        data: [],
      }

      expect(Array.isArray(emptyResponse.data)).toBe(true)
      expect(emptyResponse.data).toHaveLength(0)
    })
  })
})