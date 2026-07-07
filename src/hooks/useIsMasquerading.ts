import { useMasquerade } from '@src/data/context';
import { useInitializeSubsDashboard } from '@src/data/hooks';

const useIsMasquerading = () => {
  const { masqueradeUser } = useMasquerade();
  const { isError } = useInitializeSubsDashboard();
  return !!masqueradeUser && !isError;
};

export default useIsMasquerading;
