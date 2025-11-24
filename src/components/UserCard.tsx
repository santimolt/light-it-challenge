import { useState } from 'react';
import type { User } from '../types/user';

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const showBlankAvatar = !user.avatar || imageError;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-fit">
      <div className="p-6">
        <div className="flex items-center gap-4">
          {showBlankAvatar ? (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <span className="text-gray-500 text-xl font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          ) : (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover shrink-0"
              onError={() => {
                setImageError(true);
              }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-800 truncate">
              {user.name}
            </h3>
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm truncate block"
              >
                {user.website}
              </a>
            )}
          </div>
          <button
            onClick={toggleExpand}
            className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shrink-0"
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
            aria-expanded={isExpanded}
          >
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform duration-300 ease-in-out ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        {user.description && (
          <div
            className={
              isExpanded ? 'description-expand' : 'description-collapse'
            }
          >
            <p className="text-gray-600 text-sm leading-relaxed">
              {user.description}
            </p>
          </div>
        )}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            Created: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

