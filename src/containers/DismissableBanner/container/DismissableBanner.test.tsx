import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Banner } from './DismissableBanner';

const mockBannerData = {
  id: '1',
  title: 'Subscription Expired',
  body: 'Your subscription has expired. Please renew to continue accessing the course materials.',
  isLoading: false,
  isError: false,
};

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

const originalFetch = globalThis.fetch;

describe('DismissableBanner', () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test('renders loading state initially', async () => {
    globalThis.fetch = jest.fn(() =>
      new Promise(() => {})
    ) as jest.Mock;

    render(<Banner />, { wrapper: createWrapper() });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders banner content after successful fetch', async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockBannerData),
      } as Response)
    ) as jest.Mock;

    render(<Banner />, { wrapper: createWrapper() });

    expect(
      await screen.findByText(mockBannerData.title)
    ).toBeInTheDocument();

    expect(
      screen.getByText(mockBannerData.body)
    ).toBeInTheDocument();
  });

  test('renders error state when fetch fails', async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.reject(new Error('Fetch error'))
    ) as jest.Mock;

    render(<Banner />, { wrapper: createWrapper() });

    expect(
      await screen.findByText('Error loading banner')
    ).toBeInTheDocument();
  });
});
