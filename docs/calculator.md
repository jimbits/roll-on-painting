# Residential Interior Paint Quote Calculator Planning Document

## Project Overview

**Project Name:** Residential Interior Paint Quote Calculator  
**Parent Project:** Roll On Painting Website **Type:** Multi-step form application within
authenticated website **Purpose:** Generate residential interior painting project estimates  
**Target Users:** Authenticated homeowners seeking painting estimates

### Project Goals

Build a multi-step form calculator for the Roll On Painting website focused on residential interior
painting projects. The application will be an authenticated feature that guides users through a
3-section process to generate accurate quote estimates. This calculator will integrate with the
site's paint database and user management system.

## User Journey & Form Sections

### Section 1: Project Details

**Purpose:** Gather essential project information and measurements

**Key Fields:**

- Project location (zip code for regional pricing)
- Room type(s) and count
- Square footage measurements
- Room dimensions (length, width, height)
- Number of doors and windows
- Wall texture type (smooth, textured, etc.)
- Current wall condition
- Ceiling height
- Prep work required (patching, priming, etc.)

### Section 2: Paint Type, Color & Manufacturer

**Purpose:** Collect paint specifications and material preferences

**Key Fields:**

- Paint type (latex, oil-based, primer+paint combo)
- Paint finish (flat, eggshell, satin, semi-gloss, gloss)
- Paint quality tier (basic, mid-tier, premium)
- Color selection (affects complexity/cost)
- Number of colors
- Manufacturer preference
- Special features (eco-friendly, antimicrobial, etc.)

### Section 3: View Quote

**Purpose:** Display calculated estimate and provide output options

**Features:**

- Detailed cost breakdown
- Materials vs. labor costs
- Square footage calculations
- Paint coverage estimates
- Timeline estimate
- **Call To Action:**

  1. Save Quote Button

  ### Section 4: Save Quote

**Purpose:** Allow user to save the quote and email themselves a PDF copy of the quote. There will
be an option of leaving there phone number to recieve a call back about the quote.

**Features:**

- Email Input
- Save Button
- Square footage calculations
- Paint coverage estimates
- Timeline estimate
- **Call To Action Button:**
  1. Save Button

## Technical Architecture

This calculator will be an authenticated feature within the larger Roll On Painting website. The
full website includes user authentication, course payments, monthly billing, supply sales, paint
database with search functionality, and document storage.

### State Management Architecture

**TanStack Query (Server State Management):**

- User authentication data
- Paint prices from database
- Color/manufacturer search results from paint database
- User's saved quotes and projects
- Regional pricing data (zip code lookups)
- Course data and billing information

**Zustand (Client State Management):**

- Quote calculator form data across 3 steps
- UI state (active sections, validation errors, loading states)
- Temporary calculations before saving to server
- User preferences (units, default settings)
- Modal states and navigation state

**State Management Flow:**

```typescript
// TanStack Query - Server data
const {data: paintOptions} = useQuery({
	queryKey: ['paint-search', searchTerm],
	queryFn: () => searchPaintDatabase(searchTerm),
})

// Zustand - Client form state
const {projectDetails, updateProjectDetails} = useQuoteStore()
```

### Essential Next.js Libraries

**Authentication & Security:**

- NextAuth.js v5 (Auth.js) or Clerk for user management
- Middleware for route protection

**Database & ORM:**

- Prisma or Drizzle ORM for database management
- @planetscale/database or Neon for serverless PostgreSQL

**Payments & Business:**

- Stripe SDK for course payments and subscriptions
- React Hook Form + Zod for all forms throughout site

**State Management:**

- TanStack Query for server state (paint data, user data)
- Zustand for client state (forms, UI state)

**UI & Styling:**

- Tailwind CSS v4+
- Shadcn/ui components
- Framer Motion for animations

**Development & Testing:**

- Storybook 8.x with @storybook/nextjs for component documentation
- Vitest + React Testing Library + Playwright
- MSW for API mocking

### Frontend Framework

**Selected:** Next.js 15 with TypeScript

**Rationale for Full Site:**

- App Router for modern React patterns
- Built-in authentication middleware support
- Server components for performance
- API routes for backend functionality (billing, user management)
- Built-in optimizations and SEO capabilities
- Seamless integration with payment systems (Stripe)
- File upload handling for document storage
- Perfect for multi-feature business website

**Calculator-Specific Benefits:**

- Component-based architecture for reusable form sections
- Server-side route protection for authenticated features
- Optimized performance for form interactions
- Easy integration with paint database APIs

### State Management

**Primary Architecture:** TanStack Query + Zustand

**TanStack Query:**

- Server state management and caching
- API calls for paint data, user info, saved quotes
- Background synchronization and updates
- Optimistic updates for better UX

**Zustand:**

- Client-side form state persistence
- UI state management
- Multi-step form data coordination
- User preference storage
- Better performance than Context API
- Easier testing and debugging

### Form Architecture

```
App
├── ProgressIndicator
├── FormContainer
│   ├── ProjectDetailsForm (Section 1)
│   ├── PaintSpecificationsForm (Section 2)
│   └── QuoteReviewForm (Section 3)
├── Navigation (Next/Back buttons)
└── QuoteOutputOptions (Print/Email)
```

### Data Flow

1. User inputs → Form validation → State update
2. All sections complete → Trigger quote calculation
3. Display results → Enable print/email actions

## Data Validation & Schema Structure

### Form Validation Strategy

**Primary Stack:** React Hook Form + Zod

**Validation Timing Strategy:**

- **Individual Fields**: `onBlur` validation (validates when user leaves field)
- **Step-Level**: Full validation when clicking "Next" button
- **Cross-Step**: Final validation before quote calculation
- **Real-time**: Only for critical fields (zip code format, numeric ranges)

### Real-Time Validation Best Practices

**UX Guidelines:**

- Avoid validation on every keystroke (prevents user completion)
- Show success states immediately after valid input
- Delay error messages by 300-500ms to prevent premature errors
- Use progressive enhancement for accessibility

**Accessibility Requirements:**

- Use `aria-describedby` to link error messages to inputs
- Implement `aria-live` regions for dynamic error announcements
- Ensure error messages are announced to screen readers
- Maintain focus management during validation state changes

**Visual Validation Tools & Libraries:**

**Recommended Libraries:**

- **React Hook Form**: Built-in error state management
- **Shadcn/ui Form Components**: Pre-built accessible form patterns
- **Zod Error Mapping**: Custom error message formatting
- **React Aria**: Advanced accessibility patterns if needed

**Visual Feedback Patterns:**

```typescript
// Example validation state styling
const inputClasses = cn('border rounded-md px-3 py-2', {
	'border-red-500 bg-red-50': errors.fieldName,
	'border-green-500 bg-green-50': !errors.fieldName && touchedFields.fieldName,
	'border-gray-300': !touchedFields.fieldName,
})
```

**Validation State Management:**

- Show loading spinner during async validation (zip code lookup)
- Debounce API calls for real-time validation (500ms delay)
- Cache validation results to prevent duplicate calls
- Progressive disclosure of validation messages

### Schema Definition

**Zod Schemas for Each Section:**

