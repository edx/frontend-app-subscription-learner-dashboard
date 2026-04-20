import React from 'react';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useBanner } from './useBanner';

const mockBannerData = {
  id: '1',
  title: 'Subscription Expired',
  body: 'Your subscription has expired. Please renew to continue accessing the course materials.',
  isLoading: false,
  isError: false,
};

async function waitFor(condition: () => boolean, timeout = 5000, interval = 50): Promise<void> {
  const startTime = Date.now();
  while (!condition()) {
    if (Date.now() - startTime > timeout) throw new Error('Timeout waiting for condition');
    await new Promise(resolve => setTimeout(resolve, interval));
  }
}

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) => React.createElement(
    QueryClientProvider,
    { client: queryClient },
    children,
  );
  Wrapper.displayName = 'QueryClientWrapper';
  return Wrapper;
};

describe('useBanner', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('initializes with default state', () => {
    const { result } = renderHook(() => useBanner(), { wrapper: createWrapper() });
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
      } as Response)
    );

    const { result } = renderHook(() => useBanner(), { wrapper: createWrapper() });
    await waitFor(() => !result.current.isLoading);

    expect(result.current.data).toEqual(mockBannerData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  test('handles fetch error', async () => {
    globalThis.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));

    const { result } = renderHook(() => useBanner(), { wrapper: createWrapper() });
    await waitFor(() => !result.current.isLoading);

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
  });
});
