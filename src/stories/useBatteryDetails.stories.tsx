import React from "react";
import useBatteryDetails from "../hooks/useBatteryDetails";
import { BatteryDetails } from "../types";

export default {
  title: "Hooks/useBatteryDetails",
  component: useBatteryDetails,
};

export const Default: React.FC = () => {
  const batteryDetails: BatteryDetails | null = useBatteryDetails();

  if (!batteryDetails) {
    return <div>Battery details are not available or not supported.</div>;
  }

  const { charging, chargingTime, dischargingTime, level } = batteryDetails;

  const formatTime = (time: number | null): string => {
    if (time === null) {
      return "N/A";
    }
    if (time === Infinity) {
      return "Unknown";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes} min ${seconds} sec`;
  };

  return (
    <div>
      <h3>Battery Details</h3>
      <ul>
        <li>
          <strong>Charging:</strong> {charging ? "Yes" : "No"}
        </li>
        <li>
          <strong>Charging Time:</strong> {formatTime(chargingTime)}
        </li>
        <li>
          <strong>Discharging Time:</strong> {formatTime(dischargingTime)}
        </li>
        <li>
          <strong>Battery Level:</strong>
          {level !== null ? `${level}%` : "N/A"}
        </li>
      </ul>
    </div>
  );
};