```typescript
// Step 1: Project Details Schema
const projectDetailsSchema = z.object({
	zipCode: z
		.string()
		.regex(/^\d{5}$/, 'Please enter a valid 5-digit zip code')
		.refine(async (val) => await validateZipCode(val), 'Invalid zip code area'),
	squareFootage: z
		.number()
		.min(50, 'Minimum 50 square feet required')
		.max(10000, 'Maximum 10,000 square feet allowed'),
	roomCount: z.number().min(1).max(20),
	ceilingHeight: z.number().min(7).max(20),
	doorCount: z.number().min(0).max(50),
	windowCount: z.number().min(0).max(100),
})

// Step 2: Paint Specifications Schema
const paintSpecificationsSchema = z.object({
	paintType: z.enum(['latex', 'oil-based', 'primer-combo']),
	finish: z.enum(['flat', 'eggshell', 'satin', 'semi-gloss', 'gloss']),
	qualityTier: z.enum(['basic', 'mid-tier', 'premium']),
	colorCount: z.number().min(1).max(5),
	specialFeatures: z.array(z.string()).optional(),
})

// Step 3: Quote Output Schema
const quoteOutputSchema = z.object({
	emailAddress: z.string().email('Please enter a valid email address').optional(),
	quotePreferences: z.object({
		includeTimeline: z.boolean(),
		includeMaterials: z.boolean(),
		includeTerms: z.boolean(),
	}),
})
```

### Validation Requirements

**Field-Level Validation Rules:**

- **Required Fields**: Clear indication with asterisks and ARIA labels
- **Numeric Ranges**: Min/max validation with helpful error messages
- **Format Validation**: Regex patterns for zip codes, phone numbers, email
- **Async Validation**: Zip code area validation, paint compatibility checks
- **Conditional Requirements**: Fields that become required based on other selections

**Error Message Standards:**

- Use clear, actionable language ("Enter a number between 50-10,000")
- Avoid technical jargon in user-facing messages
- Provide specific guidance on how to fix errors
- Use consistent tone and formatting across all messages

**Cross-Field Validation:**

- Room count vs. total square footage reasonableness
- Paint quantity calculations based on coverage area
- Timeline estimates based on project complexity

## Error Handling & Resilience

### Error Handling Strategy

**TODO:** Comprehensive error management approach

**Categories to Address:**

- Form validation errors
- Network/connectivity issues
- Browser compatibility problems
- Data persistence failures
- Calculation engine errors
- Print/email functionality failures

### Graceful Degradation

**TODO:** Define fallback behaviors

- Offline functionality scope
- Progressive enhancement approach
- Fallback UI states
- Error recovery mechanisms
- User communication strategies

### Error Logging & Monitoring

**TODO:** Error tracking implementation

- Client-side error capture
- User action logging
- Performance monitoring
- Error categorization
- Recovery success tracking

## Accessibility Requirements

### WCAG 2.1 Compliance

**TODO:** Detailed accessibility implementation plan

**Core Requirements:**

- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management
- Alternative text for images/icons
- Form label associations
- Error message accessibility

### Accessibility Testing Strategy

**TODO:** Define testing approach

- Automated accessibility testing tools
- Manual testing procedures
- Screen reader testing protocols
- Keyboard-only navigation testing
- Color blindness testing

### Progressive Enhancement

**TODO:** Accessibility-first development approach

- Semantic HTML structure
- ARIA label implementation
- Focus trap management
- Skip navigation links
- High contrast mode support

## Testing Strategy

### Comprehensive Testing Architecture

**Testing Types Required for Calculator:**

**1. Unit Testing (High Priority)**

- **Purpose**: Test individual functions in isolation
- **Critical Areas**: Pricing calculations, form validation, utility functions
- **Why Essential**: Calculation engine accuracy is critical for business success

**2. Component Testing (High Priority)**

- **Purpose**: Test React components with user interactions
- **Focus Areas**: Form inputs, step navigation, error states, data flow
- **Integration**: React Hook Form validation, Zustand state updates

**3. Integration Testing (Medium Priority)**

- **Purpose**: Test components working together with API calls
- **Focus Areas**: MockAPI.io integration, TanStack Query + Zustand interaction
- **Critical Flows**: Form submission, API data populating dropdowns, real-time price updates

**4. End-to-End Testing (Lower Priority)**

- **Purpose**: Full user journey through all 3 steps
- **Focus Areas**: Happy path completion, quote output generation
- **Limited Scope**: 1-2 critical user flows only

### Testing Stack & Tools

**Core Testing Libraries:**

- **Vitest**: Fast unit testing framework (replaces Jest)
- **React Testing Library**: Component testing standard
- **MSW (Mock Service Worker)**: Mock API calls during testing
- **Playwright**: E2E testing for critical user flows

**Storybook Integration (Design System & Visual Testing):**

- **Component UI Testing**: Visual component variations and states
- **Interaction Testing**: Storybook 8.x built-in interaction testing
- **Accessibility Testing**: Storybook a11y addon for automated accessibility checks
- **Visual Regression Testing**: Storybook Test Runner for screenshot comparisons
- **Design System Documentation**: Component library for team consistency

### Testing Pyramid for Calculator

**Level 1: Unit Tests (Vitest) - 70% of tests**

```typescript
// Example: Pricing calculation tests
describe('calculateMaterialCost', () => {
	it('calculates correct paint gallons needed', () => {
		const formData = {totalSquareFootage: 1200, needsPrimer: false}
		const paintProduct = {coveragePerGallon: 400, pricePerGallon: 45}

		const result = calculateMaterialCost(formData, paintProduct)

		expect(result.gallonsNeeded).toBe(3)
		expect(result.paintCost).toBe(135)
	})

	it('applies regional pricing multipliers correctly', () => {
		const formData = {totalSquareFootage: 1000, wallTexture: 'textured'}
		const regionalPricing = {laborRatePerSqFt: 3.5}

		const result = calculateLaborCost(formData, regionalPricing)

		expect(result.complexityMultiplier).toBe(1.25)
		expect(result.total).toBe(4375) // 1000 * 3.50 * 1.25
	})
})
```

**Level 2: Component Tests (React Testing Library) - 20% of tests**

```typescript
// Example: Form step navigation
describe('CalculatorForm', () => {
	it('prevents navigation to step 2 without valid step 1 data', async () => {
		render(<CalculatorForm />)

		const nextButton = screen.getByRole('button', {name: /next/i})
		await user.click(nextButton)

		expect(screen.getByText(/zip code is required/i)).toBeInTheDocument()
		expect(screen.getByText('Step 1')).toBeInTheDocument() // Still on step 1
	})
})
```

**Level 3: Integration Tests (MSW + React Testing Library) - 8% of tests**

```typescript
// Example: API integration
describe('Paint Selection Integration', () => {
	it('loads paint colors when manufacturer is selected', async () => {
		// MSW mocks the API response
		server.use(
			rest.get('*/paint-colors', (req, res, ctx) => {
				return res(ctx.json([{id: 1, name: 'Ocean Blue', hex: '#0066cc'}]))
			})
		)

		render(<PaintSpecificationsForm />)

		await user.selectOptions(screen.getByLabelText(/manufacturer/i), 'sherwin-williams')

		expect(await screen.findByText('Ocean Blue')).toBeInTheDocument()
	})
})
```

**Level 4: E2E Tests (Playwright) - 2% of tests**

