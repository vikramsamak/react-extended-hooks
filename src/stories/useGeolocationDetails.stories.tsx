import { useGeolocationDetails } from '../hooks';
import { GeolocationDetails } from '../types';

export default {
  title: 'Hooks/useGeolocationDetails',
  component: useGeolocationDetails,
  argTypes: {
    enableHighAccuracy: {
      control: { type: 'boolean' },
      defaultValue: true,
      description: 'Request high-accuracy geolocation.',
    },
    timeout: {
      control: { type: 'number' },
      defaultValue: 10000,
      description: 'Maximum time (in milliseconds) to wait for a response.',
    },
    maximumAge: {
      control: { type: 'number' },
      defaultValue: 5000,
      description:
        'Maximum age (in milliseconds) of a cached position that is acceptable to return.',
    },
    enableWatch: {
      control: { type: 'boolean' },
      defaultValue: true,
      description:
        'Enable continuous updates of the geolocation position if true.',
    },
  },
};

export const Default = ({
  enableHighAccuracy,
  timeout,
  maximumAge,
  enableWatch,
}: {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
  enableWatch: boolean;
}) => {
  const {
    latitude,
    longitude,
    accuracy,
    altitude,
    altitudeAccuracy,
    heading,
    speed,
    timestamp,
    error,
  }: GeolocationDetails = useGeolocationDetails({
    enableHighAccuracy,
    timeout,
    maximumAge,
    enableWatch,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!latitude || !longitude) {
    return <div>Fetching geolocation details...</div>;
  }

  return (
    <div>
      <h3>Geolocation Details</h3>
      <ul>
        <li>
          <strong>Latitude:</strong> {latitude}
        </li>
        <li>
          <strong>Longitude:</strong> {longitude}
        </li>
        <li>
          <strong>Accuracy:</strong> {accuracy} meters
        </li>
        <li>
          <strong>Altitude:</strong>{' '}
          {altitude !== null ? `${altitude} meters` : 'N/A'}
        </li>
        <li>
          <strong>Altitude Accuracy:</strong>{' '}
          {altitudeAccuracy !== null ? `${altitudeAccuracy} meters` : 'N/A'}
        </li>
        <li>
          <strong>Heading:</strong> {heading !== null ? `${heading}°` : 'N/A'}
        </li>
        <li>
          <strong>Speed:</strong> {speed !== null ? `${speed} m/s` : 'N/A'}
        </li>
        <li>
          <strong>Timestamp:</strong>{' '}
          {timestamp ? new Date(timestamp).toLocaleString() : 'N/A'}
        </li>
      </ul>
    </div>
  );
};
