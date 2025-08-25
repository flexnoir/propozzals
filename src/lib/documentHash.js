export async function documentHash(obj) {
  const json = JSON.stringify(obj);
  const enc = new TextEncoder().encode(json);
  const digest = await crypto.subtle.digest("SHA-256", enc);
  const arr = Array.from(new Uint8Array(digest));
  return arr.map(b => b.toString(16).padStart(2,"0")).join("");
}
