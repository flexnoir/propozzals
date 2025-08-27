export function processProposalData(data) {
  const company = data?.company?.name || "Your Company";
  const client = data?.client?.name || "Client Name";
  const tagline = (data?.company?.tagline || "").trim();
  const scopeRaw = (data?.project?.scope || "").trim();
  const itemsRaw = (data?.pricing?.items || "").trim();
  const total = data?.pricing?.total || "";
  const valid = data?.valid_until || "";
  const terms = data?.terms || "";

  const scopeParagraphs = scopeRaw
    ? scopeRaw.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
    : [];

  const items = itemsRaw
    ? itemsRaw.split(/\r?\n/).map(l => {
        const [name, ...rest] = l.split(/—|-/);
        const price = rest.join("-").trim();
        return { name: (name || "").trim(), price };
      }).filter(it => it.name)
    : [];

  const termsParagraphs = terms
    ? terms.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
    : [];

  return {
    company,
    client,
    tagline,
    scopeParagraphs,
    items,
    total,
    valid,
    termsParagraphs,
    currentDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    proposalId: Math.random().toString(36).substr(2, 8).toUpperCase()
  };
}