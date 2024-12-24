import { usePlatformDetails } from "../hooks";
import { PlatformDetails } from "../types";

export default {
  title: "Hooks/usePlatformDetails",
  component: usePlatformDetails,
  argTypes: {
    trackOnlineStatus: {
      control: "boolean",
      defaultValue: true,
      description: "Enable or disable tracking of online/offline status",
    },
    debounceDelay: {
      control: { type: "number", min: 0, step: 100 },
      defaultValue: 300,
      description:
        "Delay in milliseconds for debouncing online/offline updates",
    },
    initialDetails: {
      control: "object",
      defaultValue: {},
      description:
        "Specify initial platform details (e.g., userAgent, language)",
    },
  },
};

export const Default = ({
  trackOnlineStatus,
  debounceDelay,
  initialDetails,
}: {
  trackOnlineStatus: boolean;
  debounceDelay: number;
  initialDetails: Partial<PlatformDetails>;
}) => {
  const { userAgent, language, onLine }: PlatformDetails = usePlatformDetails({
    trackOnlineStatus,
    debounceDelay,
    initialDetails,
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
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
      <div style={{ marginTop: "20px" }}>
        <strong>Hook Props:</strong>
        <ul>
          <li>
            <strong>trackOnlineStatus:</strong>{" "}
            {trackOnlineStatus ? "Enabled" : "Disabled"}
          </li>
          <li>
            <strong>debounceDelay:</strong> {debounceDelay} ms
          </li>
          <li>
            <strong>Initial Details:</strong> {JSON.stringify(initialDetails)}
          </li>
        </ul>
      </div>
    </div>
  );
};
