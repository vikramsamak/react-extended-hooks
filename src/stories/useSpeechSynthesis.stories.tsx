import { useState } from "react";
import { useSpeechSynthesis } from "../hooks";

export default {
  title: "Hooks/useSpeechSynthesis",
  component: useSpeechSynthesis,
  argTypes: {
    text: {
      control: "text",
      defaultValue: "Hello, this is a speech synthesis demo!",
    },
    rate: {
      control: { type: "range", min: 0.1, max: 2, step: 0.1 },
      defaultValue: 1,
    },
    pitch: {
      control: { type: "range", min: 0.5, max: 2, step: 0.1 },
      defaultValue: 1,
    },
    volume: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      defaultValue: 1,
    },
  },
};

export const Default = ({
  text,
  rate,
  pitch,
  volume,
}: {
  text: string;
  rate: number;
  pitch: number;
  volume: number;
}) => {
  const [selectedVoice, setSelectedVoice] = useState("default");
  const { speak, cancel, isSpeaking, voices } = useSpeechSynthesis({
    rate,
    pitch,
    volume,
    voiceURI: selectedVoice,
  });

  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVoice(event.target.value);
  };

  const handleSpeak = () => {
    speak(text);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3>Speech Synthesis</h3>
      <div>
        <label>
          <strong>Voice:</strong>
        </label>
        <select
          value={selectedVoice}
          onChange={handleVoiceChange}
          style={{ marginLeft: "10px" }}
        >
          <option value="default">Default</option>
          {voices.map((voice) => (
            <option key={voice.voiceURI} value={voice.voiceURI}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleSpeak}
        disabled={isSpeaking}
        style={{ margin: "10px", padding: "5px 10px", cursor: "pointer" }}
      >
        {isSpeaking ? "Speaking..." : "Speak"}
      </button>
      <button
        onClick={cancel}
        style={{ margin: "10px", padding: "5px 10px", cursor: "pointer" }}
      >
        Cancel
      </button>
      <div style={{ marginTop: "20px" }}>
        <strong>Text to Speak:</strong>
        <p>{text}</p>
        <p>
          <strong>Rate:</strong> {rate}
        </p>
        <p>
          <strong>Pitch:</strong> {pitch}
        </p>
        <p>
          <strong>Volume:</strong> {volume}
        </p>
      </div>
    </div>
  );
};
