import React from "react";
import usePlatformDetails from "../hooks/usePlatformDetails";
import { PlatformDetails } from "../types";

export default {
  title: "Hooks/usePlatformDetails",
  component: usePlatformDetails,
};

export const Default: React.FC = () => {
  const { userAgent, language, onLine }: PlatformDetails = usePlatformDetails();

  return (
    <div>
      <h3>Platform Details:</h3>
      <ul>
        <li>
          <strong>User Agent:</strong> {userAgent}
        </li>
        <li>
          <strong>Language:</strong> {language}
        </li>
        <li>
          <strong>Online Status:</strong> {onLine ? "Online" : "Offline"}
        </li>
      </ul>
    </div>
  );
};
