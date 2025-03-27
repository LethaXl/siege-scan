import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';

function LogoDetection() {
  const [image, setImage] = useState(null);
  const [detectedPlatform, setDetectedPlatform] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  // Handle file drop/upload
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
      setDetectedPlatform(null);
      setError(null);
      detectPlatform(file);
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
    setDetectedPlatform(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Mock platform detection function
  // In a real implementation, this would use image recognition or ML
  const detectPlatform = async (file) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call or processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, randomly select a platform
      // In production, this would be replaced with actual detection logic
      const platforms = ['psn', 'xbl', 'ubi', 'crossplay'];
      const detected = platforms[Math.floor(Math.random() * platforms.length)];
      
      setDetectedPlatform(detected);
    } catch (err) {
      setError('Error detecting platform logo: ' + err.message);
      console.error('Error processing image:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Camera functionality
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      videoRef.current.srcObject = stream;
      setStream(stream);
      setShowCamera(true);
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions in your browser settings or try uploading an image instead.');
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
      setDetectedPlatform(null);
      setError(null);
      detectPlatform(file);
      stopCamera();
    }, 'image/jpeg');
  };

  // Display platform logo and name
  const getPlatformInfo = (platform) => {
    switch (platform) {
      case 'psn':
        return { 
          name: 'PlayStation Network', 
          icon: '/playstationdetect.jpg',
          color: 'bg-blue-500'
        };
      case 'xbl':
        return { 
          name: 'Xbox Live', 
          icon: '/xboxdetect.jpg',
          color: 'bg-green-500'
        };
      case 'ubi':
        return { 
          name: 'Ubisoft/PC', 
          icon: '/ubisoftdetect.jpg',
          color: 'bg-gray-500'
        };
      case 'crossplay':
        return { 
          name: 'Crossplay', 
          icon: '/crossplaydetect.jpg',
          color: 'bg-purple-500'
        };
      default:
        return { 
          name: 'Unknown Platform', 
          icon: '/playstationdetect.jpg', // Fallback to PlayStation image
          color: 'bg-gray-400'
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto relative">
      <h1 className="text-2xl font-bold text-center mb-6">Platform Logo Detection</h1>
      
      {error && (
        <div className="absolute top-16 left-0 right-0 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-md z-0">
          {error}
        </div>
      )}
      
      <div className={`space-y-6 ${!image ? 'min-h-[calc(100vh-8rem)] flex items-center justify-center overflow-hidden' : ''}`}>
        {!image ? (
          <div className="space-y-4">
            <button
              onClick={startCamera}
              className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base py-4 text-center transition-colors"
            >
              Take Photo
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">or</span>
              </div>
            </div>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
                }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input {...getInputProps()} ref={fileInputRef} />
              <p className="text-gray-600 dark:text-gray-300 text-base">
                {isDragActive
                  ? 'Drop the image here'
                  : 'Upload Image with Platform Logo'}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={handleRemoveImage}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm py-3 px-6 text-center transition-colors"
            >
              New Image
            </button>
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
                className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 text-white font-medium rounded-full text-sm px-6 py-2 text-center transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={captureImage}
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-white font-medium rounded-full text-sm px-6 py-2 text-center transition-colors"
              >
                Capture
              </button>
            </div>
          </div>
        )}

        {image && (
          <div className="relative w-full max-w-[500px] mx-auto">
            <img
              src={image}
              alt="Platform logo"
              className="w-full aspect-[4/3] object-contain rounded-lg border border-gray-200 dark:border-gray-700"
            />
          </div>
        )}

        {isLoading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Detecting platform...</p>
          </div>
        )}

        {detectedPlatform && !isLoading && (
          <div className="mt-4">
            <h3 className="font-semibold text-lg mb-1">Detected Platform</h3>
            <p className="text-gray-800 dark:text-gray-200">{getPlatformInfo(detectedPlatform).name}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogoDetection; 