import { useState } from 'react';
import { ClipBoardDetails } from '../types';

function useClipBoardDetails(): ClipBoardDetails {
  const [copiedText, setCopiedText] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [clipboardContent, setClipboardContent] = useState<string>('');

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setIsCopied(true);

      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text: ', error);
      setIsCopied(false);
    }
  };

  const readFromClipboard = async (): Promise<void> => {
    try {
      const text = await navigator.clipboard.readText();
      setClipboardContent(text);
    } catch (error) {
      console.error('Failed to read from clipboard: ', error);
    }
  };

  return {
    copiedText,
    isCopied,
    clipboardContent,
    copyToClipboard,
    readFromClipboard,
  };
}

export default useClipBoardDetails;
