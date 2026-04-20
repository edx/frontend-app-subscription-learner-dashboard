import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { useBanner } from '../hooks/useBanner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockBannerData = {
  id: '1',
  title: 'Subscription Expired',
  body: 'Your subscription has expired. Please renew to continue accessing the course materials.',
  isLoading: false,
  isError: false,
};

const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
    },
  },
});

function renderUseBannerHook() {
  const queryClient = createQueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => React.createElement(
    QueryClientProvider,
    { client: queryClient },
    children,
  );
  return renderHook(() => useBanner(), { wrapper });
}

describe('useBanner', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('initializes with default state', () => {
    const { result } = renderUseBannerHook();
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
  });

  test('fetches banner data successfully', async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockBannerData),
        headers: new Headers(),
        redirected: false,
        statusText: 'OK',
        type: 'basic',
        url: '',
        clone: jest.fn(),
        body: null,
        bodyUsed: false,
        arrayBuffer: jest.fn(),
        blob: jest.fn(),
        formData: jest.fn(),
        text: jest.fn(),
      } as unknown as Response)
    );

    const { result } = renderUseBannerHook();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockBannerData);
    expect(result.current.isError).toBe(false);
  });

  test('handles fetch error', async () => {
    globalThis.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));

    const { result } = renderUseBannerHook();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeUndefined();
    expect(result.current.isError).toBe(true);
  });

  test('handles non-ok response', async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response)
    );

    const { result } = renderUseBannerHook();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeUndefined();
    expect(result.current.isError).toBe(true);
  });
});
