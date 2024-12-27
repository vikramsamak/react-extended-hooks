export interface ClipBoardDetails {
  copiedText: string;
  isCopied: boolean;
  clipboardContent: string;
  copyToClipboard: (text: string) => Promise<void>;
  readFromClipboard: () => Promise<void>;
}
