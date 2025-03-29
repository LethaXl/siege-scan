import axios from 'axios';

const GOOGLE_CLOUD_VISION_API_URL = 'https://vision.googleapis.com/v1/images:annotate';

const isValidPSNUsername = (username) => {
  // PSN rules
  if (username.length < 3 || username.length > 16) return false;
  if (!/^[a-zA-Z]/.test(username)) return false;
  // PSN usernames allow letters, numbers, underscores, and hyphens only
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) return false;
  // No consecutive spaces (but allow consecutive underscores and hyphens as they are valid)
  if (username.includes('  ')) return false;
  return true;
};

const isValidXboxUsername = (username) => {
  // Xbox rules
  if (username.length < 3 || username.length > 15) return false;
  if (!/^[a-zA-Z]/.test(username)) return false;
  // Xbox usernames allow letters, numbers, and spaces
  if (!/^[a-zA-Z0-9 ]+$/.test(username)) return false;
  // No consecutive spaces
  if (username.includes('  ')) return false;
  return true;
};

const isValidPCUsername = (username) => {
  // PC rules
  if (username.length < 3 || username.length > 15) return false;
  if (!/^[a-zA-Z]/.test(username)) return false;
  // PC usernames allow letters, numbers, periods, underscores, and hyphens
  if (!/^[a-zA-Z0-9._-]+$/.test(username)) return false;
  // No consecutive special characters (except allow -- and __ as they may be valid)
  if (username.includes('...')) return false;
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
        // For debugging: show all lines before filtering
        console.log(`Filtering line: "${line}"`);

        // Skip empty lines
        if (!line || line.length === 0) return false;

        // Skip single characters or very short strings that aren't usernames
        if (line.length < 3) return false;

        // Skip lines that are ONLY numbers (but keep lines that have numbers followed by text)
        if (/^\d+$/.test(line)) return false;

        // Skip common non-player text
        if (line.includes('K/D') || line.includes('Score') || line.includes('Level')) return false;
        if (line.includes('Team') || line.includes('Round') || line.includes('Match')) return false;

        // Skip common game-specific terms
        const skipTerms = ['ATK','DFF','ATC','ATV', 'A1K','DEC', 'DEB', 'BEF', 'OEF', 'D€F', 'D3F', 'DEF', 'O O','ATTACKER', 'DEFENDER', 'ROUND', 'MATCH', 'TEAM', 'NAVIGATE', 'NAVIGATE WITH', 'AVAILABE', 'ASSAULT RIFLE', 'ate with','WITH','ith'];
        if (skipTerms.some(term => line.toUpperCase().includes(term))) return false;

        // Skip single numbers (1-5)
        if (/^[1-5]$/.test(line)) return false;

        // Skip lines that are just "ATK" or "DEF"
        if (line.toUpperCase() === 'ATK' || line.toUpperCase() === 'DEF') return false;

        // Skip lines that contain multiple spaces
        if (line.includes('  ')) return false;

        // Skip lines that are just numbers followed by spaces with no name
        if (/^\d+\s+$/.test(line)) return false;

        // Skip lines with invalid characters that are definitely not player names (excluding ? which might be at the start)
        if (/[+*=&%$#@!;:,<>\\|]/.test(line)) return false;
        
        // Skip lines with non-Latin characters that are likely OCR errors
        // eslint-disable-next-line no-control-regex
        if (/[^\x00-\x7F]/.test(line)) return false;

        // Skip lines that match patterns like "A 5" or "D 6" (single letter followed by number)
        if (/^[A-Za-z]\s+\d+$/.test(line)) return false;
        
        // Skip lines that match patterns like "A B" (single letter + space + single letter)
        if (/^[A-Za-z]\s+[A-Za-z]$/.test(line)) return false;
        
        // Skip lines that are likely game stats, not usernames
        if (/^[A-Za-z]\s+\d+\s+\d+$/.test(line)) return false; // Like "K 1 2"
        
        // Skip lines with just 2-3 characters that aren't valid usernames
        if (line.length <= 3 && !/^[a-zA-Z]{3}$/.test(line)) return false;

        // Check for a pattern like "B Razz_354" (single letter followed by space, then valid username)
        // We'll clean these up in the processing step
        if (/^[A-Za-z]\s+[A-Za-z]/.test(line)) {
          // For valid pattern: further check if it contains underscore or hyphen (PSN)
          if (line.includes('_') || line.includes('-')) {
            console.log(`Letter-prefixed PSN username detected: "${line}"`);
            return true;
          }
          
          // Also allow just a single letter prefix with any alphanumeric name (catch Xbox/PC patterns)
          console.log(`Letter-prefixed username detected: "${line}"`);
          return true;
        }

        // Allow lines that contain a number followed by a period and name
        if (/^\d+\.\s*[a-zA-Z]/.test(line)) return true;
        
        // Allow lines that start with ? followed by a letter (these are likely OCR errors)
        if (/^\?[a-zA-Z]/.test(line)) return true;

        // For non-numbered lines, ensure it starts with a letter
        if (!/^[a-zA-Z]/.test(line)) return false;

        return true;
      })
      .map(line => {
        // Find the line in the text annotations
        const lineAnnotation = textAnnotations.find(annotation => 
          annotation.description.includes(line)
        );

        // Initial platform assignment
        let platform = 'psn'; // Default to PSN

        // Check if line starts with a number followed by a period and space
        const hasNumberPrefix = /^\d+\.\s+/.test(line);
        
        // Check if line starts with a question mark (OCR error)
        const hasQuestionMarkPrefix = /^\?/.test(line);
        
        // Check if line has a single letter prefix followed by a space and a valid username
        const hasLetterSpacePrefix = /^[A-Za-z]\s+[A-Za-z]/.test(line);

        // Clean up the line by removing numbers/periods/question marks at the start
        let cleanLine = line;
        if (hasNumberPrefix) {
            cleanLine = line.replace(/^\d+\.\s*/, '').trim();
        } else if (hasQuestionMarkPrefix) {
            cleanLine = line.replace(/^\?/, '').trim();
        } else if (hasLetterSpacePrefix) {
            // Clean patterns like "B Razz_354" to "Razz_354"
            cleanLine = line.replace(/^[A-Za-z]\s+/, '').trim();
        }
        
        // Further clean the line by removing invalid characters
        // Remove any non-alphanumeric, underscore, period, dash, and space characters
        const sanitizedLine = cleanLine.replace(/[^a-zA-Z0-9._\- ]/g, '').trim();

        // For debugging
        console.log(`Clean result: "${line}" → "${sanitizedLine}"`);

        // Determine platform based on username characters
        if (sanitizedLine.includes('.')) {
            platform = 'ubi';
        } else if (sanitizedLine.includes('_') || sanitizedLine.includes('-')) {
            platform = 'psn';
        } else if (sanitizedLine.includes(' ')) {
            platform = 'xbl';
        }
        
        // Create tracker URL based on detected platform
        let trackerUrl = `https://r6.tracker.network/r6siege/profile/${platform}/${encodeURIComponent(sanitizedLine)}/overview`;

        // Skip if we don't have a valid username after cleaning
        if (sanitizedLine.length < 3 || !/^[a-zA-Z]/.test(sanitizedLine)) {
          return null;
        }

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
            trackerUrl = `https://r6.tracker.network/r6siege/profile/${platform}/${encodeURIComponent(sanitizedLine)}/overview`;
          }

          // Analyze consecutive special characters
          let processedLine = '';
          let lastSpecialCharIndex = -1;

          for (let i = 0; i < sanitizedLine.length; i++) {
            const char = sanitizedLine[i];
            
            if (char === '_' || char === '-') {
              // Check if this is a consecutive special character
              if (i === lastSpecialCharIndex + 1) {
                // Add the character for PlayStation and PC (allow consecutive characters for these platforms)
                processedLine += char;
              } else {
                processedLine += char;
              }
              lastSpecialCharIndex = i;
            } else {
              processedLine += char;
            }
          }

          // Apply platform-specific validation
          if (!isValidUsername(processedLine, platform)) {
            console.log(`Invalid username for platform ${platform}: ${processedLine}`);
            return null;
          }

          // Check OCR confidence and if the line was cleaned
          // Set needsEdit to true if the line had a prefix
          const needsEdit = lineAnnotation.confidence < 0.9 || 
                          processedLine !== sanitizedLine || 
                          sanitizedLine !== cleanLine ||
                          cleanLine !== line || // This will be true if we removed numbers/periods
                          line.includes(' ') || 
                          hasNumberPrefix ||
                          hasQuestionMarkPrefix ||
                          hasLetterSpacePrefix ||
                          /[^a-zA-Z0-9._-]/.test(processedLine);

          return {
            name: processedLine,
            platform,
            trackerUrl,
            needsEdit
          };
        }

        // Check if name might need editing - set needsEdit to true if the line had a prefix
        const needsEdit = sanitizedLine !== cleanLine ||
                         cleanLine !== line || // This will be true if we removed numbers/periods
                         line.includes(' ') || 
                         hasNumberPrefix ||
                         hasQuestionMarkPrefix ||
                         hasLetterSpacePrefix ||
                         /[^a-zA-Z0-9._-]/.test(sanitizedLine);

        return {
          name: sanitizedLine,
          platform,
          trackerUrl,
          needsEdit
        };
      })
      .filter(Boolean) // Remove null entries (invalid usernames)
      .filter(player => {
        // Final validation check - ensure all player names follow platform rules
        return isValidUsername(player.name, player.platform);
      })
      .map(player => {
        // Platform-specific final cleanup
        let cleanName = player.name;
        
        // Remove characters not allowed on specific platforms
        if (player.platform === 'xbl') {
          // Xbox doesn't allow special characters
          cleanName = cleanName.replace(/[^a-zA-Z0-9 ]/g, '');
        } else if (player.platform === 'psn') {
          // PSN only allows underscores and hyphens
          cleanName = cleanName.replace(/[^a-zA-Z0-9_-]/g, '');
        } else if (player.platform === 'ubi') {
          // PC allows periods, underscores, and hyphens
          cleanName = cleanName.replace(/[^a-zA-Z0-9._-]/g, '');
        }
        
        // Update tracker URL with clean name
        let trackerUrl = `https://r6.tracker.network/r6siege/profile/${player.platform}/${encodeURIComponent(cleanName)}/overview`;
        
        return {
          ...player,
          name: cleanName,
          trackerUrl
        };
      })
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