import React from 'react';

interface Props {
  text: string;
  maxLength?: number;
}

export default function TruncatedTextWithTooltip({ text, maxLength = 12 }: Props) {
  const isTruncated = text.length > maxLength;
  const displayText = isTruncated ? `${text.slice(0, maxLength)}...` : text;

  return (
    <span
      className="truncate block max-w-full"
      title={text}
    >
      {displayText}
    </span>
  );
}
