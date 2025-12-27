# SNOTEL Data Viewer

A modern web application for visualizing and analyzing SNOTEL (SNOw TELemetry) station data with interactive maps, real-time data fetching, and historical analysis tools.

## Features

- **Interactive Map**: View 800+ SNOTEL stations across the western United States using MapLibre GL JS with CartoDB basemaps
- **Real-Time Data**: Fetch current snow depth, snow water equivalent, temperature, and precipitation data from the NRCS AWDB REST API
- **Historical Analysis**: View and compare historical data with support for water year-based reporting (October 1 - September 30)
- **Responsive Design**: Built with Chakra UI for a beautiful, accessible, mobile-responsive interface
- **Type-Safe**: Built with TypeScript for robust type checking and improved developer experience

## Tech Stack

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### State Management
- **TanStack Query (React Query)** - Server state management, caching, and auto-refetching
- **Zustand** - Lightweight client state management

### UI & Visualization
- **Chakra UI** - Component library and styling
- **MapLibre GL JS** - Interactive maps
- **react-map-gl** - React wrapper for MapLibre
- **Recharts** - Data visualization charts (to be implemented)

### Data & API
- **Axios** - HTTP client
- **date-fns** - Date manipulation
- **Zod** - Runtime type validation

## Project Structure

```
snotel/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── layout/          # Layout components (Header, Layout)
│   │   ├── map/             # Map components (SnotelMap, markers, popups)
│   │   ├── charts/          # Chart components (to be implemented)
│   │   ├── station/         # Station-related components (to be implemented)
│   │   └── common/          # Common UI components (to be implemented)
│   ├── pages/               # Page components (routing)
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API services and clients
│   │   └── api/             # API integration layer
│   ├── store/               # Zustand state stores
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   └── lib/                 # Library configurations
├── public/                  # Static assets
├── .env.local              # Environment variables (not committed)
├── .env.example            # Environment variable template
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   cd /Users/gadomski/Code/gadomski/snotel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment variables are already configured in `.env.local`:
   ```env
   VITE_AWDB_API_URL=https://wcc.sc.egov.usda.gov/awdbRestApi
   VITE_MAP_STYLE=https://basemaps.cartocdn.com/gl/positron-gl-style/style.json
   ```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## API Integration

### NRCS AWDB REST API

This application integrates with the USDA NRCS Air and Water Database (AWDB) REST API to fetch SNOTEL station data.

**Base URL**: `https://wcc.sc.egov.usda.gov/awdbRestApi/`

**Key Endpoints**:
- `/metadata/stations` - Get list of all stations
- `/data` - Get time-series measurement data
- `/reference-data/elements` - Get element code definitions

**Documentation**:
- [Swagger UI](https://wcc.sc.egov.usda.gov/awdbRestApi/swagger-ui/index.html)
- [GitHub Demo](https://github.com/nrcs-nwcc/iow_awdb_rest_api_demo)

### Data Elements

The application fetches and displays the following SNOTEL data elements:

| Code | Description | Unit |
|------|-------------|------|
| SNWD | Snow Depth | inches |
| WTEQ | Snow Water Equivalent | inches |
| TOBS | Temperature Observed | °F |
| TMAX | Temperature Maximum | °F |
| TMIN | Temperature Minimum | °F |
| PREC | Precipitation Accumulation | inches |

## Water Year

SNOTEL data is organized by **water year**, which runs from **October 1 to September 30**.

For example:
- Water Year 2024 = October 1, 2023 through September 30, 2024

The application defaults to the current water year for historical data queries.

## Architecture

### State Management

**Server State (React Query)**:
- Station list (cached for 24 hours)
- Current station data (refetched every 15 minutes)
- Historical data (cached for 15 minutes)

**Client State (Zustand)**:
- Selected station ID
- Map viewport state
- UI filters and preferences
- Date range selection

### Map Implementation

The interactive map uses:
- **MapLibre GL JS** for rendering
- **CartoDB Positron** basemap style
- Custom markers for station locations
- Popup displays on marker click
- Navigation controls for zoom and pan

## Development Roadmap

### Completed ✅
- [x] Project setup with Vite + React + TypeScript
- [x] Chakra UI integration
- [x] NRCS AWDB REST API integration
- [x] Interactive map with station markers
- [x] Routing (React Router)
- [x] State management (React Query + Zustand)
- [x] Water year utilities
- [x] Basic layout and navigation

### In Progress 🚧
- [ ] Station detail page with current conditions
- [ ] Station list sidebar with filters
- [ ] Historical data charts

### Planned 📋
- [ ] Chart components (Recharts integration)
  - [ ] Snow depth time-series chart
  - [ ] Temperature chart
  - [ ] Precipitation chart
  - [ ] Comparison charts for multiple stations
- [ ] Historical analysis page
  - [ ] Multi-station comparison
  - [ ] Year-over-year comparison
  - [ ] Statistical analysis (averages, percentiles)
- [ ] Advanced features
  - [ ] Export data to CSV
  - [ ] Share station views via URL
  - [ ] Map clustering for better performance
  - [ ] Dark mode toggle
  - [ ] Mobile-optimized layouts
- [ ] Testing
  - [ ] Unit tests for utilities
  - [ ] Integration tests for API hooks
  - [ ] Component tests

## Contributing

### Code Style

- Use TypeScript for all new files
- Follow existing project structure
- Use Chakra UI components for consistency
- Keep components small and focused
- Write meaningful comments for complex logic

### Adding New Features

1. **New Component**: Add to appropriate directory under `src/components/`
2. **New Page**: Add to `src/pages/` and update routing in `App.tsx`
3. **New API Endpoint**: Add to `src/services/api/snotel.ts`
4. **New Hook**: Add to `src/hooks/`
5. **New Type**: Add to `src/types/`

## Troubleshooting

### Map Not Loading

If the map doesn't load:
1. Check the browser console for errors
2. Verify `VITE_MAP_STYLE` is set correctly in `.env.local`
3. Ensure MapLibre GL CSS is imported in the component

### API Errors

If you're getting API errors:
1. Check the AWDB API status
2. Verify `VITE_AWDB_API_URL` is set correctly
3. Check network tab for request/response details
4. Note that some API endpoints may have rate limits

### Build Errors

If you encounter TypeScript errors:
1. Run `npm install` to ensure dependencies are up to date
2. Delete `node_modules` and reinstall if needed
3. Check for type mismatches in your code

## Resources

- [NRCS SNOTEL Homepage](https://www.wcc.nrcs.usda.gov/snow/)
- [AWDB Web Service Guide](https://www.nrcs.usda.gov/sites/default/files/2023-03/AWDB%20Web%20Service%20User%20Guide.pdf)
- [React Documentation](https://react.dev/)
- [Chakra UI Documentation](https://chakra-ui.com/)
- [MapLibre GL JS Documentation](https://maplibre.org/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)

## License

This project is built for educational and research purposes. SNOTEL data is provided by the USDA NRCS and is in the public domain.

## Acknowledgments

- **USDA NRCS** for providing the AWDB REST API and SNOTEL data
- **CartoDB** for free basemap tiles
- **MapLibre** for the open-source mapping library
