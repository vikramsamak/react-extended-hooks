export interface PlatformDetails {
  userAgent: string;
  language: string;
  onLine: boolean;
}

export interface BatteryDetails {
  charging: boolean;
  level: number;
  chargingTime: number | null;
  dischargingTime: number | null;
}