````typescript
// Example: Complete user journey
test('user can complete full quote calculation', async ({ page }) => {
  await page.goto('/calculator')

  // Step 1: Project details
  await page.fill('[data-testid="zip-code"]', '12345')
  await page.fill('[data-testid="square-footage"]', '1200')
  await page.click('[data-testid="next-button"]')

  // Step 2: Paint selection
  await page.selectOption('[data-testid="manufacturer"]', 'sherwin-williams')
  await page.selectOption('[data-testid="paint-color"]', 'ocean-blue')
  await page.click('[data-testid="next-button"]')

  // Step 3: Quote review
  await expect(page.locator('[data-testid="total-cost"]')).toContainText('

## Component Implementation Strategy

### 3-Step Form Component Architecture

**Component Data Flow Pattern:**

```typescript
// Main Calculator Container
CalculatorApp
├── CalculatorHeader (progress indicator, save status)
├── FormProvider (React Hook Form context)
├── CalculatorForm
│   ├── StepOne: ProjectDetailsForm
│   │   ├── LocationInput (triggers useRegionalPricing on zip code entry)
│   │   ├── RoomMeasurements (calculates base square footage)
│   │   ├── SurfaceDetails (doors, windows, texture complexity)
│   │   └── PrepWorkSection (updates complexity modifiers)
│   ├── StepTwo: PaintSpecificationsForm
│   │   ├── ManufacturerSelector (uses usePaintManufacturers)
│   │   ├── ColorSelector (uses usePaintColors when manufacturer selected)
│   │   ├── ProductSelector (uses usePaintProducts with filters)
│   │   ├── QualityTierSelector (affects final pricing calculation)
│   │   └── SpecialFeatures (eco-friendly, antimicrobial options)
│   └── StepThree: QuoteReviewForm
│       ├── CostBreakdown (combines form data + API pricing)
│       ├── TimelineEstimate (calculated from project complexity)
│       ├── MaterialsList (paint quantities and supplies)
│       └── OutputActions (print/email functionality)
├── NavigationControls (back/next/save buttons)
├── PricePreview (sticky sidebar with running total)
└── FormErrorBoundary (error handling wrapper)
````

### Component Integration Patterns

**API Data Integration Points:**

- **Form state (Zustand)** triggers API calls based on user selections
- **API data** populates dropdowns and affects real-time calculations
- **Price updates** immediately reflect user specification changes
- **Validation** includes API data constraints (available colors, valid zip codes)

**State Management Flow:**

```typescript
// User Input → Zustand Store → Triggers TanStack Query → Updates UI
LocationInput onChange → updateProjectDetails → useRegionalPricing → PricePreview update
ManufacturerSelect → updatePaintSpecs → usePaintColors → ColorSelector options
```

### Form Step Dependencies

**Step 1 → Step 2 Dependencies:**

- Zip code determines available regional paint options
- Square footage affects paint quantity calculations
- Surface complexity influences product recommendations

**Step 2 → Step 3 Dependencies:**

- Paint selection determines material costs
- Quality tier affects labor pricing multipliers
- Color count impacts complexity and timeline

## Pricing Calculation Engine

### Core Calculation Architecture

**Primary Calculation Flow:**

```typescript
interface QuoteCalculation {
	materialCost: MaterialCost
	laborCost: LaborCost
	prepWorkCost: PrepWorkCost
	complexityModifiers: ComplexityModifiers
	subtotal: number
	total: number
	breakdown: CostBreakdown
}

const calculateQuote = (formData: QuoteFormData, apiData: ApiPricingData): QuoteCalculation => {
	const baseCalculation = {
		materialCost: calculateMaterialCost(formData, apiData.paintProducts),
		laborCost: calculateLaborCost(formData, apiData.regionalPricing),
		prepWorkCost: calculatePrepWork(formData.prepRequirements),
		complexityModifiers: calculateComplexity(formData.surfaceDetails),
	}

	const subtotal =
		baseCalculation.materialCost.total +
		baseCalculation.laborCost.total +
		baseCalculation.prepWorkCost.total

	return {
		...baseCalculation,
		subtotal,
		total: applyModifiers(subtotal, baseCalculation.complexityModifiers),
		breakdown: generateDetailedBreakdown(baseCalculation),
	}
}
```

### Detailed Calculation Components

**1. Material Cost Calculation:**

```typescript
interface MaterialCost {
	gallonsNeeded: number
	paintCost: number
	suppliesCost: number
	primerCost: number
	total: number
}

const calculateMaterialCost = (
	formData: ProjectDetails,
	paintProducts: PaintProduct[]
): MaterialCost => {
	const selectedProduct = paintProducts.find((p) => p.id === formData.selectedProductId)
	const coverage = selectedProduct.coveragePerGallon // from API (350-400 sq ft)
	const paintCost = selectedProduct.pricePerGallon // from API ($20-70)
	const gallonsNeeded = Math.ceil(formData.totalSquareFootage / coverage)

	return {
		gallonsNeeded,
		paintCost: gallonsNeeded * paintCost,
		suppliesCost: gallonsNeeded * 15, // brushes, rollers, drop cloths
		primerCost: formData.needsPrimer ? gallonsNeeded * 25 : 0,
		total:
			gallonsNeeded * paintCost +
			gallonsNeeded * 15 +
			(formData.needsPrimer ? gallonsNeeded * 25 : 0),
	}
}
```

**2. Labor Cost Calculation:**

```typescript
interface LaborCost {
	baseRate: number
	complexityMultiplier: number
	totalHours: number
	total: number
}

const calculateLaborCost = (
	formData: ProjectDetails,
	regionalPricing: RegionalPricing
): LaborCost => {
	const baseLaborRate = regionalPricing.laborRatePerSqFt // from API

	const complexityMultipliers = {
		smooth: 1.0,
		lightly_textured: 1.25,
		heavily_textured: 1.5,
		popcorn: 2.0,
	}

	const prepWorkMultipliers = {
		none: 1.0,
		light: 1.15,
		moderate: 1.35,
		extensive: 1.75,
	}

	const complexityMultiplier =
		complexityMultipliers[formData.wallTexture] * prepWorkMultipliers[formData.prepWorkLevel]

	const totalHours = (formData.totalSquareFootage / 150) * complexityMultiplier // 150 sq ft per hour baseline

	return {
		baseRate: baseLaborRate,
		complexityMultiplier,
		totalHours,
		total: formData.totalSquareFootage * baseLaborRate * complexityMultiplier,
	}
}
```

**3. Complexity and Additional Costs:**

```typescript
const calculateComplexity = (surfaceDetails: SurfaceDetails): ComplexityModifiers => {
	const doorWindowModifier = surfaceDetails.doorCount * 25 + surfaceDetails.windowCount * 15
	const ceilingHeightModifier =
		surfaceDetails.ceilingHeight > 9 ? (surfaceDetails.ceilingHeight - 9) * 50 : 0
	const colorChangeModifier =
		surfaceDetails.colorCount > 1 ? (surfaceDetails.colorCount - 1) * 100 : 0

	return {
		doorWindowModifier,
		ceilingHeightModifier,
		colorChangeModifier,
		total: doorWindowModifier + ceilingHeightModifier + colorChangeModifier,
	}
}
```

### Real-time Calculation Triggers

**Calculation Update Events:**

- **Zip code change** → Regional pricing update → Labor cost recalculation
- **Paint product selection** → Material cost update → Total recalculation
- **Room measurements change** → Coverage calculation → Paint quantity update
- **Prep work level change** → Labor multiplier update → Time estimate change
- **Surface complexity change** → Complexity modifier update → Price adjustment

**Performance Optimization:**

- Debounce calculation updates (300ms delay)
- Memoize expensive calculations with useMemo
- Cache API responses with TanStack Query
- Only recalculate affected cost components

### Quote Generation Output

**Final Quote Structure:**

```typescript
interface QuoteOutput {
	projectSummary: ProjectSummary
	costBreakdown: {
		materials: MaterialCost
		labor: LaborCost
		additionalCosts: ComplexityModifiers
		subtotal: number
		tax: number
		total: number
	}
	timeline: {
		estimatedHours: number
		estimatedDays: number
		startDate: Date
		completionDate: Date
	}
	materials: {
		paintGallons: number
		primerGallons: number
		supplies: string[]
	}
	terms: {
		validUntil: Date
		paymentTerms: string
		warrantyInfo: string
	}
}
```

### Base Pricing Structure (2025 Market Rates)

- **Cost per square foot:** $2.75 - $6.00
- **Labor percentage:** 75-95% of total cost
- **Paint coverage:** 350-400 sq ft per gallon
- **Paint costs:** $20-$70 per gallon

### Calculation Factors

**Primary Variables:**

- Total square footage
- Location (zip code pricing adjustments)
- Paint quality tier multiplier
- Surface complexity (textured walls +50%)
- Prep work requirements
- Number of colors

**Formula Structure:**

```
Base Cost = (Square Footage × Rate per Sq Ft)
Material Cost = (Square Footage ÷ Coverage Rate) × Paint Cost per Gallon
Labor Cost = Base Cost × Labor Percentage
Additional Costs = Prep Work + Complexity Modifiers
Total Estimate = Material Cost + Labor Cost + Additional Costs
```

### Regional Pricing Adjustment

- Implement zip code lookup for regional cost variations
- Apply location-based multipliers to base rates

## Feature Requirements

### Core Functionality

- **Multi-step form progression** with progress indicator
- **Form validation** with real-time feedback
- **Data persistence** across browser sessions
- **Responsive design** for all device sizes
- **Quote calculation engine** with accurate pricing
- **Print functionality** for PDF generation
- **Email functionality** for quote delivery

### User Experience Features

- **Save and resume** capability
- **Form auto-save** to prevent data loss
- **Clear navigation** with back/next buttons
- **Visual progress tracking**
- **Input formatting** and validation helpers
- **Mobile-optimized** interface

### Output Features

- **Detailed quote breakdown**
- **Professional formatting** for print
- **Email template** with company branding
- **Quote validity period** (30 days typical)
- **Terms and conditions** inclusion

## Mock API Setup & Data Integration

### Development Data Strategy

**Primary Tools:**

- **Mockaroo**: Realistic data generation for paint colors, manufacturers, pricing
- **MockAPI.io**: External REST API endpoints with CRUD operations
- **TanStack Query**: Client-side data fetching and caching

### Next.js 15 API Architecture Notes

**API Routes Structure:**

- **App Router (Next.js 15)**: API routes in `/app/api/` folder
- **Pages Router (legacy)**: API routes in `/pages/api/` folder

**For This Calculator:**

- Using MockAPI.io external endpoints - no local API routes needed
- Direct fetch calls from client to MockAPI.io
- Local API routes would be useful later for: authentication, data transformation, rate limiting

**Future Integration Path:**

```typescript
// Development: Direct fetch to MockAPI.io
fetch('https://project.mockapi.io/paint-colors')

// Production: Same pattern with real API
fetch('https://api.rollonpainting.com/paint-colors')
```

### MockAPI.io Data Structure

**Recommended Endpoints:**

1. **`/paint-manufacturers`**

   - Sherwin Williams, Benjamin Moore, Behr, etc.
   - Include brand tier, coverage ratings, price modifiers

2. **`/paint-colors`**

   - Colors with hex codes, popularity ratings
   - Linked to manufacturer IDs
   - Include color complexity cost factors

3. **`/paint-products`**

   - Products with pricing, coverage per gallon, finishes
   - Quality tiers (basic, mid-tier, premium)
   - Special features (eco-friendly, antimicrobial)

4. **`/regional-pricing`**

   - Zip code based pricing adjustments
   - Labor cost modifiers by region
   - Material availability factors

5. **`/saved-quotes`** _(for future authenticated features)_
   - User quote storage and retrieval
   - Quote status tracking

### API Architecture Decision

**Recommended Approach: Direct Client to MockAPI.io**

**Why Direct API Calls:**

- Simpler architecture with fewer moving parts
- Faster response times (no extra server round-trip)
- Realistic pattern that matches production API usage
- TanStack Query optimized for direct external API calls
- Less boilerplate code and maintenance

**No Local API Routes Needed:**

- MockAPI.io provides full REST CRUD operations
- Built-in delays and error simulation
- Realistic data responses with proper HTTP status codes
- Direct client calls prepare codebase for real API migration

### TanStack Query Integration Patterns

**Direct API Custom Hooks:**

```typescript
// Paint manufacturer data - direct to MockAPI.io
export const usePaintManufacturers = () => {
	return useQuery({
		queryKey: ['paint-manufacturers'],
		queryFn: () =>
			fetch('https://your-project.mockapi.io/manufacturers').then((res) => {
				if (!res.ok) throw new Error('Failed to fetch manufacturers')
				return res.json()
			}),
		staleTime: 1000 * 60 * 30, // 30 minutes cache
		retry: 3,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	})
}

// Paint colors by manufacturer
export const usePaintColors = (manufacturerId: string) => {
	return useQuery({
		queryKey: ['paint-colors', manufacturerId],
		queryFn: () =>
			fetch(`https://your-project.mockapi.io/colors?manufacturerId=${manufacturerId}`).then(
				(res) => {
					if (!res.ok) throw new Error('Failed to fetch colors')
					return res.json()
				}
			),
		enabled: !!manufacturerId, // Only fetch when manufacturer selected
		staleTime: 1000 * 60 * 15, // 15 minutes cache
	})
}

// Regional pricing adjustments
export const useRegionalPricing = (zipCode: string) => {
	return useQuery({
		queryKey: ['regional-pricing', zipCode],
		queryFn: () =>
			fetch(`https://your-project.mockapi.io/pricing?zipCode=${zipCode}`).then((res) => {
				if (!res.ok) throw new Error('Failed to fetch regional pricing')
				return res.json()
			}),
		enabled: zipCode?.length === 5,
		staleTime: 1000 * 60 * 60, // 1 hour cache for pricing
	})
}

// Paint products with pricing
export const usePaintProducts = (filters: PaintFilters) => {
	const queryParams = new URLSearchParams(filters).toString()
	return useQuery({
		queryKey: ['paint-products', filters],
		queryFn: () =>
			fetch(`https://your-project.mockapi.io/products?${queryParams}`).then((res) => {
				if (!res.ok) throw new Error('Failed to fetch products')
				return res.json()
			}),
		staleTime: 1000 * 60 * 20, // 20 minutes cache
	})
}
```

### Data Flow Integration

**Form + API Data Integration:**

1. **Step 1**: User enters zip code → Triggers regional pricing query
2. **Step 2**: User selects manufacturer → Triggers paint colors/products queries
3. **Step 3**: Combine form data (Zustand) + API data (TanStack Query) = Quote calculation

**Caching Strategy:**

- Manufacturer/color data: Long cache (30+ minutes)
- Regional pricing: Medium cache (1 hour)
- Product pricing: Shorter cache (20 minutes) for price accuracy
- Form data: Immediate local storage backup (Zustand persist)

**Error Handling:**

- Graceful degradation when API unavailable
- Fallback to cached data when possible
- User-friendly error messages for network issues
- Retry logic with exponential backoff

### Frontend

- **Framework:** Next.js 15 with TypeScript
- **Styling:** Tailwind CSS v4+
- **UI Components:** Shadcn/ui
- **Forms:** React Hook Form with Zod validation
- **State:** Zustand
- **Routing:** Next.js App Router

## Technology Stack Recommendations

### Frontend Framework & Core Libraries

- **Framework:** Next.js 15 with TypeScript
- **Styling:** Tailwind CSS v4+
- **UI Components:** Shadcn/ui
- **Forms:** React Hook Form with Zod validation
- **State:** Zustand for client state, TanStack Query for server state
- **Routing:** Next.js App Router

### Essential Development Tooling

**Code Quality & Formatting:**

- **ESLint**: Code linting with Next.js + TypeScript rules
- **Prettier**: Code formatting with ESLint integration
- **TypeScript**: Strict mode for enhanced type safety
- **Husky**: Git hooks for pre-commit quality checks
- **lint-staged**: Only lint changed files for faster commits

**ESLint Configuration:**

```json
// .eslintrc.json
{
	"extends": ["next/core-web-vitals", "@typescript-eslint/recommended", "prettier"],
	"rules": {
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/explicit-function-return-type": "warn",
		"prefer-const": "error",
		"no-console": "warn"
	}
}
```

**Prettier Configuration:**

```json
// .prettierrc
{
	"semi": false,
	"trailingComma": "es5",
	"singleQuote": true,
	"tabWidth": 2,
	"printWidth": 100,
	"plugins": ["prettier-plugin-tailwindcss"]
}
```

**Development Experience Tools:**

- **@next/bundle-analyzer**: Bundle size analysis for performance optimization
- **cross-env**: Cross-platform environment variable handling
- **@types/node**: Node.js TypeScript definitions
- **@hookform/resolvers**: Zod integration with React Hook Form
- **prettier-plugin-tailwindcss**: Automatic Tailwind class sorting

**Git Workflow Enhancement:**

- **Commitizen**: Standardized commit message formatting
- **@commitlint/cli**: Commit message linting
- **@commitlint/config-conventional**: Conventional commit standards

**Package.json Scripts Setup:**

```json
{
	"scripts": {
		"dev": "next dev",
		"build": "next build",
		"start": "next start",
		"lint": "next lint",
		"lint:fix": "next lint --fix",
		"format": "prettier --write .",
		"format:check": "prettier --check .",
		"type-check": "tsc --noEmit",
		"analyze": "ANALYZE=true npm run build",
		"prepare": "husky install"
	}
}
```

**Husky Git Hooks:**

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

**Lint-staged Configuration:**

```json
// package.json
{
	"lint-staged": {
		"*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
		"*.{json,md,yml,yaml}": ["prettier --write"]
	}
}
```

### Client-Side Libraries

- **PDF Generation:** jsPDF or Puppeteer for quote output
- **Email:** EmailJS for client-side email sending
- **Date/Time:** date-fns for timestamp handling
- **Local Storage:** Browser localStorage API with Zustand persist

### Development & Testing Tools

- **Build Tool:** Next.js built-in (Turbopack in dev mode)
- **Testing:** Vitest + React Testing Library + Playwright
- **Storybook:** Version 8.x with @storybook/nextjs for component documentation
- **Type Checking:** TypeScript strict mode
- **API Mocking:** MSW for development and testing

### Optional Enhanced Development Tools

**Code Quality Enhancement:**

- **@typescript-eslint/eslint-plugin**: Advanced TypeScript linting rules
- **eslint-plugin-react-hooks**: React Hooks linting
- **eslint-plugin-jsx-a11y**: Accessibility linting for JSX

**Performance & Analysis:**

- **@next/third-parties**: Third-party script optimization
- **webpack-bundle-analyzer**: Detailed bundle analysis
- **lighthouse-ci**: Automated performance testing

**Development Workflow:**

- **concurrently**: Run multiple npm scripts simultaneously
- **npm-run-all**: Sequential and parallel script execution
- **dotenv-cli**: Environment variable management in scripts

### Recommended Installation Order

**Phase 1: Core Setup**

```bash
npx create-next-app@latest calculator --typescript --tailwind --eslint --app
cd calculator
npm install @hookform/resolvers react-hook-form zod
npm install @tanstack/react-query zustand
```

**Phase 2: Development Tools**

```bash
npm install -D prettier eslint-config-prettier prettier-plugin-tailwindcss
npm install -D husky lint-staged @commitlint/cli @commitlint/config-conventional
npm install -D @next/bundle-analyzer cross-env
```

**Phase 3: Testing & Storybook**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
npx storybook@latest init
```

**Phase 4: Optional Enhancements**

```bash
npm install -D commitizen @typescript-eslint/eslint-plugin
npm install date-fns jspdf emailjs-com
```

## Development Timeline

### Phase 1: Foundation (Week 1-2)

- Project setup and configuration
- Basic component structure
- Form architecture implementation
- State management setup
- **TODO:** Accessibility foundation setup
- **TODO:** Error handling framework setup

### Phase 2: Form Implementation (Week 3-4)

- Section 1: Project Details form
- Section 2: Paint Specifications form
- Form validation and error handling
- Multi-step navigation
- **TODO:** Accessibility testing integration

### Phase 3: Calculation Engine (Week 5)

- Pricing calculation logic
- Quote generation system
- Cost breakdown display
- Testing with various scenarios
- **TODO:** Error handling for calculation failures

### Phase 4: Output Features (Week 6)

- Print functionality implementation
- Email quote system
- PDF generation
- Professional quote formatting

### Phase 5: Polish & Testing (Week 7-8)

- UI/UX refinements
- Mobile responsiveness
- Cross-browser testing
- Performance optimization
- User acceptance testing
- **TODO:** Comprehensive accessibility audit
- **TODO:** Error handling validation

## Success Metrics

### User Experience

- **Form completion rate:** >80%
- **Time to complete:** <5 minutes average
- **Mobile usability:** Full functionality on mobile devices
- **Error rate:** <5% validation errors
- **TODO:** Accessibility compliance score
- **TODO:** Error recovery success rate

### Business Value

- **Quote accuracy:** Within 15% of professional estimates
- **Lead conversion:** Track email quote requests
- **User satisfaction:** Positive feedback on usability

## Risk Mitigation

### Technical Risks

- **Browser compatibility:** Test across major browsers
- **Performance:** Optimize for slow connections
- **Data loss:** Implement robust auto-save functionality
- **TODO:** Accessibility compliance risks
- **TODO:** Error handling coverage gaps

### Business Risks

- **Pricing accuracy:** Regular market rate updates needed
- **Regional variations:** Comprehensive zip code data required
- **Competition:** Monitor market for pricing competitiveness

## Future Enhancements

### Potential Features

- **Photo upload** for room condition assessment
- **3D room visualization** integration
- **Material cost calculator** with supplier pricing
- **Appointment scheduling** system
- **Customer account** creation and quote history
- **Multi-language support**
- **Integration** with CRM systems

## Development Guidelines

### Code Standards

- Follow React/Next.js best practices
- Implement TypeScript strict mode
- Use meaningful component and variable names
- Write comprehensive unit tests
- Document complex calculation logic
- **TODO:** Accessibility coding standards
- **TODO:** Error handling patterns

### Performance Requirements

- Page load time <3 seconds
- Form response time <500ms
- Mobile-first responsive design
- Accessibility compliance (WCAG 2.1)
- **TODO:** Error handling performance impact

### Security Considerations

- Validate all user inputs
- Sanitize data before processing
- Secure email transmission
- No sensitive data storage in browser
- HTTPS enforcement for production

## Conclusion

This planning document provides a comprehensive roadmap for building a professional painting quote
calculator. The multi-step form approach will create an excellent user experience while the robust
calculation engine ensures accurate estimates. The modular architecture allows for future
enhancements and integrations as the business grows.

The focus on client-side functionality ensures fast performance and reduces server costs while still
providing professional-quality quotes that can drive business growth for the painting company.

## TODO Checklist

- [ ] Define comprehensive data validation schemas
- [ ] Create detailed error handling strategy
- [ ] Develop accessibility implementation plan
- [ ] Design testing strategy and coverage targets
- [ ] Set up error logging and monitoring approach
- [ ] Create accessibility testing procedures
- [ ] Define performance benchmarks for error handling
- [ ] Document coding standards for accessibility and errors) await
      expect(page.locator('[data-testid="material-cost"]')).toBeVisible() await
      expect(page.locator('[data-testid="labor-cost"]')).toBeVisible() })

