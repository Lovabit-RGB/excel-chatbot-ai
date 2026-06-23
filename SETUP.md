# Installation & Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

## Installation Steps

### 1. Clone Repository
```bash
git clone https://github.com/Lovabit-RGB/excel-chatbot-ai.git
cd excel-chatbot-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ANALYTICS_URL=http://localhost:3001/analytics
REACT_APP_WATERMARK_TEXT=nurasyid
REACT_APP_ENABLE_MONETIZATION=true
```

## Development Mode

### Start Web App
```bash
npm start
```
App opens at `http://localhost:3000`

### Start Desktop App
```bash
npm run electron-dev
```

### Run Tests
```bash
npm test
```

## Production Build

### Web Build
```bash
npm run build
```
Output in `build/` folder

### Desktop Build (Windows)
```bash
npm run electron-build
```
Output in `dist/` folder

### Desktop Build (macOS)
```bash
npm run electron-build -- --mac
```

### Desktop Build (Linux)
```bash
npm run electron-build -- --linux
```

## Features

### Chat Assistant
- Ask questions about Excel formulas
- Get data organization tips
- Learn about Excel functions
- Get file generation guidance

### Image to Excel
1. Upload an image with table/data
2. OCR processes the image
3. Automatically converts to Excel format
4. Download the Excel file

### Excel Generator
1. Enter data in CSV format
2. Customize sheet name and file name
3. Click "Generate & Download"
4. File is automatically watermarked

## Watermarking

All Excel files include:
- "nurasyid" watermark in footer
- Creator metadata
- Protection information
- Timestamp

## Monetization Tracking

The app tracks:
- **Chat interactions** - User messages
- **File generations** - Excel files created
- **Image uploads** - Images processed
- **Downloads** - Files downloaded

Data sent to analytics service for billing.

## Troubleshooting

### Port 3000 already in use
```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Dependencies not installing
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Electron not starting
```bash
npm install --save-dev electron
npm run electron-dev
```

## Support

- GitHub Issues: https://github.com/Lovabit-RGB/excel-chatbot-ai/issues
- Email: onediklat@gmail.com

## License

Copyright © 2024 nurasyid. All rights reserved.
