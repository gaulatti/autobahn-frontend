import { useSelector } from 'react-redux';
import { useAuth } from './useAuth';
import { getKickoffReady } from '../state/selectors/lifecycle';

const useLifecycle = () => {
  /**
   * Get Feature Flags from Redux.
   *
   * They should have been initialized as part
   * of the kickoff workflow.
   */
  const isKickoffReady = useSelector(getKickoffReady);

  /**
   * Start the auth engine. It will start listening
   * for any auth events to update the app state.
   */
  useAuth();

  return { isKickoffReady };
};

export { useLifecycle };