````

**Level 5: Storybook Testing (Visual & Interaction)**
```typescript
// Example: Component interaction story
export const FormWithValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test form validation
    await userEvent.click(canvas.getByRole('button', { name: /next/i }))

    // Check error states appear
    await expect(canvas.getByText(/zip code is required/i)).toBeInTheDocument()

    // Fill valid data and check success state
    await userEvent.type(canvas.getByLabelText(/zip code/i), '12345')
    await expect(canvas.getByLabelText(/zip code/i)).toHaveClass('border-green-500')
  }
}
````

### Test Coverage Targets

**Unit Tests Coverage: 90%+**

- All pricing calculation functions
- Form validation logic
- Utility functions and helpers

**Component Tests Coverage: 80%+**

- All form components and their states
- Navigation logic and step management
- Error handling and user feedback

**Integration Tests Coverage: 60%+**

- API data fetching and caching
- State management between components
- Real-time price calculation updates

**Critical Test Cases Priority:**

**Must Have:**

- Pricing calculation accuracy across all scenarios
- Form validation prevents invalid submissions
- Step navigation works correctly
- API integration handles errors gracefully

**Should Have:**

- Responsive design testing
- Accessibility compliance testing
- Performance testing for large datasets
- Cross-browser compatibility (manual initially)

**Nice to Have:**

- Visual regression testing
- Load testing with multiple users
- Edge case scenario testing

## Component Implementation Strategy

### 3-Step Form Component Architecture

**Component Data Flow Pattern:**

```typescript
// Main Calculator Container
CalculatorApp
├── CalculatorHeader (progress indicator, save status)
├── FormProvider (React Hook Form context)
├── CalculatorForm
│   ├── StepOne: ProjectDetailsForm
│   │   ├── LocationInput (triggers useRegionalPricing on zip code entry)
│   │   ├── RoomMeasurements (calculates base square footage)
│   │   ├── SurfaceDetails (doors, windows, texture complexity)
│   │   └── PrepWorkSection (updates complexity modifiers)
│   ├── StepTwo: PaintSpecificationsForm
│   │   ├── ManufacturerSelector (uses usePaintManufacturers)
│   │   ├── ColorSelector (uses usePaintColors when manufacturer selected)
│   │   ├── ProductSelector (uses usePaintProducts with filters)
│   │   ├── QualityTierSelector (affects final pricing calculation)
│   │   └── SpecialFeatures (eco-friendly, antimicrobial options)
│   └── StepThree: QuoteReviewForm
│       ├── CostBreakdown (combines form data + API pricing)
│       ├── TimelineEstimate (calculated from project complexity)
│       ├── MaterialsList (paint quantities and supplies)
│       └── OutputActions (print/email functionality)
├── NavigationControls (back/next/save buttons)
├── PricePreview (sticky sidebar with running total)
└── FormErrorBoundary (error handling wrapper)
```

### Component Integration Patterns

**API Data Integration Points:**

- **Form state (Zustand)** triggers API calls based on user selections
- **API data** populates dropdowns and affects real-time calculations
- **Price updates** immediately reflect user specification changes
- **Validation** includes API data constraints (available colors, valid zip codes)

**State Management Flow:**

```typescript
// User Input → Zustand Store → Triggers TanStack Query → Updates UI
LocationInput onChange → updateProjectDetails → useRegionalPricing → PricePreview update
ManufacturerSelect → updatePaintSpecs → usePaintColors → ColorSelector options
```

### Form Step Dependencies

**Step 1 → Step 2 Dependencies:**

- Zip code determines available regional paint options
- Square footage affects paint quantity calculations
- Surface complexity influences product recommendations

**Step 2 → Step 3 Dependencies:**

- Paint selection determines material costs
- Quality tier affects labor pricing multipliers
- Color count impacts complexity and timeline

## Pricing Calculation Engine

### Core Calculation Architecture

**Primary Calculation Flow:**

```typescript
interface QuoteCalculation {
	materialCost: MaterialCost
	laborCost: LaborCost
	prepWorkCost: PrepWorkCost
	complexityModifiers: ComplexityModifiers
	subtotal: number
	total: number
	breakdown: CostBreakdown
}

