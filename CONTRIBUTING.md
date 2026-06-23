# Excel Chatbot AI - Contributing Guide

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file from `.env.example`
4. Start development server: `npm start`

## Project Structure

- `src/components/` - React components
- `src/utils/` - Utility functions (Excel, OCR, Watermark, Monetization)
- `src/services/` - API and analytics services
- `public/` - Static files and Electron main process

## Development

### Add New Component
1. Create component file in `src/components/`
2. Add corresponding CSS file
3. Export from App.js

### Add New Utility
1. Create utility file in `src/utils/`
2. Document functions with JSDoc comments
3. Export functions in `index.js`

## Build & Deployment

### Web Build
```bash
npm run build
```

### Desktop Build (Windows)
```bash
npm run electron-build
```

## Features

- 🤖 AI-powered Excel chatbot
- 📊 Automatic Excel generation
- 🖼️ Image to Excel conversion (OCR)
- 💧 Watermarking (nurasyid)
- 💰 Pay-per-click monetization tracking
- 💻 Desktop app support (Electron)

## Watermarking

All Excel files automatically include a "nurasyid" watermark for:
- Brand protection
- File tracking
- Professional marking

## Monetization

The app tracks:
- Chat interactions
- File generations
- Image uploads
- Downloads

Data sent to analytics service for billing.

## Support

For issues or features, create an issue on GitHub.

## License

Copyright © 2024 nurasyid. All rights reserved.
