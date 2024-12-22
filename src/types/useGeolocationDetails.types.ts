export interface GeolocationDetails {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number | null;
  error: GeolocationPositionError | null;
}

export interface useGeolocationProps {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  enableWatch?: boolean;
}
