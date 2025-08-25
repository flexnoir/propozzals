import * as Modern from "../templates/modern/Component.jsx";
import * as Minimal from "../templates/minimal/Component.jsx";
import * as Elegant from "../templates/elegant/Component.jsx";
import * as Corporate from "../templates/corporate/Component.jsx";
import * as UltraMinimal from "../templates/ultra-minimal/Component.jsx";
import * as Luxury from "../templates/luxury/Component.jsx";

import modernSchema from "../templates/modern/schema.js"; // reuse same schema for all templates

export const TEMPLATES = {
  "proposal-modern-01":    { title: "Modern Professional",  schema: modernSchema, buildSections: Modern.buildSections },
  "proposal-minimal-01":   { title: "Minimal Executive",    schema: modernSchema, buildSections: Minimal.buildSections },
  "proposal-elegant-01":   { title: "Elegant Accent",       schema: modernSchema, buildSections: Elegant.buildSections },
  "proposal-corporate-01": { title: "Corporate Business",   schema: modernSchema, buildSections: Corporate.buildSections },
  "proposal-ultramin-01":  { title: "Ultra Minimal",       schema: modernSchema, buildSections: UltraMinimal.buildSections },
  "proposal-luxury-01":    { title: "Luxury Premium",      schema: modernSchema, buildSections: Luxury.buildSections },

};

export const DEFAULT_TEMPLATE_ID = "proposal-modern-01";
