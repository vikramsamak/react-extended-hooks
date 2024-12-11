import { useCallback, useEffect, useState } from "react";
import { BatteryDetails } from "../types/types";

function useBatteryDetails(): BatteryDetails | null {
  const [batteryDetails, setBatteryDetails] = useState<BatteryDetails | null>(
    null
  );

  const getBatteryDetails = useCallback(async () => {
    if ("getBattery" in navigator) {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const battery = await navigator.getBattery();

        const updateBatteryDetails = () => {
          setBatteryDetails({
            charging: battery.charging,
            level: Math.round(battery.level * 100),
            chargingTime: battery.chargingTime || null,
            dischargingTime: battery.dischargingTime || null,
          });
        };

        updateBatteryDetails();

        battery.addEventListener("chargingchange", updateBatteryDetails);
        battery.addEventListener("levelchange", updateBatteryDetails);
        battery.addEventListener("chargingtimechange", updateBatteryDetails);
        battery.addEventListener("dischargingtimechange", updateBatteryDetails);

        return () => {
          battery.removeEventListener("chargingchange", updateBatteryDetails);
          battery.removeEventListener("levelchange", updateBatteryDetails);
          battery.removeEventListener(
            "chargingtimechange",
            updateBatteryDetails
          );
          battery.removeEventListener(
            "dischargingtimechange",
            updateBatteryDetails
          );
        };
      } catch (error) {
        console.error("Failed to get battery details:", error);
        setBatteryDetails(null);
      }
    } else {
      console.warn("Battery Status API is not supported in this browser.");
      setBatteryDetails(null);
    }
  }, []);

  useEffect(() => {
    const cleanup = getBatteryDetails();
    return () => {
      if (cleanup instanceof Function) cleanup();
    };
  }, [getBatteryDetails]);

  return batteryDetails;
}

export default useBatteryDetails;
