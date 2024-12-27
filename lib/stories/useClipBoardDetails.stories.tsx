import { useState } from 'react';
import { useClipBoardDetails } from '../hooks';

export default {
  title: 'Hooks/useClipBoardDetails',
  component: useClipBoardDetails,
  argTypes: {
    initialText: {
      control: 'text',
      defaultValue: 'Hello, Clipboard!',
    },
    delay: {
      control: { type: 'range', min: 1000, max: 5000, step: 500 },
      defaultValue: 2000,
    },
  },
};

export const Default = ({
  initialText,
  delay,
}: {
  initialText: string;
  delay: number;
}) => {
  const [inputText, setInputText] = useState(initialText);
  const {
    copiedText,
    isCopied,
    clipboardContent,
    copyToClipboard,
    readFromClipboard,
  } = useClipBoardDetails();

  const handleCopy = () => {
    copyToClipboard(inputText);
    setTimeout(() => {
      console.log(`Copied "${inputText}" to clipboard!`);
    }, delay);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>useClipBoardDetails Hook</h3>
      <div>
        <label>
          <strong>Input Text:</strong>
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            padding: '8px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
      <button
        onClick={handleCopy}
        style={{
          margin: '10px 5px 10px 0',
          padding: '10px 15px',
          cursor: 'pointer',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Copy to Clipboard
      </button>
      <button
        onClick={readFromClipboard}
        style={{
          margin: '10px',
          padding: '10px 15px',
          cursor: 'pointer',
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Read from Clipboard
      </button>
      <div style={{ marginTop: '20px' }}>
        <strong>Status:</strong>
        <p>
          <strong>Copied Text:</strong> {copiedText || 'N/A'}
        </p>
        <p>
          <strong>Clipboard Content:</strong> {clipboardContent || 'N/A'}
        </p>
        <p>
          <strong>Is Copied:</strong> {isCopied ? 'Yes' : 'No'}
        </p>
      </div>
    </div>
  );
};
