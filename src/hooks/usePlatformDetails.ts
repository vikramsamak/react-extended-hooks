import { useState, useEffect, useCallback } from "react";
import { PlatformDetails } from "../types";

function usePlatformDetails(): PlatformDetails {
  const [details, setDetails] = useState<PlatformDetails>(() => {
    if (typeof navigator !== "undefined") {
      const { userAgent, language, onLine } = navigator;
      return { userAgent, language, onLine };
    }
    return { userAgent: "", language: "", onLine: false };
  });

  const updateOnlineStatus = useCallback((): void => {
    setDetails((prev) => ({
      ...prev,
      onLine: navigator.onLine,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, [updateOnlineStatus]);

  return details;
}

export default usePlatformDetails;
