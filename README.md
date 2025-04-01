# SiegeScan

## Overview

SiegeScan is a mobile-optimized web application that instantly extracts player usernames from Rainbow Six Siege scoreboard screenshots and provides direct access to player statistics. Whether you're on your phone or desktop, simply take a photo or upload a screenshot for instant access to player profiles.

🎮 **[Try SiegeScan Live](https://siege-scan.vercel.app/)**

![SiegeScan Interface](/public/img.jpg)

## Features

- 🔍 **Instant OCR Processing** - Fast and accurate text extraction from scoreboard
- 📊 **One-Click Stats** - Direct links to detailed player profiles
- ⚡ **Fast Performance** - Quick processing and minimal loading times

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone https://github.com/LethaXl/siege-scan.git
cd siege-scan
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

1. **Upload Image**: Take a photo or upload a Rainbow Six Siege scoreboard screenshot
2. **View Stats**: Click on any extracted username to view their detailed statistics

## Tech Stack

### Frontend
- **React.js** - Core framework
- **Tailwind CSS** - Styling


### APIs & Services
- **Google Cloud Vision** - OCR processing
- **Axios** - HTTP requests

### Deployment
- **Vercel** - Hosting platform
