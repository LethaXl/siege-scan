import React, { useRef, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { processImage } from '../services/visionService';
import PlayerNameEditor from './PlayerNameEditor';
import { useNavigate } from 'react-router-dom';
import { useScan } from '../context/ScanContext';

function Scan() {
  const {
    image,
    setImage,
    players,
    setPlayers,
    isLoading,
    setIsLoading,
    error,
    setError,
    editingPlayer,
    setEditingPlayer,
    flippingIcons,
    setFlippingIcons,
    resetScan
  } = useScan();

  const [showAlert, setShowAlert] = useState(true);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
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

  // Check for camera support when component mounts
  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn('Camera API is not supported in this browser');
    } else {
      console.log('Camera API is supported');
    }
  }, []);

  const onDrop = (acceptedFiles) => {
    processFile(acceptedFiles[0]);
  };

  const processFile = (file) => {
    if (!file) return;
    
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
    resetScan();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
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

  const handleCameraCapture = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
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

  const handlePlatformChange = (player) => {
    const platforms = ['psn', 'xbl', 'ubi'];
    const currentIndex = platforms.indexOf(player.platform);
    const nextIndex = (currentIndex + 1) % platforms.length;
    const newPlatform = platforms[nextIndex];
    
    // Add the player to flipping icons set
    setFlippingIcons(prev => new Set([...prev, player.name]));
    
    // Update the platform after animation
    setTimeout(() => {
      setPlayers(prev => prev.map(p => 
        p === player ? {
          ...p,
          platform: newPlatform,
          trackerUrl: `https://r6.tracker.network/r6siege/profile/${newPlatform}/${encodeURIComponent(p.name)}/overview`
        } : p
      ));
      // Remove from flipping icons set
      setFlippingIcons(prev => {
        const newSet = new Set(prev);
        newSet.delete(player.name);
        return newSet;
      });
    }, 300); // Half of the animation duration
  };

  return (
    <div className={`max-w-4xl mx-auto ${!image ? 'pt-[25vh] landscape:pt-2' : 'pt-0'}`}>
      <div className="space-y-6 w-full">
        {!image && (
          <div className="space-y-4 flex flex-col items-center landscape:items-center landscape:justify-start landscape:pt-16">
            {showAlert && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-auto">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg px-3 py-2 relative whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      For best results, take a picture of 5 players at a time
                    </p>
                    <button
                      onClick={() => setShowAlert(false)}
                      className="inline-flex rounded-md p-1 text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800 focus:outline-none"
                    >
                      <span className="sr-only">Dismiss</span>
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="w-full max-w-md landscape:max-w-lg landscape:px-4">
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Take Photo
              </button>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={cameraInputRef}
                onChange={handleCameraCapture}
                className="hidden"
              />
              
              <div className="relative w-full my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">or</span>
                </div>
              </div>

              <div
                {...getRootProps()}
                className={`w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                  ${isDragActive 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
                  }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  {...getInputProps()} 
                  ref={fileInputRef}
                  accept="image/*"
                  capture=""
                />
                <p className="text-gray-600 dark:text-gray-300">
                  {isDragActive
                    ? 'Drop the image here'
                    : 'Upload Image'}
                </p>
              </div>
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
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-400/5 dark:to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 border border-gray-200/50 dark:border-gray-700/50 rounded-xl"></div>
              <img
                src={image}
                alt="Scoreboard"
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                onLoad={(e) => {
                  const img = e.target;
                  const isPortrait = img.naturalHeight > img.naturalWidth;
                  if (isPortrait) {
                    img.classList.add('max-h-full', 'w-auto', 'mx-auto');
                  } else {
                    img.classList.add('max-w-full', 'h-auto', 'my-auto');
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
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
                        <div 
                          className="relative cursor-pointer"
                          onClick={() => handlePlatformChange(player)}
                        >
                          <div className="relative w-5 h-5 [perspective:1000px]">
                            <div className={`absolute inset-0 [transform-style:preserve-3d] [transition:transform_0.6s] ${flippingIcons.has(player.name) ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'}`}>
                              <img
                                src={getPlatformIcon(player.platform)}
                                alt={player.platform || 'PSN'}
                                className={`${getPlatformIconSize(player.platform)} [backface-visibility:hidden]`}
                                onError={(e) => {
                                  console.error('Failed to load platform icon:', player.platform);
                                  e.target.src = '/psn.png';
                                }}
                              />
                            </div>
                          </div>
                        </div>
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
                      onClick={() => setEditingPlayer({
                        name: '',
                        platform: 'psn',
                        trackerUrl: ''
                      })}
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
              onClick={() => setEditingPlayer({
                name: '',
                platform: 'psn',
                trackerUrl: ''
              })}
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