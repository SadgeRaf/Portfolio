# Creative Portfolio

A modern, responsive portfolio landing page built with React.js featuring elegant typography and smooth animations.

## Features

- **Responsive Design**: Looks great on all devices
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Smooth Animations**: Floating elements and hover effects
- **Modern Typography**: Space Grotesk and Inter fonts
- **Clean Architecture**: Component-based React structure

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── Navigation.js    # Top navigation with theme toggle
│   ├── Hero.js         # Main hero section with typography
│   └── Footer.js       # Footer with profile image
├── App.js              # Main app component
└── index.js           # Entry point
```

## Customization

- **Colors**: Edit the Tailwind config in `public/index.html`
- **Fonts**: Update Google Fonts links and CSS classes
- **Content**: Modify text and links in component files
- **Profile Image**: Replace the image URL in `Footer.js`

## Build for Production

```bash
npm run build
```

This creates an optimized build in the `build` folder ready for deployment.