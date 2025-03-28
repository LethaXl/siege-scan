import React, { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { processImage } from '../services/visionService';
import PlayerNameEditor from './PlayerNameEditor';
import { useNavigate } from 'react-router-dom';

function Scan() {
  const [image, setImage] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!image) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [image]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Image is too large. Please upload an image smaller than 10MB.');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        return;
      }

      setImage(URL.createObjectURL(file));
      setPlayers([]);
      setError(null);
      processScoreboard(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleRemoveImage = () => {
    setImage(null);
    setPlayers([]);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTryAgain = () => {
    handleRemoveImage();
    navigate('/scan');
  };

  const processScoreboard = async (file) => {
    setIsLoading(true);
    setError(null);
    try {
      const names = await processImage(file);
      setPlayers(names);
    } catch (err) {
      setError(err.message);
      console.error('Error processing image:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPlayer = (player) => {
    setEditingPlayer(player);
  };

  const handleSavePlayer = (updatedPlayer) => {
    setPlayers(prevNames => 
      prevNames.map(player => 
        player === editingPlayer ? updatedPlayer : player
      )
    );
    setEditingPlayer(null);
  };

  const handleCancelEdit = () => {
    setEditingPlayer(null);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      videoRef.current.srcObject = stream;
      setStream(stream);
      setShowCamera(true);
    } catch (err) {
      setError('Could not access camera. Please try uploading an image instead.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    
    canvas.toBlob(blob => {
      const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
      setImage(URL.createObjectURL(file));
      setPlayers([]);
      setError(null);
      processScoreboard(file);
      stopCamera();
    }, 'image/jpeg');
  };

  const handleAddPlayer = () => {
    setEditingPlayer({
      name: '',
      platform: 'psn',
      trackerUrl: ''
    });
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'psn':
        return '/psn.png';
      case 'xbl':
        return '/xbox.png';
      case 'ubi':
        return '/pc.png';
      default:
        return '/psn.png';
    }
  };

  const getPlatformIconSize = (platform) => {
    switch (platform) {
      case 'ubi':
        return 'h-7 w-7';
      default:
        return 'h-5 w-5';
    }
  };

  const handleRemovePlayer = (playerToRemove) => {
    setPlayers(prev => prev.filter(player => player !== playerToRemove));
    setEditingPlayer(null);
  };

  return (
    <div className={`max-w-4xl mx-auto h-screen flex items-start justify-center ${!image ? 'pt-[25vh]' : 'pt-0'} ${!image ? 'overflow-hidden' : 'overflow-auto'}`}>
      <div className="space-y-6 w-full">
        {!image && (
          <div className="space-y-4 flex flex-col items-center">
            <button
              onClick={startCamera}
              className="w-full max-w-md bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Take Photo
            </button>
            
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">or</span>
              </div>
            </div>

            <div
              {...getRootProps()}
              className={`w-full max-w-md border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                ${isDragActive 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
                }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input {...getInputProps()} ref={fileInputRef} />
              <p className="text-gray-600 dark:text-gray-300">
                {isDragActive
                  ? 'Drop the image here'
                  : 'Upload Image'}
              </p>
            </div>
          </div>
        )}

        {showCamera && (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <button
                onClick={stopCamera}
                className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={captureImage}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Capture
              </button>
            </div>
          </div>
        )}

        {image && (
          <div className="relative max-w-xl mx-auto">
            <div className="flex justify-center mb-4">
              <button
                onClick={handleTryAgain}
                className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
                aria-label="Try Again"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Try Again</span>
              </button>
            </div>
            <img
              src={image}
              alt="Scoreboard"
              className="w-[500px] h-[375px] object-contain rounded-lg shadow-lg mx-auto mt-16"
            />
          </div>
        )}

        {isLoading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {players.length > 0 && (
          <div className="mt-6">
            <div className="flex flex-col items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Players
              </h2>
            </div>
            <div className="max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {players.map((player, index) => (
                    <div key={index} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="flex items-center space-x-3">
                        <img
                          src={getPlatformIcon(player.platform)}
                          alt={player.platform || 'PSN'}
                          className={getPlatformIconSize(player.platform)}
                          onError={(e) => {
                            console.error('Failed to load platform icon:', player.platform);
                            e.target.src = '/psn.png';
                          }}
                        />
                        <span className="text-gray-900 dark:text-white">{player.name}</span>
                        {player.needsEdit && (
                          <div className="group relative">
                            <svg 
                              className="h-5 w-5 text-yellow-500 cursor-help" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path 
                                fillRule="evenodd" 
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                                clipRule="evenodd" 
                              />
                            </svg>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                              <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                                Name might need edit
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleEditPlayer(player)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <a
                          href={player.trackerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-center">
                    <button
                      onClick={handleAddPlayer}
                      className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Player
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!players.length && image && (
          <div className="text-center">
            <button
              onClick={handleAddPlayer}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Player Manually
            </button>
          </div>
        )}
      </div>

      {editingPlayer && (
        <PlayerNameEditor
          player={editingPlayer}
          onSave={(updatedPlayer) => {
            if (!editingPlayer.name) {
              // This is a new player
              setPlayers(prev => [...prev, {
                name: updatedPlayer.name,
                platform: updatedPlayer.platform,
                trackerUrl: `https://r6.tracker.network/r6siege/profile/${updatedPlayer.platform}/${encodeURIComponent(updatedPlayer.name)}/overview`
              }]);
            } else {
              // This is an existing player being edited
              handleSavePlayer(updatedPlayer);
            }
            setEditingPlayer(null);
          }}
          onCancel={handleCancelEdit}
          onRemove={() => handleRemovePlayer(editingPlayer)}
        />
      )}
    </div>
  );
}

export default Scan; 