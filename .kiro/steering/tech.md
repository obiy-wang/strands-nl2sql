# Technology Stack

## Core Technologies

- **React 18** - UI framework
- **React Hooks** - State management (useState, useCallback, useEffect, custom hooks)
- **Create React App** - Build tooling and development server
- **CSS3** - Styling with responsive design
- **ES6+** - Modern JavaScript features

## Dependencies

- react: ^18.2.0
- react-dom: ^18.2.0
- react-scripts: 5.0.1

## Common Commands

### Development
```bash
npm install          # Install dependencies
npm start            # Start development server (http://localhost:3000)
```

### Production
```bash
npm run build        # Create optimized production build in build/ folder
npm test             # Run tests
```

### Code Quality
- ESLint configuration extends `react-app`
- Browserslist configured for modern browsers

## Build System

Uses Create React App (react-scripts) which provides:
- Webpack bundling
- Babel transpilation
- Hot module replacement
- Development server
- Production optimization
