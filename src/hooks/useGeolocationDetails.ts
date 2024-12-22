import { useState, useEffect } from "react";
import { GeolocationDetails, useGeolocationProps } from "../types";

function useGeolocationDetails({
  enableHighAccuracy = false,
  timeout = Infinity,
  maximumAge = 0,
  enableWatch = false,
}: useGeolocationProps = {}) {
  const [geolocationDetails, setGeolocationDetails] =
    useState<GeolocationDetails>({
      latitude: null,
      longitude: null,
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
      timestamp: null,
      error: null,
    });

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      console.warn("Geolocation API is not supported in this browser.");
      setGeolocationDetails({
        latitude: null,
        longitude: null,
        accuracy: null,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
        timestamp: null,
        error: null,
      });
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      const { coords, timestamp } = position;
      setGeolocationDetails({
        latitude: coords.latitude,
        longitude: coords.longitude,
        accuracy: coords.accuracy,
        altitude: coords.altitude ?? null,
        altitudeAccuracy: coords.altitudeAccuracy ?? null,
        heading: coords.heading ?? null,
        speed: coords.speed ?? null,
        timestamp,
        error: null,
      });
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setGeolocationDetails({
        latitude: null,
        longitude: null,
        accuracy: null,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
        timestamp: null,
        error,
      });
    };

    const options: PositionOptions = {
      enableHighAccuracy,
      timeout,
      maximumAge,
    };

    if (enableWatch) {
      const watchId = navigator.geolocation.watchPosition(
        successHandler,
        errorHandler,
        options
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      navigator.geolocation.getCurrentPosition(
        successHandler,
        errorHandler,
        options
      );
    }
  }, [enableHighAccuracy, timeout, maximumAge, enableWatch]);

  return geolocationDetails;
}

export default useGeolocationDetails;
