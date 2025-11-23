import { useState } from 'react';
import type { User } from '../types/user';

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  const [imageError, setImageError] = useState(false);

  const showBlankAvatar = !user.avatar || imageError;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
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
        </div>
        {user.description && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {user.description}
          </p>
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

