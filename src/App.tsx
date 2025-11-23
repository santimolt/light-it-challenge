import { UserCard } from './components/UserCard';
import { useUsers } from './hooks/useUsers';

export const App = () => {
  const { data: users, isLoading, isError, error } = useUsers();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-8">
      <div className="mx-auto">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Patient management system
        </h1>

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading users...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-12">
            <p className="text-red-600">
              Error: {error instanceof Error ? error.message : 'Failed to load users'}
            </p>
          </div>
        )}

        {users && (
          <>
            {users.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No users found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {users.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
