import axios from 'axios';

const GOOGLE_CLOUD_VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate';

const isValidPSNUsername = (username) => {
  // PSN rules
  if (username.length < 3 || username.length > 15) return false;
  if (!/^[a-zA-Z]/.test(username)) return false;
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) return false;
  if (username.includes('  ')) return false;
  return true;
};

const isValidXboxUsername = (username) => {
  // Xbox rules
  if (username.length < 3 || username.length > 12) return false;
  if (!/^[a-zA-Z]/.test(username)) return false;
  if (!/^[a-zA-Z0-9' ]+$/.test(username)) return false;
  if (username.includes('  ')) return false;
  return true;
};

const isValidPCUsername = (username) => {
  // PC rules
  if (username.length < 3 || username.length > 15) return false;
  if (!/^[a-zA-Z]/.test(username)) return false;
  if (!/^[a-zA-Z0-9._-]+$/.test(username)) return false;
  return true;
};

const isValidUsername = (username, platform) => {
  switch (platform) {
    case 'psn':
      return isValidPSNUsername(username);
    case 'xbl':
      return isValidXboxUsername(username);
    case 'ubi':
      return isValidPCUsername(username);
    default:
      return isValidPSNUsername(username);
  }
};

export async function processImage(file) {
  try {
    // Convert the file to base64
    const base64Image = await fileToBase64(file);
    
    // Prepare the request body with both TEXT_DETECTION and LOGO_DETECTION
    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image
          },
          features: [
            {
              type: 'TEXT_DETECTION',
              maxResults: 10
            },
            {
              type: 'LOGO_DETECTION',
              maxResults: 10
            }
          ]
        }
      ]
    };

    console.log('Making API request to Google Cloud Vision...');
    console.log('API Key:', process.env.REACT_APP_GOOGLE_CLOUD_VISION_API_KEY ? 'Present' : 'Missing');

    // Make the API request with API key
    const response = await axios.post(
      `${GOOGLE_CLOUD_VISION_API_URL}?key=${process.env.REACT_APP_GOOGLE_CLOUD_VISION_API_KEY}`,
      requestBody
    );

    console.log('API Response:', response.data);

    if (!response.data.responses || !response.data.responses[0]) {
      throw new Error('Invalid response format from Vision API');
    }

    if (!response.data.responses[0].textAnnotations || !response.data.responses[0].textAnnotations[0]) {
      throw new Error('No text detected in the image');
    }

    // Get all text annotations and logo annotations for detailed analysis
    const textAnnotations = response.data.responses[0].textAnnotations;
    const logoAnnotations = response.data.responses[0].logoAnnotations || [];
    const fullText = textAnnotations[0].description;
    console.log('Detected text:', fullText);

    // Clean text by removing emojis and other special Unicode characters
    const cleanText = fullText.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

    // Process each line with detailed character analysis
    const playerNames = cleanText
      .split('\n')
      .map(line => line.trim())
      .filter(line => {
        // Skip empty lines
        if (!line || line.length === 0) return false;

        // Skip common non-player text
        if (line.includes('K/D') || line.includes('Score') || line.includes('Level')) return false;
        if (line.includes('Team') || line.includes('Round') || line.includes('Match')) return false;

        // Skip common game-specific terms
        const skipTerms = ['ATK','DFF','ATC','ATV', 'A1K','DEC', 'DEB', 'BEF', 'OEF', 'D€F', 'D3F', 'DEF', 'ATTACKER', 'DEFENDER', 'ROUND', 'MATCH', 'TEAM'];
        if (skipTerms.some(term => line.toUpperCase().includes(term))) return false;

        // Skip single numbers (1-5)
        if (/^[1-5]$/.test(line)) return false;

        // Skip lines that are just "ATK" or "DEF"
        if (line.toUpperCase() === 'ATK' || line.toUpperCase() === 'DEF') return false;

        // Skip lines that contain multiple spaces
        if (line.includes('  ')) return false;

        // Skip lines that are just numbers followed by spaces
        if (/^\d+\s+$/.test(line)) return false;

        return true;
      })
      .map(line => {
        // Find the line in the text annotations
        const lineAnnotation = textAnnotations.find(annotation => 
          annotation.description.includes(line)
        );

        let platform = 'psn'; // Default to PSN
        let trackerUrl = `https://r6.tracker.network/r6siege/profile/psn/${encodeURIComponent(line)}/overview`;

        // First check for platform-specific characters
        if (line.includes('.')) {
          platform = 'ubi'; // PC usernames can contain periods
          trackerUrl = `https://r6.tracker.network/r6siege/profile/ubi/${encodeURIComponent(line)}/overview`;
        } else if (line.includes(' ')) {
          platform = 'xbl'; // Xbox usernames can contain spaces
          trackerUrl = `https://r6.tracker.network/r6siege/profile/xbl/${encodeURIComponent(line)}/overview`;
        }

        // Clean up the line by removing numbers and periods at the start
        const cleanLine = line.replace(/^\d+\.\s*/, '').trim();

        if (lineAnnotation && lineAnnotation.boundingBox) {
          // Get the bounding box for the line
          const vertices = lineAnnotation.boundingBox.vertices;
          const lineX = vertices[0].x;
          const lineY = vertices[0].y;
          const lineHeight = vertices[2].y - vertices[0].y;

          // Look for logos near this line
          const nearbyLogos = logoAnnotations.filter(logo => {
            if (!logo.boundingBox) return false;
            const logoVertices = logo.boundingBox.vertices;
            const logoX = logoVertices[0].x;
            const logoY = logoVertices[0].y;
            const logoWidth = logoVertices[2].x - logoVertices[0].x;

            // Check if logo is to the left of the text and vertically aligned
            const isLeftOfText = logoX + logoWidth < lineX;
            const isVerticallyAligned = Math.abs(logoY - lineY) < lineHeight * 0.5;

            return isLeftOfText && isVerticallyAligned;
          });

          // If we found nearby logos and haven't determined platform by characters, determine the platform
          if (nearbyLogos.length > 0 && platform === 'psn') {
            // Use the first logo found (closest to the text)
            const logo = nearbyLogos[0];
            const logoDescription = logo.description.toLowerCase();

            // Determine platform based on logo description
            if (logoDescription.includes('playstation') || logoDescription.includes('psn')) {
              platform = 'psn';
            } else if (logoDescription.includes('xbox') || logoDescription.includes('xbl')) {
              platform = 'xbl';
            } else if (logoDescription.includes('ubisoft') || logoDescription.includes('pc')) {
              platform = 'ubi';
            }

            // Update tracker URL based on platform
            trackerUrl = `https://r6.tracker.network/r6siege/profile/${platform}/${encodeURIComponent(cleanLine)}/overview`;
          }

          // Analyze consecutive special characters
          let processedLine = '';
          let consecutiveCount = 0;
          let lastSpecialCharIndex = -1;

          for (let i = 0; i < cleanLine.length; i++) {
            const char = cleanLine[i];
            
            if (char === '_' || char === '-') {
              // Check if this is a consecutive special character
              if (i === lastSpecialCharIndex + 1) {
                consecutiveCount++;
                // Add the character as many times as it appears consecutively
                for (let j = 0; j < consecutiveCount; j++) {
                  processedLine += char;
                }
              } else {
                consecutiveCount = 1;
                processedLine += char;
              }
              lastSpecialCharIndex = i;
            } else {
              consecutiveCount = 0;
              processedLine += char;
            }
          }

          // Apply platform-specific validation
          if (!isValidUsername(processedLine, platform)) {
            console.log(`Invalid username for platform ${platform}: ${processedLine}`);
            return null;
          }

          // Check OCR confidence and if the line was cleaned
          const needsEdit = lineAnnotation.confidence < 0.9 || 
                          processedLine !== cleanLine || 
                          cleanLine !== line || // This will be true if we removed numbers/periods
                          line.includes(' ') || 
                          /[^a-zA-Z0-9._-]/.test(processedLine);

          return {
            name: processedLine,
            platform,
            trackerUrl,
            needsEdit
          };
        }

        // If no bounding box is available, validate against the determined platform
        if (!isValidUsername(cleanLine, platform)) {
          console.log(`Invalid ${platform} username: ${cleanLine}`);
          return null;
        }

        // Check if name might need editing
        const needsEdit = cleanLine !== line || // This will be true if we removed numbers/periods
                         line.includes(' ') || 
                         /[^a-zA-Z0-9._-]/.test(cleanLine);

        return {
          name: cleanLine,
          platform,
          trackerUrl,
          needsEdit
        };
      })
      .filter(Boolean) // Remove null entries (invalid usernames)
      .slice(0, 10); // Assuming max 10 players

    console.log('Extracted player names:', playerNames);
    return playerNames;
  } catch (error) {
    console.error('Detailed error processing image:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    throw new Error(`Failed to process image: ${error.message}`);
  }
}

// Helper function to convert file to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = error => reject(error);
  });
} 