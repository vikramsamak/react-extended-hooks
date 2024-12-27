import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { PlatformDetails, usePlatformDetailsProps } from '../types';

function usePlatformDetails({
  trackOnlineStatus = true,
  debounceDelay = 0,
  initialDetails = {},
}: usePlatformDetailsProps = {}): PlatformDetails {
  const [platformDetails, setPlatformDetails] = useState<PlatformDetails>(
    () => {
      if (typeof navigator !== 'undefined') {
        const { userAgent, language, onLine } = navigator;
        return {
          userAgent,
          language,
          onLine,
          ...initialDetails,
        };
      }
      return { userAgent: '', language: '', onLine: false, ...initialDetails };
    }
  );

  const updateOnlineStatus = useCallback(() => {
    setPlatformDetails((prev) => ({
      ...prev,
      onLine: navigator.onLine,
    }));
  }, []);

  useEffect(() => {
    if (!trackOnlineStatus) return;

    const debouncedUpdate = debounce(updateOnlineStatus, debounceDelay);

    window.addEventListener('online', debouncedUpdate);
    window.addEventListener('offline', debouncedUpdate);

    return () => {
      window.removeEventListener('online', debouncedUpdate);
      window.removeEventListener('offline', debouncedUpdate);

      debouncedUpdate.cancel();
    };
  }, [updateOnlineStatus, debounceDelay, trackOnlineStatus]);

  return platformDetails;
}

export default usePlatformDetails;
