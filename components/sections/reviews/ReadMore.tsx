'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ReadMoreProps {
  className?: string;
  text: string;
  maxWords?: number;
}

export default function ReadMore({ text, maxWords = 25, className = '' }: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const words = text.split(' ');

  // If text is shorter than maxWords, don't show read more button
  if (words.length <= maxWords) {
    return <div className={cn(`leading-snug text-gray-500`, className)}>{text}</div>;
  }

  const truncatedText = words.slice(0, maxWords).join(' ');
  const remainingText = words.slice(maxWords).join(' ');

  return (
    <div className={cn(`leading-snug text-gray-500`, className)}>
      <div className="overflow-hidden">
        <p className={`transition-all duration-300 ease-in-out ${isExpanded ? 'opacity-100' : ''}`}>
          {truncatedText}
          {!isExpanded && '...'}

          <span
            className={`transition-all duration-300 ease-in-out ${
              isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
            }`}
          >
            {isExpanded && ` ${remainingText}`}
          </span>
        </p>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-1 rounded font-medium text-blue-600 underline transition-colors duration-200 hover:text-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
        aria-label={isExpanded ? 'Read less' : 'Read more'}
      >
        {isExpanded ? 'Read less' : 'Read more'}
      </button>
    </div>
  );
}