const calculateQuote = (formData: QuoteFormData, apiData: ApiPricingData): QuoteCalculation => {
	const baseCalculation = {
		materialCost: calculateMaterialCost(formData, apiData.paintProducts),
		laborCost: calculateLaborCost(formData, apiData.regionalPricing),
		prepWorkCost: calculatePrepWork(formData.prepRequirements),
		complexityModifiers: calculateComplexity(formData.surfaceDetails),
	}

	const subtotal =
		baseCalculation.materialCost.total +
		baseCalculation.laborCost.total +
		baseCalculation.prepWorkCost.total

	return {
		...baseCalculation,
		subtotal,
		total: applyModifiers(subtotal, baseCalculation.complexityModifiers),
		breakdown: generateDetailedBreakdown(baseCalculation),
	}
}
```

### Detailed Calculation Components

**1. Material Cost Calculation:**

```typescript
interface MaterialCost {
	gallonsNeeded: number
	paintCost: number
	suppliesCost: number
	primerCost: number
	total: number
}

const calculateMaterialCost = (
	formData: ProjectDetails,
	paintProducts: PaintProduct[]
): MaterialCost => {
	const selectedProduct = paintProducts.find((p) => p.id === formData.selectedProductId)
	const coverage = selectedProduct.coveragePerGallon // from API (350-400 sq ft)
	const paintCost = selectedProduct.pricePerGallon // from API ($20-70)
	const gallonsNeeded = Math.ceil(formData.totalSquareFootage / coverage)

	return {
		gallonsNeeded,
		paintCost: gallonsNeeded * paintCost,
		suppliesCost: gallonsNeeded * 15, // brushes, rollers, drop cloths
		primerCost: formData.needsPrimer ? gallonsNeeded * 25 : 0,
		total:
			gallonsNeeded * paintCost +
			gallonsNeeded * 15 +
			(formData.needsPrimer ? gallonsNeeded * 25 : 0),
	}
}
```

**2. Labor Cost Calculation:**

```typescript
interface LaborCost {
	baseRate: number
	complexityMultiplier: number
	totalHours: number
	total: number
}

