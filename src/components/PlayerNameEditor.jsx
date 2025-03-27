import React, { useState, useEffect } from 'react';

const PlayerNameEditor = ({ player, onSave, onCancel, onRemove }) => {
  const [editedName, setEditedName] = useState(player.name);
  const [selectedPlatform, setSelectedPlatform] = useState(player.platform || 'psn');
  const [error, setError] = useState('');

  const validateUsername = (username, platform) => {
    if (!username) {
      return 'Username is required';
    }

    switch (platform) {
      case 'psn':
        if (username.length < 3 || username.length > 16) {
          return 'PSN username must be between 3 and 16 characters';
        }
        if (!/^[a-zA-Z]/.test(username)) {
          return 'PSN username must start with a letter';
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
          return 'PSN username can only contain letters, numbers, hyphens, and underscores';
        }
        if (username.includes(' ')) {
          return 'PSN username cannot contain spaces';
        }
        break;

      case 'xbl':
        if (username.length < 3 || username.length > 12) {
          return 'Xbox Gamertag must be between 3 and 12 characters';
        }
        if (!/^[a-zA-Z]/.test(username)) {
          return 'Xbox Gamertag must start with a letter';
        }
        if (!/^[a-zA-Z0-9' ]+$/.test(username)) {
          return 'Xbox Gamertag can only contain letters, numbers, apostrophes, and spaces';
        }
        if (username.includes('  ')) {
          return 'Xbox Gamertag cannot contain consecutive spaces';
        }
        break;

      case 'ubi':
        if (username.length < 3 || username.length > 15) {
          return 'PC username must be between 3 and 15 characters';
        }
        if (!/^[a-zA-Z]/.test(username)) {
          return 'PC username must start with a letter';
        }
        if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
          return 'PC username can only contain letters, numbers, underscores, dashes, and periods';
        }
        break;

      default:
        return 'Invalid platform';
    }

    return '';
  };

  useEffect(() => {
    const errorMessage = validateUsername(editedName, selectedPlatform);
    setError(errorMessage);
  }, [editedName, selectedPlatform]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMessage = validateUsername(editedName, selectedPlatform);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    onSave({
      ...player,
      name: editedName,
      platform: selectedPlatform,
      trackerUrl: `https://r6.tracker.network/r6siege/profile/${selectedPlatform}/${encodeURIComponent(editedName)}/overview`
    });
  };

  const platforms = [
    { id: 'psn', name: 'PlayStation', icon: '/psn.png', glowColor: 'rgba(59,130,246,0.5)' },
    { id: 'xbl', name: 'Xbox', icon: '/xbox.png', glowColor: 'rgba(34,197,94,0.5)' },
    { id: 'ubi', name: 'PC', icon: '/pc.png', glowColor: 'rgba(234,179,8,0.5)' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full mx-4 shadow-xl overflow-hidden">
        <div className="px-6 py-3 bg-blue-600 dark:bg-blue-500">
          <h3 className="text-lg font-semibold text-white text-center">
            {player.name ? 'Edit Player' : 'Add Player'}
          </h3>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Player Name
              </label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  dark:focus:ring-blue-400 dark:focus:border-blue-400
                  placeholder-gray-500 dark:placeholder-gray-400
                  ${error ? 'border-red-500 dark:border-red-500' : ''}`}
                placeholder="Enter player name"
                required
              />
              {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 text-center">
                Platform
              </label>
              <div className="flex justify-center space-x-4">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      selectedPlatform === platform.id
                        ? platform.id === 'psn'
                          ? 'bg-blue-100 dark:bg-blue-900'
                          : platform.id === 'xbl'
                          ? 'bg-green-100 dark:bg-green-900'
                          : 'bg-yellow-50 dark:bg-yellow-600'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    style={selectedPlatform === platform.id ? {
                      boxShadow: `0 0 15px ${platform.glowColor}`
                    } : undefined}
                  >
                    <img
                      src={platform.icon}
                      alt={platform.name}
                      className={`h-8 w-8 ${platform.id === 'ubi' ? 'h-10 w-10' : ''}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-center space-x-3">
              {player.name && (
                <button
                  type="button"
                  onClick={onRemove}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600"
                >
                  Remove
                </button>
              )}
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!!error}
                className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 ${
                  error ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {player.name ? 'Edit' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlayerNameEditor; 