export interface BatteryDetails {
  charging: boolean;
  level: number;
  chargingTime: number | null;
  dischargingTime: number | null;
}

export interface useBatteryDetailsProps {
  onChargingChange?: (charging: boolean) => void;
  onLevelChange?: (level: number) => void;
  onChargingTimeChange?: (chargingTime: number | null) => void;
  onDischargingTimeChange?: (dischargingTime: number | null) => void;
}
