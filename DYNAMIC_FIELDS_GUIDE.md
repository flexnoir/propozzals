# Dynamic Fields Development Guide

A comprehensive guide for developers who want to add new dynamic fields to the Propozzals template system.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Step-by-Step Implementation](#step-by-step-implementation)
4. [Field Types](#field-types)
5. [Data Structure](#data-structure)
6. [Testing](#testing)
7. [Best Practices](#best-practices)
8. [Common Patterns](#common-patterns)
9. [Examples](#examples)

## Overview

The Propozzals system uses a centralized data processing architecture that allows you to add new dynamic fields that automatically work across all templates. This guide shows you exactly how to implement new fields like we did with the `tagline` field.

### Benefits of Dynamic Fields

- ✅ **Single source of truth** - Add field once, works everywhere
- ✅ **Automatic template support** - All templates get the new field
- ✅ **Consistent data processing** - Same logic across all templates
- ✅ **Easy maintenance** - Change field logic in one place

## Architecture

```
User Input (Form) → Schema → Data Processor → Templates → Rendered Output
```

**Key Components:**
1. **Schema** (`schema.js`) - Defines form fields and validation
2. **Data Processor** (`dataProcessor.js`) - Processes raw data into structured format
3. **Templates** (`Component.jsx`) - Use processed data for rendering
4. **Form** (`EditorForm.jsx`) - Automatically renders fields from schema

## Step-by-Step Implementation

### Step 1: Add Field to Data Processor

**File:** `src/templates/shared/dataProcessor.js`

```javascript
export function processProposalData(data) {
  // ... existing fields
  const yourNewField = (data?.category?.fieldName || "").trim();
  
  // ... processing logic if needed
  
  return {
    // ... existing fields
    yourNewField,
    // ... rest of fields
  };
}
```

**Key Points:**
- Extract field from `data` object using optional chaining
- Apply `.trim()` for text fields to remove whitespace
- Add any custom processing logic (validation, formatting, etc.)
- Include field in the return object

### Step 2: Add Field to Schema

**File:** `src/templates/modern/schema.js` (used by all templates)

```javascript
const modernSchema = {
  // ... existing properties
  fields: [
    // ... existing fields
    { 
      key: "category.fieldName", 
      label: "Field Display Name", 
      type: "text", // or "textarea", "date", etc.
      required: false, // or true
      placeholder: "Optional helpful placeholder text"
    },
    // ... rest of fields
  ],
  defaultData: {
    // ... existing data
    category: { 
      // ... existing category fields
      fieldName: "" // or appropriate default value
    },
    // ... rest of data
  },
};
```

**Key Points:**
- Use dot notation for nested data (`category.fieldName`)
- Add appropriate `type` (text, textarea, date, etc.)
- Set `required` based on business logic
- Provide helpful `placeholder` text
- Update `defaultData` to match the structure

### Step 3: Update All Templates

For each template in `src/templates/*/Component.jsx`:

```javascript
export function buildSections(rawData) {
  const {
    // ... existing fields
    yourNewField,
    // ... rest of fields
  } = processProposalData(rawData);

  // ... in your JSX
  {yourNewField && (
    <div className="your-styling-classes">
      {yourNewField}
    </div>
  )}
}
```

**Required Templates to Update:**
- `src/templates/modern/Component.jsx`
- `src/templates/minimal/Component.jsx`
- `src/templates/elegant/Component.jsx`
- `src/templates/corporate/Component.jsx`
- `src/templates/luxury/Component.jsx`
- `src/templates/ultra-minimal/Component.jsx`
- `src/templates/web-agency/Component.jsx`

**Template Update Pattern:**
1. Add field to destructuring assignment
2. Use conditional rendering (`{field && (...)}`)
3. Apply appropriate styling for each template's design
4. Follow print-responsive patterns (`print:text-sm`, etc.)

### Step 4: Test Implementation

1. **Start development server:**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Test scenarios:**
   - Empty field (should show nothing)
   - Field with content (should display properly)
   - All templates (should work consistently)
   - Print preview (should work with print styles)

## Field Types

### Text Field
```javascript
{ key: "company.website", label: "Website", type: "text", placeholder: "www.example.com" }
```

### Textarea Field
```javascript
{ key: "project.notes", label: "Project Notes", type: "textarea", rows: 4 }
```

### Date Field
```javascript
{ key: "project.deadline", label: "Project Deadline", type: "date" }
```

### Required Field
```javascript
{ key: "company.email", label: "Email", type: "text", required: true }
```

## Data Structure

### Nested Data Organization
The system uses nested objects to organize related fields:

```javascript
// ✅ Good - Organized structure
{
  company: {
    name: "ACME Corp",
    tagline: "Innovation Delivered",
    website: "www.acme.com",
    email: "hello@acme.com"
  },
  project: {
    scope: "...",
    deadline: "2024-12-31",
    notes: "Additional project notes"
  }
}

// ❌ Bad - Flat structure
{
  companyName: "ACME Corp",
  companyTagline: "Innovation Delivered", 
  projectScope: "...",
  projectDeadline: "2024-12-31"
}
```

### Data Processing Patterns

```javascript
// Simple text field
const website = data?.company?.website || "";

// Date field with formatting
const deadline = data?.project?.deadline 
  ? new Date(data.project.deadline).toLocaleDateString()
  : "";

// Complex processing
const email = data?.company?.email 
  ? data.company.email.toLowerCase().trim()
  : "";

// Array processing
const tags = data?.project?.tags 
  ? data.project.tags.split(',').map(t => t.trim()).filter(Boolean)
  : [];
```

## Testing

### 1. Local Development Testing
```bash
cd frontend
npm run dev
```

Test with:
- Empty field values
- Field with content  
- Long content (test wrapping/truncation)
- Special characters

### 2. Template Consistency Testing

Verify field appears correctly in all templates:
- Modern Professional
- Minimal Executive  
- Elegant Accent
- Corporate Business
- Ultra Minimal
- Luxury Premium
- Web Agency Pro

### 3. Print Testing

1. Open browser dev tools (F12)
2. Toggle device toolbar
3. Select "Print" mode
4. Verify field displays correctly in print styles

## Best Practices

### ✅ Do

1. **Use optional chaining** - `data?.category?.field`
2. **Apply .trim() for text** - Remove unwanted whitespace
3. **Provide meaningful defaults** - Empty string `""` for optional text
4. **Use conditional rendering** - `{field && (...)}`  
5. **Follow existing patterns** - Look at how other fields are implemented
6. **Test all templates** - Ensure consistency across templates
7. **Include print styles** - Use responsive print classes
8. **Group related fields** - Use nested objects (company.*, project.*)

### ❌ Don't

1. **Don't hardcode values** - Always use dynamic data
2. **Don't skip data processor** - Always process data centrally
3. **Don't forget print styles** - Fields must work in print
4. **Don't break existing templates** - Test all templates after changes
5. **Don't ignore empty states** - Handle missing data gracefully
6. **Don't use inconsistent structure** - Follow established data organization
7. **Don't skip validation** - Consider required vs optional fields

## Common Patterns

### Optional Text Field
```javascript
// Data Processor
const website = (data?.company?.website || "").trim();

// Template Usage
{website && (
  <div className="text-sm text-blue-600 print:text-xs">
    Website: {website}
  </div>
)}
```

### Required Field with Validation
```javascript
// Data Processor
const email = data?.company?.email || "email@company.com";

// Schema
{ key: "company.email", label: "Email", type: "text", required: true }
```

### Date Field with Formatting
```javascript
// Data Processor  
const deadline = data?.project?.deadline 
  ? new Date(data.project.deadline).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  : "";

// Template Usage
{deadline && (
  <div className="text-sm text-gray-600 print:text-xs">
    Deadline: {deadline}
  </div>
)}
```

### Array/List Field
```javascript
// Data Processor
const services = data?.company?.services 
  ? data.company.services.split(',').map(s => s.trim()).filter(Boolean)
  : [];

// Template Usage
{services.length > 0 && (
  <div className="services-list">
    {services.map((service, i) => (
      <span key={i} className="service-tag">{service}</span>
    ))}
  </div>
)}
```

## Examples

### Example 1: Adding Company Website Field

**1. Data Processor:**
```javascript
// src/templates/shared/dataProcessor.js
export function processProposalData(data) {
  const company = data?.company?.name || "Your Company";
  const website = (data?.company?.website || "").trim();
  // ... rest of processing
  
  return {
    company,
    website,
    // ... rest of fields
  };
}
```

**2. Schema:**
```javascript
// src/templates/modern/schema.js
fields: [
  { key: "company.name", label: "Company Name", type: "text", required: true },
  { key: "company.website", label: "Website", type: "text", placeholder: "www.yourcompany.com" },
  // ... rest of fields
],
defaultData: {
  company: { name: "Your Company", website: "" },
  // ... rest of data
}
```

**3. Template Usage (example for Modern template):**
```javascript
// src/templates/modern/Component.jsx
const { company, website, /* ... rest */ } = processProposalData(rawData);

// In header section
<div>
  <h1 className="text-2xl font-bold">{company}</h1>
  {website && (
    <p className="text-sm text-blue-600 print:text-xs">
      {website}
    </p>
  )}
</div>
```

### Example 2: Adding Project Deadline Field

**1. Data Processor:**
```javascript
const deadline = data?.project?.deadline 
  ? new Date(data.project.deadline).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  : "";
```

**2. Schema:**
```javascript
{ key: "project.deadline", label: "Project Deadline", type: "date" }
```

**3. Template Usage:**
```javascript
{deadline && (
  <div className="deadline-info">
    <span className="text-sm text-gray-600">Deadline: {deadline}</span>
  </div>
)}
```

### Example 3: Adding Company Services List

**1. Data Processor:**
```javascript
const servicesRaw = (data?.company?.services || "").trim();
const services = servicesRaw
  ? servicesRaw.split(',').map(s => s.trim()).filter(Boolean)
  : [];
```

**2. Schema:**
```javascript
{ 
  key: "company.services", 
  label: "Services Offered", 
  type: "textarea", 
  placeholder: "Web Development, UI/UX Design, Digital Marketing"
}
```

**3. Template Usage:**
```javascript
{services.length > 0 && (
  <div className="services-section">
    <h3>Our Services</h3>
    <div className="services-grid">
      {services.map((service, i) => (
        <div key={i} className="service-item">
          {service}
        </div>
      ))}
    </div>
  </div>
)}
```

## Files You Must Edit

For any new dynamic field, you MUST edit these files:

### Required Files (Always):
1. **`src/templates/shared/dataProcessor.js`** - Add field extraction and processing
2. **`src/templates/modern/schema.js`** - Add field definition and default data

### Template Files (All Must Be Updated):
3. **`src/templates/modern/Component.jsx`**
4. **`src/templates/minimal/Component.jsx`** 
5. **`src/templates/elegant/Component.jsx`**
6. **`src/templates/corporate/Component.jsx`**
7. **`src/templates/luxury/Component.jsx`**
8. **`src/templates/ultra-minimal/Component.jsx`**
9. **`src/templates/web-agency/Component.jsx`**

### Optional Files (If Needed):
- **`src/lib/validation.js`** - If you need custom field validation
- **`src/components/EditorForm.jsx`** - Only if you need custom field rendering (rare)

## Summary

Adding dynamic fields to the Propozzals system is straightforward when you follow this pattern:

1. **Extract & Process** data in `dataProcessor.js`
2. **Define Field** in `schema.js`
3. **Use Field** in all template `Component.jsx` files
4. **Test** across all templates

The key is maintaining consistency across all templates while respecting each template's unique design aesthetic. Every field should work optionally (graceful degradation when empty) and include proper print styling for professional PDF output.

This architecture ensures that once a field is added, it automatically works across all current and future templates, making the system highly maintainable and extensible.