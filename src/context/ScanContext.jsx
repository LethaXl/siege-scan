import React, { createContext, useContext, useState } from 'react';

const ScanContext = createContext();

export function ScanProvider({ children }) {
  const [image, setImage] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const [flippingIcons, setFlippingIcons] = useState(new Set());

  const value = {
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
    showCamera,
    setShowCamera,
    stream,
    setStream,
    flippingIcons,
    setFlippingIcons,
    resetScan: () => {
      setImage(null);
      setPlayers([]);
      setError(null);
      setEditingPlayer(null);
      setShowCamera(false);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      setFlippingIcons(new Set());
    }
  };

  return (
    <ScanContext.Provider value={value}>
      {children}
    </ScanContext.Provider>
  );
}

export function useScan() {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error('useScan must be used within a ScanProvider');
  }
  return context;
} 