const calculateLaborCost = (
	formData: ProjectDetails,
	regionalPricing: RegionalPricing
): LaborCost => {
	const baseLaborRate = regionalPricing.laborRatePerSqFt // from API

	const complexityMultipliers = {
		smooth: 1.0,
		lightly_textured: 1.25,
		heavily_textured: 1.5,
		popcorn: 2.0,
	}

	const prepWorkMultipliers = {
		none: 1.0,
		light: 1.15,
		moderate: 1.35,
		extensive: 1.75,
	}

	const complexityMultiplier =
		complexityMultipliers[formData.wallTexture] * prepWorkMultipliers[formData.prepWorkLevel]

	const totalHours = (formData.totalSquareFootage / 150) * complexityMultiplier // 150 sq ft per hour baseline

	return {
		baseRate: baseLaborRate,
		complexityMultiplier,
		totalHours,
		total: formData.totalSquareFootage * baseLaborRate * complexityMultiplier,
	}
}
```

**3. Complexity and Additional Costs:**

```typescript
const calculateComplexity = (surfaceDetails: SurfaceDetails): ComplexityModifiers => {
	const doorWindowModifier = surfaceDetails.doorCount * 25 + surfaceDetails.windowCount * 15
	const ceilingHeightModifier =
		surfaceDetails.ceilingHeight > 9 ? (surfaceDetails.ceilingHeight - 9) * 50 : 0
	const colorChangeModifier =
		surfaceDetails.colorCount > 1 ? (surfaceDetails.colorCount - 1) * 100 : 0

	return {
		doorWindowModifier,
		ceilingHeightModifier,
		colorChangeModifier,
		total: doorWindowModifier + ceilingHeightModifier + colorChangeModifier,
	}
}
```

### Real-time Calculation Triggers

**Calculation Update Events:**

- **Zip code change** → Regional pricing update → Labor cost recalculation
- **Paint product selection** → Material cost update → Total recalculation
- **Room measurements change** → Coverage calculation → Paint quantity update
- **Prep work level change** → Labor multiplier update → Time estimate change
- **Surface complexity change** → Complexity modifier update → Price adjustment

**Performance Optimization:**

- Debounce calculation updates (300ms delay)
- Memoize expensive calculations with useMemo
- Cache API responses with TanStack Query
- Only recalculate affected cost components

### Quote Generation Output

**Final Quote Structure:**

```typescript
interface QuoteOutput {
	projectSummary: ProjectSummary
	costBreakdown: {
		materials: MaterialCost
		labor: LaborCost
		additionalCosts: ComplexityModifiers
		subtotal: number
		tax: number
		total: number
	}
	timeline: {
		estimatedHours: number
		estimatedDays: number
		startDate: Date
		completionDate: Date
	}
	materials: {
		paintGallons: number
		primerGallons: number
		supplies: string[]
	}
	terms: {
		validUntil: Date
		paymentTerms: string
		warrantyInfo: string
	}
}
```

### Base Pricing Structure (2025 Market Rates)

- **Cost per square foot:** $2.75 - $6.00
- **Labor percentage:** 75-95% of total cost
- **Paint coverage:** 350-400 sq ft per gallon
- **Paint costs:** $20-$70 per gallon

### Calculation Factors

**Primary Variables:**

- Total square footage
- Location (zip code pricing adjustments)
- Paint quality tier multiplier
- Surface complexity (textured walls +50%)
- Prep work requirements
- Number of colors

**Formula Structure:**

```
Base Cost = (Square Footage × Rate per Sq Ft)
Material Cost = (Square Footage ÷ Coverage Rate) × Paint Cost per Gallon
Labor Cost = Base Cost × Labor Percentage
Additional Costs = Prep Work + Complexity Modifiers
Total Estimate = Material Cost + Labor Cost + Additional Costs
```

### Regional Pricing Adjustment

- Implement zip code lookup for regional cost variations
- Apply location-based multipliers to base rates

## Feature Requirements

### Core Functionality

- **Multi-step form progression** with progress indicator
- **Form validation** with real-time feedback
- **Data persistence** across browser sessions
- **Responsive design** for all device sizes
- **Quote calculation engine** with accurate pricing
- **Print functionality** for PDF generation
- **Email functionality** for quote delivery

### User Experience Features

- **Save and resume** capability
- **Form auto-save** to prevent data loss
- **Clear navigation** with back/next buttons
- **Visual progress tracking**
- **Input formatting** and validation helpers
- **Mobile-optimized** interface

### Output Features

- **Detailed quote breakdown**
- **Professional formatting** for print
- **Email template** with company branding
- **Quote validity period** (30 days typical)
- **Terms and conditions** inclusion

## Mock API Setup & Data Integration

### Development Data Strategy

**Primary Tools:**

- **Mockaroo**: Realistic data generation for paint colors, manufacturers, pricing
- **MockAPI.io**: External REST API endpoints with CRUD operations
- **TanStack Query**: Client-side data fetching and caching

### Next.js 15 API Architecture Notes

**API Routes Structure:**

- **App Router (Next.js 15)**: API routes in `/app/api/` folder
- **Pages Router (legacy)**: API routes in `/pages/api/` folder

**For This Calculator:**

- Using MockAPI.io external endpoints - no local API routes needed
- Direct fetch calls from client to MockAPI.io
- Local API routes would be useful later for: authentication, data transformation, rate limiting

**Future Integration Path:**

```typescript
// Development: Direct fetch to MockAPI.io
fetch('https://project.mockapi.io/paint-colors')

