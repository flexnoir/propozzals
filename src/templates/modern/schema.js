const modernSchema = {
  id: "proposal-modern-01",
  name: "Modern Clean",
  category: "proposal",
  fields: [
    { key: "company.name", label: "Company Name", type: "text", required: true },
    { key: "client.name", label: "Client Name", type: "text", required: true },
    { key: "project.scope", label: "Project Scope", type: "textarea" },
    { key: "pricing.items", label: "Line Items", type: "textarea" },
    { key: "pricing.total", label: "Total (€)", type: "text", required: true },
    { key: "valid_until", label: "Valid Until", type: "date" },
    { key: "terms", label: "Terms & Conditions", type: "textarea" },
  ],
  // ✅ NESTED defaultData (ΟΧΙ flat με "company.name")
  defaultData: {
    company: { name: "Your Company" },
    client: { name: "Client Name" },
    project: { scope: "Short description of scope" },
    pricing: { items: "Item A — 500€\nItem B — 300€", total: "800" },
    valid_until: new Date().toISOString().slice(0,10),
    terms: "Payment: 50% required to commence work.\nTimeline: 3-4 weeks from project kickoff.\nDeliverables: All source files and documentation provided.\nClient responsible for content and asset provision.",
  },
};
export default modernSchema;
