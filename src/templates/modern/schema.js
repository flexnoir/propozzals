const modernSchema = {
  id: "proposal-modern-01",
  name: "Modern Clean",
  category: "proposal",
  fields: [
    { key: "company.name", label: "Company Name", type: "text", required: true },
    { key: "company.tagline", label: "Company Tagline", type: "text", placeholder: "e.g. Award-Winning Web Design & Digital Marketing" },
    { key: "client.name", label: "Client Name", type: "text", required: true },
    { key: "project.scope", label: "Project Scope", type: "textarea", required: true },
    { key: "pricing.items", label: "Line Items", type: "textarea", required: true },
    { key: "pricing.total", label: "Total (€)", type: "text", required: true },
    { key: "valid_until", label: "Valid Until", type: "date", required: true },
    { key: "terms", label: "Terms & Conditions", type: "textarea", required: true },
  ],
  // ✅ NESTED defaultData (ΟΧΙ flat με "company.name")
  defaultData: {
    company: { name: "", tagline: "" },
    client: { name: "" },
    project: { scope: "" },
    pricing: { items: "", total: "" },
    valid_until: "",
    terms: "",
  },
};
export default modernSchema;
