import { useEffect, useState } from 'react';
import { BatteryDetails, useBatteryDetailsProps } from '../types';

function useBatteryDetails({
  onChargingChange,
  onLevelChange,
  onChargingTimeChange,
  onDischargingTimeChange,
}: useBatteryDetailsProps = {}) {
  const [batteryDetails, setBatteryDetails] = useState<BatteryDetails | null>(
    null
  );

  useEffect(() => {
    const getBatteryDetails = async () => {
      if ('getBattery' in navigator) {
        try {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          const battery = await navigator.getBattery();

          const updateBatteryDetails = () => {
            const newDetails: BatteryDetails = {
              charging: battery.charging,
              level: Math.round(battery.level * 100),
              chargingTime: battery.chargingTime || null,
              dischargingTime: battery.dischargingTime || null,
            };

            setBatteryDetails(newDetails);

            if (
              onChargingChange &&
              newDetails.charging !== batteryDetails?.charging
            ) {
              onChargingChange(newDetails.charging);
            }
            if (onLevelChange && newDetails.level !== batteryDetails?.level) {
              onLevelChange(newDetails.level);
            }
            if (
              onChargingTimeChange &&
              newDetails.chargingTime !== batteryDetails?.chargingTime
            ) {
              onChargingTimeChange(newDetails.chargingTime);
            }
            if (
              onDischargingTimeChange &&
              newDetails.dischargingTime !== batteryDetails?.dischargingTime
            ) {
              onDischargingTimeChange(newDetails.dischargingTime);
            }
          };

          updateBatteryDetails();

          battery.addEventListener('chargingchange', updateBatteryDetails);
          battery.addEventListener('levelchange', updateBatteryDetails);
          battery.addEventListener('chargingtimechange', updateBatteryDetails);
          battery.addEventListener(
            'dischargingtimechange',
            updateBatteryDetails
          );

          return () => {
            battery.removeEventListener('chargingchange', updateBatteryDetails);
            battery.removeEventListener('levelchange', updateBatteryDetails);
            battery.removeEventListener(
              'chargingtimechange',
              updateBatteryDetails
            );
            battery.removeEventListener(
              'dischargingtimechange',
              updateBatteryDetails
            );
          };
        } catch (error) {
          console.error('Failed to get battery details:', error);
          setBatteryDetails(null);
        }
      } else {
        console.warn('Battery Status API is not supported in this browser.');
        setBatteryDetails(null);
      }
    };

    const cleanup = getBatteryDetails();

    return () => {
      if (cleanup instanceof Function) cleanup();
    };
  }, [
    onChargingChange,
    onLevelChange,
    onChargingTimeChange,
    onDischargingTimeChange,
    batteryDetails,
  ]);

  return batteryDetails;
}

export default useBatteryDetails;
