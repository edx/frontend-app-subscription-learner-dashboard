import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCards } from './useCards';
import { fetchCardsData } from '../api/fetchCardsData';

jest.mock('../api/fetchCardsData');

const mockedFetchCardsData = fetchCardsData as jest.MockedFunction<typeof fetchCardsData>;

const createWrapper = () => {
  const queryClient = new QueryClient();

  queryClient.setQueryDefaults(['cards'], {
    retry: false,
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  Wrapper.displayName = 'TestQueryClientProvider';

  return Wrapper;
};

describe('useCards', () => {
  it('should fetch and return cards data successfully', async () => {
    const mockData = [{
      id: 1,
      title: 'Test Card',
      body: 'This is a test card description',
      url: 'https://example.com/image.jpg',
      thumbnail: 'https://example.com/thumbnail.jpg',
      hasTag: false,
      tagText: 'Professional Certificate',
      footerLabel: 'Test Category'
    }];

    mockedFetchCardsData.mockResolvedValue(mockData);

    const { result } = renderHook(() => useCards(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
  });

  it('should handle error state', async () => {
    mockedFetchCardsData.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useCards({ retry: false }),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should have correct query configuration', async () => {
    mockedFetchCardsData.mockResolvedValue([]);

    const { result } = renderHook(() => useCards(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([]);
  });
});
