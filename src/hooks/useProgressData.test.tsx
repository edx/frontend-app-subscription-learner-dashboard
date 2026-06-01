import { renderHook } from '@testing-library/react';
import { camelCaseObject } from '@openedx/frontend-base';
import { useProgressData } from './useProgressData';

// mocks
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('@src/data/hooks', () => ({
  useProgramProgressData: jest.fn(),
}));

jest.mock('@openedx/frontend-base', () => ({
  camelCaseObject: jest.fn(),
}));

// imports after mocks
import { useParams } from 'react-router-dom';
import { useProgramProgressData } from '@src/data/hooks';

describe('useProgressData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return transformed data when uuid exists', () => {
    (useParams as jest.Mock).mockReturnValue({ uuid: '123' });

    (useProgramProgressData as jest.Mock).mockReturnValue({
      data: { some_key: 'value' },
      isLoading: false,
      error: null,
    });

    (camelCaseObject as jest.Mock).mockReturnValue({
      someKey: 'value',
    });

    const { result } = renderHook(() => useProgressData());

    expect(useProgramProgressData).toHaveBeenCalledWith('123');
    expect(camelCaseObject).toHaveBeenCalledWith({ some_key: 'value' });

    expect(result.current).toEqual({
      programProgressData: { someKey: 'value' },
      isLoading: false,
      error: null,
    });
  });

  it('should return error when uuid is missing', () => {
    (useParams as jest.Mock).mockReturnValue({ uuid: '' });

    (useProgramProgressData as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    (camelCaseObject as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useProgressData());

    expect(result.current).toEqual({
      programProgressData: null,
      isLoading: false,
      error: 'Invalid URL',
    });
  });

  it('should handle loading state', () => {
    (useParams as jest.Mock).mockReturnValue({ uuid: '123' });

    (useProgramProgressData as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    (camelCaseObject as jest.Mock).mockReturnValue(undefined);

    const { result } = renderHook(() => useProgressData());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.programProgressData).toBeUndefined();
  });

  it('should handle API error', () => {
    (useParams as jest.Mock).mockReturnValue({ uuid: '123' });

    (useProgramProgressData as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: 'API Error',
    });

    (camelCaseObject as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useProgressData());

    expect(result.current.error).toBe('API Error');
    expect(result.current.programProgressData).toBeNull();
  });
});
