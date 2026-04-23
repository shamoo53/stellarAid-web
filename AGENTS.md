# Project Setup

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx next lint` - Run Next.js lint

## Project Structure

- `components/` - Shared components
  - `donations/` - Donation-related components
  - `projects/` - Project-related components
  - `ui/` - UI components
- `features/` - Feature modules
  - `projects/components/` - Project feature components
- `utils/` - Utility functions
- `store/` - State management (Zustand)
- `types/` - TypeScript type definitions
- `hooks/` - Custom hooks

## Key Components

### Donation Flow
- `DonationModal` - Main donation modal with asset selection
- `AssetSelector` - Asset/currency selector for donations
- `WalletConnectModal` - Wallet connection modal (Stellar)

### Project Discovery
- `ProjectCard` - Reusable project card with funding progress
- `ProjectFilters` - Combined filter component (sort, status, verified/urgent)
- `ProjectSearch` - Search input with debounced search (500ms)
- `CategoryFilter` - Category filtering with multi-select and counts

## Testing

Run tests with:
- `npx jest` - Run all tests
- `npx jest --watch` - Watch mode

## Type Checking

- TypeScript is configured with strict mode
- Run `npx tsc --noEmit` to check types without building