// Production: Same pattern with real API
fetch('https://api.rollonpainting.com/paint-colors')
```

### MockAPI.io Data Structure

**Recommended Endpoints:**

1. **`/paint-manufacturers`**

   - Sherwin Williams, Benjamin Moore, Behr, etc.
   - Include brand tier, coverage ratings, price modifiers

2. **`/paint-colors`**

   - Colors with hex codes, popularity ratings
   - Linked to manufacturer IDs
   - Include color complexity cost factors

3. **`/paint-products`**

   - Products with pricing, coverage per gallon, finishes
   - Quality tiers (basic, mid-tier, premium)
   - Special features (eco-friendly, antimicrobial)

4. **`/regional-pricing`**

   - Zip code based pricing adjustments
   - Labor cost modifiers by region
   - Material availability factors

5. **`/saved-quotes`** _(for future authenticated features)_
   - User quote storage and retrieval
   - Quote status tracking

### API Architecture Decision

**Recommended Approach: Direct Client to MockAPI.io**

**Why Direct API Calls:**

- Simpler architecture with fewer moving parts
- Faster response times (no extra server round-trip)
- Realistic pattern that matches production API usage
- TanStack Query optimized for direct external API calls
- Less boilerplate code and maintenance

**No Local API Routes Needed:**

- MockAPI.io provides full REST CRUD operations
- Built-in delays and error simulation
- Realistic data responses with proper HTTP status codes
- Direct client calls prepare codebase for real API migration

### TanStack Query Integration Patterns

**Direct API Custom Hooks:**

```typescript
// Paint manufacturer data - direct to MockAPI.io
export const usePaintManufacturers = () => {
	return useQuery({
		queryKey: ['paint-manufacturers'],
		queryFn: () =>
			fetch('https://your-project.mockapi.io/manufacturers').then((res) => {
				if (!res.ok) throw new Error('Failed to fetch manufacturers')
				return res.json()
			}),
		staleTime: 1000 * 60 * 30, // 30 minutes cache
		retry: 3,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	})
}

