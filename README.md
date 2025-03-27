# SiegeScan

SiegeScan is a web application that extracts text from Rainbow Six Siege scoreboard images using OCR technology. It allows users to quickly look up player statistics by capturing screenshots of in-game scoreboards.

## Features

- Image upload and OCR processing using Google Cloud Vision API
- Automatic player name extraction from scoreboard images
- Direct links to R6 Tracker profiles
- Mobile-friendly interface
- Fast and responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Cloud Vision API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/siege-scan.git
cd siege-scan
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Google Cloud Vision API key:
```
REACT_APP_GOOGLE_CLOUD_VISION_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

1. Take a screenshot of the Rainbow Six Siege scoreboard during a match
2. Upload the screenshot to SiegeScan
3. Wait for the OCR processing to complete
4. Click on any player name to view their detailed statistics on R6 Tracker

## Technologies Used

- React
- Tailwind CSS
- Google Cloud Vision API
- React Router
- React Dropzone
- Axios

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
