import React, { useState } from "react";
import { useBatteryDetails } from "../hooks";
import { BatteryDetails } from "../types";

export default {
  title: "Hooks/useBatteryDetails",
  component: useBatteryDetails,
};

export const Default: React.FC = () => {
  const [chargingStatus, setChargingStatus] = useState<string>("N/A");
  const [batteryLevel, setBatteryLevel] = useState<string>("N/A");
  const [chargingTimeStatus, setChargingTimeStatus] = useState<string>("N/A");
  const [dischargingTimeStatus, setDischargingTimeStatus] =
    useState<string>("N/A");

  const batteryDetails: BatteryDetails | null = useBatteryDetails({
    onChargingChange: (charging) =>
      setChargingStatus(charging ? "Charging" : "Not Charging"),
    onLevelChange: (level) => setBatteryLevel(`${level}%`),
    onChargingTimeChange: (chargingTime) =>
      setChargingTimeStatus(
        chargingTime !== null
          ? `${Math.floor(chargingTime / 60)} min ${Math.floor(
              chargingTime % 60
            )} sec`
          : "N/A"
      ),
    onDischargingTimeChange: (dischargingTime) =>
      setDischargingTimeStatus(
        dischargingTime !== null
          ? `${Math.floor(dischargingTime / 60)} min ${Math.floor(
              dischargingTime % 60
            )} sec`
          : "N/A"
      ),
  });

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

      <h3>Callback Outputs</h3>
      <ul>
        <li>
          <strong>Charging Status:</strong> {chargingStatus}
        </li>
        <li>
          <strong>Battery Level:</strong> {batteryLevel}
        </li>
        <li>
          <strong>Charging Time:</strong> {chargingTimeStatus}
        </li>
        <li>
          <strong>Discharging Time:</strong> {dischargingTimeStatus}
        </li>
      </ul>
    </div>
  );
};
