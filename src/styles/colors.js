/**
 * Propozzals Color Palette - 10/10 World-Class Design System
 * 
 * A sophisticated color system designed for trust, conversion, and visual hierarchy.
 * Each color has strategic psychological purpose and tested contrast ratios.
 */

export const COLORS = {
  // 🌑 Background Layers (Dark Theme)
  backgrounds: {
    primary: '#0f1115',    // Main app background
    secondary: '#0c0e12',  // Sections, cards
    tertiary: '#11141a',   // Elevated surfaces
    borders: '#1a1f27',    // Subtle dividers
    surfaces: '#222835',   // Interactive borders
  },

  // 📝 Text Hierarchy
  text: {
    primary: '#e9ecf1',    // Headlines, important text
    secondary: '#b7beca',  // Body text, descriptions
    tertiary: '#8b94a3',   // Labels, metadata
    muted: '#6a7486',      // Disabled, footnotes
  },

  // 🎨 Brand & Accent Colors
  brand: {
    // Primary Brand (Trust, Innovation)
    cyan: {
      solid: '#58e1ff',
      gradient: 'from-[#58e1ff] to-[#4cc9f0]',
      light: '#4cc9f0',
      glow: '#58e1ff/25',
    },

    // Premium Actions (Urgency, Conversion)
    pink: {
      solid: '#f472b6',
      gradient: 'from-[#f472b6] to-[#ec4899]',
      dark: '#ec4899',
      glow: '#f472b6/25',
    }
  },

  // 🎯 Semantic Colors (Status & Psychology)
  semantic: {
    // Success, Security, Trust
    success: {
      solid: '#10b981',
      light: '#059669',
      bg: '#10b981/10',
      border: '#10b981/30',
      text: '#10b981/80',
    },

    // Warning, Energy, Speed
    warning: {
      solid: '#fbbf24',
      light: '#f59e0b',
      bg: '#fbbf24/10',
      border: '#fbbf24/30',
    },

    // Error, Danger
    error: {
      solid: '#ef4444',
      light: '#dc2626',
      bg: '#ef4444/10',
      border: '#ef4444/30',
    }
  },

  // ✨ Special Effects
  effects: {
    // Animated gradients for hero elements
    heroGlow: 'from-[#58e1ff]/10 via-[#4cc9f0]/5 to-[#f472b6]/10',
    hoverGlow: 'from-[#58e1ff]/20 via-[#4cc9f0]/10 to-[#f472b6]/20',
    
    // Glass morphism
    glass: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
  }
};

/**
 * Usage Examples:
 * 
 * // Background
 * bg-[${COLORS.backgrounds.primary}]
 * 
 * // Text
 * text-[${COLORS.text.primary}]
 * 
 * // Brand gradients
 * bg-gradient-to-r ${COLORS.brand.cyan.gradient}
 * 
 * // Success states
 * text-[${COLORS.semantic.success.solid}]
 * bg-[${COLORS.semantic.success.bg}]
 * 
 * // Glows and shadows
 * shadow-[${COLORS.brand.cyan.glow}]
 */

// Color Psychology & Usage Guide
export const COLOR_PSYCHOLOGY = {
  cyan: 'Trust, innovation, technology - Use for primary brand elements',
  pink: 'Premium, urgency, conversion - Use for CTAs and premium features',
  emerald: 'Success, security, privacy - Use for positive states and trust signals',
  amber: 'Energy, speed, attention - Use for warnings and speed indicators',
  
  // Combinations that work well together
  combinations: {
    trustAndPremium: ['cyan', 'pink'],      // Main brand combo
    successAndSpeed: ['emerald', 'amber'],  // Feature highlights
    innovation: ['cyan', 'emerald'],        // Tech + security
  }
};

export default COLORS;