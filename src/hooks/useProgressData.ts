import { useParams } from 'react-router-dom';
import { camelCaseObject } from '@openedx/frontend-base';
import { useProgramProgressData } from '@src/data/hooks';

/**
 * Custom hook to fetch and manage program progress data for the Program Progress Page.
 * This hook retrieves the program UUID from the route parameters, fetches the corresponding progress data using a data hook, and returns the data along with loading and error states.
 * The returned `programProgressData` is transformed to camelCase for easier consumption in the components.
 * @returns An object containing `programProgressData`, `isLoading`, and `error` states.
 */
export const useProgressData = () => {
  // Fetch UUID from route params
  const { uuid } = useParams() as { uuid: string };

  const { data, isLoading, error } = useProgramProgressData(uuid);
  const programProgressData = camelCaseObject(data);

  if (!uuid) {
    return { programProgressData: null, isLoading: false, error: 'Invalid URL' };
  }

  return { programProgressData, isLoading, error };
};
