# Template Development Guide

A comprehensive guide for creating professional proposal templates in the Propozzals system.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Quick Start](#quick-start)
3. [Template Structure](#template-structure)
4. [Data Processing](#data-processing)
5. [Styling Guidelines](#styling-guidelines)
6. [Testing Templates](#testing-templates)
7. [Best Practices](#best-practices)
8. [Common Pitfalls](#common-pitfalls)
9. [Examples](#examples)

## Architecture Overview

### How Templates Work

The Propozzals system uses a **shared data processing architecture** where:

1. **Raw user data** enters the template system
2. **Shared data processor** (`src/templates/shared/dataProcessor.js`) transforms raw data into structured format
3. **Template components** focus purely on rendering and styling
4. **AutoPager system** handles page breaks and pagination

```
Raw Data → Data Processor → Template Component → Rendered Proposal
```

### Benefits of This Architecture

- ✅ **No code duplication** - data logic written once
- ✅ **Consistent behavior** - all templates handle data identically
- ✅ **Easy maintenance** - change data format in one place
- ✅ **Better testing** - separate data processing from rendering
- ✅ **Clear separation** - templates focus on design only

## Quick Start

### 1. Create Template Directory

```bash
mkdir src/templates/your-template-name
cd src/templates/your-template-name
```

### 2. Create Component.jsx

```javascript
// Your Template Name – Brief description of design style
import { processProposalData } from '../shared/dataProcessor.js';

export function buildSections(rawData) {
  const {
    company,
    client,
    scopeParagraphs,
    items,
    total,
    valid,
    termsParagraphs,
    currentDate,
    proposalId
  } = processProposalData(rawData);

  const sections = [];

  // Add your sections here...

  return sections;
}
```

### 3. Register Template

Add your template to `src/lib/templates.js`:

```javascript
import { buildSections as yourTemplateName } from '../templates/your-template-name/Component.jsx';

export const templates = {
  // ... existing templates
  'your-template-name': {
    name: 'Your Template Name',
    description: 'Brief description',
    buildSections: yourTemplateName,
  }
};
```

## Template Structure

### Required Sections

Every template MUST include these sections with appropriate `key` attributes:

#### 1. Header Section (`key="head"`)

```javascript
sections.push(
  <section key="head">
    <div className="header-content">
      <h1>{company}</h1>
      <p>Client: {client}</p>
      <p>Date: {currentDate}</p>
      <p>ID: #{proposalId}</p>
    </div>
  </section>
);
```

#### 2. Scope Section(s) (`key="scope-title"`, `key="scope-${i}"`)

```javascript
// Section title
sections.push(
  <section key="scope-title">
    <h2>Project Overview</h2>
  </section>
);

// Handle scope content
if (scopeParagraphs.length) {
  scopeParagraphs.forEach((paragraph, i) => {
    sections.push(
      <section key={`scope-${i}`}>
        <p className="whitespace-pre-wrap">{paragraph}</p>
      </section>
    );
  });
} else {
  // Empty state
  sections.push(
    <section key="scope-empty">
      <div className="empty-state">
        <p>Project scope details to be defined</p>
      </div>
    </section>
  );
}
```

#### 3. Pricing Section (`key="pricing"`)

```javascript
sections.push(
  <section key="pricing" className="avoid-break">
    <h2>Investment Summary</h2>
    
    {items.length ? (
      <div className="pricing-table">
        {items.map((item, i) => (
          <div key={i} className="pricing-item">
            <span>{item.name}</span>
            <span>{item.price}</span>
          </div>
        ))}
        <div className="total">
          <span>Total: {total} €</span>
        </div>
      </div>
    ) : (
      <div className="empty-state">
        <p>Add investment items like: <code>Strategic Consulting — 5,000€</code></p>
      </div>
    )}
    
    <div className="validity">
      <span>Valid until: {valid}</span>
    </div>
  </section>
);
```

#### 4. Terms Section (`key="terms"`)

```javascript
sections.push(
  <section key="terms">
    <h2>Terms & Conditions</h2>
    
    {termsParagraphs.length ? (
      <div className="terms-content">
        {termsParagraphs.map((paragraph, i) => (
          <div key={i}>
            <p className="whitespace-pre-wrap">{paragraph}</p>
          </div>
        ))}
      </div>
    ) : (
      <div className="default-terms">
        {/* Default terms fallback */}
        <div>
          <h3>Payment Structure</h3>
          <p>50% retainer required upon agreement...</p>
        </div>
        {/* ... more default terms */}
      </div>
    )}
  </section>
);
```

## Data Processing

### Available Data Fields

The `processProposalData()` function provides these processed fields:

```javascript
const {
  // Basic Info
  company,          // string: "Your Company" (fallback)
  client,           // string: "Client Name" (fallback)
  
  // Content
  scopeParagraphs,  // string[]: Parsed scope paragraphs
  termsParagraphs,  // string[]: Parsed terms paragraphs
  
  // Pricing
  items,           // object[]: [{name: string, price: string}]
  total,           // string: "5,000" 
  valid,           // string: "2024-12-31"
  
  // Auto-generated
  currentDate,     // string: "January 15, 2024"
  proposalId       // string: "A1B2C3D4"
} = processProposalData(rawData);
```

### Data Format Expectations

#### Scope Input Format
```
First paragraph content here.

Second paragraph content here with more details.

Third paragraph with additional information.
```

#### Items Input Format
```
Web Development — 5,000€
UI/UX Design — 2,500€
Project Management - 1,500€
```

#### Terms Input Format
```
Payment terms and conditions paragraph here.

Timeline and delivery expectations paragraph here.

Revision policy and scope changes paragraph here.
```

### Custom Data Processing

If you need template-specific data processing, extend the shared processor:

```javascript
import { processProposalData } from '../shared/dataProcessor.js';

export function buildSections(rawData) {
  const baseData = processProposalData(rawData);
  
  // Add custom processing
  const customData = {
    ...baseData,
    subtotal: calculateSubtotal(baseData.items),
    categorizedItems: groupItemsByCategory(baseData.items)
  };
  
  // Use customData in your template...
}
```

## Styling Guidelines

### Required CSS Classes

#### Print Support (CRITICAL)
All templates MUST include print-specific styles:

```javascript
// Responsive sizing
className="text-xl font-bold print:text-lg"

// Responsive spacing
className="mb-6 print:mb-4"
className="px-6 py-4 print:px-4 print:py-3"

// Print visibility
className="print:hidden"        // Hide on print
className="print:block"         // Show only on print

// Page breaks
className="avoid-break"         // Prevent breaking this section
```

#### Required Classes for AutoPager
```javascript
className="avoid-break"    // Prevents section from breaking across pages
className="whitespace-pre-wrap"  // Preserves line breaks in content
```

### Design Principles

#### 1. Mobile-First Responsive Design
```javascript
// ✅ Good
className="text-sm md:text-base lg:text-lg print:text-xs"

// ❌ Bad
className="text-lg"  // Not responsive
```

#### 2. Print Optimization
```javascript
// ✅ Good
className="bg-blue-50 print:bg-gray-100 print:border"

// ❌ Bad
className="bg-gradient-to-r from-blue-500 to-purple-600"  // Won't print well
```

#### 3. Consistent Typography Scale
```javascript
// Use consistent hierarchy
h1: "text-3xl font-bold print:text-2xl"
h2: "text-2xl font-semibold print:text-xl"
h3: "text-lg font-medium print:text-base"
body: "text-base print:text-sm"
small: "text-sm print:text-xs"
```

## Testing Templates

### 1. Local Development Testing

```bash
cd frontend
npm run dev
```

Navigate to `http://localhost:5173` and test your template with:
- ✅ Empty data (all fields blank)
- ✅ Partial data (some fields filled)
- ✅ Full data (all fields populated)
- ✅ Long content (test pagination)

### 2. Print Testing

1. Open browser dev tools (F12)
2. Toggle device toolbar
3. Select "Print" mode
4. Verify:
   - ✅ Colors work in print
   - ✅ Page breaks look good
   - ✅ Content doesn't overflow
   - ✅ Print-specific styles applied

### 3. Responsive Testing

Test at different screen sizes:
- ✅ Mobile (375px)
- ✅ Tablet (768px) 
- ✅ Desktop (1024px+)

### 4. Cross-Browser Testing

Test in:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Best Practices

### ✅ Do

1. **Use shared data processor** - Never duplicate data parsing logic
2. **Include all required sections** - Header, scope, pricing, terms
3. **Handle empty states** - Provide helpful placeholders
4. **Use semantic HTML** - `<section>`, `<h1>-<h6>`, `<p>`, etc.
5. **Optimize for print** - Include print-specific styles
6. **Test thoroughly** - Empty, partial, and full data scenarios
7. **Follow naming conventions** - Use descriptive class names
8. **Document your design** - Add comments explaining complex styling

### ❌ Don't

1. **Don't duplicate data processing** - Always use shared processor
2. **Don't hardcode dates/IDs** - Use provided `currentDate` and `proposalId`
3. **Don't ignore print styles** - Templates must work in print
4. **Don't use complex animations** - They don't print and hurt performance
5. **Don't hardcode colors in gradients** - Use solid colors for print compatibility
6. **Don't forget empty states** - Always handle missing data gracefully
7. **Don't use inline styles** - Use Tailwind classes for consistency
8. **Don't skip responsive design** - Templates must work on all devices

## Common Pitfalls

### 1. Missing Print Styles
```javascript
// ❌ Bad - No print styles
<div className="bg-blue-100 p-8 text-lg">

// ✅ Good - Include print styles  
<div className="bg-blue-100 print:bg-gray-100 print:border p-8 print:p-4 text-lg print:text-base">
```

### 2. Hardcoded Dynamic Values
```javascript
// ❌ Bad - Hardcoded date
<p>{new Date().toLocaleDateString()}</p>

// ✅ Good - Use processed data
<p>{currentDate}</p>
```

### 3. Missing Empty States
```javascript
// ❌ Bad - No empty state handling
{items.map(item => <div>{item.name}</div>)}

// ✅ Good - Handle empty states
{items.length ? (
  items.map(item => <div>{item.name}</div>)
) : (
  <div>No items added yet</div>
)}
```

### 4. Incorrect Section Keys
```javascript
// ❌ Bad - Generic/missing keys
<section>
<section key="content">

// ✅ Good - Specific, consistent keys
<section key="head">
<section key="scope-0">
<section key="pricing">
```

### 5. Breaking Page Flow
```javascript
// ❌ Bad - Large sections without break control
<section>
  <div className="h-screen">Large content</div>
</section>

// ✅ Good - Use avoid-break for important sections
<section key="pricing" className="avoid-break">
  <div>Important content that shouldn't break</div>
</section>
```

## Examples

### Minimal Template Example

```javascript
import { processProposalData } from '../shared/dataProcessor.js';

export function buildSections(rawData) {
  const {
    company,
    client,
    scopeParagraphs,
    items,
    total,
    valid,
    termsParagraphs,
    currentDate,
    proposalId
  } = processProposalData(rawData);

  const sections = [];

  // Simple header
  sections.push(
    <section key="head">
      <div className="border-b pb-6 mb-8 print:pb-4 print:mb-6">
        <div className="flex justify-between items-baseline">
          <h1 className="text-2xl font-light print:text-xl">{company}</h1>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wide text-gray-600">Proposal</div>
            <div className="text-xs text-gray-500">#{proposalId}</div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between text-sm print:text-xs">
          <span>Client: {client}</span>
          <span>Date: {currentDate}</span>
        </div>
      </div>
    </section>
  );

  // Scope section
  sections.push(
    <section key="scope-title">
      <h2 className="text-xl font-medium mb-4 print:text-lg print:mb-3">Project Overview</h2>
    </section>
  );

  if (scopeParagraphs.length) {
    scopeParagraphs.forEach((p, i) => {
      sections.push(
        <section key={`scope-${i}`}>
          <p className="whitespace-pre-wrap mb-4 print:mb-3 text-gray-700 leading-relaxed">{p}</p>
        </section>
      );
    });
  } else {
    sections.push(
      <section key="scope-empty">
        <div className="border-2 border-dashed border-gray-300 p-6 text-center print:p-4">
          <p className="text-gray-500 text-sm print:text-xs">Project scope details to be defined</p>
        </div>
      </section>
    );
  }

  // Pricing section
  sections.push(
    <section key="pricing" className="avoid-break">
      <h2 className="text-xl font-medium mb-4 print:text-lg print:mb-3">Investment</h2>
      
      {items.length ? (
        <div className="border border-gray-200 print:border-gray-400">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between p-3 border-b border-gray-100 last:border-b-0 print:p-2">
              <span className="text-gray-900">{item.name}</span>
              <span className="font-medium">{item.price}</span>
            </div>
          ))}
          <div className="bg-gray-50 p-3 flex justify-between font-medium print:bg-gray-200 print:p-2">
            <span>Total</span>
            <span>{total} €</span>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 p-8 text-center print:p-4">
          <p className="text-gray-500 text-sm print:text-xs">
            Add items like: <code className="bg-gray-100 px-2 py-1 rounded print:bg-gray-200">Service — 1,000€</code>
          </p>
        </div>
      )}
      
      {valid && (
        <p className="text-sm text-gray-600 mt-4 print:text-xs print:mt-3">Valid until: {valid}</p>
      )}
    </section>
  );

  // Terms section
  sections.push(
    <section key="terms">
      <h2 className="text-xl font-medium mb-4 print:text-lg print:mb-3">Terms & Conditions</h2>
      
      {termsParagraphs.length ? (
        <div className="space-y-3 print:space-y-2">
          {termsParagraphs.map((p, i) => (
            <p key={i} className="text-sm text-gray-700 whitespace-pre-wrap print:text-xs">{p}</p>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-4 print:bg-gray-100 print:p-3">
          <div className="grid grid-cols-2 gap-4 text-sm print:text-xs">
            <div>
              <h3 className="font-medium mb-2">Payment</h3>
              <p className="text-gray-700">50% upfront, 50% on completion.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Timeline</h3>
              <p className="text-gray-700">3-4 weeks from project start.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );

  return sections;
}
```

This guide should enable any developer to create professional, consistent templates without prior knowledge of the system. The key is following the established patterns and using the shared data processor architecture.