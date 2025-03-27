import React from 'react';
import { useParams } from 'react-router-dom';

function PlayerStats() {
  const { username } = useParams();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Player Statistics
        </h1>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">{username}</h2>
          <p className="text-gray-600">
            Viewing stats on{' '}
            <a
              href={`https://r6.tracker.network/profile/pc/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              R6 Tracker
            </a>
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-600">
            For detailed statistics, please visit the player's profile on R6 Tracker
            by clicking the link above.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlayerStats; 