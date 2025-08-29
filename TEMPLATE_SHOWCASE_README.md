# Template Showcase Management

This README explains how to update the 3 featured templates on the landing page.

## Current Featured Templates

The landing page showcases 3 carefully selected templates:
1. **Modern Professional** (`proposal-modern-01`)
2. **Minimal Executive** (`proposal-minimal-01`) 
3. **Elegant Accent** (`proposal-elegant-01`)

## How to Update Featured Templates

### File Location
The template showcase is located in:
```
src/routes/Landing.jsx
```

### Steps to Change Featured Templates

1. **Find the template showcase section** (around line 136):
   ```jsx
   <section id="templates" className="bg-[#0c0e12] border-t border-[#1a1f27] py-20">
   ```

2. **Available templates** are defined in `src/lib/templates.js`:
   - `proposal-modern-01` - Modern Professional
   - `proposal-minimal-01` - Minimal Executive  
   - `proposal-elegant-01` - Elegant Accent
   - `proposal-corporate-01` - Corporate Business
   - `proposal-ultramin-01` - Ultra Minimal
   - `proposal-luxury-01` - Luxury Premium
   - `proposal-webagency-01` - Web Agency Pro

3. **To change a featured template**:
   - Replace the `to="/editor?t=TEMPLATE_ID"` with the new template ID
   - Update the title (h3 element)
   - Update the description paragraph
   - Update the badge text (e.g., "Most popular", "Timeless", "Premium feel")
   - Optionally change the icon gradient colors

### Template Card Structure

Each template card follows this structure:
```jsx
<Link 
  to="/editor?t=TEMPLATE_ID"
  className="group relative"
>
  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#58e1ff]/20 via-[#58e1ff]/5 to-[#58e1ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  <div className="relative bg-[#11141a] rounded-2xl p-8 border border-[#222835] group-hover:border-[#58e1ff]/30 transition-all duration-300">
    <div className="space-y-6">
      <!-- Icon with gradient background -->
      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[COLOR1] to-[COLOR2] flex items-center justify-center">
        <div className="w-6 h-6 bg-white/20 rounded backdrop-blur" />
      </div>
      <!-- Title and description -->
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Template Name</h3>
        <p className="text-[#8b94a3] text-sm leading-relaxed">Description text</p>
      </div>
      <!-- Badge -->
      <div className="pt-4 border-t border-[#1a1f27]">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#8b94a3]">Badge text</span>
          <span className="text-[#58e1ff] group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </div>
  </div>
</Link>
```

### Icon Gradient Colors Used

- **Modern Professional**: `from-[#58e1ff] to-[#4cc9f0]` (Cyan to Blue)
- **Minimal Executive**: `from-[#f8f9fa] to-[#e9ecef]` (Light gray gradient)
- **Elegant Accent**: `from-[#f72585] to-[#b5179e]` (Pink to Purple)

### Best Practices

1. **Keep descriptions concise** - 1-2 lines max
2. **Use compelling badges** - "Most popular", "Timeless", "Premium feel", etc.
3. **Match icon colors to template personality**
4. **Test on mobile** - Cards stack vertically on small screens
5. **Maintain consistent tone** - Professional but not stuffy

### Example: Adding a New Template

To replace "Elegant Accent" with "Ultra Minimal":

1. Change the Link: `to="/editor?t=proposal-ultramin-01"`
2. Update title: `<h3>Ultra Minimal</h3>`
3. Update description: `<p>Absolute minimalism. Nothing but essentials.</p>`
4. Update badge: `<span>Pure focus</span>`
5. Consider changing icon gradient to match minimal aesthetic

### Testing

After making changes:
1. Check desktop layout (3 columns)
2. Check mobile layout (stacked)
3. Verify all links work correctly
4. Test hover effects
5. Ensure consistent spacing and alignment