// Paint colors by manufacturer
export const usePaintColors = (manufacturerId: string) => {
	return useQuery({
		queryKey: ['paint-colors', manufacturerId],
		queryFn: () =>
			fetch(`https://your-project.mockapi.io/colors?manufacturerId=${manufacturerId}`).then(
				(res) => {
					if (!res.ok) throw new Error('Failed to fetch colors')
					return res.json()
				}
			),
		enabled: !!manufacturerId, // Only fetch when manufacturer selected
		staleTime: 1000 * 60 * 15, // 15 minutes cache
	})
}

// Regional pricing adjustments
export const useRegionalPricing = (zipCode: string) => {
	return useQuery({
		queryKey: ['regional-pricing', zipCode],
		queryFn: () =>
			fetch(`https://your-project.mockapi.io/pricing?zipCode=${zipCode}`).then((res) => {
				if (!res.ok) throw new Error('Failed to fetch regional pricing')
				return res.json()
			}),
		enabled: zipCode?.length === 5,
		staleTime: 1000 * 60 * 60, // 1 hour cache for pricing
	})
}

// Paint products with pricing
export const usePaintProducts = (filters: PaintFilters) => {
	const queryParams = new URLSearchParams(filters).toString()
	return useQuery({
		queryKey: ['paint-products', filters],
		queryFn: () =>
			fetch(`https://your-project.mockapi.io/products?${queryParams}`).then((res) => {
				if (!res.ok) throw new Error('Failed to fetch products')
				return res.json()
			}),
		staleTime: 1000 * 60 * 20, // 20 minutes cache
	})
}
```

### Data Flow Integration

**Form + API Data Integration:**

1. **Step 1**: User enters zip code → Triggers regional pricing query
2. **Step 2**: User selects manufacturer → Triggers paint colors/products queries
3. **Step 3**: Combine form data (Zustand) + API data (TanStack Query) = Quote calculation

**Caching Strategy:**

- Manufacturer/color data: Long cache (30+ minutes)
- Regional pricing: Medium cache (1 hour)
- Product pricing: Shorter cache (20 minutes) for price accuracy
- Form data: Immediate local storage backup (Zustand persist)

**Error Handling:**

- Graceful degradation when API unavailable
- Fallback to cached data when possible
- User-friendly error messages for network issues
- Retry logic with exponential backoff

### Frontend

- **Framework:** Next.js 15 with TypeScript
- **Styling:** Tailwind CSS v4+
- **UI Components:** Shadcn/ui
- **Forms:** React Hook Form with Zod validation
- **State:** Zustand
- **Routing:** Next.js App Router

### Client-Side Libraries

- **PDF Generation:** jsPDF or Puppeteer
- **Email:** EmailJS for client-side email sending
- **Validation:** Zod schema validation
- **Date/Time:** date-fns for timestamp handling
- **Local Storage:** Browser localStorage API

### Development Tools

- **Build Tool:** Next.js built-in (Turbopack)
- **Testing:** Vitest + React Testing Library + Playwright
- **Linting:** ESLint + Prettier
- **Type Checking:** TypeScript strict mode

## Development Timeline

### Phase 1: Foundation (Week 1-2)

- Project setup and configuration
- Basic component structure
- Form architecture implementation
- State management setup
- **TODO:** Accessibility foundation setup
- **TODO:** Error handling framework setup

### Phase 2: Form Implementation (Week 3-4)

- Section 1: Project Details form
- Section 2: Paint Specifications form
- Form validation and error handling
- Multi-step navigation
- **TODO:** Accessibility testing integration

### Phase 3: Calculation Engine (Week 5)

- Pricing calculation logic
- Quote generation system
- Cost breakdown display
- Testing with various scenarios
- **TODO:** Error handling for calculation failures

### Phase 4: Output Features (Week 6)

- Print functionality implementation
- Email quote system
- PDF generation
- Professional quote formatting

### Phase 5: Polish & Testing (Week 7-8)

- UI/UX refinements
- Mobile responsiveness
- Cross-browser testing
- Performance optimization
- User acceptance testing
- **TODO:** Comprehensive accessibility audit
- **TODO:** Error handling validation

## Success Metrics

### User Experience

- **Form completion rate:** >80%
- **Time to complete:** <5 minutes average
- **Mobile usability:** Full functionality on mobile devices
- **Error rate:** <5% validation errors
- **TODO:** Accessibility compliance score
- **TODO:** Error recovery success rate

### Business Value

- **Quote accuracy:** Within 15% of professional estimates
- **Lead conversion:** Track email quote requests
- **User satisfaction:** Positive feedback on usability

## Risk Mitigation

### Technical Risks

- **Browser compatibility:** Test across major browsers
- **Performance:** Optimize for slow connections
- **Data loss:** Implement robust auto-save functionality
- **TODO:** Accessibility compliance risks
- **TODO:** Error handling coverage gaps

### Business Risks

- **Pricing accuracy:** Regular market rate updates needed
- **Regional variations:** Comprehensive zip code data required
- **Competition:** Monitor market for pricing competitiveness

## Future Enhancements

### Potential Features

- **Photo upload** for room condition assessment
- **3D room visualization** integration
- **Material cost calculator** with supplier pricing
- **Appointment scheduling** system
- **Customer account** creation and quote history
- **Multi-language support**
- **Integration** with CRM systems

## Development Guidelines

### Code Standards

- Follow React/Next.js best practices
- Implement TypeScript strict mode
- Use meaningful component and variable names
- Write comprehensive unit tests
- Document complex calculation logic
- **TODO:** Accessibility coding standards
- **TODO:** Error handling patterns

### Performance Requirements

- Page load time <3 seconds
- Form response time <500ms
- Mobile-first responsive design
- Accessibility compliance (WCAG 2.1)
- **TODO:** Error handling performance impact

### Security Considerations

- Validate all user inputs
- Sanitize data before processing
- Secure email transmission
- No sensitive data storage in browser
- HTTPS enforcement for production

## Conclusion

This planning document provides a comprehensive roadmap for building a professional painting quote
calculator. The multi-step form approach will create an excellent user experience while the robust
calculation engine ensures accurate estimates. The modular architecture allows for future
enhancements and integrations as the business grows.

The focus on client-side functionality ensures fast performance and reduces server costs while still
providing professional-quality quotes that can drive business growth for the painting company.

## TODO Checklist

- [ ] Define comprehensive data validation schemas
- [ ] Create detailed error handling strategy
- [ ] Develop accessibility implementation plan
- [ ] Design testing strategy and coverage targets
- [ ] Set up error logging and monitoring approach
- [ ] Create accessibility testing procedures
- [ ] Define performance benchmarks for error handling
- [ ] Document coding standards for accessibility and errors
