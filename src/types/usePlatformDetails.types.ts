export interface PlatformDetails {
  userAgent: string;
  language: string;
  onLine: boolean;
}

export interface usePlatformDetailsProps {
  trackOnlineStatus?: boolean;
  debounceDelay?: number;
  initialDetails?: Partial<PlatformDetails>;
}
