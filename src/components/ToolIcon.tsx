import React from 'react';

interface ToolIconProps {
  toolId: string;
  size?: number;
  className?: string;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ toolId, size = 20, className = '' }) => {
  const s = size;

  switch (toolId) {
    case 'canva':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="12" cy="12" r="11" fill="#00C4CC" />
          <path
            d="M15.5 8.5C14.4 7.5 13 7 11.5 7C8.5 7 6.5 9.2 6.5 12C6.5 14.8 8.5 17 11.5 17C13.2 17 14.6 16.3 15.6 15"
            stroke="white"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'copilot':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#0F6CBD" />
          <path
            d="M6 12C6 8.7 8.7 6 12 6C15.3 6 18 8.7 18 12C18 15.3 15.3 18 12 18H8C6.9 18 6 17.1 6 16V12Z"
            fill="url(#copilot-grad)"
          />
          <circle cx="10" cy="11.5" r="1.5" fill="white" />
          <circle cx="14" cy="11.5" r="1.5" fill="white" />
          <defs>
            <linearGradient id="copilot-grad" x1="6" y1="6" x2="18" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#55D0FF" />
              <stop offset="1" stopColor="#0F6CBD" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'chatgpt':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#10A37F" />
          <path
            d="M12 4C9.5 4 7.6 5.6 7.1 7.8L9 8.9C9.3 7.8 10.5 7 12 7C14.2 7 16 8.8 16 11V12H14.5C13.1 12 12 13.1 12 14.5V17.5C12 18.9 13.1 20 14.5 20C17.5 20 20 17.5 20 14.5C20 12.5 18.9 10.7 17.3 9.8C17.8 8.8 18 7.7 18 6.5C18 5.1 17.4 3.8 16.5 2.8L15 4.3C15.6 5 16 5.7 16 6.5C16 7.6 15.2 8.5 14.2 8.8L12.5 7.8V4Z"
            fill="white"
            opacity="0.9"
          />
          <circle cx="12" cy="12" r="3.2" fill="white" />
        </svg>
      );

    case 'gemini':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#1E293B" />
          <path
            d="M12 3C12 7.97 7.97 12 3 12C7.97 12 12 16.03 12 21C12 16.03 16.03 12 21 12C16.03 12 12 7.97 12 3Z"
            fill="url(#gemini-spark)"
          />
          <defs>
            <linearGradient id="gemini-spark" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4E82EE" />
              <stop offset="0.5" stopColor="#9B72CF" />
              <stop offset="1" stopColor="#D96570" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'claude':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#D97706" />
          <path
            d="M12 6L13.5 10.5L18 12L13.5 13.5L12 18L10.5 13.5L6 12L10.5 10.5L12 6Z"
            fill="#FFFBEB"
          />
        </svg>
      );

    case 'elevenlabs':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#09090B" />
          <path d="M8 7V17M12 5V19M16 9V15" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'suno':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#F43F5E" />
          <circle cx="9" cy="14" r="3" fill="white" />
          <path d="M12 14V6L19 4V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="12" r="3" fill="white" />
        </svg>
      );

    case 'ideogram':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#E11D48" />
          <text x="12" y="16" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle">Id</text>
        </svg>
      );

    case 'vocaroo':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#059669" />
          <path d="M12 5C10.9 5 10 5.9 10 7V12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12V7C14 5.9 13.1 5 12 5Z" fill="white" />
          <path d="M7 11V12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12V11M12 17V20M9 20H15" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'magicschool':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#7C3AED" />
          <path d="M7 17L17 7M15 5L19 9M9 5L9 9M5 9L9 9M13 19L17 19M17 15L17 19" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'perplexity':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#0D9488" />
          <path d="M12 4V20M4 12H20M6 6L18 18M6 18L18 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'geogebra':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#2563EB" />
          <circle cx="8" cy="14" r="3" stroke="white" strokeWidth="2" />
          <circle cx="16" cy="14" r="3" stroke="white" strokeWidth="2" />
          <path d="M8 11L12 5L16 11" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'duckai':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#EA580C" />
          <ellipse cx="12" cy="13" rx="7" ry="6" fill="white" />
          <circle cx="9.5" cy="11.5" r="1.5" fill="#EA580C" />
          <circle cx="14.5" cy="11.5" r="1.5" fill="#EA580C" />
          <path d="M10 15C11 16 13 16 14 15" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'notebooklm':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#4F46E5" />
          <path d="M6 6H16C17.1 6 18 6.9 18 8V18C18 18 16.5 17 14 17C11.5 17 10 18 10 18H6C4.9 18 4 17.1 4 16V8C4 6.9 4.9 6 6 6Z" stroke="white" strokeWidth="1.8" />
          <line x1="10" y1="6" x2="10" y2="17" stroke="white" strokeWidth="1.8" />
        </svg>
      );

    case 'wordwall':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#0284C7" />
          <rect x="5" y="6" width="6" height="5" rx="1" fill="white" />
          <rect x="13" y="6" width="6" height="5" rx="1" fill="white" />
          <rect x="5" y="13" width="6" height="5" rx="1" fill="white" />
          <rect x="13" y="13" width="6" height="5" rx="1" fill="white" />
        </svg>
      );

    case 'genially':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#EC4899" />
          <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="2" />
          <polygon points="10,9 16,12 10,15" fill="white" />
        </svg>
      );

    case 'educaplay':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#16A34A" />
          <polygon points="8,6 18,12 8,18" fill="white" />
        </svg>
      );

    case 'sheets':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#15803D" />
          <path d="M6 5H15L18 8V19H6V5Z" fill="white" opacity="0.9" />
          <path d="M8 10H16M8 13H16M8 16H16" stroke="#15803D" strokeWidth="1.5" />
        </svg>
      );

    case 'datawrapper':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#0369A1" />
          <line x1="7" y1="17" x2="7" y2="13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="12" y1="17" x2="12" y2="9" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="17" y1="17" x2="17" y2="6" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'vidnoz':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#6366F1" />
          <circle cx="12" cy="9" r="3.5" fill="white" />
          <path d="M6 18C6 15 9 14 12 14C15 14 18 15 18 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'photopea':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#0F766E" />
          <text x="12" y="16" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle">Pe</text>
        </svg>
      );

    case 'pixlr':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#F59E0B" />
          <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" />
          <circle cx="12" cy="12" r="2" fill="white" />
        </svg>
      );

    case 'languagetool':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#2563EB" />
          <path d="M7 16V9M12 16V7M17 16V11" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 18H18" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'veed':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#8B5CF6" />
          <polygon points="7,6 18,12 7,18" fill="white" />
        </svg>
      );

    default:
      return (
        <div
          style={{ width: s, height: s }}
          className={`rounded-md bg-purple-600 text-white font-bold flex items-center justify-center text-xs ${className}`}
        >
          IA
        </div>
      );
  }
};
