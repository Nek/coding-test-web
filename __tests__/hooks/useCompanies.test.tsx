import { renderHook, waitFor } from '@testing-library/react'
import { useCompanies } from '../../app/hooks/useCompanies'
import { CompaniesApiResponse } from '../../app/types/company'

// Mock fetch
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

const mockCompaniesData: CompaniesApiResponse = {
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
      events: [
        {
          eventId: 1,
          eventTitle: 'Q3 2022',
          eventDate: '2022-10-26T08:00:00.000Z',
          fiscalPeriod: 'Q3',
          fiscalYear: '2022',
        },
      ],
      isins: [],
    },
  ],
}

describe('useCompanies hook', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('should return loading state initially', () => {
    mockFetch.mockImplementation(() => new Promise(() => {})) // Never resolves

    const { result } = renderHook(() => useCompanies())

    expect(result.current.loading).toBe(true)
    expect(result.current.companies).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it('should fetch companies successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCompaniesData,
    } as Response)

    const { result } = renderHook(() => useCompanies())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.companies).toEqual(mockCompaniesData.data)
    expect(result.current.error).toBeNull()
    expect(mockFetch).toHaveBeenCalledWith('/api/companies')
  })

  it('should handle fetch error with non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response)

    const { result } = renderHook(() => useCompanies())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.companies).toEqual([])
    expect(result.current.error).toBe('Failed to fetch companies: 404 Not Found')
  })

  it('should handle network error', async () => {
    const networkError = new Error('Network error')
    mockFetch.mockRejectedValueOnce(networkError)

    const { result } = renderHook(() => useCompanies())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.companies).toEqual([])
    expect(result.current.error).toBe('Network error')
  })

  it('should handle unknown error', async () => {
    mockFetch.mockRejectedValueOnce('Unknown error')

    const { result } = renderHook(() => useCompanies())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.companies).toEqual([])
    expect(result.current.error).toBe('An unknown error occurred')
  })

  it('should handle empty companies data', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [] }),
    } as Response)

    const { result } = renderHook(() => useCompanies())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.companies).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it('should log errors to console', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const networkError = new Error('Network error')
    mockFetch.mockRejectedValueOnce(networkError)

    renderHook(() => useCompanies())

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching companies:', networkError)
    })

    consoleSpy.mockRestore()
  })
})